// in posts.js
import React, { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  useGetOne,
} from "react-admin";
import { useParams } from "react-router-dom";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";
import ElemTitle from "../ElemTitle";

export const CoinEdit = () => {
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  const { data: currentData } = useGetOne("coins", { id });

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <Edit
      title={<ElemTitle category="Coin" />}
      sx={{
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".MuiPaper-root": {
          position: "relative",
        },
      }}
    >
      <SimpleForm>
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          disabled
          source="id"
        />
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          onChange={handleIcon}
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        {isIcon && (
          <>
            <RenderGoogleIcon
              topPos="135px"
              leftPos="2%"
              googleKeyWord={keyword}
            />
            <RenderLinkedinIcon
              topPos="135px"
              leftPos="5%"
              googleKeyWord={keyword}
            />
            <RenderGitHubIcon
              topPos="135px"
              leftPos="8%"
              googleKeyWord={keyword}
            />
            <RenderCBIcon
              topPos="135px"
              leftPos="11%"
              googleKeyWord={keyword}
            />
          </>
        )}
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="ticker"
        />
        <ReferenceInput
          label="Blockchain"
          source="blockchain_id"
          reference="blockchains"
        >
          <SelectInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
