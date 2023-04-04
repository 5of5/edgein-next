import React, { useRef } from "react";
import useAdminTransform from "@/hooks/useAdminTransform";
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
import ElemParentOrganizationEdit from "../ElemParentOrganizationEdit";

export const CompanyEdit = () => {
  const formRef = useRef<any>(null);

  const rootStyle = getRootStyle(formRef);

  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
      hasGeopoint: true,
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
          isImageUpdated={isImageUpdated}
          logo={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
        />
      </ElemFormBase>
      <ElemParentOrganizationEdit type="companies" />
      <TeamMemberEdit />
      <InvestmentRoundTable />
    </div>
  );
};
