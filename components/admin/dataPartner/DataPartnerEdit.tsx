import React from "react";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import DataPartnerForm from "./DataPartnerForm";

export const DataPartnerEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Data partner" />} action="edit">
      <DataPartnerForm action="edit" />
    </ElemFormBase>
  );
};
