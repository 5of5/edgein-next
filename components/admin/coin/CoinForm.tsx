import React, { ReactElement, useEffect, useState } from "react";
import {
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
} from "react-admin";
import ElemIconGroup from "../ElemIconGroup";

type CoinFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  currentData?: any;
};

const CoinForm = ({ action, toolbar, currentData }: CoinFormProps) => {
  const [isIcon, setIsIcon] = useState(action === "edit");
  const [keyword, setKeyword] = useState("");

  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <SimpleForm toolbar={toolbar}>
      {action === "edit" && (
        <TextInput className={inputClassName} disabled source="id" />
      )}
      <TextInput
        className={inputClassName}
        source="name"
        onChange={handleIcon}
        sx={{
          ".MuiFormHelperText-root": {
            display: "block !important",
          },
        }}
      />
      {isIcon && (
        <ElemIconGroup
          category="coin"
          action={action}
          keyword={keyword}
          topPos="160px"
        />
      )}
      <TextInput className={inputClassName} source="ticker" />
      <ReferenceInput
        label="Blockchain"
        source="blockchain_id"
        reference="blockchains"
      >
        <SelectInput className={inputClassName} optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Company" source="company_id" reference="companies">
        <AutocompleteInput
          className="w-full"
          optionText="name"
          filterToQuery={(search) => ({ name: search })}
        />
      </ReferenceInput>
    </SimpleForm>
  );
};

export default CoinForm;
