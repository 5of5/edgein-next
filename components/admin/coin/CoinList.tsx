import { getAdminRenderData, sortWithData } from "@/utils";
import React, { useState } from "react";
import {
  TextField,
  EditButton,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
  ReferenceField,
  useGetList,
} from "react-admin";
import ElemList from "../ElemList";

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
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = ["id", "name", "ticker", "blockchain_id"];
  const { data } = useGetList("coins", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/4");

  renderData = renderData && sortWithData(renderData, customSort);

  return (
    <ElemList filters={filters}>
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
    </ElemList>
  );
};
