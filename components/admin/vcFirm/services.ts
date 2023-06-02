export const getMutationRootStyle = (
  height: number,
  formHeight: number,
  formRef: any,
) => ({
  '.MuiCardContent-root': {
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row !important',
    },
    marginBottom: formHeight >= height ? '60px' : 0,
  },
  '.customForm': {
    '& > form': {
      maxWidth: formRef?.current?.offsetWidth || '100%',
    },
  },
});

export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any,
) => ({
  ...data,
  logo: imageResponse?.file?.url || '',
  tags: finalValue,
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
  tags: finalValue,
});
