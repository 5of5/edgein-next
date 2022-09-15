// in posts.js
import React, { useEffect, useState } from "react";
import {
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
  FormDataConsumer,
  SelectInput,
  useGetList,
  Pagination,
  useRedirect,
  Toolbar,
  Button,
  useCreate,
  SaveButton,
  ReferenceField,
  SelectField,
  BooleanField,
  useRecordContext,
  TopToolbar,
  Confirm,
  useDelete,
  useUpdate,
  DateField,
  useRefresh,
} from "react-admin";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { useFormContext } from "react-hook-form";
import { random } from "lodash";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import {
  validateNameAndSlugAndEmailAndDomain,
  status,
  functionChoicesTM,
  seniorityChoicesTM,
} from "../../utils/constants";

import ContentSave from "@mui/icons-material/Save";
import ContentEdit from "@mui/icons-material/Edit";
import ContentCreate from "@mui/icons-material/Add";
import ContentDelete from "@mui/icons-material/Delete";
import {
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Select,
  Switch,
} from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import {
  RenderCBIcon,
  RenderGitHubIcon,
  RenderGoogleIcon,
  RenderLinkedinIcon,
} from "@/utils/other";

const filters = [
  <TextInput
    key="search"
    source="name,type"
    label="Search in name,type"
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
    create("people", { data });
    redirect("/people");
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
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PeopleList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = [
    "id",
    "name",
    "slug",
    "picture",
    "github",
    "type",
    "personal_email",
    "work_email",
    "linkedin",
    "status",
  ];
  const { data } = useGetList("people", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/10" };
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
        <ImageField className="logoFile" source="picture.url" label="Picture" />
        <TextField source="github" />
        <TextField source="type" />
        <TextField source="personal_email" />
        <TextField source="work_email" />
        <TextField source="linkedin" />
        <TextField source="status" />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};

interface TitleProps {
  record?: Record<string, string>;
}

const PeopleTitle = ({ record }: TitleProps) => {
  return <span>Person {record ? `"${record.name}"` : ""}</span>;
};

export const PeopleEdit = () => {
  const [logo, setLogo] = useState(null);
  const [oldLogo, setOldLogo] = useState(null);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [slug, setSlug] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currRecord, setCurrRecord] = useState<any>(null);
  const [teamData, setTeamData] = useState<any>({
    team_id: -1,
    company_id: "",
    founder: false,
    function: "",
    seniority: "",
    start_date: "",
    end_date: "",
    title: "",
  });

  const [isError, setIsError] = useState(false);
  const [filterData, setFilterData] = useState<any>([]);
  const [isIcon, setIsIcon] = useState(true);
  const [keyword, setKeyword] = useState("");

  const { data: people } = useGetList("people", {});
  const { data: company } = useGetList("companies", {});
  const { data: member } = useGetList("team_members", {});

  const refresh = useRefresh();
  const [create, { isLoading: isCreateLoading }] = useCreate();
  const [update, { isLoading: isUpdateLoading }] = useUpdate();

  const paths = window.location.href.split("/");
  const currentId = paths[paths.length - 1];

  useEffect(() => {
    setFilterData(member?.filter((f) => f.person_id === parseInt(currentId)));
  }, [currentId, member]);

  useEffect(() => {
    if (!isCreateLoading || !isUpdateLoading) refresh();
  }, [isCreateLoading, isUpdateLoading, refresh]);

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

  const handleEdit = (rec: any) => {
    setIsOpen(true);
    setCurrRecord(rec);
    setTeamData({
      team_id: rec.id,
      company_id: rec.company_id,
      founder: rec.founder,
      function: rec.function,
      seniority: rec.seniority,
      start_date: rec.start_date,
      end_date: rec.end_date,
      title: rec.title,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsError(false);
    setCurrRecord(null);
    setTeamData({
      company_id: "",
      founder: false,
      function: "",
      seniority: "",
      start_date: "",
      end_date: "",
      title: "",
    });
  };

  const handleChange = (target: number, value: any) => {
    if (target === 0) setTeamData({ ...teamData, company_id: value });
    else if (target === 1) setTeamData({ ...teamData, function: value });
    else if (target === 2) setTeamData({ ...teamData, seniority: value });
    else if (target === 3) setTeamData({ ...teamData, start_date: value });
    else if (target === 4) setTeamData({ ...teamData, end_date: value });
    else if (target === 5) setTeamData({ ...teamData, title: value });
    else setTeamData({ ...teamData, founder: value });
  };

  const handleSave = () => {
    if (!teamData.company_id) setIsError(true);
    else {
      const data = {
        person_id: parseInt(currentId),
        company_id: teamData.company_id,
        function: teamData.function,
        seniority: teamData.seniority,
        start_date: teamData.start_date,
        end_date: teamData.end_date,
        title: teamData.title,
        founder: teamData.founder,
      };
      if (!currRecord) {
        create("team_members", { data });
      } else {
        let tData = filterData;
        let foundIndex = tData.findIndex((r: any) => r.id === teamData.team_id);
        update("team_members", {
          id: currRecord.id,
          data,
          previousData: tData[foundIndex],
        });
      }
      handleClose();
    }
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
      <List
        pagination={false}
        actions={<ListActions onCreate={() => setIsOpen(true)} />}
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
        <Datagrid bulkActionButtons={false} data={filterData}>
          <ReferenceField
            label="Company"
            source="company_id"
            reference="companies"
          >
            <TextField source="name" />
          </ReferenceField>
          <SelectField source="function" choices={functionChoicesTM} />
          <DateField source="start_date" />
          <DateField source="end_date" />
          <SelectField source="seniority" choices={seniorityChoicesTM} />
          <TextField source="title" />
          <BooleanField source="founder" />
          <CustomEditButton onEdit={(rec: any) => handleEdit(rec)} />
          <CustomDeleteButton />
        </Datagrid>
      </List>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
      >
        <DialogTitle>TeamMember</DialogTitle>
        <DialogContent>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel>Company</InputLabel>
            <Select
              value={teamData?.company_id}
              onChange={(e) => handleChange(0, e.target.value)}
            >
              {company?.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
            {isError && (
              <FormHelperText sx={{ color: "red" }}>
                Company is required
              </FormHelperText>
            )}
          </FormControl>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel>Function</InputLabel>
            <Select
              value={teamData?.function}
              onChange={(e) => handleChange(1, e.target.value)}
            >
              {functionChoicesTM?.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <InputLabel>Seniority</InputLabel>
            <Select
              value={teamData?.seniority}
              onChange={(e) => handleChange(2, e.target.value)}
            >
              {seniorityChoicesTM?.map((r) => (
                <MenuItem key={r.id} value={r.id}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <MuiTextField
              label="Start date"
              type="date"
              value={teamData?.start_date}
              onChange={(e) => handleChange(3, e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <MuiTextField
              label="End date"
              type="date"
              value={teamData?.end_date}
              onChange={(e) => handleChange(4, e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ width: "100%" }}>
            <MuiTextField
              label="Title"
              value={teamData?.title}
              onChange={(e) => handleChange(5, e.target.value)}
              variant="filled"
            />
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={teamData?.founder}
                onChange={(e) => handleChange(6, e.target.checked)}
              />
            }
            label="Founder"
          />
          <FormControl
            variant="filled"
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Button label="Cancel" variant="text" onClick={handleClose} />
            <Button
              label="Save"
              variant="contained"
              onClick={handleSave}
              startIcon={<ContentSave />}
            />
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const ListActions = ({ onCreate }: any) => {
  return (
    <TopToolbar>
      <Button
        label="Add as Team Member"
        variant="text"
        onClick={onCreate}
        startIcon={<ContentCreate />}
      />
    </TopToolbar>
  );
};

export const CustomEditButton = ({ onEdit }: any) => {
  const record = useRecordContext();

  return (
    <Button
      label="Edit"
      variant="text"
      onClick={() => onEdit(record)}
      startIcon={<ContentEdit />}
    />
  );
};

export const CustomDeleteButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);

  const [deleteOne] = useDelete("team_members", {
    id: record.id,
    previousData: record,
  });
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    deleteOne();
    setOpen(false);
  };

  return (
    <>
      <Button
        label="Delete"
        variant="text"
        sx={{ color: "red" }}
        onClick={() => setOpen(true)}
        startIcon={<ContentDelete />}
      />
      <Confirm
        isOpen={open}
        title="Remove Information"
        content={`Are you sure you want to delete ${record.function}?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const PeopleCreate = () => {
  const [logo, setLogo] = useState(null);
  const [isIcon, setIsIcon] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { data: people } = useGetList("people", {});
  const [slug, setSlug] = React.useState("");

  const transform = async (data: any) => {
    var formdata = { ...data };
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
    setLogo(null);
  };

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined;
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = people?.filter(
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
    <Create
      title="Create a Person"
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
        },
        ".MuiFormHelperText-root": {
          display: "none",
        },
      }}
    >
      <div className="customForm" style={{ position: "relative" }}>
        <SimpleForm
          validate={(value) =>
            validateNameAndSlugAndEmailAndDomain(false, value, people)
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
      </div>
    </Create>
  );
};
