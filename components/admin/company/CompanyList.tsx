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
      <Datagrid>
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
        <TextField source="date_added" />
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
