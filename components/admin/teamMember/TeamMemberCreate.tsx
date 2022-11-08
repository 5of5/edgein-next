import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemMutationBase from "../ElemMutationBase";
import ElemToolbar from "../ElemToolbar";
import TeamMemberForm from "./TeamMemberForm";

export const TeamMemberCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("team_members", { data });
    redirect("/team_members");
  };
  return (
    <ElemMutationBase title="Add a person to a company" action="create">
      <TeamMemberForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemMutationBase>
  );
};
