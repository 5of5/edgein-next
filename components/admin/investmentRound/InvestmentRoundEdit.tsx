import React from "react";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import InvestmentRoundForm from "./InvestmentRoundForm";

export const InvestmentRoundEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Round" />} action="edit">
      <InvestmentRoundForm />
    </ElemFormBase>
  );
};
