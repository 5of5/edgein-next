import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { Switch } from '@headlessui/react';
import toast from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import { IconSignOut, IconTrash, IconX } from '@/components/icons';
import ElemSettingEditableField from './elem-setting-editable-field';
import { ROUTES } from '@/routes';
import { ElemModal } from '../elem-modal';
import { ElemButton } from '../elem-button';

type Props = {
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingTab: React.FC<Props> = ({ group, onUpdateGroupData }) => {
  const router = useRouter();

  const { user, refetchMyGroups } = useUser();

  const [leaveError, setLeaveError] = useState<boolean>(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const isGroupManager = user?.id === group.created_by_user_id;

  const isPublicGroup = group.public;

  const fields = [
    {
      label: 'Group Name',
      field: 'name',
    },
    {
      label: 'Description',
      field: 'description',
      placeholder: 'Add a description',
    },
    {
      label: 'Twitter',
      field: 'twitter',
      placeholder: 'Add Twitter link',
    },
    {
      label: 'Telegram',
      field: 'telegram',
      placeholder: 'Add Telegram link',
    },
    {
      label: 'Discord',
      field: 'discord',
      placeholder: 'Add Discord link',
    },
  ];

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const { mutate: togglePublic } = useMutation(
    (value: boolean) =>
      fetch('/api/groups/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: group.id,
          payload: {
            name: group.name,
            public: value,
          },
        }),
      }),
    {
      onSuccess: async (response, value) => {
        if (response.status !== 200) {
          const err = await response.json();
          toast.custom(
            t => (
              <div
                className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                {err.message}
              </div>
            ),
            {
              duration: 5000,
              position: 'top-center',
            },
          );
        } else {
          toast.custom(
            t => (
              <div
                className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                {`Set to ${value ? 'public' : 'private'}`}
              </div>
            ),
            {
              duration: 3000,
              position: 'top-center',
            },
          );
          onUpdateGroupData((prev: User_Groups) => ({
            ...prev,
            public: value,
          }));
        }
      },
    },
  );

  const { mutate: deleteGroup, isLoading: isDeleting } = useMutation(
    () =>
      fetch('/api/groups/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: group.id }),
      }),
    {
      onSuccess: () => {
        refetchMyGroups();
        router.push(ROUTES.GROUPS);
      },
    },
  );

  const { mutate: leaveGroup } = useMutation(
    (memberId: number | undefined) =>
      fetch('/api/delete-group-member/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: memberId,
        }),
      }),
    {
      onSuccess: () => {
        refetchMyGroups();
        router.push(ROUTES.GROUPS);
      },
    },
  );

  const handleLeaveGroup = () => {
    if (user?.id === group.created_by_user_id) {
      setLeaveError(true);
    } else {
      const memberId = group.user_group_members.find(
        mem => mem.user?.id === user?.id,
      );
      leaveGroup(memberId?.id);
    }
  };

  return (
    <>
      <div className="overflow-hidden bg-white border divide-y rounded-lg border-black/10 divide-black/10">
        {fields.map(item => (
          <ElemSettingEditableField
            key={item.field}
            label={item.label}
            field={item.field as keyof User_Groups}
            placeholder={item.placeholder ? item.placeholder : ''}
            group={group}
            onUpdateGroupData={onUpdateGroupData}
          />
        ))}

        <div>
          <div
            className={`flex items-center justify-between space-x-1 p-3 ${
              !isGroupManager ? '' : 'cursor-pointer hover:bg-slate-100'
            }`}>
            <p className="font-bold">Public</p>
            <Switch
              checked={!!isPublicGroup}
              onChange={togglePublic}
              disabled={!isGroupManager}
              className={`${isPublicGroup ? 'bg-primary-600' : 'bg-gray-200'} ${
                !isGroupManager ? 'opacity-60' : ''
              } relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className="sr-only">Set group public</span>
              <span
                className={`${
                  isPublicGroup ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>

        <div>
          <div
            className="flex items-start p-3 space-x-1 cursor-pointer hover:bg-slate-100"
            onClick={handleLeaveGroup}>
            <IconSignOut className="w-6 h-6 text-red-500" />
            <p className="font-bold text-red-500">Leave Group</p>
          </div>
          {leaveError && (
            <div className="flex justify-between px-4 pb-3 text-sm text-red-600">
              <div>
                <p>
                  You cannot leave the group when you are the group&apos;s
                  manager.
                </p>
                <p>
                  Please make another member as group manager then leave group
                  or you can delete group.
                </p>
              </div>
              <span onClick={() => setLeaveError(false)}>
                <IconX className="w-4 h-4 cursor-pointer text-slate-700" />
              </span>
            </div>
          )}
        </div>
      </div>

      {isGroupManager && (
        <div className="mt-6 overflow-hidden bg-white border divide-y rounded-lg border-black/10 divide-black/10">
          <div
            className="flex items-center p-3 space-x-1 cursor-pointer hover:bg-slate-100"
            onClick={handleOpenDeleteModal}>
            <IconTrash className="w-6 h-6 text-red-500" />
            <p className="font-bold text-red-500">Delete Group</p>
          </div>
        </div>
      )}

      <ElemModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-white rounded-lg px-4 py-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Delete this group?</h2>
        </div>
        <div className="py-3">
          When you delete a group, everything in it will be removed immediately.
          <span className="inline font-bold">This can&lsquo;t be undone.</span>
        </div>

        <div className="flex items-center justify-end pt-3 border-t gap-x-2 border-slate-200">
          <ElemButton
            onClick={handleCloseDeleteModal}
            roundedFull
            btn="default">
            Cancel
          </ElemButton>
          <ElemButton
            onClick={() => deleteGroup()}
            roundedFull
            btn="danger"
            loading={isDeleting}>
            Delete
          </ElemButton>
        </div>
      </ElemModal>
    </>
  );
};

export default ElemSettingTab;
