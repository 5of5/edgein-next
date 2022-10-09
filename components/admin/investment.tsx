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
  AutocompleteInput,
  Pagination,
  Toolbar,
  useCreate,
  SaveButton,
  useRedirect,
  Button,
  useGetList,
  NumberField,
  NumberInput,
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { status } from "../../utils/constants";
import ContentSave from "@mui/icons-material/Save";

const filters = [
  <ReferenceInput key="searchPeople" source="person_id" reference="people">
    <AutocompleteInput
      style={{padding: 0, border: "none"}}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput
    key="searchRounds"
    source="round_id"
    reference="investment_rounds"
  >
    <AutocompleteInput
      style={{padding: 0, border: "none"}}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput key="searchVCFirm" source="vc_firm_id" reference="vc_firms">
    <AutocompleteInput
      style={{padding: 0, border: "none"}}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
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
    create("investments", { data });
    redirect("/investments");
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

export const InvestmentsList = () => {
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "person_id",
    "round_id",
    "vc_firm_id",
    "status",
  ];
  const { data } = useGetList("investments", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/5" };
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
        <ReferenceField label="Partner" source="person_id" reference="people">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="Round"
          source="round_id"
          reference="investment_rounds"
        >
          <TextField source="round" />
        </ReferenceField>
        <ReferenceField
          label="VC Firm"
          source="vc_firm_id"
          reference="vc_firms"
        >
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="amount" />
        <TextField source="status" />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const InvestmentsTitle = ({ record }: TitleProps) => {
  return <span>Investment {record ? `"${record.name}"` : ""}</span>;
};

export const InvestmentsEdit = () => (
  <Edit
    title={<InvestmentsTitle />}
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
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
        allowEmpty
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Round"
        source="round_id"
        reference="investment_rounds"
        allowEmpty
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText="round"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <ReferenceInput label="VC Firm" source="vc_firm_id" reference="vc_firms" allowEmpty>
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText="name"
          filterToQuery={search => ({ name: search })}
        />
      </ReferenceInput>
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Edit>
);

export const InvestmentsCreate = () => (
  <Create
    title="Add a vc or angel to an Investment Round"
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
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText="name"
          filterToQuery={search => ({ name: search })}
          emptyValue={null}
        />
      </ReferenceInput>
      <ReferenceInput
        label="Round"
        source="round_id"
        reference="investment_rounds"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText={(rec) => `${rec.company.name} ${rec.round}`}
          filterToQuery={search => ({ 'company#name@_ilike': search })}
          emptyValue={null}
        />
      </ReferenceInput>

      <ReferenceInput
        label="VC Firm"
        source="vc_firm_id"
        reference="vc_firms"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          style={{padding: 0, border: "none"}}
          optionText="name"
          filterToQuery={search => ({ name: search })}
          emptyValue={null}
        />
      </ReferenceInput>
      <NumberInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="amount"
      />
      <SelectInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="status"
        choices={status}
      />
    </SimpleForm>
  </Create>
);
