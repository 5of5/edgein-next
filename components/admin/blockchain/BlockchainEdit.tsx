import React, { useState, useEffect } from "react";
import { Edit, SimpleForm, TextInput, useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";
import ElemTitle from "../ElemTitle";

export const BlockchainEdit = () => {
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  const { data: currentData } = useGetOne("blockchains", { id });

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <Edit
      title={<ElemTitle category="Blockchain" />}
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
      </SimpleForm>
    </Edit>
  );
};
