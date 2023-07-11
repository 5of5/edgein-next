import { useState } from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import ElemEditDialog from './elem-edit-dialog';

type Props = {
  label: string;
  field: keyof User_Groups;
  placeholder: string;
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingEditableField: React.FC<Props> = ({
  label,
  field,
  placeholder,
  group,
  onUpdateGroupData,
}) => {
  const { user } = useUser();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const isGroupManager = user?.id === group.created_by_user_id;

  const { mutate, isLoading } = useMutation(
    (value: string) =>
      fetch('/api/groups/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: group.id,
          payload: {
            [field]: value,
          },
        }),
      }),
    {
      onSuccess: async (response, value) => {
        if (response.status !== 200) {
          const err = await response.json();
          setError(err.message);
        } else {
          toast.custom(
            t => (
              <div
                className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
              >
                {`${label} updated`}
              </div>
            ),
            {
              duration: 3000,
              position: 'top-center',
            },
          );
          onUpdateGroupData((prev: User_Groups) => ({
            ...prev,
            [field]: value,
          }));
          handleCloseEditMode();
        }
      },
    },
  );

  const handleOpenEditMode = () => {
    setEditMode(true);
  };

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleSave = (value: string) => {
    mutate(value);
  };

  return (
    <div
      className={`flex items-start justify-between p-3 ${
        isGroupManager && 'cursor-pointer hover:bg-slate-100 '
      }`}
      onClick={isGroupManager ? handleOpenEditMode : () => null}
    >
      <div className="flex-auto pr-4">
        <p className="font-bold">{label}</p>
        <p className="text-slate-500">
          {group[field]
            ? group[field]
            : isGroupManager
            ? placeholder
            : `No ${label} info`}
        </p>
      </div>

      {isGroupManager && (
        <div className="font-bold text-sm text-primary-500">Edit</div>
      )}

      <ElemEditDialog
        isOpen={editMode}
        loading={isLoading}
        fieldName={field}
        fieldLabel={label}
        fieldValue={group[field]}
        required={field === 'name'}
        onClose={handleCloseEditMode}
        onSave={handleSave}
      />
    </div>
  );
};

export default ElemSettingEditableField;
