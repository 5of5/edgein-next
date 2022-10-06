// in posts.js
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
  Link
} from "react-admin";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

import { roundChoices, currencyChoices } from "../../utils/constants";
import BookIcon from "@mui/icons-material/Book";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import {
  companyLayerChoices,
  validateNameAndSlugAndEmailAndDomain,
  status,
  tags,
} from "../../utils/constants";
import { random } from "lodash";

import ContentSave from "@mui/icons-material/Save";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

export const companyIcon = BookIcon;

const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,website,velocity_linkedin,twitter,discord,glassdoor,year_founded"
    label="Name,Year Founded,Github,Website,Linkedin,Twitter,Discord,Glassdoor"
    resettable
    alwaysOn
  />,
  <ReferenceInput key="searchCoins" source="coin_id" reference="coins">
    <AutocompleteInput
      style={{padding: 0, border: "none"}}
      optionText="name"
      filterToQuery={search => ({ name: search })}
    />
  </ReferenceInput>,
  <SelectInput
    key="layer"
    source="layer"
    label="Layer"
    choices={companyLayerChoices}
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
    create("companies", { data });
    redirect("/companies");
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

export const CompanyList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = [
    "id",
    "name",
    "slug",
    "logo",
    "layer",
    "layer_detail",
    "coin_id",
    "total_employees",
    "github",
    "notes",
    "overview",
    "website",
    "careers_page",
    "company_linkedin",
    "year_founded",
    "investor_amount",
    "total_valuation",
    "white_paper",
    "market_verified",
    "velocity_linkedin",
    "velocity_token",
    "status",
    "aliases",
    "twitter",
    "location",
    "discord",
    "glassdoor",
    "tags",
  ];

  const { data: companies } = useGetList("companies", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = companies?.map((v) => {
    let sum = 0;
    for (var index in v) {
      if (index !== "tags") v[index] && headers.includes(index) ? sum++ : sum;
      else
        v[index] && headers.includes(index) && v[index].length > 0
          ? sum++
          : sum;
    }
    return { ...v, counter: sum + "/28" };
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
        data={renderData}
        sort={customSort}
        setSort={(value) => setCustomSort(value)}
      >
        <EditButton />
        <FunctionField render= {(record: any) => (<a target={"_blank"} rel="noreferrer" href={`https://edgein.io/companies/${record.slug}`}><Button label="Preview" /></a>)} />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <ImageField className="logoFile" source="logo.url" label="Logo" />
        <SelectField source="layer" choices={companyLayerChoices} />
        <TextField source="layer_detail" />
        <ReferenceField label="Coin" source="coin_id" reference="coins">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="total_employees" />
        <TextField source="github" />
        {/* <TextField cellClassName=" truncate h-5%" source="notes" /> */}
        <FunctionField
          cellClassName="truncate"
          source="notes"
          render={(record: any) =>
            record.notes && record.notes.length > 25
              ? `${record.notes.substring(0, 20)}...`
              : record.notes
          }
        />
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
        <TextField source="website" />
        <TextField source="careers_page" />
        <TextField source="company_linkedin" />
        <TextField source="year_founded" />
        <TextField source="investor_amount" />
        <TextField source="total_valuation" />
        <TextField source="white_paper" />
        <TextField source="market_verified" />
        <TextField source="velocity_linkedin" />
        <TextField source="velocity_token" />
        <TextField source="status" />
        <TextField source="aliases" />
        <TextField source="twitter" />
        <TextField source="location" />
        <TextField source="discord" />
        <TextField source="glassdoor" />
        <FunctionField
          source="tags"
          render={(record: any) => (record.tags ? record.tags.join() : "")}
        />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

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
      title={<CompanyTitle />}
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
          marginBottom: "60px",
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
          <div className="w-full">
            <InvestmentRoundsList />
          </div>
        </SimpleForm>
      </div>

    </Edit>

    </>
  );
};

const InvestmentRoundsList = () => {
  const [customSort, setCustomSort] = React.useState({
    field: "id",
    order: "ASC",
  });
  const { id } = useParams();
  const headers: string[] = [
    "id",
    "company_id",
    "round_date",
    "round",
    "amount",
    "currency",
    "valuation",
    "status",
  ];
  const { data } = useGetList("investment_rounds", {
    where: { company_id: id },
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'round_date', order: 'DESC' }
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, edit: '#/round/' + v.id };
  });

  return (
    <List
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
        data={renderData}
        bulkActionButtons={false}
      >
        <DateField source="round_date" sortable={false} />
        <TextField source="round" sortable={false} />
        <NumberField source="amount" sortable={false} />
        <SelectField source="currency" choices={currencyChoices} sortable={false} />
        <NumberField source="valuation" sortable={false} />
        <TextField source="status" sortable={false} />
        <EditButton resource={"investment_rounds"} />
      </Datagrid>
    </List>
  );
};

export const CompanyCreate = () => {
  const [logo, setLogo] = React.useState(null);
  const { data: companies } = useGetList("companies", {});
  const [slug, setSlug] = React.useState("");
  const formRef = useRef<any>(null);
  const [isIcon, setIsIcon] = useState(false);
  const [keyword, setKeyword] = useState("");

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = formdata.tags ? formdata.tags : [];
    const finalValue =
      typeof tagValue === "string" ? tagValue.split(",") : tagValue;
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
    setLogo(null);
  };

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
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
        sx={{
          ".MuiFormHelperText-root": {
            display: "block !important",
          },
        }}
      />
    );
  };

  return (
    <Create
      title="Create a Company"
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
          marginBottom: "60px",
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
            validateNameAndSlugAndEmailAndDomain(false, value, companies)
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
            onRemove={onDropRejected}
            options={{ onDrop: onSelect }}
            source="logo"
            label="logo"
            accept="image/*"
            placeholder={<p>Drop your file here</p>}
          >
            <ImageField source="src" title="title" />
          </FileInput>
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
              className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
              style={{padding: 0, border: "none"}}
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
          <TextInput
            placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="tags"
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
    </Create>
  );
};
