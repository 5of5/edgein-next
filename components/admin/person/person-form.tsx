import React, { ReactElement, useState } from 'react';
import {
  FormDataConsumer,
  ImageField,
  TextInput,
  FileInput,
  SelectInput,
  SelectArrayInput,
  SimpleForm,
  useGetList,
  required,
} from 'react-admin';
import {
  validateNameAndSlugAndEmailAndDomain,
  status,
  libraryChoices,
} from '../../../utils/constants';
import ElemSlugInput from '../elem-slug-input';
import ElemIconGroup from '../elem-icon-group';
import useAdminHandleSlug from '@/hooks/use-admin-handle-slug';

type PersonFormProps = {
  action: 'create' | 'edit';
  toolbar?: ReactElement | false;
  isImageUpdated: boolean;
  logo: any;
  onSelect: (files: any) => void;
  onDropRejected: (files: any) => void;
};

const PersonForm = ({
  action,
  toolbar,
  isImageUpdated,
  logo,
  onSelect,
  onDropRejected,
}: PersonFormProps) => {
  const [isIcon, setIsIcon] = useState(action === 'edit');
  const [keyword, setKeyword] = useState('');
  const { data: people } = useGetList('people', {});

  const { slug, onGenerateSlug } = useAdminHandleSlug(people);

  const inputClassName =
    'w-[49%] px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  const handleIcon = (e: any) => {
    setIsIcon(e.target.value.length > 0 ? true : false);
    setKeyword(e.target.value);
  };

  return (
    <div className="customForm" style={{ position: 'relative' }}>
      <SimpleForm
        validate={value =>
          validateNameAndSlugAndEmailAndDomain(
            action !== 'create',
            value,
            people,
          )
        }
        toolbar={toolbar}
      >
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <TextInput
              className={inputClassName}
              source="name"
              onBlur={e => onGenerateSlug(e.target.value, formData)}
              onChange={handleIcon}
              sx={{
                '.MuiFormHelperText-root': {
                  display: 'block !important',
                },
              }}
              {...rest}
            />
          )}
        </FormDataConsumer>
        {isIcon && (
          <ElemIconGroup
            category="person"
            action={action}
            keyword={keyword}
            topPos="75px"
          />
        )}
        <ElemSlugInput slug={slug} validate={required()} />
        <FileInput
          className="w-full"
          onRemove={onDropRejected}
          options={{ onDrop: onSelect }}
          source="picture"
          label="picture"
          accept="image/*"
          placeholder={<p>Drop your file here</p>}
        >
          <ImageField source="src" title="title" />
        </FileInput>
        {action === 'edit' && !logo && !isImageUpdated && (
          <ImageField className="w-full" source="picture.url" title="Logo" />
        )}
        <TextInput className={inputClassName} source="type" />
        <SelectInput
          className={inputClassName}
          source="status"
          choices={status}
        />
        <TextInput
          className={inputClassName}
          source="github"
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="personal_email"
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="work_email"
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            },
          }}
        />
        <TextInput
          className={inputClassName}
          source="linkedin"
          sx={{
            '.MuiFormHelperText-root': {
              display: 'block !important',
            },
          }}
        />
        <SelectArrayInput
          className={inputClassName}
          source="library"
          choices={libraryChoices}
          defaultValue={['Web3']}
        />
        <TextInput className={inputClassName} source="country" />
        <TextInput className={inputClassName} source="web3_address" />
        <TextInput className={inputClassName} source="discord" />
        <TextInput className={inputClassName} source="telegram" />
      </SimpleForm>
    </div>
  );
};

export default PersonForm;
