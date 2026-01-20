/**
 * Feature Flag System
 *
 * A provider-agnostic feature flag system. The architecture allows
 * easy swapping between different feature flag providers (Firebase,
 * LaunchDarkly, PostHog, etc.) without changing consumer code.
 *
 * Usage:
 * ```tsx
 * import { useFeatureFlagContext } from '@/contexts/FeatureFlagContext';
 *
 * function MyComponent() {
 *   const { getFlag } = useFeatureFlagContext();
 *
 *   if (getFlag('showStickersButton')) {
 *     return <StickersButton />;
 *   }
 *   return null;
 * }
 * ```
 *
 * To add a new flag:
 * 1. Add the flag to FeatureFlags interface in types.ts
 * 2. Add default value to DEFAULT_FLAGS in types.ts
 * 3. Add to fetchFlags() in the provider implementation
 * 4. Configure the flag in your remote config service
 */

// Types
export type {
  FeatureFlags,
  FeatureFlagKey,
  FeatureFlagStatus,
  FeatureFlagProvider,
  FeatureFlagProviderConfig,
} from './types';

export { DEFAULT_FLAGS } from './types';

// Provider factory
export { createFeatureFlagProvider } from './providers';
