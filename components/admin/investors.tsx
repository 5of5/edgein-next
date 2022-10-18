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
  AutocompleteInput,
  Pagination,
  useCreate,
  useRedirect,
  Toolbar,
  SaveButton,
  Button,
  useGetList,
  required,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import {
  investorFunctionChoices,
  investorSeniorityChoices,
} from "../../utils/constants";
import ContentSave from "@mui/icons-material/Save";

const filters = [
  <TextInput key="search" source="title" label="Title" resettable alwaysOn />,
  <ReferenceInput key="searchVCFirm" source="vc_firm_id" reference="vc_firms" validate={required()}>
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput key="searchPerson" source="person_id" reference="people" validate={required()}>
    <AutocompleteInput
      optionText={(choice) => `${choice.name}`}
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="function"
    source="function"
    label="Function"
    choices={investorFunctionChoices}
  />,
  <SelectInput
    key="seniority"
    source="seniority"
    label="Seniority"
    choices={investorSeniorityChoices}
  />,
];

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

const CustomToolbar = () => {
  const form = useFormContext();
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = () => {
    let data = form.getValues();
    data.status = "draft";
    create("investors", { data });
    redirect("/investors");
  };

  return (
    <Toolbar>
      <SaveButton />
      <Button
        label="Save As Draft"
        sx={{ marginLeft: "1rem", padding: "6px 16px", fontSize: "0.9rem" }}
        variant="outlined"
        onClick={handleSaveDraft}
        startIcon={<ContentSave />}
      />
    </Toolbar>
  );
};

export const InvestorsList = () => {
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "vc_firm_id",
    "person_id",
    "function",
    "start_date",
    "end_date",
    "seniority",
    "title",
  ];
  const { data } = useGetList("investors", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/8" };
  });

  const sortWithData = (sortData: any) => {
    const isAscending = customSort.order === "ASC";
    if (isAscending) {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? 1 : -1
      );
    } else {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? -1 : 1
      );
    }
    return sortData;
  };
  renderData = renderData && sortWithData(renderData);

  return (
    <List
      filters={filters}
      pagination={<PostPagination />}
      sx={{
        ".MuiToolbar-root": {
          justifyContent: "start !important",
          paddingTop: 0,
          marginBottom: "4px",
        },
        ".RaBulkActionsToolbar-toolbar": {
          justifyContent: "start !important",
        },
        ".MuiToolbar-root .MuiButtonBase-root": {
          paddingTop: 0,
          paddingBottom: 0,
          margin: "4px",
        },
        ".RaBulkActionsToolbar-topToolbar": {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        ".MuiToolbar-root form": {
          flex: "0 1 auto",
        },
        ".MuiToolbar-root form .MuiFormControl-root": {
          margin: 0,
        },
      }}
    >
      <Datagrid
      // data={renderData}
      // sort={customSort}
      // setSort={(value) => setCustomSort(value)}
      >
        <EditButton />
        <TextField source="id" />
        <ReferenceField
          label="VC Firm"
          source="vc_firm_id"
          reference="vc_firms"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Person" source="person_id" reference="people">
          <TextField source="name" />
        </ReferenceField>
        <SelectField source="function" choices={investorFunctionChoices} />
        <DateField source="start_date" />
        <DateField source="end_date" />
        {/* <TextField source="founder" /> */}
        <SelectField source="seniority" choices={investorSeniorityChoices} />
        <TextField source="title" />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const InvestorsTitle = ({ record }: TitleProps) => {
  return <span>VC {record ? `"${record.name}"` : ""}</span>;
};

export const InvestorsEdit = () => (
  <Edit
    title={<InvestorsTitle />}
    sx={{
      ".MuiCardContent-root": {
        "& > div": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row !important",
        },
      },
      ".MuiFormHelperText-root": {
        display: "none",
      },
    }}
  >
    <SimpleForm>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <AutocompleteInput
          style={{padding: 0, border: "none"}}
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <AutocompleteInput
          style={{padding: 0, border: "none"}}
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={investorFunctionChoices}
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      {/* <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="founder"
      /> */}
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
    </SimpleForm>
  </Edit>
);

export const InvestorCreate = () => (
  <Create
    title="Add an investor to a VC firm"
    sx={{
      ".MuiCardContent-root": {
        "& > div": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row !important",
        },
      },
      ".MuiFormHelperText-root": {
        display: "none",
      },
    }}
  >
    <SimpleForm toolbar={<CustomToolbar />}>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <AutocompleteInput
          style={{padding: 0, border: "none"}}
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput label="Person" source="person_id" reference="people">
        <AutocompleteInput
          style={{padding: 0, border: "none"}}
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="function"
        choices={investorFunctionChoices}
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="start_date"
      />
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="end_date"
      />
      {/* <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="founder"
      /> */}
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="seniority"
        choices={investorSeniorityChoices}
      />
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="title"
      />
    </SimpleForm>
  </Create>
);
