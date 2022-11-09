import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemFormBase from "../ElemFormBase";
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
    <ElemFormBase
      title="Add a vc or angel to an Investment Round"
      action="create"
    >
      <InvestmentForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemFormBase>
  );
};
