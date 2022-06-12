// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
export const companyIcon = BookIcon;

export const CompanyList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="layer" />
            <TextField source="average_note" />
            <TextField source="views" />
            <EditButton />
        </Datagrid>
    </List>
);

const CompanyTitle = ({ record }) => {
    return <span>Company {record ? `"${record.name}"` : ''}</span>;
};

export const CompanyEdit = () => (
    <Edit title={<CompanyTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="layer" />
        </SimpleForm>
    </Edit>
);

export const CompanyCreate = () => (
    <Create title="Create a Company">
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="teaser" options={{ multiline: true }} />
            <TextInput multiline source="body" />
            <TextInput label="Publication date" source="published_at" />
            <TextInput source="average_note" />
        </SimpleForm>
    </Create>
);