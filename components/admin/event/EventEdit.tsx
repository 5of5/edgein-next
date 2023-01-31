import React from "react";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import EventForm from "./EventForm";
import { transform } from "./services";

export const EventEdit = () => {
  return (
    <ElemFormBase title={<ElemTitle category="Event" />} action="edit" transform={transform}>
      <EventForm action="edit" />
    </ElemFormBase>
  );
};
