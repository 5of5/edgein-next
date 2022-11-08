import React from "react";
import ElemMutationBase from "../ElemMutationBase";
import ElemTitle from "../ElemTitle";
import InvestorForm from "./InvestorForm";

export const InvestorEdit = () => {
  return (
    <ElemMutationBase title={<ElemTitle category="VC" />} action="edit">
      <InvestorForm />
    </ElemMutationBase>
  );
};
