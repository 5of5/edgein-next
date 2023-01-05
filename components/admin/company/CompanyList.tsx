import React from "react";
import {
  Button,
  FunctionField,
  AutocompleteInput,
  ImageField,
  TextField,
  EditButton,
  TextInput,
  SelectField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  NumberField,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { companyLayerChoices } from "../../../utils/constants";
import ElemList from "../ElemList";

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
      style={{ padding: 0, border: "none" }}
      optionText="name"
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="layer"
    source="layer"
    label="Layer"
    choices={companyLayerChoices}
  />,
];

export const CompanyList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <FunctionField
        render={(record: any) => (
          <a
            target={"_blank"}
            rel="noreferrer"
            href={`https://edgein.io/companies/${record.slug}`}
          >
            <Button label="Preview" />
          </a>
        )}
      />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField className="logoFile" source="logo.url" label="Logo" />
      <ReferenceArrayField
        label="Child companies"
        source="child_companies"
        reference="companies"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Child vc firms"
        source="child_vc_firms"
        reference="vc_firms"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceField
        label="Parent company"
        source="parent_company"
        reference="companies"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Parent vc firm"
        source="parent_vc_firm"
        reference="vc_firms"
      >
        <TextField source="name" />
      </ReferenceField>
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
    </ElemList>
  );
};
