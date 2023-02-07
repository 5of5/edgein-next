import React from "react";
import ElemFormBase from "../elem-form-base";
import ElemTitle from "../elem-title";
import InvestmentForm from "./investment-form";

export const InvestmentEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Investment" />} action="edit">
      <InvestmentForm />
    </ElemFormBase>
  );
};
