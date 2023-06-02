import useAdminHandleSlug from '@/hooks/use-admin-handle-slug';
import { getTimeString } from '@/utils';
import {
  eventSizeChoices,
  eventTypeChoices,
  status,
  timezoneChoices,
  libraryChoices,
} from '@/utils/constants';
import moment from 'moment-timezone';
import React, { ReactElement } from 'react';
import {
  SimpleForm,
  TextInput,
  DateInput,
  TimeInput,
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  AutocompleteArrayInput,
  SelectArrayInput,
  FormDataConsumer,
  FileInput,
  BooleanInput,
  ArrayInput,
  SimpleFormIterator,
  ImageField,
  required,
  useGetList,
  FileField,
} from 'react-admin';
import ElemAddressInput from '../elem-address-input';
import ElemSlugInput from '../elem-slug-input';

type EventFormProps = {
  action: 'create' | 'edit';
  toolbar?: ReactElement | false;
  currentData?: any;
  isImageUpdated: boolean;
  banner: any;
  onSelect: (files: any) => void;
  onDropRejected: (files: any) => void;
  onSelectAttachment: (files: any) => void;
};

const EventForm = ({
  action,
  toolbar,
  currentData,
  isImageUpdated,
  banner,
  onSelect,
  onDropRejected,
  onSelectAttachment,
}: EventFormProps) => {
  const { data: events } = useGetList('events', {});

  const { slug, onGenerateSlug } = useAdminHandleSlug(events);

  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <SimpleForm toolbar={toolbar}>
      {action === 'edit' && (
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
            onBlur={e => onGenerateSlug(e.target.value, formData)}
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
      {action === 'edit' && !banner && !isImageUpdated && (
        <ImageField className="w-full" source="banner.url" title="Banner" />
      )}
      <DateInput className={inputClassName} source="start_date" />
      <TimeInput
        className={inputClassName}
        source="start_time"
        format={v => (moment(v).isValid() ? getTimeString(v) : v)}
        parse={v => (moment(v).isValid() ? getTimeString(v) : v)}
      />
      <DateInput className={inputClassName} source="end_date" />
      <TimeInput
        className={inputClassName}
        source="end_time"
        format={v => (moment(v).isValid() ? getTimeString(v) : v)}
        parse={v => (moment(v).isValid() ? getTimeString(v) : v)}
      />
      <AutocompleteInput
        className={inputClassName}
        source="timezone"
        defaultValue="America/Los_Angeles"
        choices={timezoneChoices}
        style={{ padding: 0, border: 'none' }}
      />
      <AutocompleteArrayInput
        className={inputClassName}
        source="types"
        choices={eventTypeChoices}
        style={{ padding: 0, border: 'none' }}
      />
      <ElemAddressInput
        defaultLocation={currentData?.location}
        defaultGeoPoint={currentData?.geopoint}
      />
      <TextInput
        className={inputClassName}
        source="venue_name"
        label="Venue name"
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
        format={value =>
          value?.coordinates
            ? `{Latitude: ${value.coordinates[1]}, Longitude: ${value.coordinates[0]}}`
            : ''
        }
        label="Geopoint"
        disabled
      />
      <TextInput className={inputClassName} source="overview" multiline />
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
          style={{ padding: 0, border: 'none' }}
          optionText="name"
          filterToQuery={search => ({ name: search })}
          emptyValue={2}
        />
      </ReferenceInput>
      <TextInput className={inputClassName} source="twitter" label="Twitter" />
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
      <TextInput className={inputClassName} source="discord" label="Discord" />
      <TextInput
        className={inputClassName}
        source="telegram"
        label="Telegram"
      />
      <BooleanInput className="w-full" label="Featured" source="is_featured" />
      <SelectArrayInput
        className={inputClassName}
        source="library"
        choices={libraryChoices}
        defaultValue={['Web3']}
      />
      <ArrayInput source="attachments" className={inputClassName}>
        <SimpleFormIterator disableReordering sx={{ margin: 2, paddingTop: 1 }}>
          <TextInput className={inputClassName} source="label" />
          <FileInput
            className="w-full"
            options={{ onDrop: onSelectAttachment }}
            source="file"
            label="File"
            placeholder={<p>Drop your file here</p>}
          >
            <FileField source="src" title="title" />
          </FileInput>
          {action === 'edit' && <FileField source="url" title="Attachment" />}
        </SimpleFormIterator>
      </ArrayInput>
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </SimpleForm>
  );
};

export default EventForm;
