import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemMutationBase from "../ElemMutationBase";
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
    <ElemMutationBase title="Create a Investment Round" action="create">
      <InvestmentRoundForm
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemMutationBase>
  );
};
