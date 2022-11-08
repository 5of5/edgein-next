import React, { useRef } from "react";
import { useGetOne } from "react-admin";
import { useParams } from "react-router-dom";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemTitle from "../ElemTitle";
import ElemMutationBase from "../ElemMutationBase";
import CompanyForm from "./CompanyForm";
import { withImageTransformData, withoutImageTransformData } from "./services";

export const CompanyEdit = () => {
  const formRef = useRef<any>(null);

  const { id } = useParams();
  const { data: currentData } = useGetOne("companies", { id });

  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemMutationBase
        action="edit"
        title={<ElemTitle category="Company" />}
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
          action="edit"
          formRef={formRef}
          currentData={currentData}
        />
      </ElemMutationBase>
    </div>
  );
};
