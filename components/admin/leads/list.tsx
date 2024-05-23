import React from 'react';
import { ReferenceField, TextField, EditButton, DateField } from 'react-admin';
import ElemList from '../elem-list';

export const LeadList = () => {
  return (
    <ElemList>
      <EditButton />
      <TextField source="id" />
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="linkedin_url" />
      <TextField source="company_name" />
      <TextField source="website" />
      <TextField source="source" />
      <TextField source="campaign_id" />
      <TextField source="instantly_id" />
      <TextField source="email_domain" />
      <TextField source="company_name" />
      <ReferenceField
        label="Converted user"
        source="converted_userid"
        reference="users">
        <TextField source="display_name" />
      </ReferenceField>
      <DateField source="created_at" showTime />
      <TextField source="status" />
    </ElemList>
  );
};
