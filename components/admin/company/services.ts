export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any
) => ({
  ...data,
  logo: imageResponse.file,
  coin_id: !data.coin_id ? null : data.coin_id,
  tags: finalValue,
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
  coin_id: !data.coin_id ? null : data.coin_id,
  tags: finalValue,
});
