import React from "react";
import {
  SimpleForm,
  SelectInput,
  DateInput,
  NumberInput,
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
import { roundChoices, currencyChoices, status } from "@/utils/constants";
import ElemDialogTransition from "@/components/admin/ElemDialogTransition";

type Props = {
  selectedRecord: any;
  onClose: () => void;
};

const InvestmentRoundDialog = ({ selectedRecord, onClose }: Props) => {
  const { id: currentId } = useParams();

  const [create] = useCreate();
  const [update] = useUpdate();
  const refresh = useRefresh();

  const inputClassName =
    "w-full text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  const onSuccess = () => {
    refresh();
    onClose();
  };

  const handleSave = (values: any) => {
    const data = { ...values, company_id: currentId! };
    if (!selectedRecord) {
      create(
        "investment_rounds",
        { data },
        {
          onSuccess,
        }
      );
    } else {
      update(
        "investment_rounds",
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
      open={true}
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
      <DialogTitle>Investment Round</DialogTitle>
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
          <DateInput className={inputClassName} source="round_date" />
          <SelectInput
            className={inputClassName}
            source="round"
            choices={roundChoices}
          />
          <NumberInput className={inputClassName} source="amount" />
          <SelectInput
            className={inputClassName}
            source="currency"
            choices={currencyChoices}
          />
          <NumberInput className={inputClassName} source="valuation" />
          <SelectInput
            className={inputClassName}
            source="status"
            choices={status}
          />
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentRoundDialog;
