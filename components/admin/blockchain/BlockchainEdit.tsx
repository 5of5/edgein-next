import React from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import ElemTitle from "../ElemTitle";
import ElemMutationBase from "../ElemMutationBase";
import BlockchainForm from "./BlockchainForm";

export const BlockchainEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne("blockchains", { id });

  return (
    <ElemMutationBase title={<ElemTitle category="Blockchain" />} action="edit">
      <BlockchainForm action="edit" currentData={currentData} />
    </ElemMutationBase>
  );
};
