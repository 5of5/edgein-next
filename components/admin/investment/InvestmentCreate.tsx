import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemMutationBase from "../ElemMutationBase";
import ElemToolbar from "../ElemToolbar";
import InvestmentForm from "./InvestmentForm";

export const InvestmentCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investments", { data });
    redirect("/investments");
  };

  return (
    <ElemMutationBase
      title="Add a vc or angel to an Investment Round"
      action="create"
    >
      <InvestmentForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemMutationBase>
  );
};
