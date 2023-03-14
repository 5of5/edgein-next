import React from "react";
import { useParams } from "react-router-dom";
import { useGetOne } from "react-admin";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemTitle from "../ElemTitle";
import ElemFormBase from "../ElemFormBase";
import EventForm from "./EventForm";
import { withImageTransformData, withoutImageTransformData } from "./services";
import { EventPersonTable } from "./EventPersonTable";
import { EventOrganizationTable } from "./EventOrganizationTable";

export const EventEdit = () => {
  const { id } = useParams();
  const { data: currentData } = useGetOne("events", { id });

  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
    });

  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        title={<ElemTitle category="Event" />}
        action="edit"
        transform={transform}
      >
        <EventForm
          action="edit"
          currentData={currentData}
          isImageUpdated={isImageUpdated}
          banner={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
        />
      </ElemFormBase>
      <EventPersonTable />
      <EventOrganizationTable />
    </div>
  );
};
