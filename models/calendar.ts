export type CalendarType = "Apple" | "Google" | "Outlook.com" | "iCal File";

export type CalendarEvent = {
  name: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  timeZone?: string;
  location?: string;
  description?: string;
};
