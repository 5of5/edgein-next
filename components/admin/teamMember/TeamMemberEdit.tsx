import React from "react";
import ElemFormBase from "../ElemFormBase";
import TeamMemberForm from "./TeamMemberForm";

export const TeamMemberEdit = () => {
  return (
    <ElemFormBase title="Add a person to a company" action="edit">
      <TeamMemberForm />
    </ElemFormBase>
  );
};
