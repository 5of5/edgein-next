const transformEventFormData = (event: any) => {
  let data = { ...event };
  const typesValue = data.types ? data.types : [];
  data.types =
    typeof typesValue === "string" ? typesValue.split(",") : typesValue;
  if (
    (!data?.location_json?.address &&
      !data?.location_json?.city &&
      !data?.location_json?.state &&
      !data?.location_json?.country &&
      data?.geopoint) ||
    !data?.geopoint
  ) {
    data.geopoint = null;
  }
  return data.parent_event_id === ""
    ? { ...data, parent_event_id: null }
    : data;
};

export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any
) => ({
  ...transformEventFormData(data),
  banner: imageResponse?.file?.url || "",
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...transformEventFormData(data),
});
