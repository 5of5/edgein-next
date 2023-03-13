import React from "react";
import { useParams } from "react-router-dom";
import { useGetOne } from "react-admin";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import EventForm from "./EventForm";
import { transform } from "./services";
import { EventPersonTable } from "./EventPersonTable";
import { EventOrganizationTable } from "./EventOrganizationTable";

export const EventEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne("events", { id });

  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        title={<ElemTitle category="Event" />}
        action="edit"
        transform={transform}
      >
        <EventForm action="edit" currentData={currentData} />
      </ElemFormBase>
      <EventPersonTable />
      <EventOrganizationTable />
    </div>
  );
};
