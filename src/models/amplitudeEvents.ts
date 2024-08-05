export enum AmplitudeEventsEnum {
  BUTTON_CLICK = 'Button Click',
  PAGE_VIEW = 'Page View',
}

export interface AmplitudeEventProperties {
  buttonName?: string;
  page?: string;
}