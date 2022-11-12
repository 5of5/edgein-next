import React from "react";
import ElemFormBase from "../ElemFormBase";
import DisabledEmailForm from "./DisabledEmailForm";
import { transform } from "./services";

export const DisabledEmailCreate = () => {
  return (
    <ElemFormBase
      title="Create a entry in deny list"
      action="create"
      transform={transform}
    >
      <DisabledEmailForm action="create" />
    </ElemFormBase>
  );
};
