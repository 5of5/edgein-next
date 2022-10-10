import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  DateField,
  FunctionField,
  AutocompleteArrayInput,
  AutocompleteInput,
  FileInput,
  ImageField,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  SelectField,
  ReferenceField,
  NumberField,
  ReferenceInput,
  SelectInput,
  NumberInput,
  useGetList,
  FormDataConsumer,
  Pagination,
  useCreate,
  useRedirect,
  Toolbar,
  SaveButton,
  useGetOne,
  useGetManyReference,
  Link
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import { roundChoices, currencyChoices } from "../../../utils/constants";
import BookIcon from "@mui/icons-material/Book";
import { uploadFile, deleteFile } from "../../../utils/fileFunctions";
import {
  companyLayerChoices,
  validateNameAndSlugAndEmailAndDomain,
  status,
  tags,
} from "../../../utils/constants";
import { random } from "lodash";


const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,website,velocity_linkedin,twitter,discord,glassdoor,year_founded"
    label="Name,Year Founded,Github,Website,Linkedin,Twitter,Discord,Glassdoor"
    resettable
    alwaysOn
  />,
  <ReferenceInput key="searchCoins" source="coin_id" reference="coins">
    <AutocompleteInput
      style={{padding: 0, border: "none"}}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="layer"
    source="layer"
    label="Layer"
    choices={companyLayerChoices}
  />,
];

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

export const CompanyList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = [
    "id",
    "name",
    "slug",
    "logo",
    "layer",
    "layer_detail",
    "coin_id",
    "total_employees",
    "github",
    "notes",
    "overview",
    "website",
    "careers_page",
    "company_linkedin",
    "year_founded",
    "investor_amount",
    "total_valuation",
    "white_paper",
    "market_verified",
    "velocity_linkedin",
    "velocity_token",
    "status",
    "aliases",
    "twitter",
    "location",
    "discord",
    "glassdoor",
    "tags",
  ];

  const { data: companies } = useGetList("companies", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = companies?.map((v) => {
    let sum = 0;
    for (var index in v) {
      if (index !== "tags") v[index] && headers.includes(index) ? sum++ : sum;
      else
        v[index] && headers.includes(index) && v[index].length > 0
          ? sum++
          : sum;
    }
    return { ...v, counter: sum + "/28" };
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
        <FunctionField render= {(record: any) => (<a target={"_blank"} rel="noreferrer" href={`https://edgein.io/companies/${record.slug}`}><Button label="Preview" /></a>)} />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <ImageField className="logoFile" source="logo.url" label="Logo" />
        <SelectField source="layer" choices={companyLayerChoices} />
        <TextField source="layer_detail" />
        <ReferenceField label="Coin" source="coin_id" reference="coins">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="total_employees" />
        <TextField source="github" />
        {/* <TextField cellClassName=" truncate h-5%" source="notes" /> */}
        <FunctionField
          cellClassName="truncate"
          source="notes"
          render={(record: any) =>
            record.notes && record.notes.length > 25
              ? `${record.notes.substring(0, 20)}...`
              : record.notes
          }
        />
        {/* <TextField cellClassName=" truncate h-5%" source="overview" /> */}
        <FunctionField
          cellClassName="truncate"
          source="overview"
          render={(record: any) =>
            record.overview && record.overview.length > 25
              ? `${record.overview.substring(0, 20)}...`
              : record.overview
          }
        />
        <TextField source="website" />
        <TextField source="careers_page" />
        <TextField source="company_linkedin" />
        <TextField source="year_founded" />
        <TextField source="investor_amount" />
        <TextField source="total_valuation" />
        <TextField source="white_paper" />
        <TextField source="market_verified" />
        <TextField source="velocity_linkedin" />
        <TextField source="velocity_token" />
        <TextField source="status" />
        <TextField source="aliases" />
        <TextField source="twitter" />
        <TextField source="location" />
        <TextField source="discord" />
        <TextField source="glassdoor" />
        <FunctionField
          source="tags"
          render={(record: any) => (record.tags ? record.tags.join() : "")}
        />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};
