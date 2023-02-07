import { useAuth } from "@/hooks/useAuth";
import React from "react";
import {
  FunctionField,
  ImageField,
  TextField,
  EditButton,
  TextInput,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
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
  const { user } = useAuth();

  return (
    <ElemList filters={filters}>
      { user?.role !== "cms-readonly" && <EditButton /> }
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
