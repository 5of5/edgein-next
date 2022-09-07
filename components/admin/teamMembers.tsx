// in posts.js
import * as React from "react";
import {
  SearchInput,
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
  AutocompleteInput,
  Pagination,
  useCreate,
  useRedirect,
  Toolbar,
  SaveButton,
  Button
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { functionChoicesTM, seniorityChoicesTM } from "../../utils/constants";
import ContentSave from '@mui/icons-material/Save';

const filters = [
  <TextInput key="search" source="function,seniority,title" label="Search in Function,Seniority,Title" resettable alwaysOn />,
  <ReferenceInput key="searchCompany" source="company_id" reference="companies">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>,
  <ReferenceInput key="searchPerson" source="person_id" reference="people">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>
];

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

const CustomToolbar = () => {
  const form = useFormContext();
  const [create] = useCreate();
  const redirect = useRedirect()

  const handleSaveDraft = () => {
    let data = form.getValues()
    data.status = 'draft'
    create('team_members', { data })
    redirect('/team_members')
  }

  return (
    <Toolbar>
      <SaveButton />
      <Button
        label="Save As Draft"
        sx={{ marginLeft: '1rem', padding: '6px 16px', fontSize: '0.9rem', }}
        variant="outlined"
        onClick={handleSaveDraft}
        startIcon={<ContentSave />}
      />
    </Toolbar>
  );
};

export const TeamMembersList = () => (
  <List filters={filters}
    pagination={<PostPagination />}
    sx={{
      '.css-1d00q76-MuiToolbar-root-RaListToolbar-root': {
        justifyContent: 'flex-start'
      }
    }}
  >
    <Datagrid>
      <EditButton />
      <ReferenceField label="Company" source="company_id" reference="companies">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Perons" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>
      <SelectField
        source="function"
        choices={functionChoicesTM}
      />
      <DateField source="start_date" />
      <DateField source="end_date" />
      <BooleanField source="founder" />
      <SelectField
        source="seniority"
        choices={seniorityChoicesTM}
      />
      <TextField source="title" />
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
  <Edit title={<TeamMembersTitle />}
    sx={{
      '.MuiCardContent-root': {
        '& > div': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row !important',
        },
      },
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={functionChoicesTM}
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={seniorityChoicesTM}
      />
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
      <BooleanInput
        className="w-full"
        source="founder"
      />
    </SimpleForm>
  </Edit>
);

export const TeamMembersCreate = () => (
  <Create title="Add a person to a company"
    sx={{
      '.MuiCardContent-root': {
        '& > div': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'row !important',
        },
      },
      '.MuiFormHelperText-root': {
        display: 'none',
      }
    }}
  >
    <SimpleForm toolbar={<CustomToolbar />}>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={functionChoicesTM}
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={seniorityChoicesTM}
      />
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
      <BooleanInput
        className="w-full"
        source="founder"
      />
    </SimpleForm>
  </Create>
);
