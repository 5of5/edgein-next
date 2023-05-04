import React, { ReactElement, useState, useEffect } from "react";
import { SimpleForm, TextInput } from "react-admin";
import ElemIconGroup from "../elem-icon-group";

type BlockchainFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  currentData?: any;
};

const BlockchainForm = ({
  action,
  toolbar,
  currentData,
}: BlockchainFormProps) => {
  const [isIcon, setIsIcon] = useState(action === "edit");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const inputClassName =
    "w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

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
          category="blockchain"
          action={action}
          keyword={keyword}
          topPos="160px"
        />
      )}
    </SimpleForm>
  );
};

export default BlockchainForm;
