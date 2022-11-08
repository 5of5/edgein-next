import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  FileInput,
  ImageField,
  SimpleForm,
  TextInput,
  SelectInput,
  FormDataConsumer,
  useGetList,
} from "react-admin";
import useAdminTransform from "@/hooks/useAdminTransform";
import {
  status,
  validateNameAndSlugAndEmailAndDomain,
} from "@/utils/constants";
import ElemSlugInput from "../ElemSlugInput";
import { withImageTransformData, withoutImageTransformData } from "./services";
import ElemIconGroup from "../ElemIconGroup";
import useAdminHandleSlug from "@/hooks/useAdminHandleSlug";

type VcFirmFormProps = {
  action: "create" | "edit";
  toolbar?: ReactElement | false;
  slugValidate?: any;
  currentData?: any;
  onCheckScreenHeight: () => void;
};

const VcFirmForm = ({
  action,
  toolbar,
  slugValidate,
  currentData,
  onCheckScreenHeight,
}: VcFirmFormProps) => {
  const { data: vcFirm } = useGetList("vc_firms", {});
  const formRef = useRef<any>(null);
  const [isIcon, setIsIcon] = useState(action === "edit");
  const [keyword, setKeyword] = useState("");

  const { slug, onGenerateSlug } = useAdminHandleSlug(vcFirm);

  const textInputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const { isImageUpdated, logo, onSelect, onDropRejected } = useAdminTransform({
    withImageTransformData,
    withoutImageTransformData,
  });

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <div className="customForm" ref={formRef} style={{ position: "relative" }}>
      <SimpleForm
        validate={(value) =>
          validateNameAndSlugAndEmailAndDomain(
            action !== "create",
            value,
            vcFirm
          )
        }
        toolbar={toolbar}
      >
        {action === "edit" && (
          <TextInput
            className={`w-full ${textInputClassName}`}
            disabled
            source="id"
          />
        )}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <TextInput
              className={`w-[49%] ${textInputClassName}`}
              source="name"
              onBlur={(e) => onGenerateSlug(e.target.value, formData)}
              onChange={handleIcon}
              sx={{
                ".MuiFormHelperText-root": {
                  display: "block !important",
                },
              }}
              {...rest}
            />
          )}
        </FormDataConsumer>
        {isIcon && (
          <ElemIconGroup category="vcFirm" action={action} keyword={keyword} />
        )}

        <ElemSlugInput slug={slug} validate={slugValidate} />

        <FileInput
          className="w-full"
          onRemove={onDropRejected}
          options={{ onDrop: onSelect }}
          source="logo"
          label="logo"
          accept="image/*"
          placeholder={<p>Drop your file here</p>}
        >
          <ImageField source="src" title="title" />
        </FileInput>
        {action === "edit" && !logo && !isImageUpdated && (
          <ImageField className="w-full" source="logo.url" title="Logo" />
        )}
        <TextInput
          className={`w-full ${textInputClassName}`}
          source="overview"
          onChange={onCheckScreenHeight}
          multiline
        />
        <SelectInput
          className={`w-[49%] ${textInputClassName}`}
          source="status"
          choices={status}
        />
        <TextInput
          className={`w-[49%] ${textInputClassName}`}
          source="location"
        />
        <TextInput
          className={`w-[49%] ${textInputClassName}`}
          source="year_founded"
        />
        <TextInput
          placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
          className={`w-[49%] ${textInputClassName}`}
          source="tags"
        />
        <TextInput
          className={`w-[49%] ${textInputClassName}`}
          source="website"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={`w-[49%] ${textInputClassName}`}
          source="linkedin"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={`w-[49%] ${textInputClassName}`}
          source="twitter"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
      </SimpleForm>
    </div>
  );
};

export default VcFirmForm;
