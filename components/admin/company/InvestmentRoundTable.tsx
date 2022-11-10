import React, { useState } from "react";
import {
  TopToolbar,
  List,
  Datagrid,
  useGetList,
  ReferenceField,
  TextField,
  SelectField,
  DateField,
  NumberField,
  Button,
} from "react-admin";
import { useParams } from "react-router-dom";
import ContentCreate from "@mui/icons-material/Add";
import { currencyChoices } from "@/utils/constants";
import InvestmentRoundDialog from "./InvestmentRoundDialog";
import useDialog from "@/hooks/useDialog";
import ElemEditButton from "../ElemEditButton";
import ElemDeleteButton from "../ElemDeleteButton";

const InvestmentRoundTable = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    isOpen: isOpenFormDialog,
    onOpen: onOpenFormDialog,
    onClose: onCloseFormDialog,
  } = useDialog();

  const { id: currentId } = useParams();
  const { data: investmentRounds } = useGetList("investment_rounds", {
    filter: { company_id: parseInt(currentId!) },
  });

  const handleClickNew = () => {
    setSelectedRecord(null);
    onOpenFormDialog();
  };

  const handleClickEdit = (record: any) => {
    setSelectedRecord(record);
    onOpenFormDialog();
  };

  return (
    <>
      <List
        pagination={false}
        actions={
          <TopToolbar>
            <Button
              label="Add Investment Round"
              variant="text"
              onClick={handleClickNew}
              startIcon={<ContentCreate />}
            />
          </TopToolbar>
        }
        sx={{
          ".MuiToolbar-root": {
            justifyContent: "start !important",
            paddingTop: 0,
            marginBottom: "4px",
          },
        }}
      >
        <Datagrid bulkActionButtons={false} data={investmentRounds}>
          <ReferenceField label="Id" source="id" reference="investment_rounds">
            <TextField source="id" />
          </ReferenceField>
          <DateField source="round_date" />
          <TextField source="round" />
          <NumberField source="amount" />
          <SelectField source="currency" choices={currencyChoices} />
          <NumberField source="valuation" />
          <TextField source="status" />
          <ElemEditButton onClickEdit={handleClickEdit} />
          <ElemDeleteButton
            deleteUri="investment_rounds"
            content={(data) => `Are you sure you want to delete ${data.round}?`}
          />
        </Datagrid>
      </List>

      {isOpenFormDialog && (
        <InvestmentRoundDialog
          selectedRecord={selectedRecord}
          onClose={onCloseFormDialog}
        />
      )}
    </>
  );
};

export default InvestmentRoundTable;
