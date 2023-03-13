export const transform = (event: any) => {
  let data = { ...event };
  if (
    (!data?.location?.address &&
      !data?.location?.city &&
      !data?.location?.state &&
      !data?.location?.country &&
      data?.geopoint) ||
    !data?.geopoint
  ) {
    data.geopoint = null;
  }
  return data.parent_event_id === ""
    ? { ...data, parent_event_id: null }
    : data;
};
