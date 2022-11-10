import React, { useRef } from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import useAdminTransform from "@/hooks/useAdminTransform";
import { uploadFile, deleteFile } from "@/utils/fileFunctions";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import CompanyForm from "./CompanyForm";
import { TeamMemberEdit } from "./TeamMemberEdit";
import {
  withImageTransformData,
  withoutImageTransformData,
  getRootStyle,
} from "./services";
import InvestmentRoundTable from "./InvestmentRoundTable";

export const CompanyEdit = () => {
  const formRef = useRef<any>(null);

  const rootStyle = getRootStyle(formRef);

  const { id } = useParams();
  const { data: currentData } = useGetOne("companies", { id });

  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
    });

  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        action="edit"
        title={<ElemTitle category="Company" />}
        transform={transform}
        rootStyle={rootStyle}
      >
        <CompanyForm
          action="edit"
          formRef={formRef}
          currentData={currentData}
          isImageUpdated={isImageUpdated}
          logo={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
        />
      </ElemFormBase>
      <TeamMemberEdit />
      <InvestmentRoundTable />
    </div>
  );
};
