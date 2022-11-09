import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemFormBase from "../ElemFormBase";
import InvestmentRoundForm from "./InvestmentRoundForm";

export const InvestmentRoundCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investment_rounds", { data });
    redirect("/investment_rounds");
  };

  return (
    <ElemFormBase title="Create a Investment Round" action="create">
      <InvestmentRoundForm
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
