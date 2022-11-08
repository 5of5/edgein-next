import React from "react";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemMutationBase from "../ElemMutationBase";
import ElemTitle from "../ElemTitle";
import PersonForm from "./PersonForm";
import { withImageTransformData, withoutImageTransformData } from "./services";

export const PersonEdit = () => {
  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  return (
    <ElemMutationBase
      title={<ElemTitle category="Person" />}
      action="edit"
      transform={transform}
    >
      <PersonForm action="edit" />
    </ElemMutationBase>
  );
};
