import * as amplitude from '@amplitude/analytics-browser';
import { AmplitudeEventProperties, AmplitudeEventsEnum } from '../models/amplitudeEvents';

const API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY as string;

export const initAmplitude = () => {
  amplitude.init(API_KEY, {defaultTracking: true},);
};

export const logEvent = (eventName: AmplitudeEventsEnum, eventProperties?: AmplitudeEventProperties) => {
  amplitude.track(eventName, eventProperties);
};