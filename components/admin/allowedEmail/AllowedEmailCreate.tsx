import React from "react";
import ElemMutationBase from "../ElemMutationBase";
import AllowedEmailForm from "./AllowedEmailForm";
import { transform } from "./services";

export const AllowedEmailCreate = () => {
  return (
    <ElemMutationBase
      title="Create a entry in allow list"
      action="create"
      transform={transform}
    >
      <AllowedEmailForm action="create" />
    </ElemMutationBase>
  );
};
