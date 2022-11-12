import React from "react";
import {
  ReferenceField,
  TextField,
  SelectField,
  DateField,
  NumberField,
} from "react-admin";
import { currencyChoices } from "@/utils/constants";
import InvestmentRoundDialog from "./InvestmentRoundDialog";
import ElemTable from "../ElemTable";

const InvestmentRoundTable = () => {
  return (
    <ElemTable
      listUri="investment_rounds"
      deleteUri="investment_rounds"
      parentId="company_id"
      createButtonLabel="Add Investment Round"
      confirmContent={(recordData) =>
        `Are you sure you want to delete ${recordData?.round}?`
      }
      formDialogComponent={(props) => (
        <InvestmentRoundDialog
          selectedRecord={props.selectedRecord}
          onClose={props.onClose}
        />
      )}
    >
      <ReferenceField label="Id" source="id" reference="investment_rounds">
        <TextField source="id" />
      </ReferenceField>
      <DateField source="round_date" />
      <TextField source="round" />
      <NumberField source="amount" />
      <SelectField source="currency" choices={currencyChoices} />
      <NumberField source="valuation" />
      <TextField source="status" />
    </ElemTable>
  );
};

export default InvestmentRoundTable;
