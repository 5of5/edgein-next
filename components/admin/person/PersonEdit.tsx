import React from "react";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import PersonForm from "./PersonForm";
import { withImageTransformData, withoutImageTransformData } from "./services";
import { TeamMemberEdit } from "./TeamMemberEdit";

export const PersonEdit = () => {
  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  return (
    <>
      <ElemFormBase
        title={<ElemTitle category="Person" />}
        action="edit"
        transform={transform}
      >
        <PersonForm action="edit" />
      </ElemFormBase>
      <TeamMemberEdit />
    </>
  );
};
