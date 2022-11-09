import React from "react";
import ElemMutationBase from "../ElemMutationBase";
import ElemTitle from "../ElemTitle";
import AllowedEmailForm from "./AllowedEmailForm";
import { transform } from "./services";

export const AllowedEmailEdit = () => {
  return (
    <ElemMutationBase
      title={<ElemTitle category="Allow List" />}
      action="edit"
      transform={transform}
    >
      <AllowedEmailForm action="edit" />
    </ElemMutationBase>
  );
};
