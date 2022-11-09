import React from "react";
import ElemMutationBase from "../ElemMutationBase";
import TeamMemberForm from "./TeamMemberForm";

export const TeamMemberEdit = () => {
  return (
    <ElemMutationBase title="Add a person to a company" action="edit">
      <TeamMemberForm />
    </ElemMutationBase>
  );
};
