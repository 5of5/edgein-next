import React, { FC, PropsWithChildren } from "react";
import {
  SimpleForm,
  Toolbar,
  Button,
  SaveButton,
  useCreate,
  useRefresh,
  useUpdate,
} from "react-admin";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ElemDialogTransition from "@/components/admin/elem-dialog-transition";

type Props = {
  title: string;
  mutateUri: string;
  parentId: string;
  selectedRecord: any;
  onClose: () => void;
};

const ElemFormDialog: FC<PropsWithChildren<Props>> = ({
  title,
  mutateUri,
  parentId,
  selectedRecord,
  onClose,
  children,
}) => {
  const { id: currentId } = useParams();

  const [create] = useCreate();
  const [update] = useUpdate();
  const refresh = useRefresh();

  const onSuccess = () => {
    refresh();
    onClose();
  };

  const handleSave = (values: any) => {
    const data = { ...values, [parentId]: currentId! };
    if (!selectedRecord) {
      create(
        mutateUri,
        { data },
        {
          onSuccess,
        }
      );
    } else {
      update(
        mutateUri,
        {
          id: selectedRecord.id,
          data,
          previousData: selectedRecord,
        },
        {
          onSuccess,
        }
      );
    }
  };

  return (
    <Dialog
      open
      TransitionComponent={ElemDialogTransition}
      keepMounted
      fullWidth
      maxWidth="xs"
      sx={{
        ".MuiCardContent-root": {
          padding: 0,
        },
        ".MuiToolbar-root": {
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-evenly",
        },
      }}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <SimpleForm
          toolbar={
            <Toolbar>
              <Button label="Cancel" variant="text" onClick={onClose} />
              <SaveButton />
            </Toolbar>
          }
          defaultValues={selectedRecord}
          onSubmit={handleSave}
        >
          {children}
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
};

export default ElemFormDialog;
