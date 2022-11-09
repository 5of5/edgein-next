import React, { useState, useRef, useEffect } from "react";
import { useCreate, useRedirect } from "react-admin";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemFormBase from "../ElemFormBase";
import ElemToolbar from "../ElemToolbar";
import VcFirmForm from "./VcFirmForm";
import {
  getMutationRootStyle,
  withImageTransformData,
  withoutImageTransformData,
} from "./services";

export const VcFirmCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const formRef = useRef<any>(null);
  const { height } = useWindowDimensions();
  const [formHeight, setFormHeight] = useState(0);

  useEffect(() => {
    if (formRef?.current?.clientHeight + 100 >= height)
      setFormHeight(formRef?.current?.clientHeight + 100);
  }, [formRef?.current?.clientHeight, height]);

  const rootStyle = getMutationRootStyle(height, formHeight, formRef);

  const { transform } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  const handleCheckScreenHeight = () => {
    setFormHeight(formRef?.current?.clientHeight + 100);
  };

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("vc_firms", { data });
    redirect("/vc_firms");
  };

  return (
    <ElemFormBase
      title="Create a VC Firm"
      action="create"
      transform={transform}
      rootStyle={rootStyle}
    >
      <VcFirmForm
        action="create"
        toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
        onCheckScreenHeight={handleCheckScreenHeight}
      />
    </ElemFormBase>
  );
};
