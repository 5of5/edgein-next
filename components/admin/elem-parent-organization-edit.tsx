import React, { FC } from 'react';
import {
  getParentSubOrganizations,
  handleChangeParentOrganization,
} from '@/utils/resource-link';
import {
  SimpleForm,
  ReferenceInput,
  AutocompleteInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  useCreate,
  useUpdate,
  useDelete,
  useRedirect,
  useGetOne,
} from 'react-admin';
import { useParams } from 'react-router-dom';

type Props = {
  type: 'companies' | 'vc_firms';
};

const ElemParentOrganizationEdit: FC<Props> = ({ type }) => {
  const redirect = useRedirect();
  const [create] = useCreate();
  const [update] = useUpdate();
  const [deleteOne] = useDelete();

  const { id } = useParams();
  const {
    data: currentData,
    isLoading,
    refetch,
  } = useGetOne(type, { id }, { enabled: !!id });

  const inputClassName =
    ' px-3 py-1.5 text-lg text-dark-500 rounded-md border border-slate-300 outline-none';

  if (isLoading) {
    return null;
  }

  const defaultValues = {
    ...getParentSubOrganizations(currentData),
  };

  const onCallbackSuccess = () => {
    refetch();
    redirect(`/${type}`);
  };

  const handleSubmit = (values: any) => {
    handleChangeParentOrganization(
      currentData.id,
      currentData?.to_links?.[0]?.id,
      defaultValues,
      values,
      type,
      create,
      update,
      deleteOne,
      onCallbackSuccess,
    );
  };

  return (
    <div className="mt-6 bg-dark-100 shadow-md rounded-md">
      <SimpleForm defaultValues={defaultValues} onSubmit={handleSubmit}>
        <h4 className="text-primary-600 uppercase text-sm font-medium">
          Parent organizations
        </h4>
        <div className="grid grid-cols-2 gap-x-4 w-full">
          <ReferenceArrayInput
            label="Child companies"
            source="child_companies"
            reference="companies">
            <AutocompleteArrayInput
              className={inputClassName}
              style={{ padding: 0, border: 'none' }}
              optionText="name"
              filterToQuery={search => ({ name: search })}
              disabled
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput
            label="Child VC firms"
            source="child_vc_firms"
            reference="vc_firms">
            <AutocompleteArrayInput
              className={inputClassName}
              style={{ padding: 0, border: 'none' }}
              optionText="name"
              filterToQuery={search => ({ name: search })}
              disabled
            />
          </ReferenceArrayInput>
          <ReferenceInput
            label="Parent company"
            source="parent_company"
            reference="companies">
            <AutocompleteInput
              className={inputClassName}
              style={{ padding: 0, border: 'none' }}
              optionText="name"
              filterToQuery={search => ({ name: search })}
            />
          </ReferenceInput>
          <ReferenceInput
            label="Parent VC firm"
            source="parent_vc_firm"
            reference="vc_firms">
            <AutocompleteInput
              className={inputClassName}
              style={{ padding: 0, border: 'none' }}
              optionText="name"
              filterToQuery={search => ({ name: search })}
            />
          </ReferenceInput>
        </div>
      </SimpleForm>
    </div>
  );
};

export default ElemParentOrganizationEdit;
