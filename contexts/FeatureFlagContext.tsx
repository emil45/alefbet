'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useFeatureFlags, UseFeatureFlagsReturn } from '@/hooks/useFeatureFlags';

const FeatureFlagContext = createContext<UseFeatureFlagsReturn | null>(null);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

/**
 * Provider component that makes feature flags available throughout the app.
 * Wrap your app with this provider to use feature flags in any component.
 */
export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const featureFlagValue = useFeatureFlags();

  return (
    <FeatureFlagContext.Provider value={featureFlagValue}>{children}</FeatureFlagContext.Provider>
  );
}

/**
 * Hook to access feature flags from any component.
 * Must be used within a FeatureFlagProvider.
 *
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { getFlag } = useFeatureFlagContext();
 *
 *   if (getFlag('showStickersButton')) {
 *     return <StickersButton />;
 *   }
 *   return null;
 * }
 * ```
 */
export function useFeatureFlagContext(): UseFeatureFlagsReturn {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
}

export default FeatureFlagContext;
