import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { InputText } from '@/components/input-text';
import { useUser } from '@/context/user-context';
import { ElemButton } from '../elem-button';
import { Group, groupSchema } from '@/utils/schema';
import { extractErrors, zodValidate } from '@/utils/validation';
import { ROUTES } from '@/routes';
import { ElemModal } from '@/components/elem-modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateGroupDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const { refetchMyGroups } = useUser();

  const [values, setValues] = useState({ name: '', description: '' });
  const [error, setError] = useState<Partial<Group>>({
    name: '',
    description: '',
  });

  const { mutate, isLoading } = useMutation(
    () =>
      fetch('/api/groups/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: values }),
      }).then(res => res.json()),
    {
      onSuccess: data => {
        refetchMyGroups();
        router.push(`${ROUTES.GROUPS}/${data.id}`);
      },
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));

    const { errors } = zodValidate({ ...values, [name]: value }, groupSchema);
    if (errors) {
      setError(extractErrors<Group>(errors));
    } else {
      setError({ name: '', description: '' });
    }
  };

  const handleCreate = () => {
    mutate();
  };

  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-black rounded-lg px-6 pt-6 pb-3 z-10 my-10">
      <div>
        <h2 className="text-xl font-medium">Create New Group</h2>
      </div>

      <p className="pt-1 text-gray-600">
        Groups are where you and your team or business partners communicate.
        They&apos;re best when organized around a topic.
      </p>

      <div className="flex flex-col py-3 mb-3 gap-y-3">
        <label>
          <InputText
            name="name"
            type="text"
            label="Name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g: Mentibus Wizards"
            className={`${
              error.name
                ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                : 'ring-1 ring-gray-200'
            }`}
          />
          {error.name && (
            <div className="mt-2 text-sm font-bold text-rose-400">
              {error.name}
            </div>
          )}
        </label>
        <label>
          <InputText
            name="description"
            type="text"
            label="Description (Optional)"
            value={values.description}
            onChange={handleChange}
            placeholder="What is the group about?"
            className={`${
              error.description
                ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                : 'ring-1 ring-gray-200'
            }`}
          />
          {error.description && (
            <div className="mt-2 text-sm font-bold text-rose-400">
              {error.description}
            </div>
          )}
        </label>
      </div>

      <div className="flex items-center justify-end pt-3 border-t  border-neutral-700 gap-x-2">
        <ElemButton onClick={onClose} roundedFull btn="default">
          Cancel
        </ElemButton>

        <ElemButton
          btn="primary"
          disabled={
            !values.name || Boolean(error.name) || Boolean(error.description)
          }
          loading={isLoading}
          onClick={handleCreate}>
          Create
        </ElemButton>
      </div>
    </ElemModal>
  );
};
