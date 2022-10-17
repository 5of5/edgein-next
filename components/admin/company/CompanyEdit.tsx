import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  DateField,
  FunctionField,
  AutocompleteArrayInput,
  AutocompleteInput,
  FileInput,
  ImageField,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  SelectField,
  ReferenceField,
  NumberField,
  ReferenceInput,
  SelectInput,
  NumberInput,
  useGetList,
  FormDataConsumer,
  Pagination,
  useCreate,
  useRedirect,
  Toolbar,
  SaveButton,
  useGetOne,
  useGetManyReference,
  Link,
  regex,
  required
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import { roundChoices, currencyChoices } from "../../../utils/constants";
import BookIcon from "@mui/icons-material/Book";
import { uploadFile, deleteFile } from "../../../utils/fileFunctions";
import {
  companyLayerChoices,
  validateNameAndSlugAndEmailAndDomain,
  status,
  tags,
} from "../../../utils/constants";
import { random } from "lodash";

import ContentSave from "@mui/icons-material/Save";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

import { TeamMemberEdit } from './TeamMemberEdit';

interface CompanyTitleProps {
  record?: Record<string, string>;
}
const CompanyTitle = ({ record }: CompanyTitleProps) => {
  return <span>Company {record ? `"${record.name}"` : ""}</span>;
};

export const CompanyEdit = () => {
  const [logo, setLogo] = React.useState(null);
  const [oldLogo, setOldLogo] = React.useState(null);
  const [isImageUpdated, setIsImageUpdated] = React.useState(false);
  const { data: companies } = useGetList("companies", {});
  const [slug, setSlug] = React.useState("");
  const formRef = useRef<any>(null);
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");
  const { id } = useParams();
  const { data: currentData } = useGetOne("companies", { id });

  useEffect(() => {
    if (currentData) setKeyword(currentData.name);
  }, [currentData]);

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = formdata.tags ? formdata.tags : [];
    const finalValue =
      typeof tagValue === "string" ? tagValue.split(",") : tagValue;
    if (oldLogo) {
      //delete old file from s3
      deleteFile(oldLogo);
    }
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        coin_id: !data.coin_id ? null : data.coin_id,
        logo: res.file,
        tags: finalValue,
      };
      return formdata;
    } else {
      formdata = {
        ...data,
        coin_id: !data.coin_id ? null : data.coin_id,
        tags: finalValue,
      };
      return formdata;
    }
  };

  const onSelect = (files: any) => {
    if (files && files.length > 0) {
      setLogo(files[0]);
    } else {
      setLogo(null);
    }
  };

  const onDropRejected = (files: any) => {
    if (files.id) {
      setOldLogo(files);
    }
    setIsImageUpdated(true);
    setLogo(null);
  };

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined;
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = companies?.filter(
      (f) => f.slug === convertedValue && f.status !== "draft"
    );

    if (filterSlug && filterSlug?.length > 0) {
      handleNameBlur(filterSlug[0].slug + "-" + random(10), formData);
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue);
    }
  };

  const SlugInput = ({ slug }: any) => {
    const { setValue } = useFormContext();

    React.useEffect(() => {
      if (slug !== "") setValue("slug", slug);
    }, [slug, setValue]);

    return (
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={required()}
        sx={{
          ".MuiFormHelperText-root": {
            display: "block !important",
          },
        }}
      />
    );
  };

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <div style={{paddingBottom: "20px"}}>
    <Edit
      title={<CompanyTitle />}
      transform={transform}
      sx={{
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
      <div
        className="customForm"
        ref={formRef}
        style={{ position: "relative" }}
      >
        <SimpleForm
          className="border rounded-lg"
          validate={(value) =>
            validateNameAndSlugAndEmailAndDomain(true, value, companies)
          }
        >
          <TextInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            disabled
            source="id"
          />
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <TextInput
                className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
                source="name"
                onBlur={(e) => handleNameBlur(e.target.value, formData)}
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
              <div style={{position: 'absolute', top: 135, left: 18}}>
                <a target={"_blank"} rel="noreferrer" href={`https://edgein.io/companies/${currentData && currentData.slug}`}>
                  <Button label="Preview" />
                </a>
              </div>
              <RenderGoogleIcon
                topPos="135px"
                leftPos="36%"
                googleKeyWord={keyword}
              />
              <RenderLinkedinIcon
                topPos="135px"
                leftPos="39%"
                googleKeyWord={keyword}
              />
              <RenderGitHubIcon
                topPos="135px"
                leftPos="42%"
                googleKeyWord={keyword}
              />
              <RenderCBIcon
                topPos="135px"
                leftPos="45%"
                googleKeyWord={keyword}
              />
            </>
          )}

          <SlugInput slug={slug} />

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
          {!logo && !isImageUpdated && (
            <ImageField className="w-full" source="logo.url" title="Logo" />
          )}
          <SelectInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer"
            choices={companyLayerChoices}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer_detail"
          />
          <ReferenceInput label="Coin" source="coin_id" reference="coins">
            <AutocompleteInput
              style={{padding: 0, border: "none"}}
              className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
              optionText="name"
              filterToQuery={search => ({ name: search })}
            />
          </ReferenceInput>
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_employees"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="notes"
            multiline
          />
          <TextInput
            multiline
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="overview"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="date_added"
            placeholder="YYYY-MM-DD"
            label="Date Added YYYY-MM-DD"
            validate={regex("[0-9]{4}-[0-9]{2}-[0-9]{2}", "")}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="year_founded"
          />
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="investor_amount"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_valuation"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="white_paper"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="market_verified"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_linkedin"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_token"
          />
          <SelectInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="status"
            choices={status}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="location"
          />
          <AutocompleteArrayInput
            choices={tags}
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
            source="tags"
            style={{padding: 0, border: "none"}}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="github"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="website"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="careers_page"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="company_linkedin"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="twitter"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="discord"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="glassdoor"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
        </SimpleForm>
      </div>
    </Edit>
    <TeamMemberEdit/>
    </div>
  );
};
