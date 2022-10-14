import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import ContentEdit from "@mui/icons-material/Edit";
import ContentSave from "@mui/icons-material/Save";
import ContentDelete from "@mui/icons-material/Delete";
import ContentCreate from "@mui/icons-material/Add";

import { useParams } from "react-router-dom";

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
  AutocompleteInput,
  BooleanField,
  Confirm,
  TopToolbar,
  List,
  Edit,
  Datagrid,
  useGetList,
  ReferenceField,
  TextField,
  SelectField,
  DateField,
  Button,
  ReferenceInput,
  Form,
  useRecordContext,
  useDelete,
  useCreate,
  useUpdate,
  useGetOne,
  useRefresh,
  useEditContext,
} from "react-admin";

import {
  functionChoicesTM,
  seniorityChoicesTM,
} from "../../../utils/constants";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListActions = ({ onCreate }: any) => {
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

const CustomEditButton = ({ onEdit }: any) => {
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


const CustomDeleteButton = () => {
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

export const TeamMemberEdit = () => {
  const { record, isLoading } = useEditContext();
  const { id: currentId } = useParams();
  const { data: member } = useGetList("team_members", { filter: { "person_id": parseInt(currentId!) } });
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currRecord, setCurrRecord] = useState<any>(null);

  const [create, { isLoading: isCreateLoading }] = useCreate();
  const [update, { isLoading: isUpdateLoading }] = useUpdate();

  const refresh = useRefresh();

  useEffect(() => {
    if (!isCreateLoading || !isUpdateLoading) refresh();
  }, [isCreateLoading, isUpdateLoading, refresh]);

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
        person_id: parseInt(currentId!),
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
        let foundIndex = member.findIndex((r: any) => r.id === teamData.team_id);
        update("team_members", {
          id: currRecord.id,
          data,
          previousData: member[foundIndex],
        });
      }
      handleClose();
    }
  };

  return (<><List
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
    <Datagrid bulkActionButtons={false}
      data={member}
    >
      <ReferenceField
        label="Company"
        source="company_id"
        reference="companies"
        sortable={false}
      >
        <TextField source="name"/>
      </ReferenceField>
      <SelectField source="function" choices={functionChoicesTM} sortable={false}/>
      <DateField source="start_date" sortable={false} />
      <DateField source="end_date" sortable={false} />
      <SelectField source="seniority" choices={seniorityChoicesTM} sortable={false}/>
      <TextField source="title" sortable={false} />
      <BooleanField source="founder" sortable={false} />
      <CustomEditButton onEdit={(rec: any) => handleEdit(rec)} />
      <CustomDeleteButton />
    </Datagrid>
  </List>
  {isOpen && <Dialog
    open={true}
    TransitionComponent={Transition}
    keepMounted
    fullWidth
    maxWidth="xs"
    onClose={handleClose}
  >
    <DialogTitle>TeamMember</DialogTitle>
    <DialogContent>
      <Form>
      <FormControl variant="filled" sx={{ width: "100%", ".MuiAutocomplete-root .MuiFormHelperText-root": { display: "none" }}}>
        <ReferenceInput
         label="Company" source="company_id" reference="companies">
          <AutocompleteInput
            defaultValue={currRecord?.company_id}
            optionText="name"
            optionValue="id"
            filterToQuery={search => ({ name: search })}
            onChange={(company_id) => { handleChange(0, company_id)} }
          />
       </ReferenceInput>
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
    </Form>
    </DialogContent>
  </Dialog>}
  </>);
}
