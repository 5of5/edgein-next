import React from "react";
import { useCreate, useRedirect } from "react-admin";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemMutationBase from "../ElemMutationBase";
import ElemToolbar from "../ElemToolbar";
import PersonForm from "./PersonForm";
import { withImageTransformData, withoutImageTransformData } from "./services";

export const PersonCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("people", { data });
    redirect("/people");
  };

  return (
    <ElemMutationBase
      title="Create a Person"
      action="create"
      transform={transform}
    >
      <PersonForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemMutationBase>
  );
};
