import React from "react";
import { ReferenceField, TextField, NumberField } from "react-admin";
import InvestmentDialog from "./investment-dialog";
import ElemTable from "../elem-table";

const InvestmentTable = () => {
  return (
    <ElemTable
      listUri="investments"
      deleteUri="investments"
      parentId="round_id"
      createButtonLabel="Add Investment"
      confirmContent={(recordData) =>
        `Are you sure you want to delete ${recordData?.id}?`
      }
      formDialogComponent={(props) => (
        <InvestmentDialog
          selectedRecord={props.selectedRecord}
          onClose={props.onClose}
        />
      )}
    >
      <TextField source="id" />
      <ReferenceField label="Partner" source="person_id" reference="people">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField label="VC Firm" source="vc_firm_id" reference="vc_firms">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="amount" />
      <TextField source="status" />
    </ElemTable>
  );
};

export default InvestmentTable;
