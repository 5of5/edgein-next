// in posts.js
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FunctionField,
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
  SelectInput,
  FormDataConsumer,
  Pagination,
  SaveButton,
  Toolbar,
  useCreate,
  useGetList,
  useRedirect,
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import {
  status,
  validateNameAndSlugAndEmailAndDomain,
} from "../../utils/constants";
import { random } from "lodash";
import { useFormContext } from "react-hook-form";

import useWindowDimensions from "@/hooks/useWindowDimensions";
import ContentSave from "@mui/icons-material/Save";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

const filters = [
  <TextInput
    key="search"
    source="name"
    label="Search in name"
    resettable
    alwaysOn
  />,
];

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

const CustomToolbar = () => {
  const form = useFormContext();
  const [create] = useCreate();
  const redirect = useRedirect();

  const handleSaveDraft = () => {
    let data = form.getValues();
    data.status = "draft";
    create("vc_firms", { data });
    redirect("/vc_firms");
  };

  return (
    <Toolbar>
      <SaveButton />
      <Button
        label="Save As Draft"
        sx={{ marginLeft: "1rem", padding: "6px 16px", fontSize: "0.9rem" }}
        variant="outlined"
        onClick={handleSaveDraft}
        startIcon={<ContentSave />}
      />
    </Toolbar>
  );
};

export const VcFirmList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = [
    "id",
    "name",
    "slug",
    "logo",
    "website",
    "linkedin",
    "status",
    "overview",
    "year_founded",
    "twitter",
    "location",
    "tags",
  ];
  const { data } = useGetList("vc_firms", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/12" };
  });

  const sortWithData = (sortData: any) => {
    const isAscending = customSort.order === "ASC";
    if (isAscending) {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? 1 : -1
      );
    } else {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? -1 : 1
      );
    }
    return sortData;
  };
  renderData = renderData && sortWithData(renderData);

  return (
    <List
      filters={filters}
      pagination={<PostPagination />}
      sx={{
        ".MuiToolbar-root": {
          justifyContent: "start !important",
          paddingTop: 0,
          marginBottom: "4px",
        },
        ".RaBulkActionsToolbar-toolbar": {
          justifyContent: "start !important",
        },
        ".MuiToolbar-root .MuiButtonBase-root": {
          paddingTop: 0,
          paddingBottom: 0,
          margin: "4px",
        },
        ".RaBulkActionsToolbar-topToolbar": {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        ".MuiToolbar-root form": {
          flex: "0 1 auto",
        },
        ".MuiToolbar-root form .MuiFormControl-root": {
          margin: 0,
        },
      }}
    >
      <Datagrid
        // data={renderData}
        // sort={customSort}
        // setSort={(value) => setCustomSort(value)}
      >
        <EditButton />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <ImageField className="logoFile" source="logo.url" label="Logo" />
        <TextField source="website" />
        <TextField source="linkedin" />
        <TextField source="status" />
        {/* <TextField cellClassName=" truncate h-5%" source="overview" /> */}
        <FunctionField
          cellClassName="truncate"
          source="overview"
          render={(record: any) =>
            record.overview && record.overview.length > 25
              ? `${record.overview.substring(0, 20)}...`
              : record.overview
          }
        />
        <TextField source="year_founded" />
        <TextField source="twitter" />
        <TextField source="location" />
        <FunctionField
          source="tags"
          render={(record: any) => (record.tags ? record.tags.join() : "")}
        />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const VcFirmTitle = ({ record }: TitleProps) => {
  return <span>Vc Firm {record ? `"${record.name}"` : ""}</span>;
};

export const VcFirmEdit = () => {
  const [logo, setLogo] = useState(null);
  const [oldLogo, setOldLogo] = useState(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const { data: vcFirm } = useGetList("vc_firms", {});
  const [slug, setSlug] = React.useState("");
  const formRef = useRef<any>(null);
  const { height } = useWindowDimensions();
  const [formHeight, setFormHeight] = useState(0);
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (formRef?.current?.clientHeight + 100 >= height)
      setFormHeight(formRef?.current?.clientHeight + 100);
  }, [formRef?.current?.clientHeight, height]);

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
    if (files.id) {
      setOldLogo(files);
    }
    setIsImageUpdated(true);
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

  const handleCheckScreenHeight = () => {
    setFormHeight(formRef?.current?.clientHeight + 100);
  };

  return (
    <Edit
      title={<VcFirmTitle />}
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
    </Edit>
  );
};

export const VcFirmCreate = () => {
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
          toolbar={<CustomToolbar />}
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
