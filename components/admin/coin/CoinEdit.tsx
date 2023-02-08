import React from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import CoinForm from "./CoinForm";

export const CoinEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne("coins", { id });

  return (
    <ElemFormBase title={<ElemTitle category="Coin" />} action="edit">
      <CoinForm action="edit" currentData={currentData} />
    </ElemFormBase>
  );
};
