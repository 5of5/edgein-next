import { eventSizeChoices } from "@/utils/constants";
import { getFullAddress } from "@/utils/helpers";
import React from "react";
import {
  TextField,
  EditButton,
  TextInput,
  FunctionField,
  ReferenceField,
  SelectField,
} from "react-admin";
import ElemList from "../elem-list";

const filters = [
  <TextInput
    key="search"
    source="name"
    label="Search Name"
    resettable
    alwaysOn
  />,
];

export const EventList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="start_date" />
      <TextField source="end_date" />
      <FunctionField
        cellClassName="truncate"
        source="location"
        render={(record: any) => getFullAddress(record.location)}
      />
      <TextField source="link" />
      <TextField source="notes" />
      <SelectField source="size" choices={eventSizeChoices} />
      <ReferenceField
        label="Parent event"
        source="parent_event_id"
        reference="events"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="status" />
    </ElemList>
  );
};
