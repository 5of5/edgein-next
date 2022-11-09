import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemFormBase from "../ElemFormBase";
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
    <ElemFormBase title="Add an investor to a VC firm" action="create">
      <InvestorForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemFormBase>
  );
};
