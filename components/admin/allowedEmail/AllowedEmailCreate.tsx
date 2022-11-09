import React from "react";
import ElemFormBase from "../ElemFormBase";
import AllowedEmailForm from "./AllowedEmailForm";
import { transform } from "./services";

export const AllowedEmailCreate = () => {
  return (
    <ElemFormBase
      title="Create a entry in allow list"
      action="create"
      transform={transform}
    >
      <AllowedEmailForm action="create" />
    </ElemFormBase>
  );
};
