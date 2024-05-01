import { generatePassword } from '@/utils';
import { useState } from 'react';
import {
  Button,
  Confirm,
  useRecordContext,
  useNotify,
  useRefresh,
} from 'react-admin';
import { useMutation } from 'react-query';

const UserResetPasswordButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  const handleDialogClose = () => setOpen(false);

  const { mutate, isLoading } = useMutation(
    () =>
      fetch('/api/reset-password/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: record.id,
          auth0UserId: record.auth0_user_pass_id,
          password: generatePassword(),
        }),
      }),
    {
      onSuccess: async response => {
        if (response.status !== 200) {
          const err = await response.json();
          notify(err.message, { type: 'error' });
        } else {
          refresh();
          notify('Reset password successful', { type: 'info' });
        }
        handleDialogClose();
      },
    },
  );

  const handleConfirm = () => {
    mutate();
  };
  const isUserFromLinkedin = !record.auth0_user_pass_id

  return (
    <>
      {!isUserFromLinkedin && <Button
        label="Reset password"
        sx={{ marginLeft: '1rem', padding: '6px 16px', fontSize: '0.9rem' }}
        onClick={handleClick}
      />}
      <Confirm
        isOpen={open}
        loading={isLoading}
        title={`Reset password user ${record?.display_name}`}
        content="Are you sure you want to reset this user's password?"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default UserResetPasswordButton;
