import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemFormBase from "../ElemFormBase";
import DataPartnerForm from "./DataPartnerForm";

export const DataPartnerCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("data_partners", { data });
    redirect("/data_partners");
  };

  return (
    <ElemFormBase title="Create a Coin" action="create">
      <DataPartnerForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
