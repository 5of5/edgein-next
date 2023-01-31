import { eventSizeChoices, status } from "@/utils/constants";
import React, { ReactElement } from "react";
import {
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from "react-admin";

type EventFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
};

const EventForm = ({ action, toolbar }: EventFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput
        className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
      <DateInput className={inputClassName} source="start_date" />
      <DateInput className={inputClassName} source="end_date" />
      <TextInput
        className={inputClassName}
        source="location.address"
        label="Address"
      />
      <TextInput
        className={inputClassName}
        source="location.city"
        label="City"
      />
      <TextInput
        className={inputClassName}
        source="location.state"
        label="State"
      />
      <TextInput
        className={inputClassName}
        source="location.country"
        label="Country"
      />
      <TextInput className={inputClassName} source="link" />
      <TextInput className={inputClassName} source="notes" />
      <ReferenceArrayInput
        label="Companies"
        source="company_ids"
        reference="companies"
      >
        <AutocompleteArrayInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="VC firms"
        source="vc_firm_ids"
        reference="vc_firms"
      >
        <AutocompleteArrayInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Speaker"
        source="speaker_ids"
        reference="people"
      >
        <AutocompleteArrayInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="Organizer"
        source="organizer_ids"
        reference="people"
      >
        <AutocompleteArrayInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceArrayInput>
      <SelectInput
        className={inputClassName}
        source="size"
        choices={eventSizeChoices}
      />
      <ReferenceInput
        label="Parent event"
        source="parent_event_id"
        reference="events"
      >
        <AutocompleteInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
          emptyValue={2}
        />
      </ReferenceInput>
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default EventForm;
