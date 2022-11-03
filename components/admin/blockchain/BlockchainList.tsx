import { getAdminRenderData, sortWithData } from "@/utils";
import React, { useState } from "react";
import { TextField, EditButton, TextInput, useGetList } from "react-admin";
import ElemList from "../ElemList";

const filters = [
  <TextInput
    key="search"
    source="name"
    label="Search Name"
    resettable
    alwaysOn
  />,
];

export const BlockchainList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = ["id", "name"];
  const { data } = useGetList("blockchains", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/2");
  renderData = renderData && sortWithData(renderData, customSort);

  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};
