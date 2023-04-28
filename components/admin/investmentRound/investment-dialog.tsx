import React from "react";
import {
  SelectInput,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
} from "react-admin";
import { status } from "@/utils/constants";
import ElemFormDialog from "../elem-form-dialog";

type Props = {
  selectedRecord: any;
  onClose: () => void;
};

const InvestmentDialog = ({ selectedRecord, onClose }: Props) => {
  const inputClassName =
    "w-full text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  return (
    <ElemFormDialog
      title="Investment"
      mutateUri="investments"
      parentId="round_id"
      selectedRecord={selectedRecord}
      onClose={onClose}
    >
      <ReferenceInput
        label="Partner or Angel"
        source="person_id"
        reference="people"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
          emptyValue={null}
        />
      </ReferenceInput>

      <ReferenceInput
        label="VC Firm"
        source="vc_firm_id"
        reference="vc_firms"
        resettable
        allowEmpty
        emptyValue={null}
      >
        <AutocompleteInput
          className={inputClassName}
          style={{ padding: 0, border: "none" }}
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
          emptyValue={null}
        />
      </ReferenceInput>
      <NumberInput className={inputClassName} source="amount" />
      <SelectInput
        className={inputClassName}
        source="status"
        choices={status}
      />
    </ElemFormDialog>
  );
};

export default InvestmentDialog;
