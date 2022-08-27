// in posts.js
import * as React from "react";
import { SearchInput, FileInput, ImageField, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, SelectField, ReferenceField, NumberField, ReferenceInput, SelectInput, NumberInput, required, minLength, maxLength, number, minValue, maxValue, regex } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import { uploadFile, deleteFile } from "../../utils/fileFunctions";
import {companyLayerChoices, validateName, validateSlug, validateUrl} from "../../utils/constants"
export const companyIcon = BookIcon;

const filters = [
  <SearchInput key="search" source="name,slug,overview,notes" resettable alwaysOn />
];

export const CompanyList = () => (

  <List filters={filters}
    sx={{
      ".css-gp0tzt-MuiToolbar-root-RaTopToolbar-root": {
        paddingLeft: 0,
        paddingRight: 0,
        position: "absolute",
        left: "1200px",
      },
    }}
  >
    <Datagrid>
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
      <TextField cellClassName=" truncate h-5%" source="notes" />
      <TextField cellClassName=" truncate h-5%" source="overview" />
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
      <EditButton />
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
        coin_id: (!data.coin_id) ? null : data.coin_id,
        logo: res.file
      }
      return formdata
   }else {
    formdata = {
      ...data,
      coin_id: (!data.coin_id) ? null : data.coin_id
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
  <Edit title={<CompanyTitle />} transform={transform}>
    <SimpleForm className="border rounded-lg">
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        disabled
        source="id"
      />
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
       <SelectInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="layer"
        choices={companyLayerChoices}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="layer_detail"
      />
      <ReferenceInput label="Coin" source="coin_id" reference="coins">
        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          optionText="name"
        />
      </ReferenceInput>
      <NumberField
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="total_employees"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="github"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="notes"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="overview"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="website"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="careers_page"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="company_linkedin"
        validate={validateUrl}
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="year_founded"
      // min="1900"
      // max="2099"
      // validate={validateYearFounded}
      />
      <NumberInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="investor_amount"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="total_valuation"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="white_paper"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="market_verified"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="velocity_linkedin"
      />
      <TextInput
        className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
        source="velocity_token"
      />
    </SimpleForm>
  </Edit>
)
};

export const CompanyCreate = () => {

  const [logo, setLogo] = React.useState(null)

  const transform = async (data: any) => {
   var formdata = {...data};
   if(logo){
     const res = await uploadFile(logo);
      formdata = {
        ...data,
        coin_id: (!data.coin_id) ? null : data.coin_id,
        logo: res.file
      }
      return formdata
   }else {
    formdata = {
      ...data,
      coin_id: (!data.coin_id) ? null : data.coin_id
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

  return (
    <Create title="Create a Company" transform={transform}>
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

        <SelectInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="layer"
          choices={companyLayerChoices}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="layer_detail"
        />
        <ReferenceInput label="Coin" source="coin_id" reference="coins">
          <SelectInput
            className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
            optionText="name"
          />
        </ReferenceInput>
        <NumberInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="total_employees"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="github"
          validate={validateUrl}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="notes"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="overview"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="website"
          validate={validateUrl}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="careers_page"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="company_linkedin"
          validate={validateUrl}
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="year_founded"
        // min="1900"
        // max="2099"
        // validate={validateYearFounded}
        />
        <NumberInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="investor_amount"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="total_valuation"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="white_paper"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="market_verified"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="velocity_linkedin"
        />
        <TextInput
          className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
          source="velocity_token"
        />
      </SimpleForm>
    </Create>
  );
};
