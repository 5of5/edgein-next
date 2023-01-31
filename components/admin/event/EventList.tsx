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
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
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
      <TextField source="start_date" />
      <TextField source="end_date" />
      <FunctionField
        cellClassName="truncate"
        source="location"
        render={(record: any) => getFullAddress(record.location)}
      />
      <TextField source="link" />
      <TextField source="notes" />
      <ReferenceArrayField
        label="Companies"
        source="company_ids"
        reference="companies"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="VC firms"
        source="vc_firm_ids"
        reference="vc_firms"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Speaker"
        source="speaker_ids"
        reference="people"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Organizer"
        source="organizer_ids"
        reference="people"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
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
