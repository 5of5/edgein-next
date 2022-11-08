export const getMutationRootStyle = (
  height: number,
  formHeight: number,
  formRef: any,
  ) => ({
  ".MuiCardContent-root": {
    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      flexDirection: "row !important",
    },
    marginBottom: formHeight >= height ? "60px" : 0,
  },
  ".MuiToolbar-root": {
    position: "fixed",
    width: "100%",
    maxWidth: "inherit",
    bottom: 0,
    zIndex: 100,
    background: "#fff",
    borderRadius: "4px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  ".MuiFormHelperText-root": {
    display: "none",
  },
  ".customForm": {
    "& > form": {
      maxWidth: formRef?.current?.offsetWidth || "100%",
    },
  },
})

export const withImageTransformData = (
  data: any,
  imageResponse: any,
  finalValue: any
) => ({
  ...data,
  logo: imageResponse.file,
  tags: finalValue,
});

export const withoutImageTransformData = (data: any, finalValue: any) => ({
  ...data,
  tags: finalValue,
});
