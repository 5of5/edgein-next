// in posts.js
import React, { useEffect, useRef, useState } from "react";
import {
  FileInput,
  ImageField,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  FormDataConsumer,
  useCreate,
  useGetList,
  useRedirect,
} from "react-admin";
import { uploadFile, deleteFile } from "@/utils/fileFunctions";
import {
  status,
  validateNameAndSlugAndEmailAndDomain,
} from "@/utils/constants";
import { random } from "lodash";
import { useFormContext } from "react-hook-form";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";
import ElemToolbar from "../ElemToolbar";
import ElemSlugInput from "../ElemSlugInput";

export const VcFirmCreate = () => {
  const [create] = useCreate();
  const redirect = useRedirect();

  const [logo, setLogo] = useState(null);
  const [isIcon, setIsIcon] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { data: vcFirm } = useGetList("vc_firms", {});
  const [slug, setSlug] = React.useState("");
  const formRef = useRef<any>(null);
  const { height } = useWindowDimensions();
  const [formHeight, setFormHeight] = useState(0);

  useEffect(() => {
    if (formRef?.current?.clientHeight + 100 >= height)
      setFormHeight(formRef?.current?.clientHeight + 100);
  }, [formRef?.current?.clientHeight, height]);

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = formdata.tags ? formdata.tags : [];
    const finalValue =
      typeof tagValue === "string" ? tagValue.split(",") : tagValue;
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        logo: res.file,
        tags: finalValue,
      };
      return formdata;
    } else {
      formdata = {
        ...data,
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
    setLogo(null);
  };

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined;
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = vcFirm?.filter(
      (f) => f.slug === convertedValue && f.status !== "draft"
    );

    if (filterSlug && filterSlug?.length > 0) {
      handleNameBlur(filterSlug[0].slug + "-" + random(10), formData);
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue);
    }
  };

  const handleSaveDraft = (data: any) => {
    data.status = "draft";
    create("vc_firms", { data });
    redirect("/vc_firms");
  };

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  const handleCheckScreenHeight = () => {
    setFormHeight(formRef?.current?.clientHeight + 100);
  };

  return (
    <Create
      title="Create a VC Firm"
      transform={transform}
      sx={{
        ".MuiCardContent-root": {
          "& > div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "row !important",
          },
          marginBottom: formHeight >= height ? "60px" : 0,
        },
        ".MuiToolbar-root": {
          position: "fixed",
          width: "100%",
          maxWidth: "inherit",
          bottom: 0,
          zIndex: 100,
          background: "#fff",
          borderRadius: "4px",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
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
          validate={(value) =>
            validateNameAndSlugAndEmailAndDomain(false, value, vcFirm)
          }
          toolbar={<ElemToolbar onSaveDraft={handleSaveDraft} />}
        >
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
              <>
                <RenderGoogleIcon
                  topPos="75px"
                  leftPos="36%"
                  googleKeyWord={keyword}
                />
                <RenderLinkedinIcon
                  topPos="75px"
                  leftPos="39%"
                  googleKeyWord={keyword}
                />
                <RenderGitHubIcon
                  topPos="75px"
                  leftPos="42%"
                  googleKeyWord={keyword}
                />
                <RenderCBIcon
                  topPos="75px"
                  leftPos="45%"
                  googleKeyWord={keyword}
                />
              </>
            </>
          )}
          <ElemSlugInput slug={slug} />
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
          <TextInput
            className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="overview"
            onChange={handleCheckScreenHeight}
            multiline
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
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="year_founded"
          />
          <TextInput
            placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="tags"
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
            source="linkedin"
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
        </SimpleForm>
      </div>
    </Create>
  );
};
