import React from "react";
import {
  AutocompleteInput,
  BooleanField,
  Confirm,
  TopToolbar,
  List,
  Edit,
  Datagrid,
  useGetList,
  ReferenceField,
  TextField,
  SelectField,
  DateField,
  NumberField,
  Button,
  ReferenceInput,
  Form,
  useRecordContext,
  useDelete,
  useCreate,
  useUpdate,
  useGetOne,
  useRefresh,
  useEditContext,
  EditButton,
} from "react-admin";
import { useParams } from "react-router-dom";
import ContentCreate from "@mui/icons-material/Add";
import ContentEdit from "@mui/icons-material/Edit";
import ContentDelete from "@mui/icons-material/Delete";
import { currencyChoices } from "@/utils/constants";

const CustomEditButton = ({ onEdit }: any) => {
  const record = useRecordContext();

  return (
    <Button
      label="Edit"
      variant="text"
      onClick={() => onEdit(record)}
      startIcon={<ContentEdit />}
    />
  );
};

const InvestmentRoundTable = () => {
  const { id: currentId } = useParams();
  const { data: investmentRounds } = useGetList("investment_rounds", {
    filter: { company_id: parseInt(currentId!) },
  });

  return (
    <List
      pagination={false}
      actions={
        <TopToolbar>
          <Button
            label="Add Investment Round"
            variant="text"
            onClick={() => {}}
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
        <CustomEditButton onEdit={() => {}} />
        {/* <Button
          label="Delete"
          variant="text"
          sx={{ color: "red" }}
          onClick={() => {}}
          startIcon={<ContentDelete />}
        /> */}
      </Datagrid>
    </List>
  );
};

export default InvestmentRoundTable;
