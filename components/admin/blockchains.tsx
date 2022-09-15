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
  Pagination,
  Toolbar,
  useCreate,
  SaveButton,
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
    source="name"
    label="Search Name"
    resettable
    alwaysOn
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
    create("blockchains", { data });
    redirect("/blockchains");
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

export const BlockchainsList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = ["id", "name"];
  const { data } = useGetList("blockchains", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/2" };
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
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const BlockchainsTitle = ({ record }: TitleProps) => {
  return <span>Blockchain {record ? `"${record.name}"` : ""}</span>;
};

export const BlockchainsEdit = () => {
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <Edit
      title={<BlockchainsTitle />}
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
      </SimpleForm>
    </Edit>
  );
};

export const BlockchainsCreate = () => {
  const [isIcon, setIsIcon] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };
  return (
    <Create
      title="Create a Blockchain"
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
      </SimpleForm>
    </Create>
  );
};
