import React from 'react';
import { Toolbar, SaveButton, Button } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import ContentSave from '@mui/icons-material/Save';

type Props = {
  onSaveDraft: (values: any) => void;
};

const ElemToolbar = ({ onSaveDraft }: Props) => {
  const form = useFormContext();

  const handleSaveDraft = () => {
    const values = form.getValues();
    onSaveDraft(values);
  };

  return (
    <Toolbar>
      <SaveButton />
      <Button
        label="Save As Draft"
        sx={{ marginLeft: '1rem', padding: '6px 16px', fontSize: '0.9rem' }}
        variant="outlined"
        onClick={handleSaveDraft}
        startIcon={<ContentSave />}
      />
    </Toolbar>
  );
};

export default ElemToolbar;
