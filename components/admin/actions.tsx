// in posts.js
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  FilterButton,
  TopToolbar,
  TextInput,
  FilterForm,
  ListBase,
} from 'react-admin';

const postFilters = [<TextInput key={2} label="Action" source="action" />];

const ListToolbar = () => (
  <div>
    <FilterForm filters={postFilters} />
    <div>
      <FilterButton filters={postFilters} />
    </div>
  </div>
);

export const ActionsList = () => (
  <ListBase>
    <ListToolbar />
    <Datagrid>
      <TextField source="id" />
      <TextField source="action" />
      <TextField source="page" />
      <TextField source="user" />
      <TextField source="properties" />
    </Datagrid>
  </ListBase>
);
