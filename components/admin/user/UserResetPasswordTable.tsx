import React from "react";
import {
  List,
  Datagrid,
  TopToolbar,
  TextField,
  ReferenceField,
  DateField,
  FunctionField,
  Button,
  useGetList,
} from "react-admin";
import { useParams } from "react-router-dom";
import ElemGeneratedPassword from "./ElemGeneratedPassword";

const ListActions = () => {
  return (
    <TopToolbar>
      <Button
        label="Reset password history"
        variant="text"
        onClick={() => {}}
        sx={{ cursor: "auto" }}
      />
    </TopToolbar>
  );
};

const UserResetPasswordTable = () => {
  const { id: currentId } = useParams();

  const { data } = useGetList("reset_passwords", {
    filter: { user_id: parseInt(currentId!) },
  });

  if (data && data.length > 0) {
    return (
      <List
        pagination={false}
        actions={<ListActions />}
        sx={{
          ".MuiToolbar-root": {
            justifyContent: "start !important",
            paddingTop: 0,
            marginBottom: "4px",
          },
          ".RaBulkActionsToolbar-toolbar": {
            justifyContent: "start !important",
          },
          ".MuiToolbar-root .MuiButtonBase-root": {
            paddingTop: 0,
            paddingBottom: 0,
            margin: "4px",
          },
          ".RaBulkActionsToolbar-topToolbar": {
            paddingTop: 0,
            paddingBottom: 0,
            marginBottom: 0,
          },
          ".MuiToolbar-root form": {
            flex: "0 1 auto",
          },
          ".MuiToolbar-root form .MuiFormControl-root": {
            margin: 0,
          },
        }}
      >
        <Datagrid bulkActionButtons={false} data={data}>
          <TextField source="id" />
          <FunctionField
            label="Generated password"
            render={(record: any) => (
              <ElemGeneratedPassword value={record.generated_password} />
            )}
          />
          <ReferenceField
            label="Created by"
            source="created_by_user_id"
            reference="users"
            sortable={false}
          >
            <TextField source="display_name" />
          </ReferenceField>
          <DateField source="created_at" showTime />
        </Datagrid>
      </List>
    );
  }

  return null;
};

export default UserResetPasswordTable;
