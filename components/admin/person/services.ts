export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any
) => ({
  ...data,
  picture: imageResponse?.url || '',
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
});
