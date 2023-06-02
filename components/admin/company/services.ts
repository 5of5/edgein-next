export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any,
) => ({
  ...data,
  logo: imageResponse?.file?.url || '',
  coin_id: !data.coin_id ? null : data.coin_id,
  tags: finalValue,
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
  coin_id: !data.coin_id ? null : data.coin_id,
  tags: finalValue,
});

export const getRootStyle = (formRef: any) => ({
  '.MuiPaper-root': {
    marginBottom: '20px',
  },
  '.MuiCardContent-root': {
    background: 'none',
    border: 0,
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'row !important',
    },
  },
  '.customForm': {
    '& > form': {
      maxWidth: formRef?.current?.offsetWidth || '100%',
    },
  },
});
