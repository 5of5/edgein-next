import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import { InputText } from '../input-text';
import { ElemButton } from '../elem-button';
import { zodValidate } from '@/utils/validation';
import { groupSchema } from '@/utils/schema';

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

  const onValidate = (value: string) => {
    setValue(value);

    const { errors } = zodValidate({ [field]: value }, groupSchema);
    if (errors) {
      if (field === 'name' || field === 'description') {
        setError(errors[field]?.[0] || '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  };

  const { mutate, isLoading } = useMutation(
    (value: string) => {
      const payload = {
        [field]: value,
      };

      if (field !== 'name') {
        payload.name = group.name;
      }

      return fetch('/api/groups/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: group.id,
          payload,
        }),
      });
    },

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
                }`}>
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

  const onSaveBtn = () => {
    if (error) {
      return;
    }

    handleSave(value || '');
  };

  useEffect(() => {
    setValue(group[field]);
    setError('');
  }, [field, group]);

  const [value, setValue] = useState<string>();

  return (
    <div className="flex items-start justify-between p-3">
      <div className="flex-auto pr-4">
        <div className="flex-1 text-left">
          <h3 className="font-medium">{label}</h3>
        </div>

        {!editMode ? (
          <p className="text-sm text-gray-600">
            {group[field]
              ? group[field]
              : isGroupManager
              ? placeholder
              : `No ${label} info`}
          </p>
        ) : (
          <>
            <div className="mt-2">
              <InputText
                onChange={event => onValidate(event?.target.value)}
                name={field}
                type="text"
                value={value}
                className={`!mt-0 ${
                  error === ''
                    ? 'ring-1 ring-gray-200'
                    : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                }`}
              />
              {error && (
                <div className="mt-2 text-sm font-medium text-rose-400">
                  {error}
                </div>
              )}
            </div>

            <div className="flex w-full mt-2 gap-x-2">
              <ElemButton btn="gray" onClick={handleCloseEditMode}>
                Cancel
              </ElemButton>
              <ElemButton
                onClick={onSaveBtn}
                loading={isLoading}
                disabled={(field === 'name' && !value) || Boolean(error)}
                roundedFull
                btn="primary">
                Save
              </ElemButton>
            </div>
          </>
        )}
      </div>

      {isGroupManager && !editMode && (
        <ElemButton
          onClick={isGroupManager ? handleOpenEditMode : undefined}
          btn="transparent"
          className="!p-0">
          Edit
        </ElemButton>
      )}
    </div>
  );
};

export default ElemSettingEditableField;
