import React, { useEffect } from 'react';
import { TextInput } from 'react-admin';
import { useFormContext } from 'react-hook-form';

type Props = {
  slug: any;
  validate?: any;
};

const ElemSlugInput = ({ slug, validate }: Props) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (slug !== '') setValue('slug', slug);
  }, [slug, setValue]);

  return (
    <TextInput
      className="w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none"
      source="slug"
      validate={validate}
      sx={{
        '.MuiFormHelperText-root': {
          display: 'block !important',
        },
      }}
    />
  );
};

export default ElemSlugInput;
