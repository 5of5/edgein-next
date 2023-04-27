import React, { useState, useRef, useEffect } from "react";
import { required } from "react-admin";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useAdminTransform from "@/hooks/useAdminTransform";
import ElemFormBase from "../ElemFormBase";
import ElemTitle from "../ElemTitle";
import VcFirmForm from "./VcFirmForm";
import {
  getMutationRootStyle,
  withImageTransformData,
  withoutImageTransformData,
} from "./services";
import ElemParentOrganizationEdit from "../ElemParentOrganizationEdit";

export const VcFirmEdit = () => {
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

  return (
    <div style={{ paddingBottom: "20px" }}>
      <ElemFormBase
        title={<ElemTitle category="Vc Firm" />}
        action="edit"
        transform={transform}
        rootStyle={rootStyle}
      >
        <VcFirmForm
          action="edit"
          slugValidate={required()}
          onCheckScreenHeight={handleCheckScreenHeight}
          isImageUpdated={isImageUpdated}
          logo={logo}
          onSelect={onSelect}
          onDropRejected={onDropRejected}
        />
      </ElemFormBase>
      <ElemParentOrganizationEdit type="vc_firms" />
    </div>
  );
};
