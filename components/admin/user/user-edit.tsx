import React, { useEffect, useRef, useState } from 'react';
import {
  SimpleForm,
  TextInput,
  SelectInput,
  Toolbar,
  SaveButton,
  DeleteButton,
  ArrayInput,
  SimpleFormIterator,
  required,
  useRecordContext,
  useWarnWhenUnsavedChanges,
} from 'react-admin';
import ElemFormBase from '../elem-form-base';
import ElemTitle from '../elem-title';
import UserResetPasswordButton from './UserResetPasswordButton';
import UserResetPasswordTable from './UserResetPasswordTable';
import { IconEmail, IconLinkedIn } from '@/components/icons';
import { useFormContext, useWatch } from 'react-hook-form';
import ElemAddressInput from '../elem-address-input';
import { Place } from '@aws-sdk/client-location';
import ElemLocationTag from '@/components/elem-location-tag';
import { getGeometryPlace } from '@/utils/helpers';
import { isEqual } from 'lodash';

const inputClassName =
  'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

const UserEditToolbar = () => {
  const firstFormValue = useRef<Record<string, any>>();
  const { control } = useFormContext();
  const formValues = useWatch({ control });

  if (!firstFormValue.current) {
    firstFormValue.current = formValues;
  }

  const allowButton =
    !!firstFormValue.current &&
    !isEqual(
      firstFormValue.current?.onboarding_information?.locationTags,
      formValues.onboarding_information.locationTags,
    );

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <SaveButton alwaysEnable={allowButton} label="Save" />
      <div>
        <UserResetPasswordButton />
        <DeleteButton label="Delete" sx={{ marginLeft: 1 }} />
      </div>
    </Toolbar>
  );
};

type CustomPlace = Place & { label?: string };

const UserOnboardingInformation = () => {
  const record = useRecordContext();
  const { setValue } = useFormContext();

  const locationDetails = record.onboarding_information
    ?.locationDetails as CustomPlace[];

  const [locations, setLocations] = useState<CustomPlace[]>(
    locationDetails.filter(value => !!value.label || !!value.Label) || [],
  );

  const handleRemoveTag = (index: number) => {
    const updatedTags = [...locations];
    updatedTags.splice(index, 1);
    setLocations(updatedTags);
  };

  useEffect(() => {
    const locationTags = locations.map(item => item.Label || item.label);
    const locationDetails = locations.map(item => ({
      label: item.Label,
      city: item.Municipality,
      state: item.Region,
      county: item.SubRegion,
      country: item.Country,
      geometry: getGeometryPlace(item),
      categories: item.Categories,
    }));
    setValue('onboarding_information', {
      ...record.onboarding_information,
      locationTags,
      locationDetails,
    });
  }, [locations?.length]);

  return (
    <div className={'w-[49%]'}>
      <ElemAddressInput
        width={'100%'}
        marginBottom={0}
        onFound={place => {
          setLocations(prev => {
            if (place) {
              return [...prev, place];
            } else {
              return prev;
            }
          });
        }}
        filterCategories={['MunicipalityType', 'RegionType']}
      />
      <ElemLocationTag
        styles="mt-0q"
        tags={locations}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
};

const UserRegisteredFrom = () => {
  const record = useRecordContext();
  const isRegisteredViaLinkedin = !record?.auth0_user_pass_id;

  const getRegistrationIcon = () => {
    if (isRegisteredViaLinkedin)
      return (
        <IconLinkedIn
          title="LinkedIn"
          className="h-5 w-5 shrink-0 text-linkedin-blue"
        />
      );

    return (
      <IconEmail
        title="Email/Password"
        className="h-5 w-5 shrink-0 text-gray-600"
      />
    );
  };

  return (
    <div>
      <p className="text-sm text-gray-500 pb-2">Registered via:</p>
      {getRegistrationIcon()}
    </div>
  );
};

export const UserEdit = () => {
  const transform = (data: any) => {
    console.log(data);
    return {
      ...data,
      additional_emails:
        data.additional_emails && data.additional_emails.length > 0
          ? data.additional_emails.map((item: { email: string }) => item.email)
          : data.additional_emails,
    };
  };

  return (
    <div style={{ paddingBottom: '20px' }}>
      <ElemFormBase
        title={<ElemTitle category="Users" />}
        action="edit"
        transform={transform}>
        <SimpleForm toolbar={<UserEditToolbar />}>
          <TextInput className={inputClassName} disabled source="id" />
          <TextInput className={inputClassName} disabled source="email" />
          <TextInput className={inputClassName} source="display_name" />
          <TextInput className={inputClassName} source="person_id" />
          <SelectInput
            className={inputClassName}
            source="role"
            choices={[
              { id: 'admin', name: 'Admin' },
              { id: 'user', name: 'User' },
              { id: 'cms', name: 'CMS' },
              { id: 'cms-readonly', name: 'CMS Readonly' },
            ]}
            validate={required()}
          />
          <SelectInput
            className={inputClassName}
            source="active"
            choices={[
              { id: true, name: 'Active' },
              { id: false, name: 'Inactive' },
            ]}
            validate={required()}
          />
          <UserOnboardingInformation />
          <ArrayInput source="additional_emails">
            <SimpleFormIterator
              disableReordering
              sx={{ margin: 2, paddingTop: 1 }}>
              <TextInput className={inputClassName} source="email" />
            </SimpleFormIterator>
          </ArrayInput>
          <UserRegisteredFrom />
        </SimpleForm>
      </ElemFormBase>
      <UserResetPasswordTable />
    </div>
  );
};
