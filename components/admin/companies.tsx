// in posts.js
import * as React from "react";
import { FormDataConsumer, FileInput, ImageField, List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, SelectField, ReferenceField, NumberField, ReferenceInput, SelectInput, NumberInput, required, minLength, maxLength, number, minValue, maxValue } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
import uniqid from 'uniqid';
var axios = require('axios');
// import { S3FileInput } from '@fusionworks/ra-s3-input';
export const companyIcon = BookIcon;

const validateName = [required(), minLength(3)];
const validateSlug = [required(), minLength(3)];
const validateYearFounded = [number(), minValue(1900), maxValue(2099)];

export const CompanyList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="slug" />
            <SelectField source="layer" choices={[
                {
                    id: "Layer 0",
                    name: "Layer 0 - Native Code"
                },
                {
                    id: "Layer 1",
                    name: "Layer 1 - Programmable Blockchains / Networks"
                },
                {
                    id: "Layer 2",
                    name: "Layer 2 - Nodes / Node Providers / Data Platforms"
                },
                {
                    id: "Layer 3",
                    name: "Layer 3 - API's / API Providers / Systems"
                },
                {
                    id: "Layer 4",
                    name: "Layer 4 - Decentralized Platforms / Contract / Modeling"
                },
                {
                    id: "Layer 5",
                    name: "Layer 5 - Applications"
                },
                {
                    id: "Layer 6",
                    name: "Layer 6 - Interoperable Digital Assets / NFT's"
                },
            ]} />
            <TextField source="layer_detail" />
            <ReferenceField label="Coin" source="coin_id" reference="coins">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="total_employees" />
            <TextField source="github" />
            <TextField source="notes" />
            <TextField source="overview" />
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
    return <span>Company {record ? `"${record.name}"` : ''}</span>;
};

export const CompanyEdit = () => (
    <Edit title={<CompanyTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" validate={validateName} />
            <TextInput source="slug" validate={validateSlug} />
            <SelectField source="layer" choices={[
                {
                    id: "Layer 0",
                    name: "Layer 0 - Native Code"
                },
                {
                    id: "Layer 1",
                    name: "Layer 1 - Programmable Blockchains / Networks"
                },
                {
                    id: "Layer 2",
                    name: "Layer 2 - Nodes / Node Providers / Data Platforms"
                },
                {
                    id: "Layer 3",
                    name: "Layer 3 - API's / API Providers / Systems"
                },
                {
                    id: "Layer 4",
                    name: "Layer 4 - Decentralized Platforms / Contract / Modeling"
                },
                {
                    id: "Layer 5",
                    name: "Layer 5 - Applications"
                },
                {
                    id: "Layer 6",
                    name: "Layer 6 - Interoperable Digital Assets / NFT's"
                },
            ]} />
            <TextInput source="layer_detail" />
            <ReferenceInput label="Coin" source="coin_id" reference="coins">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberField source="total_employees" />
            <TextInput source="github" />
            <TextInput source="notes" />
            <TextInput source="overview" />
            <TextInput source="website" />
            <TextInput source="careers_page" />
            <TextInput source="company_linkedin" />
            <NumberInput source="year_founded" min="1900" max="2099" validate={validateYearFounded} />
            <NumberInput source="investor_amount" />
            <NumberInput source="total_valuation" />
            <TextInput source="white_paper" />
            <TextInput source="market_verified" />
            <TextInput source="velocity_linkedin" />
            <TextInput source="velocity_token" />
        </SimpleForm>
    </Edit>
);

export const CompanyCreate = () => {

    const [signedUrl, setSignedUrl] = React.useState('')
    const [slug, setSlug] = React.useState('')

    React.useEffect(() => {
      //  getSignedUrl()
    }, [])

    const getSignedUrl = async () => {
        try {
            const signUrl = await fetch("/api/uploadS3Image?file=abc.jpg/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ file: 'abc.jpg' }),
            }).then(res => res.json())
            console.log("url ==", signUrl)
            setSignedUrl(signUrl.url)
        } catch (e) {
            console.log(e);
        }
    }

    const uploadTos3 = async (file) => {

        try {
            const signUrl = await fetch("/api/uploadS3Image?file=abc.jpg/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ file: 'abc.jpg' }),
            }).then(res => res.json())



            var options = { headers: { 'Content-Type': file.type, 'x-amz-acl': 'private'} };
            // const formData = new FormData();
            // formData.append('file', file);

            axios.put(signUrl.url, file, options)
            .then(response => {
                console.log("result =", response);
            }).catch(error => {
                console.log("*****  " + error)
            });

            console.log("url ==", signUrl)
            setSignedUrl(signUrl.url)
        } catch (e) {
            console.log(e);
        }
    }

    const getSelectedFiles = async (file) => {
        console.log("logo value =", file)
        uploadTos3(file[0])

        //upload to s3
        return file
    }

    return (
        <Create title="Create a Company">
            <SimpleForm defaultValues={{ external_id: uniqid() }}>
                <TextInput source="name" validate={validateName} />
                <TextInput source="slug" validate={validateSlug} />
                 {/* <FileInput accept="image/*" source="logo" label="Logo" options={{ onDrop: (files) => getSelectedFiles(files) }}>
                    <ImageField source="src" title="title" />
                </FileInput> */}

                {/* <S3FileInput
          source='photo'
          apiRoot='localhost:3000/' // your api server
          fileCoverImg="someImgURL" // cover img for non-img files
         // multipleFiles // allaw to save multiple files for that source
          uploadOptions={{
            signingUrl: 'localhost:3000/s3/sign', // api point to your server for S3 signin,
            s3path: signedUrl, // path to folder from S3 where wil be saved file
            //multiple: true, // for selecting multiple files from file system
          }}
        /> */}
                <SelectField source="layer" choices={[
                    {
                        id: "Layer 0",
                        name: "Layer 0 - Native Code"
                    },
                    {
                        id: "Layer 1",
                        name: "Layer 1 - Programmable Blockchains / Networks"
                    },
                    {
                        id: "Layer 2",
                        name: "Layer 2 - Nodes / Node Providers / Data Platforms"
                    },
                    {
                        id: "Layer 3",
                        name: "Layer 3 - API's / API Providers / Systems"
                    },
                    {
                        id: "Layer 4",
                        name: "Layer 4 - Decentralized Platforms / Contract / Modeling"
                    },
                    {
                        id: "Layer 5",
                        name: "Layer 5 - Applications"
                    },
                    {
                        id: "Layer 6",
                        name: "Layer 6 - Interoperable Digital Assets / NFT's"
                    },
                ]} />
                <TextInput source="layer_detail" />
                <ReferenceInput label="Coin" source="coin_id" reference="coins">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <NumberInput source="total_employees" />
                <TextInput source="github" />
                <TextInput source="notes" />
                <TextInput source="overview" />
                <TextInput source="website" />
                <TextInput source="careers_page" />
                <TextInput source="company_linkedin" />
                {/* <NumberInput source="year_founded" min="1900" max="2099" validate={validateYearFounded} /> */}
                <TextInput source="year_founded"  />
                
                <NumberInput source="investor_amount" />
                <TextInput source="total_valuation" />
                <TextInput source="white_paper" />
                <TextInput source="market_verified" />
                <TextInput source="velocity_linkedin" />
                <TextInput source="velocity_token" />
                {/* <FormDataConsumer>
                    {
                        ({formData}) => {
                            if(formData.name && (!formData.slug || formData.slug =="")){
                               
                                formData.slug = formData.name.toLowerCase().replace(' ', '-')
                                setSlug(formData.name.toLowerCase().replace(' ', '-'))
                                console.log("m here", formData)
                            }
                        }
                    }
                </FormDataConsumer> */}
            </SimpleForm>
        </Create>
    );
}