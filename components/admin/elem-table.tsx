import React, { FC, ReactElement, PropsWithChildren, useState } from "react";
import { TopToolbar, List, Datagrid, useGetList, Button } from "react-admin";
import { useParams } from "react-router-dom";
import ContentCreate from "@mui/icons-material/Add";
import useDialog from "@/hooks/use-dialog";
import ElemEditButton from "./elem-edit-button";
import ElemDeleteButton from "./elem-delete-button";

type Props = {
  listUri: string;
  deleteUri: string;
  parentId: string;
  createButtonLabel: string;
  confirmContent: (data: any) => ReactElement | string;
  formDialogComponent: (props: any) => ReactElement;
};

const ElemTable: FC<PropsWithChildren<Props>> = ({
  listUri,
  deleteUri,
  parentId,
  createButtonLabel,
  confirmContent,
  formDialogComponent,
  children,
}) => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    isOpen: isOpenFormDialog,
    onOpen: onOpenFormDialog,
    onClose: onCloseFormDialog,
  } = useDialog();

  const { id: currentId } = useParams();
  const { data } = useGetList(listUri, {
    filter: { [parentId]: parseInt(currentId!) },
  });

  const handleClickNew = () => {
    setSelectedRecord(null);
    onOpenFormDialog();
  };

  const handleClickEdit = (record: any) => {
    setSelectedRecord(record);
    onOpenFormDialog();
  };

  const FormDialogComponent = formDialogComponent;

  return (
    <>
      <List
        pagination={false}
        actions={
          <TopToolbar>
            <Button
              label={createButtonLabel}
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
        <Datagrid bulkActionButtons={false} data={data}>
          {children}
          <ElemEditButton onClickEdit={handleClickEdit} />
          <ElemDeleteButton deleteUri={deleteUri} content={confirmContent} />
        </Datagrid>
      </List>

      {isOpenFormDialog && (
        <FormDialogComponent
          selectedRecord={selectedRecord}
          onClose={onCloseFormDialog}
        />
      )}
    </>
  );
};

export default ElemTable;
