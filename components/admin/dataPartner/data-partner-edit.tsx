import React from "react";
import ElemTitle from "../elem-title";
import ElemFormBase from "../elem-form-base";
import DataPartnerForm from "./data-partner-form";

export const DataPartnerEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Data partner" />} action="edit">
      <DataPartnerForm action="edit" />
    </ElemFormBase>
  );
};
