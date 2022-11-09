import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemFormBase from "../ElemFormBase";
import BlockchainForm from "./BlockchainForm";

export const BlockchainCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("blockchains", { data });
    redirect("/blockchains");
  };

  return (
    <ElemFormBase title="Create a Blockchain" action="create">
      <BlockchainForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
