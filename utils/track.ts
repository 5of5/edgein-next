type TrackActionType = {
  resourceId?: number;
  resourceType?: 'companies' | 'vc_firms' | 'people' | 'news' | 'events';
  properties?: any;
  pathname: string;
};

export const onTrackView = async ({
  resourceId,
  resourceType,
  properties,
  pathname,
}: TrackActionType) => {
  await fetch('/api/track/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resourceId,
      resourceType,
      properties,
      pathname,
    }),
  });
};
