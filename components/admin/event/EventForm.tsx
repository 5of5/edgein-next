import useAdminHandleSlug from "@/hooks/useAdminHandleSlug";
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
  FormDataConsumer,
  FileInput,
  ImageField,
  required,
  useGetList,
} from "react-admin";
import ElemAddressInput from "../ElemAddressInput";
import ElemSlugInput from "../ElemSlugInput";

type EventFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  currentData?: any;
  isImageUpdated: boolean;
  banner: any;
  onSelect: (files: any) => void;
  onDropRejected: (files: any) => void;
};

const EventForm = ({
  action,
  toolbar,
  currentData, 
  isImageUpdated,
  banner,
  onSelect,
  onDropRejected,
}: EventFormProps) => {
  const { data: events } = useGetList("events", {});

  const { slug, onGenerateSlug } = useAdminHandleSlug(events);

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
      <FormDataConsumer>
        {({ formData, ...rest }) => (
            <TextInput
            className={inputClassName}
            source="name"
            onBlur={(e) => onGenerateSlug(e.target.value, formData)}
            {...rest}
          />
        )}
      </FormDataConsumer>
      <ElemSlugInput slug={slug} validate={required()} />
      <FileInput
        className="w-full"
        onRemove={onDropRejected}
        options={{ onDrop: onSelect }}
        source="banner"
        label="Banner"
        accept="image/*"
        placeholder={<p>Drop your file here</p>}
      >
        <ImageField source="src" title="title" />
      </FileInput>
      {action === "edit" && !banner && !isImageUpdated && (
        <ImageField className="w-full" source="banner.url" title="Banner" />
      )}
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
      <TextInput
        className={inputClassName}
        source="twitter"
        label="Twitter"
      />
      <TextInput
        className={inputClassName}
        source="facebook"
        label="Facebook"
      />
      <TextInput
        className={inputClassName}
        source="instagram"
        label="Instagram"
      />
      <TextInput
        className={inputClassName}
        source="discord"
        label="Discord"
      />
      <TextInput
        className={inputClassName}
        source="telegram"
        label="Telegram"
      />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default EventForm;
