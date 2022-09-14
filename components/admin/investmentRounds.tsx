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
  DateInput,
  SelectField,
  NumberInput,
  DateField,
  NumberField,
  AutocompleteInput,
  Pagination,
  Toolbar,
  useCreate,
  SaveButton,
  useRedirect,
  Button,
  useGetList,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { roundChoices, currencyChoices, status } from "../../utils/constants";
import ContentSave from "@mui/icons-material/Save";

const filters = [
  <TextInput
    key="search"
    type="text"
    source="round"
    label="Search in Round"
    resettable
    alwaysOn
  />,
  <TextInput
    key="searchNumbers"
    type="number"
    source="valuation,amount"
    label="Valuation, Amount"
    resettable
  />,
  <ReferenceInput key="searchCompany" source="company_id" reference="companies">
    <AutocompleteInput optionText={(choice) => `${choice.name}`} />
  </ReferenceInput>,
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
    create("investment_rounds", { data });
    redirect("/investment_rounds");
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

export const InvestmentRoundsList = () => {
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "company_id",
    "round_date",
    "round",
    "amount",
    "currency",
    "valuation",
    "status",
  ];
  const { data } = useGetList("investment_rounds", {
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
        data={renderData}
        sort={customSort}
        setSort={(value) => setCustomSort(value)}
      >
        <EditButton />
        <TextField source="id" />
        <ReferenceField
          label="Company"
          source="company_id"
          reference="companies"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField source="round_date" />
        <TextField source="round" />
        <NumberField source="amount" />
        <SelectField source="currency" choices={currencyChoices} />
        <NumberField source="valuation" />
        <TextField source="status" />
        <TextField source="counter" />
      </Datagrid>
    </List>
  );
};

interface InvestmentRoundsTitleProps {
  record?: Record<string, string>;
}

const InvestmentRoundsTitle = ({ record }: InvestmentRoundsTitleProps) => {
  return <span>Round {record ? `"${record.name}"` : ""}</span>;
};

export const InvestmentRoundsEdit = () => (
  <Edit
    title={<InvestmentRoundsTitle />}
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
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round_date"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round"
        choices={roundChoices}
      />
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="currency"
        choices={currencyChoices}
      />
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="valuation"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Edit>
);

export const InvestmentRoundsCreate = () => (
  <Create
    title="Create a Investment Round"
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
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <SelectInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <DateInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round_date"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="round"
        choices={roundChoices}
      />
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="currency"
        choices={currencyChoices}
      />
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="valuation"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Create>
);
