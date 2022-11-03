import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useCreate,
  useRedirect,
} from "react-admin";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";
import ElemToolbar from "../ElemToolbar";

export const BlockchainCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const [isIcon, setIsIcon] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("blockchains", { data });
    redirect("/blockchains");
  };

  return (
    <Create
      title="Create a Blockchain"
      sx={{
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".MuiPaper-root": {
          position: "relative",
        },
      }}
    >
      <SimpleForm toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}>
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
              topPos="75px"
              leftPos="2%"
              googleKeyWord={keyword}
            />
            <RenderLinkedinIcon
              topPos="75px"
              leftPos="5%"
              googleKeyWord={keyword}
            />
            <RenderGitHubIcon
              topPos="75px"
              leftPos="8%"
              googleKeyWord={keyword}
            />
            <RenderCBIcon topPos="75px" leftPos="11%" googleKeyWord={keyword} />
          </>
        )}
      </SimpleForm>
    </Create>
  );
};
