import React, { useState, useRef, useEffect } from "react";
import { useCreate, useRedirect } from "react-admin";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import useAdminTransform from "@/hooks/use-admin-transform";
import ElemFormBase from "../elem-form-base";
import ElemToolbar from "../elem-toolbar";
import VcFirmForm from "./vc-firm-form";
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

  const { isImageUpdated, logo, transform, onSelect, onDropRejected } =
    useAdminTransform({
      withImageTransformData,
      withoutImageTransformData,
      hasGeopoint: true,
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
        isImageUpdated={isImageUpdated}
        logo={logo}
        onSelect={onSelect}
        onDropRejected={onDropRejected}
      />
    </ElemFormBase>
  );
};
