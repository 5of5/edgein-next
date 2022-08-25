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
var axios = require('axios');

const postFilters = [
	<SearchInput key="search" source="name,slug" resettable alwaysOn />
];

export const VcFirmList = () => (
  <List filters={postFilters}>
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

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];
const validateUrl = regex(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, 'Must be a valid Url')

export const VcFirmEdit = () => {

  const [logo, setLogo] = React.useState(null)
  const [oldLogo, setOldLogo] = React.useState(null)
  const [isImageUpdated, setIsImageUpdated] = React.useState(false)

  const getUrl = async (files: any) => {
    const s3url = await fetch("/api/uploadS3Image?file=abc.jpg", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fileType: files.type})
    }).then(res => res.json());
   
     //upload to s3
    const response = await axios.put(s3url.url, files)
    return s3url
  }

  const deleteFile = async (file : any) => {
    const response = await fetch(`/api/deleteS3Image?file=${file.filename}`, {
      method: "GET"
    }).then(res => res.json());
  }

  const transform = async (data: any) => {
   var formdata = {...data};
   if(oldLogo){
    //delete old file from s3
    deleteFile(oldLogo)
  }
   if(logo){
     const res = await getUrl(logo);
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

  const getUrl = async (files: any) => {
    const s3url = await fetch("/api/uploadS3Image?file=abc.jpg", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fileType: files.type})
    }).then(res => res.json());
   
     //upload to s3
    const response = await axios.put(s3url.url, files)
    return s3url

  }

  const transform = async (data: any) => {
   var formdata = {...data};
   console.log("formdata=", formdata)
   if(logo){
     const res = await getUrl(logo);
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
