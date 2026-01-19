'use client';

import * as amplitude from '@amplitude/analytics-browser';
import {
  AmplitudeEventsEnum,
  EventMap,
  AmplitudeEventProperties,
} from '../models/amplitudeEvents';

const API_KEY = '81fa2d1811a9043f5112d8c7b56d6cea';

let initialized = false;

export const initAmplitude = () => {
  if (typeof window === 'undefined' || initialized) return;
  if (window.location.hostname === 'localhost') return;
  amplitude.init(API_KEY, { defaultTracking: true });
  initialized = true;
};

// Type-safe event logging
export function logEvent<T extends AmplitudeEventsEnum>(
  eventName: T,
  eventProperties: EventMap[T]
): void {
  if (typeof window === 'undefined') return;
  amplitude.track(eventName, eventProperties as unknown as Record<string, unknown>);
}

// Legacy function for backwards compatibility
export const logEventLegacy = (
  eventName: AmplitudeEventsEnum,
  eventProperties?: AmplitudeEventProperties
) => {
  if (typeof window === 'undefined') return;
  amplitude.track(eventName, eventProperties as unknown as Record<string, unknown>);
};
