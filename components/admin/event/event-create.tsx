import React from "react";
import { useCreate, useRedirect } from "react-admin";
import ElemToolbar from "../elem-toolbar";
import ElemFormBase from "../elem-form-base";
import useAdminTransform from "@/hooks/use-admin-transform";
import EventForm from "./event-form";
import { withImageTransformData, withoutImageTransformData } from './services';

export const EventCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const { isImageUpdated, logo, transform, onSelect, onDropRejected, onSelectAttachment } =
  useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

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
        isImageUpdated={isImageUpdated}
        banner={logo}
        onSelect={onSelect}
        onDropRejected={onDropRejected}
        onSelectAttachment={onSelectAttachment}
      />
    </ElemFormBase>
  );
};
