'use client';

import * as amplitude from '@amplitude/analytics-browser';
import { AmplitudeEventProperties, AmplitudeEventsEnum } from '../models/amplitudeEvents';

const API_KEY = '81fa2d1811a9043f5112d8c7b56d6cea';

let initialized = false;

export const initAmplitude = () => {
  if (typeof window === 'undefined' || initialized) return;
  amplitude.init(API_KEY, { defaultTracking: true });
  initialized = true;
};

export const logEvent = (eventName: AmplitudeEventsEnum, eventProperties?: AmplitudeEventProperties) => {
  if (typeof window === 'undefined') return;
  amplitude.track(eventName, eventProperties);
};
