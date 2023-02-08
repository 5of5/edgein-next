import React from "react";
import ElemTitle from "../elem-title";
import ElemFormBase from "../elem-form-base";
import EventForm from "./event-form";
import { transform } from "./services";
import { EventPersonTable } from "./event-person-table";
import { EventOrganizationTable } from "./event-organization-table";

export const EventEdit = () => {
  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        title={<ElemTitle category="Event" />}
        action="edit"
        transform={transform}
      >
        <EventForm action="edit" />
      </ElemFormBase>
      <EventPersonTable />
      <EventOrganizationTable />
    </div>
  );
};
