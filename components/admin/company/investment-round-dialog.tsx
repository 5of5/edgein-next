import React from 'react';
import { SelectInput, DateInput, NumberInput } from 'react-admin';
import { roundChoices, currencyChoices, status } from '@/utils/constants';
import ElemFormDialog from '../elem-form-dialog';

type Props = {
  selectedRecord: any;
  onClose: () => void;
};

const InvestmentRoundDialog = ({ selectedRecord, onClose }: Props) => {
  const inputClassName =
    'w-full text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  return (
    <ElemFormDialog
      title="Investment Round"
      mutateUri="investment_rounds"
      parentId="company_id"
      selectedRecord={selectedRecord}
      onClose={onClose}
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
    </ElemFormDialog>
  );
};

export default InvestmentRoundDialog;
