import React from "react";
import ElemFormBase from "../elem-form-base";
import TeamMemberForm from "./team-member-form";

export const TeamMemberEdit = () => {
  return (
    <ElemFormBase title="Add a person to a company" action="edit">
      <TeamMemberForm />
    </ElemFormBase>
  );
};
