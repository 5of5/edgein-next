import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  AutocompleteInput,
  Confirm,
  List,
  TopToolbar,
  Datagrid,
  useGetList,
  ReferenceField,
  TextField,
  Button,
  ReferenceInput,
  Form,
  useRecordContext,
  useDelete,
  useCreate,
  useUpdate,
  useRefresh,
} from "react-admin";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ContentEdit from "@mui/icons-material/Edit";
import ContentSave from "@mui/icons-material/Save";
import ContentDelete from "@mui/icons-material/Delete";
import ContentCreate from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import MuiTextField from "@mui/material/TextField";
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
        label="Add News Organization"
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

  const [deleteOne] = useDelete("news_organizations", {
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

export const NewsOrganizations = () => {
  const { id: currentId } = useParams();
  const { data: newsOrganizationList = [] } = useGetList("news_organizations", {
    filter: { news_id: parseInt(currentId!) },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [currRecord, setCurrRecord] = useState<any>(null);

  const [create, { isLoading: isCreateLoading }] = useCreate();
  const [update, { isLoading: isUpdateLoading }] = useUpdate();

  const refresh = useRefresh();

  useEffect(() => {
    if (!isCreateLoading || !isUpdateLoading) refresh();
  }, [isCreateLoading, isUpdateLoading, refresh]);

  const [newsOrganizationData, setNewsOrganizationData] = useState<any>({
    company_id: "",
    vc_firm_id: "",
    type: "",
  });

  const handleEdit = (rec: any) => {
    setIsOpen(true);
    setCurrRecord(rec);
    setNewsOrganizationData({
      id: rec.id,
      company_id: rec.company_id,
      vc_firm_id: rec.vc_firm_id,
      type: rec.type,
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrRecord(null);
    setNewsOrganizationData({
      company_id: "",
      vc_firm_id: "",
      type: "",
    });
  };

  const handleChange = (target: number, value: any) => {
    if (target === 0)
      setNewsOrganizationData({
        ...newsOrganizationData,
        company_id: value,
      });
    else if (target === 1)
      setNewsOrganizationData({
        ...newsOrganizationData,
        vc_firm_id: value,
      });
    else
      setNewsOrganizationData({
        ...newsOrganizationData,
        type: value,
      });
  };

  const handleSave = () => {
    const data = {
      news_id: parseInt(currentId!),
      company_id:
        newsOrganizationData.company_id === ""
          ? null
          : newsOrganizationData.company_id,
      vc_firm_id:
        newsOrganizationData.vc_firm_id === ""
          ? null
          : newsOrganizationData.vc_firm_id,
      type: newsOrganizationData.type,
    };
    if (!currRecord) {
      if (data.company_id) {
        create("news_organizations", { data: { ...data, vc_firm_id: null } });
      }
      if (data.vc_firm_id) {
        create("news_organizations", { data: { ...data, company_id: null } });
      }
    } else {
      update("news_organizations", {
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
        <Datagrid bulkActionButtons={false} data={newsOrganizationList}>
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
          <TextField source="type" />
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
          <DialogTitle>News Organization</DialogTitle>
          <DialogContent>
            <Form defaultValues={currRecord}>
              {(!newsOrganizationData?.id || currRecord?.company_id) && (
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
                        handleChange(0, company_id);
                      }}
                    />
                  </ReferenceInput>
                </FormControl>
              )}

              {(!newsOrganizationData?.id || currRecord?.vc_firm_id) && (
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
                        handleChange(1, vc_firm_id);
                      }}
                    />
                  </ReferenceInput>
                </FormControl>
              )}

              <FormControl variant="filled" sx={{ width: "100%" }}>
                <MuiTextField
                  label="Type"
                  value={newsOrganizationData?.type}
                  onChange={(e) => handleChange(2, e.target.value)}
                  variant="filled"
                />
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
                  disabled={
                    !newsOrganizationData.company_id &&
                    !newsOrganizationData.vc_firm_id
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
