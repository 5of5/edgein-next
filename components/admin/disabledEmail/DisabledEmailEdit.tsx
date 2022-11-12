import React from "react";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import DisabledEmailForm from "./DisabledEmailForm";
import { transform } from "./services";

export const DisabledEmailEdit = () => {
  return (
    <ElemFormBase
      title={<ElemTitle category="Allow List" />}
      action="edit"
      transform={transform}
    >
      <DisabledEmailForm action="edit" />
    </ElemFormBase>
  );
};
