import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { InputText } from '@/components/input-text';
import { useUser } from '@/context/user-context';
import { ElemButton } from '../elem-button';
import { useMutation } from 'react-query';
import { kebabCase } from 'lodash';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';
import { ROUTES } from '@/routes';
import { ElemModal } from '@/components/elem-modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateListDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const { refreshProfile } = useUser();

  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setListName(listName);
    if (listName) {
      const { errors } = zodValidate({ name: listName }, listSchema);
      if (errors) {
        setError(errors['name']?.[0] || '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  }, [listName]);

  const { mutate, isLoading } = useMutation(
    () =>
      fetch('/api/add-list/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listName: listName,
        }),
      }).then(res => res.json()),
    {
      onSuccess: data => {
        refreshProfile();
        router.push(`${ROUTES.LISTS}/${data.list.id}/${kebabCase(listName)}`);
        onClose();
        setListName('');
      },
    },
  );

  const handleCreate = () => {
    if (error || !listName) {
      return;
    } else {
      mutate();
    }
  };

  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-6 pt-6 pb-3 z-10 my-10">
      <div>
        <h2 className="text-xl font-medium">Create New List</h2>
      </div>

      <p className="pt-1 text-gray-600">
        Lists are where you monitor and compare companies and/or investors that
        matter to you.
      </p>

      <div className="flex flex-col py-3 mb-3 gap-y-3">
        <label>
          <InputText
            name="name"
            type="text"
            label="Name"
            value={listName}
            required={true}
            onChange={e => setListName(e.target.value)}
            placeholder="Enter List Name..."
            className={`${
              error === ''
                ? 'ring-1 ring-slate-200'
                : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
            }`}
          />
          {error && (
            <div className="mt-2 text-sm font-bold text-rose-400">{error}</div>
          )}
        </label>
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-gray-200 gap-x-2">
        <ElemButton onClick={onClose} roundedFull btn="default">
          Cancel
        </ElemButton>

        <ElemButton
          btn="primary"
          disabled={listName === '' || error ? true : false}
          loading={isLoading}
          onClick={handleCreate}>
          Create
        </ElemButton>
      </div>
    </ElemModal>
  );
};
