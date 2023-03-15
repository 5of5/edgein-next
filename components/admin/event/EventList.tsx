import { eventSizeChoices, eventTypeChoices } from "@/utils/constants";
import { getFullAddress } from "@/utils/helpers";
import React from "react";
import {
  TextField,
  EditButton,
  TextInput,
  FunctionField,
  ReferenceField,
  SelectField,
  NumberField,
  ImageField,
} from "react-admin";
import ElemList from "../ElemList";

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
      <TextField source="slug" />
      <ImageField className="logoFile" source="banner.url" label="Banner" />
      <TextField source="start_date" />
      <TextField source="end_date" />
      <SelectField source="types" choices={eventTypeChoices} />
      <FunctionField
        cellClassName="truncate"
        source="location_json"
        render={(record: any) => getFullAddress(record.location_json)}
      />
      <TextField source="link" />
      <TextField source="notes" />
      <SelectField source="size" choices={eventSizeChoices} />
      <NumberField source="price" />
      <ReferenceField
        label="Parent event"
        source="parent_event_id"
        reference="events"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="twitter" />
      <TextField source="facebook" />
      <TextField source="instagram" />
      <TextField source="discord" />
      <TextField source="telegram" />
      <TextField source="status" />
    </ElemList>
  );
};
