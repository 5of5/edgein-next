import { IconProps } from '@/components/icons';

export type CalendarType = {
  type: string;
  icon?: React.FC<IconProps>;
};

export type CalendarEvent = {
  name: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  description?: string;
};
