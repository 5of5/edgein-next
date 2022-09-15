// in posts.js
import React, { useState } from "react";
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
  SaveButton,
  useCreate,
  Button,
  useRedirect,
  useGetList,
} from "react-admin";

import ContentSave from "@mui/icons-material/Save";
import { useFormContext } from "react-hook-form";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

const filters = [
  <TextInput
    key="search"
    source="name,ticker"
    label="Search Name, Ticker"
    resettable
    alwaysOn
  />,
  <ReferenceInput
    key="searchBlockchain"
    source="blockchain_id"
    reference="blockchains"
  >
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
    create("coins", { data });
    redirect("/coins");
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

export const CoinsList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = ["id", "name", "ticker", "blockchain_id"];
  const { data } = useGetList("coins", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/4" };
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
        <TextField source="name" />
        <TextField source="ticker" />
        <ReferenceField
          label="Blockchain"
          source="blockchain_id"
          reference="blockchains"
        >
          <TextField source="name" />
        </ReferenceField>
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const CoinsTitle = ({ record }: TitleProps) => {
  return <span>Coin {record ? `"${record.name}"` : ""}</span>;
};

export const CoinsEdit = () => {
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <Edit
      title={<CoinsTitle />}
      sx={{
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".MuiPaper-root": {
          position: "relative",
        },
      }}
    >
      <SimpleForm>
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          disabled
          source="id"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          onChange={handleIcon}
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        {isIcon && (
          <>
            <RenderGoogleIcon
              topPos="135px"
              leftPos="2%"
              googleKeyWord={keyword}
            />
            <RenderLinkedinIcon
              topPos="135px"
              leftPos="5%"
              googleKeyWord={keyword}
            />
            <RenderGitHubIcon
              topPos="135px"
              leftPos="8%"
              googleKeyWord={keyword}
            />
            <RenderCBIcon
              topPos="135px"
              leftPos="11%"
              googleKeyWord={keyword}
            />
          </>
        )}
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="ticker"
        />
        <ReferenceInput
          label="Blockchain"
          source="blockchain_id"
          reference="blockchains"
        >
          <SelectInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export const CoinsCreate = () => {
  const [isIcon, setIsIcon] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };
  return (
    <Create
      title="Create a Coin"
      sx={{
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".MuiPaper-root": {
          position: "relative",
        },
      }}
    >
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          onChange={handleIcon}
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        {isIcon && (
          <>
            <RenderGoogleIcon
              topPos="75px"
              leftPos="2%"
              googleKeyWord={keyword}
            />
            <RenderLinkedinIcon
              topPos="75px"
              leftPos="5%"
              googleKeyWord={keyword}
            />
            <RenderGitHubIcon
              topPos="75px"
              leftPos="8%"
              googleKeyWord={keyword}
            />
            <RenderCBIcon topPos="75px" leftPos="11%" googleKeyWord={keyword} />
          </>
        )}
        <TextInput
          className="w-full mt-5 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="ticker"
        />
        <ReferenceInput
          label="Blockchain"
          source="blockchain_id"
          reference="blockchains"
        >
          <SelectInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
