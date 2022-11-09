import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemMutationBase from "../ElemMutationBase";
import ElemToolbar from "../ElemToolbar";
import InvestorForm from "./InvestorForm";

export const InvestorCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("investors", { data });
    redirect("/investors");
  };

  return (
    <ElemMutationBase title="Add an investor to a VC firm" action="create">
      <InvestorForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemMutationBase>
  );
};
