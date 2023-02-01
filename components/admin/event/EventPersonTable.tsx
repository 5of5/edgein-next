import React, { useState, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import ContentEdit from "@mui/icons-material/Edit";
import ContentSave from "@mui/icons-material/Save";
import ContentDelete from "@mui/icons-material/Delete";
import ContentCreate from "@mui/icons-material/Add";

import { useParams } from "react-router-dom";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import {
  AutocompleteInput,
  Confirm,
  List,
  TopToolbar,
  Datagrid,
  useGetList,
  ReferenceField,
  TextField,
  SelectField,
  Button,
  ReferenceInput,
  Form,
  useRecordContext,
  useDelete,
  useCreate,
  useUpdate,
  useRefresh,
} from "react-admin";

import { eventPersonTypeChoices } from "../../../utils/constants";

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
        label="Add Event Person"
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

  const [deleteOne] = useDelete("event_person", {
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
        content={`Are you sure you want to delete this ${record.type}?`}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const EventPersonTable = () => {
  const { id: currentId } = useParams();
  const { data: eventPersonList } = useGetList("event_person", {
    filter: { event_id: parseInt(currentId!) },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currRecord, setCurrRecord] = useState<any>(null);

  const [create, { isLoading: isCreateLoading }] = useCreate();
  const [update, { isLoading: isUpdateLoading }] = useUpdate();

  const refresh = useRefresh();

  useEffect(() => {
    if (!isCreateLoading || !isUpdateLoading) refresh();
  }, [isCreateLoading, isUpdateLoading, refresh]);

  const [eventPersonData, setEventPersonData] = useState<any>({
    person_id: "",
    type: "",
  });

  const handleEdit = (rec: any) => {
    setIsOpen(true);
    setCurrRecord(rec);
    setEventPersonData({
      id: rec.id,
      person_id: rec.person_id,
      type: rec.type,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrRecord(null);
    setEventPersonData({
      person_id: "",
      type: "",
    });
  };

  const handleChange = (target: number, value: any) => {
    if (target === 0)
      setEventPersonData({ ...eventPersonData, person_id: value });
    else setEventPersonData({ ...eventPersonData, type: value });
  };

  const handleSave = () => {
    const data = {
      event_id: parseInt(currentId!),
      person_id: eventPersonData.person_id,
      type: eventPersonData.type,
    };
    if (!currRecord) {
      create("event_person", { data });
    } else {
      update("event_person", {
        id: currRecord.id,
        data,
        previousData: currRecord,
      });
    }
    handleClose();
  };

  return (
    <>
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
        <Datagrid bulkActionButtons={false} data={eventPersonList}>
          <TextField source="id" />
          <ReferenceField
            label="Person"
            source="person_id"
            reference="people"
            sortable={false}
          >
            <TextField source="name" />
          </ReferenceField>
          <SelectField
            source="type"
            choices={eventPersonTypeChoices}
            sortable={false}
          />
          <CustomEditButton onEdit={(rec: any) => handleEdit(rec)} />
          <CustomDeleteButton />
        </Datagrid>
      </List>
      {isOpen && (
        <Dialog
          open={true}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth="xs"
          onClose={handleClose}
        >
          <DialogTitle>Event Person</DialogTitle>
          <DialogContent>
            <Form>
              <FormControl
                variant="filled"
                sx={{
                  width: "100%",
                  ".MuiAutocomplete-root .MuiFormHelperText-root": {
                    display: "none",
                  },
                }}
              >
                <ReferenceInput
                  label="Person"
                  source="person_id"
                  reference="people"
                >
                  <AutocompleteInput
                    defaultValue={currRecord?.person_id}
                    optionText="name"
                    optionValue="id"
                    filterToQuery={(search) => ({ name: search })}
                    onChange={(person_id) => {
                      handleChange(0, person_id);
                    }}
                    onCreate={(person_id) => {
                      handleChange(0, person_id);
                    }}
                  />
                </ReferenceInput>
              </FormControl>
              <FormControl variant="filled" sx={{ width: "100%" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={eventPersonData?.type}
                  onChange={(e) => handleChange(1, e.target.value)}
                >
                  {eventPersonTypeChoices?.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="filled"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 4,
                }}
              >
                <Button label="Cancel" variant="text" onClick={handleClose} />
                <Button
                  label="Save"
                  variant="contained"
                  onClick={handleSave}
                  disabled={!eventPersonData.person_id || !eventPersonData.type}
                  startIcon={<ContentSave />}
                />
              </FormControl>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
