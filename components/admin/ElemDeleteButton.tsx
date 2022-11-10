import React, { ReactElement } from "react";
import {
  Confirm,
  Button,
  useRecordContext,
  useDelete,
  useRefresh,
} from "react-admin";
import ContentDelete from "@mui/icons-material/Delete";
import useDialog from "@/hooks/useDialog";

type Props = {
  deleteUri: string;
  content: (data: any) => ReactElement | string;
};

const ElemDeleteButton = ({ deleteUri, content }: Props) => {
  const refresh = useRefresh();
  const record = useRecordContext();

  const {
    isOpen: isOpenConfirmDeleteDialog,
    onOpen: onOpenConfirmDeleteDialog,
    onClose: onCloseConfirmDeleteDialog,
  } = useDialog();

  const [deleteOne] = useDelete();

  const handleConfirm = () => {
    deleteOne(
      deleteUri,
      {
        id: record.id,
        previousData: record,
      },
      {
        onSuccess: () => {
          refresh();
        },
      }
    );
    onCloseConfirmDeleteDialog;
  };

  return (
    <>
      <Button
        label="Delete"
        variant="text"
        sx={{ color: "red" }}
        onClick={onOpenConfirmDeleteDialog}
        startIcon={<ContentDelete />}
      />
      <Confirm
        isOpen={isOpenConfirmDeleteDialog}
        title="Remove Information"
        content={content(record)}
        onConfirm={handleConfirm}
        onClose={onCloseConfirmDeleteDialog}
      />
    </>
  );
};

export default ElemDeleteButton;
