const transformEventFormData = (event: any) => {
  const data = { ...event };
  const typesValue = data.types ? data.types : [];
  data.types =
    typeof typesValue === 'string' ? typesValue.split(',') : typesValue;
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
  return data.parent_event_id === ''
    ? { ...data, parent_event_id: null }
    : data;
};

const transformAttachments = (values: any, attachmentsResponse: any) => {
  return {
    ...values,
    attachments: values.attachments.map((item: any) => {
      if (item.url) {
        return item;
      }

      return {
        label: item.label,
        url:
          attachmentsResponse.find(
            (element: any) => element.fileName === item.file.title,
          )?.file?.url || '',
      };
    }),
  };
};

export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any,
  attachmentsResponse?: any,
) => {
  const values = {
    ...transformEventFormData(data),
    banner: imageResponse?.file?.url || '',
  };
  if (attachmentsResponse && attachmentsResponse.length > 0) {
    return transformAttachments(values, attachmentsResponse);
  }
  return values;
};

export const withoutImageTransformData = (
  data: any,
  finalValue: any,
  attachmentsResponse?: any,
) => {
  const values = {
    ...transformEventFormData(data),
  };
  if (attachmentsResponse && attachmentsResponse.length > 0) {
    if (attachmentsResponse && attachmentsResponse.length > 0) {
      return transformAttachments(values, attachmentsResponse);
    }
  }
  return values;
};
