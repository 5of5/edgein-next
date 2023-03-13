import { eventSizeChoices, eventTypeChoices, status } from "@/utils/constants";
import React, { ReactElement } from "react";
import {
  SimpleForm,
  TextInput,
  DateInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  AutocompleteArrayInput,
} from "react-admin";
import ElemAddressInput from "../ElemAddressInput";

type EventFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  currentData?: any;
};

const EventForm = ({ action, toolbar, currentData }: EventFormProps) => {
  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <SimpleForm toolbar={toolbar}>
      {action === "edit" && (
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          disabled
          source="id"
        />
      )}
      <TextInput
        className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
      />
      <DateInput className={inputClassName} source="start_date" />
      <DateInput className={inputClassName} source="end_date" />
      <AutocompleteArrayInput
        className={inputClassName}
        source="types"
        choices={eventTypeChoices}
        style={{ padding: 0, border: "none" }}
      />
      <ElemAddressInput
        defaultLocation={currentData?.location}
        defaultGeoPoint={currentData?.geopoint}
      />
      <TextInput
        className={inputClassName}
        source="location_json.address"
        label="Address"
      />
      <TextInput
        className={inputClassName}
        source="location_json.city"
        label="City"
      />
      <TextInput
        className={inputClassName}
        source="location_json.state"
        label="State"
      />
      <TextInput
        className={inputClassName}
        source="location_json.country"
        label="Country"
      />
      <TextInput
        className={inputClassName}
        source="geopoint"
        format={(value) =>
          value?.coordinates
            ? `{Latitude: ${value.coordinates[1]}, Longitude: ${value.coordinates[0]}}`
            : ""
        }
        label="Geopoint"
        disabled
      />
      <TextInput className={inputClassName} source="link" />
      <TextInput className={inputClassName} source="notes" />
      <SelectInput
        className={inputClassName}
        source="size"
        choices={eventSizeChoices}
      />
      <NumberInput className={inputClassName} source="price" />
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
