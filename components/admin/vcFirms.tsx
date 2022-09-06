// in posts.js
import React, { FC, useRef, useState } from 'react';
import {
  FunctionField,
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
  regex,
  SelectInput,
  Pagination
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateName, validateSlug, validateUrl, status } from "../../utils/constants"

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';


const filters = [
  <TextInput key="search" source="name" label="Search in name" resettable alwaysOn />
];

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

export const VcFirmList = () => (
  <List filters={filters}
    pagination={<PostPagination />}
    sx={{
      '.css-1d00q76-MuiToolbar-root-RaListToolbar-root': {
        justifyContent: 'flex-start'
      }
    }}
  >
    <Datagrid>
      <EditButton />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <ImageField source="logo.url" label="Logo" />
      <TextField source="website" />
      <TextField source="linkedin" />
      <TextField source="status" />
      {/* <TextField cellClassName=" truncate h-5%" source="overview" /> */}
      <FunctionField cellClassName="truncate" source="overview" render={(record: any) => (record.overview && record.overview.length > 25) ? `${record.overview.substring(0, 20)}...` : record.overview} />
      <TextField source="year_founded" />
      <TextField source="twitter" />
      <TextField source="location" />
      <FunctionField source="tags" render={(record: any) => (record.tags) ? record.tags.join() : ''} />
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

  const [logo, setLogo] = useState(null)
  const [oldLogo, setOldLogo] = useState(null)
  const [isImageUpdated, setIsImageUpdated] = useState(false)

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = (formdata.tags) ? formdata.tags : []
    const finalValue = (typeof tagValue === "string") ? tagValue.split(',') : tagValue

    if (oldLogo) {
      //delete old file from s3
      deleteFile(oldLogo)
    }
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        logo: res.file,
        tags: finalValue
      }
      return formdata
    } else {
      formdata = {
        ...data,
        tags: finalValue
      }
      return formdata
    }
  };

  const onSelect = (files: any) => {
    if (files && files.length > 0) {
      setLogo(files[0])
    } else {
      setLogo(null)
    }
  }

  const onDropRejected = (files: any) => {
    if (files.id) {
      setOldLogo(files)
    }
    setIsImageUpdated(true)
    setLogo(null)
  }
  return (
    <Edit title={<VcFirmTitle />} transform={transform}
      sx={{
        '.MuiCardContent-root': {
          '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row !important',
          },
        },
        '.MuiFormHelperText-root': {
          display: 'none',
        }
      }}
    >
      <SimpleForm>
        <TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          validate={validateName}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="slug"
          validate={validateSlug}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <FileInput onRemove={onDropRejected} options={{ onDrop: onSelect }} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
          <ImageField source="src" title="title" />
        </FileInput>
        {
          (!logo && !isImageUpdated) &&
          <ImageField source="logo.url" title="Logo" />
        }
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="overview"
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
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="linkedin"
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="twitter"
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
      </SimpleForm>
    </Edit>
  )
}

export const VcFirmCreate = () => {
  const [logo, setLogo] = useState(null)
  const [isIcon, setIsIcon] = useState(false)
  const [keyword, setKeyword] = useState('');

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = (formdata.tags) ? formdata.tags : [];
    const finalValue = (typeof tagValue === "string") ? tagValue.split(',') : tagValue;
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        logo: res.file,
        tags: finalValue
      }
      return formdata
    } else {
      formdata = {
        ...data,
        tags: finalValue
      }
      return formdata
    }
  };

  const onSelect = (files: any) => {
    if (files && files.length > 0) {
      setLogo(files[0])
    } else {
      setLogo(null)
    }
  }

  const onDropRejected = (files: any) => {
    setLogo(null)
  }

  type Props = {
    googleKeyWord: string,
  };
  const RenderGoogleIcon: FC<Props> = ({googleKeyWord}) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord
    return(
    <div style={{ position: 'absolute', top: '70px' }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GoogleIcon />
      </a>
    </div>)
  }

  const RenderLinkedinIcon: FC<Props> = ({googleKeyWord}) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + " Linkedin"

    return (
      <div style={{ position: 'absolute', top: '70px', left: '45px' }}>
      <a href={url} target="_blank" rel="noreferrer">
          <LinkedInIcon /></a>
      </div>)
  }
  const RenderGitHubIcon: FC<Props> = ({googleKeyWord}) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + " Github"

    return (
    <div style={{ position: 'absolute', top: '70px', left: '80px' }}>
      <a href={url} target="_blank" rel="noreferrer">
        <GitHubIcon />
      </a>
    </div>)
  }

  const RenderCBIcon: FC<Props> = ({googleKeyWord}) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + "  Crunchbase"

    return (
    <div style={{ position: 'absolute', top: '70px', left: '115px' }}>
      <a href={url} target="_blank" rel="noreferrer">
        <img src="https://www.vectorlogo.zone/logos/crunchbase/crunchbase-icon.svg" alt="cb_logo" width="25px" height="25px"/>
      </a>
    </div>)
  }


  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  }

  return (
    <Create title="Create a VC Firm" transform={transform}
      sx={{
        '.MuiCardContent-root': {
          '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row !important',
          },
        },
        '.MuiFormHelperText-root': {
          display: 'none',
        }
      }}
    >
    <div className='customForm' style={{ position: 'relative' }}>

      <SimpleForm>
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="name"
          validate={validateName}
          onChange={handleIcon}

          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        {isIcon &&
            <>
              <RenderGoogleIcon googleKeyWord={keyword}/>
              <RenderLinkedinIcon googleKeyWord={keyword}/>
              <RenderGitHubIcon googleKeyWord={keyword}/>
              <RenderCBIcon googleKeyWord={keyword}/>
          </>}
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="slug"
          validate={validateSlug}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <FileInput className="w-full" onRemove={onDropRejected} options={{ onDrop: onSelect }} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
          <ImageField source="src" title="title" />
        </FileInput>
        <TextInput
          className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="overview"
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
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="linkedin"
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
        <TextInput
          className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="twitter"
          validate={validateUrl}
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            }
          }}
        />
      </SimpleForm>
      </div>
    </Create>
  )
}
