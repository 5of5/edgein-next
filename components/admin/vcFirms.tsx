// in posts.js
import * as React from "react";
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
  useGetList,
  FormDataConsumer
} from "react-admin";
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { validateName, validateSlug, validateUrl, status, validateNameAndSlugAndEmailAndDomain } from "../../utils/constants"
import { random } from "lodash";
import { useFormContext } from "react-hook-form";

const filters = [
  <TextInput key="search" source="name" label="Search in name" resettable alwaysOn />
];

export const VcFirmList = () => (
  <List filters={filters}
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
  const [logo, setLogo] = React.useState(null)
  const [oldLogo, setOldLogo] = React.useState(null)
  const [isImageUpdated, setIsImageUpdated] = React.useState(false)
  const { data: vcFirm } = useGetList('vc_firms', {});
  const [slug, setSlug] = React.useState('')

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
    filterSlug = vcFirm?.filter(f => f.slug === convertedValue)

    if (filterSlug && filterSlug?.length > 0) {
      handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue)
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
    </Edit>
  )
}

export const VcFirmCreate = () => {
  const [logo, setLogo] = React.useState(null)
  const { data: vcFirm } = useGetList('vc_firms', {});
  const [slug, setSlug] = React.useState('')

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
    filterSlug = vcFirm?.filter(f => f.slug === convertedValue)

    if (filterSlug && filterSlug?.length > 0) {
      handleNameBlur(filterSlug[0].slug + '-' + random(10), formData)
    }
    if (filterSlug?.length === 0) {
      setSlug(convertedValue)
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
      <SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, vcFirm)}>
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
    </Create>
  )
}
