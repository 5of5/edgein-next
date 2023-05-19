import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemFormBase from "../elem-form-base";
import ElemToolbar from "../elem-toolbar";
import TeamMemberForm from "./team-member-form";

export const TeamMemberCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("team_members", { data });
    redirect("/team_members");
  };
  return (
    <ElemFormBase title="Add a person to a company" action="create">
      <TeamMemberForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />} />
    </ElemFormBase>
  );
};
