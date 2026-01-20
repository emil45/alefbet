'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  createFeatureFlagProvider,
  FeatureFlags,
  FeatureFlagKey,
  FeatureFlagStatus,
  FeatureFlagProvider,
  DEFAULT_FLAGS,
} from '@/lib/featureFlags';

export interface UseFeatureFlagsReturn {
  /**
   * Get the value of a specific feature flag
   */
  getFlag: <K extends FeatureFlagKey>(key: K) => FeatureFlags[K];

  /**
   * Get all feature flags
   */
  flags: FeatureFlags;

  /**
   * Current status of the feature flag provider
   */
  status: FeatureFlagStatus;

  /**
   * Whether flags are still loading
   */
  isLoading: boolean;

  /**
   * Manually refresh flags from the remote source
   */
  refresh: () => Promise<void>;
}

// Singleton provider instance to share across all hook consumers
let providerInstance: FeatureFlagProvider | null = null;
let initPromise: Promise<void> | null = null;

function getProvider(): FeatureFlagProvider {
  if (!providerInstance) {
    providerInstance = createFeatureFlagProvider();
  }
  return providerInstance;
}

async function initializeProvider(): Promise<void> {
  if (!initPromise) {
    const provider = getProvider();
    initPromise = provider.initialize();
  }
  return initPromise;
}

/**
 * Hook to access feature flags in components.
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { getFlag, isLoading } = useFeatureFlags();
 *
 *   if (isLoading) return <Skeleton />;
 *
 *   return getFlag('showStickersButton') ? <StickersButton /> : null;
 * }
 * ```
 */
export function useFeatureFlags(): UseFeatureFlagsReturn {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [status, setStatus] = useState<FeatureFlagStatus>('loading');
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const init = async () => {
      try {
        await initializeProvider();
        const provider = getProvider();

        if (mountedRef.current) {
          setFlags(provider.getAllFlags());
          setStatus(provider.getStatus());
        }

        // Subscribe to flag changes
        const unsubscribe = provider.subscribe((newFlags) => {
          if (mountedRef.current) {
            setFlags(newFlags);
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error('[useFeatureFlags] Initialization error:', error);
        if (mountedRef.current) {
          setStatus('error');
        }
      }
    };

    const unsubscribePromise = init();

    return () => {
      mountedRef.current = false;
      unsubscribePromise.then((unsubscribe) => unsubscribe?.());
    };
  }, []);

  const getFlag = useCallback(
    <K extends FeatureFlagKey>(key: K): FeatureFlags[K] => {
      return flags[key];
    },
    [flags]
  );

  const refresh = useCallback(async () => {
    const provider = getProvider();
    await provider.refresh();
    if (mountedRef.current) {
      setFlags(provider.getAllFlags());
    }
  }, []);

  return {
    getFlag,
    flags,
    status,
    isLoading: status === 'loading',
    refresh,
  };
}

export default useFeatureFlags;
