
import React, { useState } from "react";

import {
  ImageField,
  List,
  Datagrid,
  TextField,
  EditButton,
  TextInput,
  useGetList,
  Pagination,
  Toolbar,
  Button,
  TopToolbar,
} from "react-admin";


const filters = [
  <TextInput
    key="search"
    className="w-[500px]"
    source="name,github,personal_email,work_email,linkedin"
    label="Name,Github,Personal Email,Work Email,Linkedin"
    resettable
    alwaysOn
  />,
];
const PostPagination = () => (
  <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 250]} />
);

export const PersonList = () => {
  const [customSort, setCustomSort] = useState({ field: "id", order: "ASC" });
  const headers: string[] = [
    "id",
    "name",
    "slug",
    "picture",
    "github",
    "type",
    "personal_email",
    "work_email",
    "linkedin",
    "status",
  ];
  const { data } = useGetList("people", {
    pagination: { page: 1, perPage: 10 },
  });
  let renderData = data?.map((v) => {
    let sum = 0;
    for (var index in v) {
      v[index] && headers.includes(index) ? sum++ : sum;
    }
    return { ...v, counter: sum + "/10" };
  });

  const sortWithData = (sortData: any) => {
    const isAscending = customSort.order === "ASC";
    if (isAscending) {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? 1 : -1
      );
    } else {
      sortData = sortData.sort((a: any, b: any) =>
        a[customSort.field] > b[customSort.field] ? -1 : 1
      );
    }
    return sortData;
  };
  renderData = renderData && sortWithData(renderData);

  return (
    <List
      filters={filters}
      pagination={<PostPagination />}
      sx={{
        ".MuiToolbar-root": {
          justifyContent: "start !important",
          paddingTop: 0,
          marginBottom: "4px",
        },
        ".RaBulkActionsToolbar-toolbar": {
          justifyContent: "start !important",
        },
        ".MuiToolbar-root .MuiButtonBase-root": {
          paddingTop: 0,
          paddingBottom: 0,
          margin: "4px",
        },
        ".RaBulkActionsToolbar-topToolbar": {
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
        },
        ".MuiToolbar-root form": {
          flex: "0 1 auto",
        },
        ".MuiToolbar-root form .MuiFormControl-root": {
          margin: 0,
        },
      }}
    >
      <Datagrid
      // data={renderData}
      // sort={customSort}
      // setSort={(value) => setCustomSort(value)}
      >
        <EditButton />
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="slug" />
        <ImageField className="logoFile" source="picture.url" label="Picture" />
        <TextField source="github" />
        <TextField source="type" />
        <TextField source="personal_email" />
        <TextField source="work_email" />
        <TextField source="linkedin" />
        <TextField source="status" />
        {/* <TextField source="counter" /> */}
      </Datagrid>
    </List>
  );
};
