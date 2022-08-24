// in posts.js
import * as React from "react";
import {SearchInput,  FormDataConsumer, FileInput, ImageField, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, SelectField, ReferenceField, NumberField, ReferenceInput, SelectInput, NumberInput, required, minLength, maxLength, number, minValue, maxValue } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import uniqid from 'uniqid';
var axios = require('axios');
// import { S3FileInput } from '@fusionworks/ra-s3-input';
export const companyIcon = BookIcon;

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];
const validateYearFounded = [number(), minValue(1900), maxValue(2099)];
const postFilters = [
  <SearchInput source="name,slug,overview" resettable alwaysOn />
];

export const CompanyList = () => (
    <List filters={postFilters}>
        <Datagrid> 
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="slug" />
            <SelectField source="layer" choices={[
                {
                    id: "Layer 0",
                    name: "Layer 0 - Native Code"
                },
                {
                    id: "Layer 1",
                    name: "Layer 1 - Programmable Blockchains / Networks"
                },
                {
                    id: "Layer 2",
                    name: "Layer 2 - Nodes / Node Providers / Data Platforms"
                },
                {
                    id: "Layer 3",
                    name: "Layer 3 - API's / API Providers / Systems"
                },
                {
                    id: "Layer 4",
                    name: "Layer 4 - Decentralized Platforms / Contract / Modeling"
                },
                {
                    id: "Layer 5",
                    name: "Layer 5 - Applications"
                },
                {
                    id: "Layer 6",
                    name: "Layer 6 - Interoperable Digital Assets / NFT's"
                },
            ]} />
            <TextField source="layer_detail" />
            <ReferenceField label="Coin" source="coin_id" reference="coins">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="total_employees" />
            <TextField source="github" />
            <TextField source="notes" />
            <TextField source="overview" />
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
            <EditButton />
        </Datagrid>
    </List>
);

interface CompanyTitleProps {
    record?: Record<string, string>;
}
const CompanyTitle = ({ record }: CompanyTitleProps) => {
  return <span>Company {record ? `"${record.name}"` : ""}</span>;
};

export const CompanyEdit = () => (
  <Edit title={<CompanyTitle />}>
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
        validate={validateName}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={validateSlug}
      />
      <SelectField
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="layer"
        choices={[
          {
            id: "Layer 0",
            name: "Layer 0 - Native Code",
          },
          {
            id: "Layer 1",
            name: "Layer 1 - Programmable Blockchains / Networks",
          },
          {
            id: "Layer 2",
            name: "Layer 2 - Nodes / Node Providers / Data Platforms",
          },
          {
            id: "Layer 3",
            name: "Layer 3 - API's / API Providers / Systems",
          },
          {
            id: "Layer 4",
            name: "Layer 4 - Decentralized Platforms / Contract / Modeling",
          },
          {
            id: "Layer 5",
            name: "Layer 5 - Applications",
          },
          {
            id: "Layer 6",
            name: "Layer 6 - Interoperable Digital Assets / NFT's",
          },
        ]}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="layer_detail"
      />
      <ReferenceInput label="Coin" source="coin_id" reference="coins">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <NumberField
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="total_employees"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="github"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="notes"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="overview"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="careers_page"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="company_linkedin"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="year_founded"
        // min="1900"
        // max="2099"
        // validate={validateYearFounded}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="investor_amount"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="total_valuation"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="white_paper"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="market_verified"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="velocity_linkedin"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="velocity_token"
      />
    </SimpleForm>
  </Edit>
);

export const CompanyCreate = () => {
  return (
    <Create title="Create a Company">
      <SimpleForm defaultValues={{ external_id: uniqid() }}>
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          validate={validateName}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="slug"
          validate={validateSlug}
        />
        <SelectField
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="layer"
          choices={[
            {
              id: "Layer 0",
              name: "Layer 0 - Native Code",
            },
            {
              id: "Layer 1",
              name: "Layer 1 - Programmable Blockchains / Networks",
            },
            {
              id: "Layer 2",
              name: "Layer 2 - Nodes / Node Providers / Data Platforms",
            },
            {
              id: "Layer 3",
              name: "Layer 3 - API's / API Providers / Systems",
            },
            {
              id: "Layer 4",
              name: "Layer 4 - Decentralized Platforms / Contract / Modeling",
            },
            {
              id: "Layer 5",
              name: "Layer 5 - Applications",
            },
            {
              id: "Layer 6",
              name: "Layer 6 - Interoperable Digital Assets / NFT's",
            },
          ]}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="layer_detail"
        />
        <ReferenceInput label="Coin" source="coin_id" reference="coins">
          <SelectInput
            className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
          />
        </ReferenceInput>
        <NumberInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="total_employees"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="github"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="notes"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="overview"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="website"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="careers_page"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="company_linkedin"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="year_founded"
          // min="1900"
          // max="2099"
          // validate={validateYearFounded}
        />
        <NumberInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="investor_amount"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="total_valuation"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="white_paper"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="market_verified"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="velocity_linkedin"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="velocity_token"
        />
      </SimpleForm>
    </Create>
  );
};
