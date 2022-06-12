// in posts.js
import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, EditButton, TextInput, ReferenceField, ReferenceInput, SelectInput } from 'react-admin';
import BookIcon from '@mui/icons-material/Book';
export const companyIcon = BookIcon;

export const InvestmentRoundsList = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="round" />
            <ReferenceField label="Company" source="company_id" reference="companies">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);

const InvestmentRoundsTitle = ({ record }) => {
    return <span>Round {record ? `"${record.name}"` : ''}</span>;
};

export const InvestmentRoundsEdit = () => (
    <Edit title={<InvestmentRoundsTitle />}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="round" />
            <ReferenceField label="Company" source="company_id" reference="companies">
                <TextField source="name" />
            </ReferenceField>
        </SimpleForm>
    </Edit>
);

export const InvestmentRoundsCreate = () => (
    <Create title="Create a Investment Round">
        <SimpleForm>
            <TextInput source="round" />
            <ReferenceInput label="Company" source="company_id" reference="companies">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);