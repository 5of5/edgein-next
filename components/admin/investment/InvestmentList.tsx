import { getAdminRenderData, sortWithData } from "@/utils";
import React from "react";
import {
  TextField,
  EditButton,
  ReferenceField,
  ReferenceInput,
  AutocompleteInput,
  useGetList,
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
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const headers: string[] = [
    "id",
    "person_id",
    "round_id",
    "vc_firm_id",
    "status",
  ];
  const { data } = useGetList("investments", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = getAdminRenderData(data, headers, "/5");

  renderData = renderData && sortWithData(renderData, customSort);

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
