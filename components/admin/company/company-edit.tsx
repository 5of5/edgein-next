import React, { useRef } from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import useAdminTransform from "@/hooks/use-admin-transform";
import ElemTitle from "../elem-title";
import ElemFormBase from "../elem-form-base";
import CompanyForm from "./company-form";
import { TeamMemberEdit } from "./team-member-edit";
import {
  withImageTransformData,
  withoutImageTransformData,
  getRootStyle,
} from "./services";
import InvestmentRoundTable from "./investment-round-table";
import ElemParentOrganizationEdit from "../elem-parent-organization-edit";

export const CompanyEdit = () => {
  const formRef = useRef<any>(null);

  const rootStyle = getRootStyle(formRef);

  const { id } = useParams();
  const { data: currentData, isLoading, refetch } = useGetOne("companies", { id });

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
      <ElemParentOrganizationEdit
        isLoading={isLoading}
        type="companies"
        currentData={currentData}
        refetch={refetch}
      />
      <TeamMemberEdit />
      <InvestmentRoundTable />
    </div>
  );
};
