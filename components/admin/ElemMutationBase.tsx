import React, { FC, ReactElement } from "react";
import { Create, Edit } from "react-admin";

type Props = {
  title: ReactElement | string;
  action: "create" | "edit";
  transform?: any;
  rootStyle?: any;
  children: ReactElement;
};

const defaultSx = {
  ".MuiFormHelperText-root": {
    display: "none",
  },
  ".MuiPaper-root": {
    position: "relative",
  },
  ".MuiCardContent-root": {
    "& > div": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      flexDirection: "row !important",
    },
  },
};

const ElemMutationBase: FC<Props> = ({
  title,
  action,
  transform,
  rootStyle,
  children,
}) => {
  const sx = rootStyle || defaultSx;

  if (action === "create") {
    return (
      <Create title={title} transform={transform} sx={sx}>
        {children}
      </Create>
    );
  }

  if (action === "edit") {
    return (
      <Edit title={title} transform={transform} sx={sx}>
        {children}
      </Edit>
    );
  }

  return null;
};

export default ElemMutationBase;
