import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../ElemToolbar";
import ElemMutationBase from "../ElemMutationBase";
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
    <ElemMutationBase title="Create a Coin" action="create">
      <CoinForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemMutationBase>
  );
};
