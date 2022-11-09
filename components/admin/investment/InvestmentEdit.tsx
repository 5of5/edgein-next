import React from "react";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import InvestmentForm from "./InvestmentForm";

export const InvestmentEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Investment" />} action="edit">
      <InvestmentForm />
    </ElemFormBase>
  );
};
