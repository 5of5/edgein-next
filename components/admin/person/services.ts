export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any
) => ({
  ...data,
  picture: imageResponse?.file?.url || '',
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
});
