import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../elem-toolbar";
import ElemFormBase from "../elem-form-base";
import EventForm from "./event-form";
import { transform } from "./services";

export const EventCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("events", { data });
    redirect("/events");
  };

  return (
    <ElemFormBase title="Create a event" action="create" transform={transform}>
      <EventForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemFormBase>
  );
};
