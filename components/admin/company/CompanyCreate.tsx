import React, { useRef } from "react";
import { useCreate, useRedirect } from "react-admin";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemToolbar from "../ElemToolbar";
import ElemMutationBase from "../ElemMutationBase";
import CompanyForm from "./CompanyForm";
import { withImageTransformData, withoutImageTransformData } from "./services";

export const CompanyCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const formRef = useRef<any>(null);

  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("companies", { data });
    redirect("/companies");
  };

  return (
    <ElemMutationBase
      action="create"
      title="Create a Company"
      transform={transform}
      rootStyle={{
        ".MuiPaper-root": {
          marginBottom: "20px",
        },
        ".MuiCardContent-root": {
          background: "none",
          border: 0,
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row !important",
          },
        },
        ".MuiFormHelperText-root": {
          display: "none",
        },
        ".customForm": {
          "& > form": {
            maxWidth: formRef?.current?.offsetWidth || "100%",
          },
        },
      }}
    >
      <CompanyForm
        action="create"
        formRef={formRef}
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
      />
    </ElemMutationBase>
  );
};
