import React from "react";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import InvestmentRoundForm from "./InvestmentRoundForm";
import InvestmentTable from "./InvestmentTable";

export const InvestmentRoundEdit = () => {
  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase title={<ElemTitle category="Round" />} action="edit">
        <InvestmentRoundForm />
      </ElemFormBase>

      <InvestmentTable />
    </div>
  );
};
