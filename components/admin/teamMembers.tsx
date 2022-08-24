// in posts.js
import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  DateField,
  SelectField,
  DateInput,
  BooleanInput,
  BooleanField,
} from "react-admin";
import uniqid from "uniqid"

export const TeamMembersList = () => (
  <List>
    <Datagrid>
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Perons" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <SelectField
        source="function"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <DateField source="start_date" />
      <DateField source="end_date" />
	  <BooleanField source="founder"/>
      <SelectField
        source="seniority"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const TeamMembersTitle = ({ record }: TitleProps) => {
  return <span>Member {record ? `"${record.name}"` : ""}</span>;
};

export const TeamMembersEdit = () => (
  <Edit title={<TeamMembersTitle />}>
    <SimpleForm>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="function"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
	  <BooleanInput source="founder"/>
      <SelectInput
        source="seniority"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <TextInput source="title" />
    </SimpleForm>
  </Edit>
);

export const TeamMembersCreate = () => (
  <Create title="Add a person to a company">
    <SimpleForm defaultValues={{ external_id: uniqid() }} >
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <SelectInput
        source="function"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <DateInput source="start_date" />
      <DateInput source="end_date" />
     <BooleanInput source="founder"/>
      <SelectInput
        source="seniority"
        choices={[
          {
            id: "Seed",
            name: "Seed",
          },
          {
            id: "Series A",
            name: "Series A",
          },
        ]}
      />
      <TextInput source="title" />
    </SimpleForm>
  </Create>
);
