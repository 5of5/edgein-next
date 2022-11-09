import React from "react";
import ElemTitle from "../ElemTitle";
import ElemMutationBase from "../ElemMutationBase";
import InvestmentRoundForm from "./InvestmentRoundForm";

export const InvestmentRoundEdit = () => {
  return (
    <ElemMutationBase title={<ElemTitle category="Round" />} action="edit">
      <InvestmentRoundForm />
    </ElemMutationBase>
  );
};
