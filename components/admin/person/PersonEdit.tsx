import React, { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";

import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

import {
  ImageField,
  TextField,
  Edit,
  EditButton,
  TextInput,
  useGetList,
  Toolbar,
  Button,
  FileInput,
  FormDataConsumer,
  SelectInput,
  SimpleForm,
  useRefresh,
  // useGetOne,
} from "react-admin";

import {
  FormHelperText,
  Select,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";

import { random } from "lodash";
import { uploadFile, deleteFile } from "../../../utils/fileFunctions";
import {
  validateNameAndSlugAndEmailAndDomain,
  status,
} from "../../../utils/constants";



import { useParams } from "react-router-dom";
import { TeamMemberEdit } from './TeamMemberEdit';

interface TitleProps {
  record?: Record<string, string>;
}

const PeopleTitle = ({ record }: TitleProps) => {
  return <span>Person {record ? `"${record.name}"` : ""}</span>;
};


export const PersonEdit = () => {
  const [logo, setLogo] = useState(null);
  const [oldLogo, setOldLogo] = useState(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [slug, setSlug] = useState("");

  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");

  const { data: people } = useGetList("people", {});


  const { id: currentId } = useParams();
  // const { data: currentData } = useGetOne("companies", { id: currentId });
  //
  // useEffect(() => {
  //   if (currentData) setKeyword(currentData.name)
  // }, [currentData])



  const transform = async (data: any) => {
    var formdata = { ...data };
    if (oldLogo) {
      //delete old file from s3
      deleteFile(oldLogo);
    }
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        picture: res.file,
      };
      return formdata;
    } else {
      formdata = {
        ...data,
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
    filterSlug = people?.filter(
      (f) => f.slug === convertedValue && f.status !== "draft"
    );

    if (formData.slug === "") {
      if (filterSlug && filterSlug?.length > 0) {
        handleNameBlur(filterSlug[0].slug + "-" + random(10), formData);
      }
      if (filterSlug?.length === 0) {
        setSlug(convertedValue);
      }
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
    <>
      <Edit
        title={<PeopleTitle />}
        transform={transform}
        sx={{
          ".MuiPaper-root": {
            position: "relative",
          },
          ".MuiCardContent-root": {
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
        }}
      >
        <SimpleForm
          validate={(value) =>
            validateNameAndSlugAndEmailAndDomain(true, value, people)
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
            source="picture"
            label="picture"
            accept="image/*"
            placeholder={<p>Drop your file here</p>}
          >
            <ImageField source="src" title="title" />
          </FileInput>
          {!logo && !isImageUpdated && (
            <ImageField className="w-full" source="picture.url" title="Logo" />
          )}
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="type"
          />
          <SelectInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="status"
            choices={status}
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
            source="personal_email"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="work_email"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="linkedin"
            sx={{
              ".MuiFormHelperText-root": {
                display: "block !important",
              },
            }}
          />
        </SimpleForm>
      </Edit>
      <TeamMemberEdit/>
    </>
  );
};
