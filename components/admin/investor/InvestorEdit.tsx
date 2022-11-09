import React from "react";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import InvestorForm from "./InvestorForm";

export const InvestorEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="VC" />} action="edit">
      <InvestorForm />
    </ElemFormBase>
  );
};
