import React from "react";
import {
  FunctionField,
  ImageField,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";
import ElemList from "../ElemList";

const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,website,linkedin,twitter,year_founded"
    label="Name,Year Founded,Website,Linkedin,Twitter"
    resettable
    alwaysOn
  />,
];

export const VcFirmList = () => {
  return (
    <ElemList filters={filters}>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField className="logoFile" source="logo.url" label="Logo" />
      <TextField source="website" />
      <TextField source="linkedin" />
      <TextField source="status" />
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
      <TextField source="year_founded" />
      <TextField source="twitter" />
      <TextField source="location" />
      <FunctionField
        source="tags"
        render={(record: any) => (record.tags ? record.tags.join() : "")}
      />
      {/* <TextField source="counter" /> */}
    </ElemList>
  );
};
