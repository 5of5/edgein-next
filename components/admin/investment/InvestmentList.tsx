import React from "react";
import {
  TextField,
  EditButton,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  NumberField,
} from "react-admin";
import ElemList from "../ElemList";

const filters = [
  <ReferenceInput key="searchPeople" source="person_id" reference="people">
    <AutocompleteInput
      style={{ padding: 0, border: "none" }}
      optionText="name"
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput
    key="searchRounds"
    source="round_id"
    reference="investment_rounds"
  >
    <AutocompleteInput
      style={{ padding: 0, border: "none" }}
      optionText="name"
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
  <ReferenceInput key="searchVCFirm" source="vc_firm_id" reference="vc_firms">
    <AutocompleteInput
      style={{ padding: 0, border: "none" }}
      optionText="name"
      filterToQuery={(search) => ({ name: search })}
    />
  </ReferenceInput>,
];

export const InvestmentList = () => {
  return (
    <ElemList filters={filters}>
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
      <ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="amount" />
      <TextField source="status" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};
