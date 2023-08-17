export type Segment =
  | 'Executive'
  | 'Investor'
  | 'Sales or Business Developer'
  | 'Event Organizer'
  | 'Creator or Publisher'
  | 'Team Member';

export type SegmentOption = {
  title: Segment;
  description: string;
};
