import React from 'react';
import { SelectArrayInput } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { Tag, Library } from '@/types/common';
import { getTagChoicesByLibraries } from '@/utils/helpers';
import { libraryChoices } from '../../../utils/constants';

type Props = {
  className: string;
};

const ElemCompanyLibraryInput = ({ className }: Props) => {
  const { setValue, getValues } = useFormContext();

  const handleChangeLibrary = (event: any) => {
    const newLibrary: Library[] = event.target.value;

    const tagChoices: Tag[] = getTagChoicesByLibraries(newLibrary);
    const mappedTagChoices: string[] =
      tagChoices?.map(choice => choice.name) || [];

    const currentTags = getValues('tags') || [];
    setValue(
      'tags',
      currentTags?.filter((item: string) => mappedTagChoices.includes(item)) ||
        [],
    );
  };

  return (
    <SelectArrayInput
      className={className}
      source="library"
      choices={libraryChoices}
      defaultValue={['Web3']}
      onChange={handleChangeLibrary}
    />
  );
};

export default ElemCompanyLibraryInput;
