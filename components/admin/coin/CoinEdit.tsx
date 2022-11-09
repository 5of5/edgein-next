import React from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import ElemTitle from "../ElemTitle";
import ElemMutationBase from "../ElemMutationBase";
import CoinForm from "./CoinForm";
2;
export const CoinEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne("coins", { id });

  return (
    <ElemMutationBase title={<ElemTitle category="Coin" />} action="edit">
      <CoinForm action="edit" currentData={currentData} />
    </ElemMutationBase>
  );
};
