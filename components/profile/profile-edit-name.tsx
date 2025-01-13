import { useEffect, useState } from 'react';
import { EditSection } from '../dashboard/edit-section';
import { ElemButton } from '../elem-button';
import { InputText } from '../input-text';
import { People } from '@/graphql/types';
import { useUser } from '@/context/user-context';

type Props = {};

export const ProfileEditName: React.FC<Props> = ({}) => {
  const { user } = useUser();
  const editName = false;
  const nameFragments = user?.display_name?.split(' ');
  const firstName = nameFragments?.shift() || '';
  const lastName = nameFragments?.join(' ') || '';

  return (
    <EditSection
      heading="Full Name"
      right={
        !editName ? (
          // <button
          //   onClick={() => setEditName(true)}
          //   className="text-primary-500 hover:text-dark-500"
          // >
          //   Edit
          // </button>
          <></>
        ) : (
          <></>
        )
      }>
      {!editName ? (
        <p className="text-slate-600">{user?.display_name}</p>
      ) : (
        <div className="max-w-sm">
          {/* <div>
      <InputText
        label="First Name"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        name="first_name"
        placeholder="First Name"
      />
    </div>
    <div className="mt-4">
      <InputText
        label="Last Name"
        onChange={(e) => setLastName(e.target.value)}
        value={lasttName}
        name="last_name"
        placeholder="Last Name"
      />
    </div>
    <div className="mt-2 text-sm text-slate-600">
      <span className="font-bold">Note:</span> If you change your
      name on Mentibus, you won’t be able to change it again for 60
      days.
    </div>

    <div className="flex mt-4">
      <ElemButton
        btn="primary"
        className="mr-2"
        onClick={onSave("name")}
      >
        Change
      </ElemButton>
      <ElemButton btn="default" onClick={() => setEditName(false)}>
        Cancel
      </ElemButton>
    </div> */}
        </div>
      )}
    </EditSection>
  );
};
