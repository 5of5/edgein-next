import React, { FC, PropsWithChildren, ReactElement } from "react";
import { List, Datagrid, Pagination, BulkDeleteButton, BulkExportButton } from "react-admin";

type Props = {
  filters?: ReactElement | ReactElement[];
  disableDelete?: boolean
};

const ListBulkActions = (props:{disableDelete:boolean}) => (
  <>
    {props.disableDelete ? <></> :<BulkDeleteButton />}
    <BulkExportButton />
  </>
);

const ElemList: FC<PropsWithChildren<Props>> = ({ filters, disableDelete, children }) => {
  return (
    <List
      filters={filters}
      pagination={<Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />}
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
      <Datagrid bulkActionButtons={<ListBulkActions disableDelete={disableDelete || false} />}>{children}</Datagrid>
    </List>
  );
};

export default ElemList;
