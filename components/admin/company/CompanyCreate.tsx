import React, { useRef } from "react";
import { useCreate, useRedirect } from "react-admin";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemToolbar from "../ElemToolbar";
import ElemMutationBase from "../ElemMutationBase";
import CompanyForm from "./CompanyForm";
import {
  getRootStyle,
  withImageTransformData,
  withoutImageTransformData,
} from "./services";

export const CompanyCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const formRef = useRef<any>(null);

  const rootStyle = getRootStyle(formRef);

  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("companies", { data });
    redirect("/companies");
  };

  return (
    <ElemMutationBase
      action="create"
      title="Create a Company"
      transform={transform}
      rootStyle={rootStyle}
    >
      <CompanyForm
        action="create"
        formRef={formRef}
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemMutationBase>
  );
};
