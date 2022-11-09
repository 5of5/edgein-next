import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemFormBase from "../ElemFormBase";
import CoinForm from "./CoinForm";

export const CoinCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("coins", { data });
    redirect("/coins");
  };

  return (
    <ElemFormBase title="Create a Coin" action="create">
      <CoinForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
