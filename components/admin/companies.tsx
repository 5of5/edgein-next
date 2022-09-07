// in posts.js
import React, { FC, useRef, useState } from 'react';
import { FunctionField, AutocompleteInput, FileInput, ImageField, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, SelectField, ReferenceField, NumberField, ReferenceInput, SelectInput, NumberInput, useGetList, FormDataConsumer, Pagination } from 'react-admin';
import { useForm, useFormContext } from "react-hook-form";
import BookIcon from '@mui/icons-material/Book';
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import { companyLayerChoices, validateNameAndSlugAndEmailAndDomain, status, crunchbaseImg } from "../../utils/constants"
import { random } from "lodash";

import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export const companyIcon = BookIcon;

const filters = [
  <TextInput key="search" source="name,layer" label="Search in name, layer" resettable alwaysOn />,
  <ReferenceInput key="searchCoins" source="coin_id" reference="coins">
    <AutocompleteInput
      optionText={choice =>
        `${choice.name}`
      }
    />
  </ReferenceInput>
];

const PostPagination = () => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />;

export const CompanyList = () => (

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
      <SelectField source="layer" choices={companyLayerChoices} />
      <TextField source="layer_detail" />
      <ReferenceField label="Coin" source="coin_id" reference="coins">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="total_employees" />
      <TextField source="github" />
      {/* <TextField cellClassName=" truncate h-5%" source="notes" /> */}
      <FunctionField cellClassName="truncate" source="notes" render={(record: any) => (record.notes && record.notes.length > 25) ? `${record.notes.substring(0, 20)}...` : record.notes} />
      {/* <TextField cellClassName=" truncate h-5%" source="overview" /> */}
      <FunctionField cellClassName="truncate" source="overview" render={(record: any) => (record.overview && record.overview.length > 25) ? `${record.overview.substring(0, 20)}...` : record.overview} />
      <TextField source="website" />
      <TextField source="careers_page" />
      <TextField source="company_linkedin" />
      <TextField source="year_founded" />
      <TextField source="investor_amount" />
      <TextField source="total_valuation" />
      <TextField source="white_paper" />
      <TextField source="market_verified" />
      <TextField source="velocity_linkedin" />
      <TextField source="velocity_token" />
      <TextField source="status" />
      <TextField source="aliases" />
      <TextField source="twitter" />
      <TextField source="location" />
      <TextField source="discord" />
      <TextField source="glassdoor" />
      <FunctionField source="tags" render={(record: any) => (record.tags) ? record.tags.join() : ''} />
    </Datagrid>
  </List>
);

interface CompanyTitleProps {
  record?: Record<string, string>;
}
const CompanyTitle = ({ record }: CompanyTitleProps) => {
  return <span>Company {record ? `"${record.name}"` : ""}</span>;
};

export const CompanyEdit = () => {
  const [logo, setLogo] = React.useState(null)
  const [oldLogo, setOldLogo] = React.useState(null)
  const [isImageUpdated, setIsImageUpdated] = React.useState(false)
  const { data: companies } = useGetList('companies', {});
  const [slug, setSlug] = React.useState('')
  const formRef = useRef<any>(null)

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
        coin_id: (!data.coin_id) ? null : data.coin_id,
        logo: res.file,
        tags: finalValue
      }
      return formdata
    } else {
      formdata = {
        ...data,
        coin_id: (!data.coin_id) ? null : data.coin_id,
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
    filterSlug = companies?.filter(f => f.slug === convertedValue)

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

  return (
    <Edit title={<CompanyTitle />} transform={transform}
      sx={{
        '.MuiCardContent-root': {
          '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row !important',
          },
          marginBottom: '60px'
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
        <SimpleForm className="border rounded-lg" validate={(value) => validateNameAndSlugAndEmailAndDomain(true, value, companies)}>
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
          <SelectInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer"
            choices={companyLayerChoices}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer_detail"
          />
          <ReferenceInput label="Coin" source="coin_id" reference="coins">
            <SelectInput
              className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
              optionText="name"
            />
          </ReferenceInput>
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_employees"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="notes"
            multiline
          />
          <TextInput
            multiline
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="overview"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="year_founded"
          />
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="investor_amount"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_valuation"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="white_paper"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="market_verified"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_linkedin"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_token"
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
            placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="tags"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="github"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
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
            source="careers_page"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="company_linkedin"
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
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="discord"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="glassdoor"
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
};

export const CompanyCreate = () => {
  const [logo, setLogo] = React.useState(null)
  const { data: companies } = useGetList('companies', {});
  const [slug, setSlug] = React.useState('')
  const formRef = useRef<any>(null)
  const [isIcon, setIsIcon] = useState(false)
  const [keyword, setKeyword] = useState('');

  const transform = async (data: any) => {
    var formdata = { ...data };
    const tagValue = (formdata.tags) ? formdata.tags : []
    const finalValue = (typeof tagValue === "string") ? tagValue.split(',') : tagValue
    if (logo) {
      const res = await uploadFile(logo);
      formdata = {
        ...data,
        coin_id: (!data.coin_id) ? null : data.coin_id,
        logo: res.file,
        tags: finalValue
      }
      return formdata
    } else {
      formdata = {
        ...data,
        coin_id: (!data.coin_id) ? null : data.coin_id,
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

  const handleNameBlur = (value: string, formData: any) => {
    let filterSlug: any[] | undefined
    let convertedValue = value.replace(/ /g, "-").toLowerCase();
    filterSlug = companies?.filter(f => f.slug === convertedValue)

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

  return (
    <Create title="Create a Company" transform={transform}
      sx={{
        '.MuiCardContent-root': {
          '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row !important',
          },
          marginBottom: '60px'
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
      }}>
      <div className='customForm' ref={formRef} style={{ position: 'relative' }}>
        <SimpleForm validate={(value) => validateNameAndSlugAndEmailAndDomain(false, value, companies)}>
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

          <FileInput onRemove={onDropRejected} options={{ onDrop: onSelect }} source="logo" label="logo" accept="image/*" placeholder={<p>Drop your file here</p>}>
            <ImageField source="src" title="title" />
          </FileInput>
          <SelectInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer"
            choices={companyLayerChoices}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="layer_detail"
          />
          <ReferenceInput label="Coin" source="coin_id" reference="coins">
            <SelectInput
              className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
              optionText="name"
            />
          </ReferenceInput>
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_employees"
          />

          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="notes"
            multiline
          />
          <TextInput
            multiline
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="overview"
          />

          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="year_founded"
          />
          <NumberInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="investor_amount"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="total_valuation"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="white_paper"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="market_verified"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_linkedin"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="velocity_token"
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
            placeholder="Enter comma separated tags. eg. Financial Software, Marketing Software"
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="tags"
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="github"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
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
            source="careers_page"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="company_linkedin"
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
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="discord"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />
          <TextInput
            className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            source="glassdoor"
            sx={{
              '.MuiFormHelperText-root': {
                display: 'block !important',
              }
            }}
          />

        </SimpleForm>
      </div>
    </Create>
  );
};