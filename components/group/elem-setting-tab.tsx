import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import useToast from '@/hooks/use-toast';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import { IconSignOut, IconSpinner, IconTrash, IconX } from '@/components/icons';
import ElemSettingEditableField from './elem-setting-editable-field';
import { ROUTES } from '@/routes';
import { ElemModal } from '../elem-modal';
import { ElemButton } from '../elem-button';
import { InputSwitch } from '../input-switch';

type Props = {
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingTab: React.FC<Props> = ({ group, onUpdateGroupData }) => {
  const router = useRouter();

  const { toast } = useToast();

  const { user, refetchMyGroups } = useUser();

  const [leaveError, setLeaveError] = useState<boolean>(false);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const isGroupManager = user?.id === group.created_by_user_id;

  const isPublicGroup = group.public;

  const fields = [
    {
      label: 'Group Name',
      fieldName: 'name',
    },
    {
      label: 'Description',
      fieldName: 'description',
      fieldType: 'textarea',
      placeholder: 'Add a description',
    },
    {
      label: 'Twitter',
      fieldName: 'twitter',
      placeholder: 'Add Twitter link',
    },
    {
      label: 'Telegram',
      fieldName: 'telegram',
      placeholder: 'Add Telegram link',
    },
    {
      label: 'Discord',
      fieldName: 'discord',
      placeholder: 'Add Discord link',
    },
  ];

  const handleOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const { mutate: togglePublic, isLoading: isToggling } = useMutation(
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
          toast(`${err.message}`, 'error');
        } else {
          toast(<>Set to {value ? 'public' : 'private'}</>);
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
      <div className="overflow-hidden bg-black border  border-neutral-700 divide-y divide-gray-200 rounded-lg">
        {fields.map(item => (
          <ElemSettingEditableField
            key={item.fieldName}
            label={item.label}
            field={item.fieldName as keyof User_Groups}
            fieldType={item.fieldType}
            placeholder={item.placeholder ? item.placeholder : ''}
            group={group}
            onUpdateGroupData={onUpdateGroupData}
          />
        ))}

        <div>
          <div
            className="flex items-center justify-between p-3 space-x-1"
            //onClick={() => togglePublic}
          >
            <p className="font-medium">Public</p>
            <div className="flex items-center">
              {isToggling && (
                <IconSpinner className="w-5 h-5 mr-3 -ml-1 animate-spin" />
              )}
              <InputSwitch
                className={
                  isGroupManager
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed opacity-60'
                }
                checked={!!isPublicGroup}
                onChange={togglePublic}
                disabled={!isGroupManager}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="flex items-start w-full p-3 space-x-1 text-rose-500 hover:bg-red-500 hover:text-white"
            onClick={handleLeaveGroup}>
            <IconSignOut className="w-6 h-6" />
            <p className="font-medium">Leave Group</p>
          </button>
          {leaveError && (
            <div className="flex justify-between px-4 py-3 text-sm text-rose-500">
              <div>
                <p>
                  Note: You cannot leave the group when you are the group
                  manager. Please assign another member as group manager then
                  leave group or you can delete group.
                </p>
              </div>
              <span onClick={() => setLeaveError(false)}>
                <IconX className="w-4 h-4 text-gray-700 cursor-pointer" />
              </span>
            </div>
          )}
        </div>
      </div>

      {isGroupManager && (
        <div className="mt-6 overflow-hidden bg-black border  border-neutral-700 divide-y divide-gray-200 rounded-lg">
          <button
            className="flex items-center w-full p-3 space-x-1 text-rose-500 hover:bg-red-500 hover:text-white"
            onClick={handleOpenDeleteModal}>
            <IconTrash className="w-6 h-6" />
            <p className="font-medium">Delete Group</p>
          </button>
        </div>
      )}

      <ElemModal
        isOpen={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-6 pb-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Delete this group?</h2>
        </div>
        <div className="pt-1">
          When you delete a group, everything in it will be removed immediately.
          <span className="inline font-bold">This can&lsquo;t be undone.</span>
        </div>

        <div className="flex items-center justify-end pt-3 mt-3 border-t  border-neutral-700 gap-x-2">
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
