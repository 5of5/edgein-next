import React from "react";
import ElemMutationBase from "../ElemMutationBase";
import ElemTitle from "../ElemTitle";
import InvestmentForm from "./InvestmentForm";

export const InvestmentEdit = () => {
  return (
    <ElemMutationBase title={<ElemTitle category="Investment" />} action="edit">
      <InvestmentForm />
    </ElemMutationBase>
  );
};
