// in posts.js
import * as React from "react";
import {
  SearchInput,
  FileInput, ImageField,
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  required,
  minLength,
  regex
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import {validateName, validateSlug, validateUrl} from "../../utils/constants"

const filters = [
	<SearchInput key="search" source="name,slug" resettable alwaysOn />
];

export const VcFirmList = () => (
  <List filters={filters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField source="logo.url" label="Logo" />
      <TextField source="website" />
      <TextField source="linkedin" />
      <EditButton />
    </Datagrid>
  </List>
);

interface TitleProps {
  record?: Record<string, string>;
}

const VcFirmTitle = ({ record }: TitleProps) => {
  return <span>Vc Firm {record ? `"${record.name}"` : ""}</span>;
};

export const VcFirmEdit = () => {

  const [logo, setLogo] = React.useState(null)
  const [oldLogo, setOldLogo] = React.useState(null)
  const [isImageUpdated, setIsImageUpdated] = React.useState(false)

  const transform = async (data: any) => {
   var formdata = {...data};
   if(oldLogo){
    //delete old file from s3
    deleteFile(oldLogo)
  }
   if(logo){
     const res = await uploadFile(logo);
      formdata = {
        ...data,
        logo: res.file
      }
      console.log("formdata=", formdata)
      return formdata
   }else {
    formdata = {
      ...data
    }
    return formdata
   }
  };

  const onSelect = (files: any) => {
    if(files && files.length > 0){
      setLogo(files[0])
    }else{
      setLogo(null)
    }
  }

  const onDropRejected = (files: any) => {
    if(files.id){
      setOldLogo(files)
    }
    setIsImageUpdated(true)
    setLogo(null)
  }
return(
  <Edit title={<VcFirmTitle />} transform={transform}>
    <SimpleForm>
      <TextInput  className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
        validate={validateName}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={validateSlug}
      />
       <FileInput onRemove={onDropRejected} options={{onDrop:onSelect}} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
          <ImageField source="src" title="title" />
        </FileInput>
      {
        (!logo && !isImageUpdated) &&
        <ImageField source="logo.url" title="Logo" />
      }
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="linkedin"
        validate={validateUrl}
      />
    </SimpleForm>
  </Edit>
)
}

export const VcFirmCreate = () => {
  const [logo, setLogo] = React.useState(null)

  const transform = async (data: any) => {
   var formdata = {...data};
   console.log("formdata=", formdata)
   if(logo){
     const res = await uploadFile(logo);
      formdata = {
        ...data,
        logo: res.file
      }
      console.log("formdata=", formdata)
      return formdata
   }else {
    formdata = {
      ...data
    }
    return formdata
   }
  };

  const onSelect = (files: any) => {
    if(files && files.length > 0){
      setLogo(files[0])
    }else{
      setLogo(null)
    }
  }

  const onDropRejected = (files: any) => {
    setLogo(null)
  }

  return(
  <Create title="Create a VC Firm" transform={transform}>
    <SimpleForm>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="name"
        validate={validateName}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        validate={validateSlug}
      />
      <FileInput onRemove={onDropRejected} options={{onDrop:onSelect}} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
          <ImageField source="src" title="title" />
        </FileInput>
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="linkedin"
        validate={validateUrl}
      />
    </SimpleForm>
  </Create>
)}
