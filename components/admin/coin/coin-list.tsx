import React from "react";
import {
  TextField,
  EditButton,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceField,
} from "react-admin";
import ElemList from "../elem-list";
import { useAuth } from "@/hooks/useAuth";

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

export const CoinList = () => {
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      { user?.role !== "cms-readonly" && <EditButton /> }
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
    </ElemList>
  );
};
