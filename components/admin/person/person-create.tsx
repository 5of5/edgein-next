import React from "react";
import { useCreate, useRedirect } from "react-admin";
import useAdminTransform from "@/hooks/use-admin-transform";
import ElemFormBase from "../elem-form-base";
import ElemToolbar from "../elem-toolbar";
import PersonForm from "./person-form";
import { withImageTransformData, withoutImageTransformData } from "./services";

export const PersonCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
    });

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("people", { data });
    redirect("/people");
  };

  return (
    <ElemFormBase title="Create a Person" action="create" transform={transform}>
      <PersonForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
        isImageUpdated={isImageUpdated}
        logo={logo}
        onSelect={onSelect}
        onDropRejected={onDropRejected}
      />
    </ElemFormBase>
  );
};
