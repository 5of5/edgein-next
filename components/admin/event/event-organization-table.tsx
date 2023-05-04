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
  SelectField,
  TextField,
  Button,
  ReferenceInput,
  TextInput,
  Form,
  useRecordContext,
  useDelete,
  useCreate,
  useUpdate,
  useRefresh,
} from "react-admin";

import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { eventOrganizationTypeChoices } from "@/utils/constants";

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
        label="Add Event Organization"
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

  const [deleteOne] = useDelete("event_organization", {
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
        content="Are you sure you want to delete this organization?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export const EventOrganizationTable = () => {
  const { id: currentId } = useParams();
  const { data: eventOrganizationList } = useGetList("event_organization", {
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

  const [eventOrganizationData, setEventOrganizationData] = useState<any>({
    company_id: "",
    vc_firm_id: "",
  });

  const handleEdit = (rec: any) => {
    setIsOpen(true);
    setCurrRecord(rec);
    setEventOrganizationData({
      id: rec.id,
      company_id: rec.company_id,
      vc_firm_id: rec.vc_firm_id,
      type: rec.type,
      sponsor_type: rec.sponsor_type,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrRecord(null);
    setEventOrganizationData({
      company_id: "",
      vc_firm_id: "",
    });
  };

  const handleChange = (field: string, value: any) => {
    setEventOrganizationData({
      ...eventOrganizationData,
      [field]: value,
    });
  };

  const handleSave = () => {
    const data = {
      event_id: parseInt(currentId!),
      type: eventOrganizationData.type,
      sponsor_type:
        eventOrganizationData.type === "sponsor"
          ? eventOrganizationData.sponsor_type
          : null,
      company_id:
        eventOrganizationData.company_id === ""
          ? null
          : eventOrganizationData.company_id,
      vc_firm_id:
        eventOrganizationData.vc_firm_id === ""
          ? null
          : eventOrganizationData.vc_firm_id,
    };
    if (!currRecord) {
      if (data.company_id) {
        create("event_organization", { data: { ...data, vc_firm_id: null } });
      }
      if (data.vc_firm_id) {
        create("event_organization", { data: { ...data, company_id: null } });
      }
    } else {
      update("event_organization", {
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
        <Datagrid bulkActionButtons={false} data={eventOrganizationList}>
          <TextField source="id" />
          <ReferenceField
            label="Company"
            source="company_id"
            reference="companies"
            sortable={false}
          >
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField
            label="VC firm"
            source="vc_firm_id"
            reference="vc_firms"
            sortable={false}
          >
            <TextField source="name" />
          </ReferenceField>
          <SelectField
            source="type"
            choices={eventOrganizationTypeChoices}
            sortable={false}
          />
          <TextField source="sponsor_type" />
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
          <DialogTitle>Event Organization</DialogTitle>
          <DialogContent>
            <Form defaultValues={currRecord}>
              {(!eventOrganizationData?.id || currRecord?.company_id) && (
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
                    label="Company"
                    source="company_id"
                    reference="companies"
                  >
                    <AutocompleteInput
                      optionText="name"
                      optionValue="id"
                      filterToQuery={(search) => ({ name: search })}
                      onChange={(company_id) => {
                        handleChange("company_id", company_id);
                      }}
                    />
                  </ReferenceInput>
                </FormControl>
              )}

              {(!eventOrganizationData?.id || currRecord?.vc_firm_id) && (
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
                    label="VC firm"
                    source="vc_firm_id"
                    reference="vc_firms"
                  >
                    <AutocompleteInput
                      optionText="name"
                      optionValue="id"
                      filterToQuery={(search) => ({ name: search })}
                      onChange={(vc_firm_id) => {
                        handleChange("vc_firm_id", vc_firm_id);
                      }}
                    />
                  </ReferenceInput>
                </FormControl>
              )}

              <FormControl variant="filled" sx={{ width: "100%" }}>
                <InputLabel>Type</InputLabel>
                <Select
                  defaultValue={currRecord?.type}
                  value={eventOrganizationData?.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  {eventOrganizationTypeChoices?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {eventOrganizationData?.type === "sponsor" && (
                <FormControl variant="filled" sx={{ width: "100%" }}>
                  <TextInput
                    source="sponsor_type"
                    defaultValue={currRecord?.sponsor_type}
                    onChange={(e) =>
                      handleChange("sponsor_type", e.target.value)
                    }
                  />
                </FormControl>
              )}

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
                  disabled={
                    !eventOrganizationData.company_id &&
                    !eventOrganizationData.vc_firm_id
                  }
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
