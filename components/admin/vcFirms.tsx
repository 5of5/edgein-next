// in posts.js
import React, { FC, useEffect, useRef, useState } from 'react';
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
import { status, validateNameAndSlugAndEmailAndDomain, crunchbaseImg } from "../../utils/constants"
import { random } from "lodash";
import { useFormContext } from "react-hook-form";

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import ContentSave from '@mui/icons-material/Save';

const filters = [
  <TextInput key="search" source="name" label="Search in name" resettable alwaysOn />
];

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

const CustomToolbar = () => {
  const form = useFormContext();
  const [create] = useCreate();
  const redirect = useRedirect()

  const handleSaveDraft = () => {
    let data = form.getValues()
    data.status = 'draft'
    create('vc_firms', { data })
    redirect('/vc_firms')
  }

  return (
    <Toolbar>
      <SaveButton />
      <Button
        label="Save As Draft"
        sx={{ marginLeft: '1rem', padding: '6px 16px', fontSize: '0.9rem', }}
        variant="outlined"
        onClick={handleSaveDraft}
        startIcon={<ContentSave />}
      />
    </Toolbar>
  );
};

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
  const { data: vcFirm } = useGetList('vc_firms', {});
  const [slug, setSlug] = React.useState('')
  const formRef = useRef<any>(null)
  const { height } = useWindowDimensions();
  const [formHeight, setFormHeight] = useState(0)

  useEffect(() => {
    if (formRef?.current?.clientHeight + 100 >= height)
      setFormHeight(formRef?.current?.clientHeight + 100)
  }, [formRef?.current?.clientHeight, height])

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

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = vcFirm?.filter(f => f.slug === convertedValue && f.status !== 'draft')

    if (formData.slug === '') {
      if (filterSlug && filterSlug?.length > 0) {
        handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
      }
      if (filterSlug?.length === 0) {
        setSlug(convertedValue)
      }
    }
  }

  const SlugInput = ({ slug }: any) => {
    const { setValue } = useFormContext();

    React.useEffect(() => {
      if (slug !== '')
        setValue('slug', slug)
    }, [slug, setValue])

    return (
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        sx={{
          '.MuiFormHelperText-root': {
            display: 'block !important',
          }
        }}
      />
    );
  };

  const handleCheckScreenHeight = () => {
    setFormHeight(formRef?.current?.clientHeight + 100)
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
          marginBottom: formHeight >= height ? '60px' : 0
        },
        '.MuiToolbar-root': {
          position: 'fixed',
          width: '100%',
          maxWidth: 'inherit',
          bottom: 0,
          zIndex: 100,
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },
        '.MuiFormHelperText-root': {
          display: 'none',
        },
        '.customForm': {
          '& > form': {
            maxWidth: formRef?.current?.offsetWidth || '100%'
          }
        }
      }}
    >
      <div className='customForm' ref={formRef} style={{ position: 'relative' }}>
        <SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, vcFirm)}>
          <TextInput className="w-full px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none" disabled source="id" />
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <TextInput
                className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
                source="name"
                onBlur={e => handleNameBlur(e.target.value, formData)}
                sx={{
                  '.MuiFormHelperText-root': {
                    display: 'block !important',
                  }
                }}
                {...rest}
              />
            )}
          </FormDataConsumer>
          <SlugInput slug={slug} />

          <FileInput className="w-full" onRemove={onDropRejected} options={{ onDrop: onSelect }} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
            <ImageField source="src" title="title" />
          </FileInput>
          {
            (!logo && !isImageUpdated) &&
            <ImageField className="w-full" source="logo.url" title="Logo" />
          }
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
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="linkedin"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="twitter"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
        </SimpleForm>
      </div>
    </Edit>
  )
}

export const VcFirmCreate = () => {
  const [logo, setLogo] = useState(null)
  const [isIcon, setIsIcon] = useState(false)
  const [keyword, setKeyword] = useState('');
  const { data: vcFirm } = useGetList('vc_firms', {});
  const [slug, setSlug] = React.useState('')
  const formRef = useRef<any>(null)
  const { height } = useWindowDimensions();
  const [formHeight, setFormHeight] = useState(0)

  useEffect(() => {
    if (formRef?.current?.clientHeight + 100 >= height)
      setFormHeight(formRef?.current?.clientHeight + 100)
  }, [formRef?.current?.clientHeight, height])

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

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = vcFirm?.filter(f => f.slug === convertedValue && f.status !== 'draft')

    if (formData.slug === '') {
      if (filterSlug && filterSlug?.length > 0) {
        handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
      }
      if (filterSlug?.length === 0) {
        setSlug(convertedValue)
      }
    }
  }

  const SlugInput = ({ slug }: any) => {
    const { setValue } = useFormContext();

    React.useEffect(() => {
      if (slug !== '')
        setValue('slug', slug)
    }, [slug, setValue])

    return (
      <TextInput
        className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="slug"
        sx={{
          '.MuiFormHelperText-root': {
            display: 'block !important',
          }
        }}
      />
    );
  };

  type Props = {
    googleKeyWord: string,
  };
  const RenderGoogleIcon: FC<Props> = ({ googleKeyWord }) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord
    return (
      <div style={{ position: 'absolute', top: '70px' }}>
        <a href={url} target="_blank" rel="noreferrer">
          <GoogleIcon />
        </a>
      </div>)
  }

  const RenderLinkedinIcon: FC<Props> = ({ googleKeyWord }) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + " Linkedin"

    return (
      <div style={{ position: 'absolute', top: '70px', left: '45px' }}>
        <a href={url} target="_blank" rel="noreferrer">
          <LinkedInIcon /></a>
      </div>)
  }

  const RenderGitHubIcon: FC<Props> = ({ googleKeyWord }) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + " Github"

    return (
      <div style={{ position: 'absolute', top: '70px', left: '80px' }}>
        <a href={url} target="_blank" rel="noreferrer">
          <GitHubIcon />
        </a>
      </div>)
  }

  const RenderCBIcon: FC<Props> = ({ googleKeyWord }) => {
    const url = "https://www.google.com/search?q=" + googleKeyWord + "  Crunchbase"

    return (
      <div style={{ position: 'absolute', top: '70px', left: '115px' }}>
        <a href={url} target="_blank" rel="noreferrer">
          <img
            className="w-[25px] h-[25px]"
            src={crunchbaseImg}
            alt={crunchbaseImg}
          />
        </a>
      </div>)
  }

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  }

  const handleCheckScreenHeight = () => {
    setFormHeight(formRef?.current?.clientHeight + 100)
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
          marginBottom: formHeight >= height ? '60px' : 0
        },
        '.MuiToolbar-root': {
          position: 'fixed',
          width: '100%',
          maxWidth: 'inherit',
          bottom: 0,
          zIndex: 100,
          background: '#fff',
          borderRadius: '4px',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },
        '.MuiFormHelperText-root': {
          display: 'none',
        },
        '.customForm': {
          '& > form': {
            maxWidth: formRef?.current?.offsetWidth || '100%'
          }
        }
      }}
    >
      <div className='customForm' ref={formRef} style={{ position: 'relative' }}>
        <SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, vcFirm)} toolbar={<CustomToolbar />}>
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <TextInput
                className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
                source="name"
                onBlur={e => handleNameBlur(e.target.value, formData)}
                onChange={handleIcon}
                sx={{
                  '.MuiFormHelperText-root': {
                    display: 'block !important',
                  }
                }}
                {...rest}
              />
            )}
          </FormDataConsumer>
          {isIcon &&
            <>
              <RenderGoogleIcon googleKeyWord={keyword} />
              <RenderLinkedinIcon googleKeyWord={keyword} />
              <RenderGitHubIcon googleKeyWord={keyword} />
              <RenderCBIcon googleKeyWord={keyword} />
            </>}
          <SlugInput slug={slug} />
          <FileInput className="w-full" onRemove={onDropRejected} options={{ onDrop: onSelect }} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
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
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="linkedin"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="twitter"
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
