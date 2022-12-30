import React, { ReactElement, useState, useEffect } from "react";
import {
  AutocompleteArrayInput,
  FileInput,
  ImageField,
  SimpleForm,
  TextInput,
  ReferenceArrayInput,
  SelectInput,
  NumberInput,
  Button,
  FormDataConsumer,
  useGetList,
  regex,
  required,
} from "react-admin";
import {
  companyLayerChoices,
  validateNameAndSlugAndEmailAndDomain,
  status,
  tags,
  companyChoices,
} from "../../../utils/constants";
import ElemSlugInput from "../ElemSlugInput";
import ElemIconGroup from "../ElemIconGroup";
import useAdminHandleSlug from "@/hooks/useAdminHandleSlug";

type CompanyFormProps = {
  action: "create" | "edit";
  formRef: any;
  currentData?: any;
  toolbar?: ReactElement | false;
  isImageUpdated: boolean;
  logo: any;
  onSelect: (files: any) => void;
  onDropRejected: (files: any) => void;
};

const CompanyForm = ({
  action,
  currentData,
  formRef,
  toolbar,
  isImageUpdated,
  logo,
  onSelect,
  onDropRejected,
}: CompanyFormProps) => {
  const { data: companies } = useGetList("companies", {});
  const [isIcon, setIsIcon] = useState(action === "edit");
  const [keyword, setKeyword] = useState("");

  const { slug, onGenerateSlug } = useAdminHandleSlug(companies);

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const inputClassName =
    "w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none";

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
            companies
          )
        }
        toolbar={toolbar}
      >
        {action === "edit" && (
          <TextInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            disabled
            source="id"
          />
        )}
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <TextInput
              className={inputClassName}
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
          <>
            {action === "edit" && (
              <div style={{ position: "absolute", top: 135, left: 18 }}>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  href={`https://edgein.io/companies/${
                    currentData && currentData.slug
                  }`}
                >
                  <Button label="Preview" />
                </a>
              </div>
            )}
            <ElemIconGroup
              category="company"
              action={action}
              keyword={keyword}
              topPos="135px"
            />
          </>
        )}
        <ElemSlugInput slug={slug} validate={required()} />

        <FileInput
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
        <SelectInput
          className={inputClassName}
          source="layer"
          choices={companyLayerChoices}
        />
        <TextInput className={inputClassName} source="layer_detail" />
        <ReferenceArrayInput label="Coin" source="coin_ids" reference="coins">
          <AutocompleteArrayInput
            className={inputClassName}
            style={{ padding: 0, border: "none" }}
            optionText="name"
            filterToQuery={(search) => ({ name: search })}
          />
        </ReferenceArrayInput>
        <NumberInput className={inputClassName} source="total_employees" />

        <TextInput className={inputClassName} source="notes" multiline />
        <TextInput multiline className={inputClassName} source="overview" />

        <TextInput
          className={inputClassName}
          source="date_added"
          placeholder="YYYY-MM-DD"
          label="Date Added YYYY-MM-DD"
          validate={regex("[0-9]{4}-[0-9]{2}-[0-9]{2}", "")}
        />

        <TextInput className={inputClassName} source="year_founded" />
        <NumberInput className={inputClassName} source="investor_amount" />
        <TextInput className={inputClassName} source="total_valuation" />
        <TextInput className={inputClassName} source="white_paper" />
        <TextInput className={inputClassName} source="market_verified" />
        <TextInput className={inputClassName} source="velocity_linkedin" />
        <TextInput className={inputClassName} source="velocity_token" />
        <SelectInput
          className={inputClassName}
          source="status"
          choices={status}
        />
        <TextInput className={inputClassName} source="location" />
        <AutocompleteArrayInput
          className={inputClassName}
          source="tags"
          choices={tags}
          style={{ padding: 0, border: "none" }}
        />
        <AutocompleteArrayInput
          className={inputClassName}
          source="status_tags"
          choices={companyChoices}
          style={{ padding: 0, border: "none" }}
        />
        <TextInput
          className={inputClassName}
          source="github"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="website"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="careers_page"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="company_linkedin"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="twitter"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="discord"
          sx={{
            ".MuiFormHelperText-root": {
              display: "block !important",
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="glassdoor"
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

export default CompanyForm;
