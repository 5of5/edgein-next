export type CalendarType = 'Apple' | 'Google' | 'Outlook' | 'iCal File';

export type CalendarEvent = {
  name: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  description?: string;
};
