import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import useToast from '@/hooks/use-toast';
import { useUser } from '@/context/user-context';
import { User_Groups } from '@/graphql/types';
import { InputText } from '../input-text';
import { ElemButton } from '../elem-button';
import { zodValidate } from '@/utils/validation';
import { groupSchema } from '@/utils/schema';
import { InputTextarea } from '../input-textarea';

type Props = {
  label: string;
  field: keyof User_Groups;
  fieldType?: string;
  placeholder: string;
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingEditableField: React.FC<Props> = ({
  label,
  field,
  fieldType,
  placeholder,
  group,
  onUpdateGroupData,
}) => {
  const { user } = useUser();
  const { toast } = useToast();

  const [editMode, setEditMode] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const isGroupManager = user?.id === group.created_by_user_id;

  const onValidate = (value: string) => {
    const urlRegex =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const emailsRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emojisRegex =
      /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;

    setValue(value);

    const { errors } = zodValidate({ [field]: value }, groupSchema);
    if (errors) {
      if (field === 'name' && !value) {
        setError(errors[field]?.[0] || '');
      } else if (
        field === 'description' &&
        (value.match(urlRegex) ||
          value.match(emailsRegex) ||
          value.match(emojisRegex))
      ) {
        setError(
          'URLs, emails, and special characters are not allowed in description.',
        );
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
          toast(`${label} updated`);

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
              {fieldType === 'textarea' ? (
                <InputTextarea
                  onChange={event => onValidate(event?.target.value)}
                  name={field}
                  value={value}
                  className={`!mt-0 ${
                    error === ''
                      ? 'ring-1 ring-gray-200'
                      : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  }`}
                />
              ) : (
                <InputText
                  onChange={event => onValidate(event?.target.value)}
                  name={field}
                  value={value}
                  className={`!mt-0 ${
                    error === ''
                      ? 'ring-1 ring-gray-200'
                      : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  }`}
                />
              )}

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
                disabled={Boolean(error)}
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
