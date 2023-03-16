import { useState } from "react";
import { Button, Confirm, useRecordContext } from "react-admin";

const UserResetPasswordButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleDialogClose = () => setOpen(false);

  const handleConfirm = async () => {
    await fetch("/api/change_password/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: record.email }),
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        label="Reset password"
        sx={{ marginLeft: "1rem", padding: "6px 16px", fontSize: "0.9rem" }}
        onClick={handleClick}
      />
      <Confirm
        isOpen={open}
        title={`Reset password user ${record?.display_name}`}
        content="Are you sure you want to reset this user's password?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default UserResetPasswordButton;
