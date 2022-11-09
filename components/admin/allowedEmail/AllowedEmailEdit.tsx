import React from "react";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import AllowedEmailForm from "./AllowedEmailForm";
import { transform } from "./services";

export const AllowedEmailEdit = () => {
  return (
    <ElemFormBase
      title={<ElemTitle category="Allow List" />}
      action="edit"
      transform={transform}
    >
      <AllowedEmailForm action="edit" />
    </ElemFormBase>
  );
};
