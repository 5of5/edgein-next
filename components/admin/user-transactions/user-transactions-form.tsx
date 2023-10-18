import React, { ReactElement } from 'react';
import {
  SimpleForm,
  ReferenceInput,
  NumberInput,
  AutocompleteInput,
  TextInput,
} from 'react-admin';
import { useAuth } from '@/hooks/use-auth';

type InvestmentRoundFormProps = {
  toolbar?: ReactElement | false;
};

const InvestmentRoundForm = ({ toolbar }: InvestmentRoundFormProps) => {
  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  const { user } = useAuth();
  return (
    <SimpleForm toolbar={toolbar}>
      <ReferenceInput label="User" source="user_id" reference="users">
        <AutocompleteInput
          style={{ padding: 0, border: 'none' }}
          className={inputClassName}
          optionText="display_name"
          filterToQuery={search => ({ display_name: search })}
        />
      </ReferenceInput>
      <NumberInput className={inputClassName} source="amount" />
      <TextInput className={inputClassName} source="note" />
      <NumberInput
        className={inputClassName}
        source="created_by"
        defaultValue={user?.id}
        disabled
      />
    </SimpleForm>
  );
};

export default InvestmentRoundForm;
