/**
 * Feature Flag Provider Factory
 *
 * THIS IS THE ONLY FILE YOU NEED TO MODIFY TO SWITCH PROVIDERS.
 *
 * To switch from Firebase to another provider:
 * 1. Create a new provider file (e.g., launchDarkly.ts) implementing FeatureFlagProvider
 * 2. Import it here
 * 3. Change createFeatureFlagProvider to use the new provider
 *
 * Example for switching to LaunchDarkly:
 * ```
 * import { createLaunchDarklyProvider } from './launchDarkly';
 * export const createFeatureFlagProvider = createLaunchDarklyProvider;
 * ```
 */

import { createFirebaseRemoteConfigProvider } from './firebaseRemoteConfig';
import type { FeatureFlagProvider, FeatureFlagProviderConfig } from '../types';

/**
 * Create a feature flag provider instance.
 * Currently uses Firebase Remote Config.
 */
export function createFeatureFlagProvider(
  config?: FeatureFlagProviderConfig
): FeatureFlagProvider {
  return createFirebaseRemoteConfigProvider(config);
}

// Re-export types for convenience
export type { FeatureFlagProvider, FeatureFlagProviderConfig };
