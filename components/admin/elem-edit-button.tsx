import React from "react";
import { Button, useRecordContext } from "react-admin";
import ContentEdit from "@mui/icons-material/Edit";

type Props = {
  onClickEdit?: any;
};

const ElemEditButton = ({ onClickEdit }: Props) => {
  const record = useRecordContext();

  return (
    <Button
      label="Edit"
      variant="text"
      onClick={() => onClickEdit(record)}
      startIcon={<ContentEdit />}
    />
  );
};

export default ElemEditButton;
