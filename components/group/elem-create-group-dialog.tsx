import { Fragment, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';
import { InputText } from '@/components/input-text';
import { useUser } from '@/context/user-context';
import { ElemButton } from '../elem-button';
import {
  extractErrors,
  GroupSchemaType,
  groupSchema,
} from '@/utils/validation';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ElemCreateGroupDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const { refetchMyGroups } = useUser();

  const [values, setValues] = useState({ name: '', description: '' });
  const [error, setError] = useState<Partial<GroupSchemaType>>({
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
        router.push(`/groups/${data.id}`);
      },
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    const result = groupSchema.safeParse({ ...values, [name]: value });
    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setError(extractErrors<GroupSchemaType>(fieldErrors));
    } else {
      setError({ name: '', description: '' });
    }
  };

  const handleCreate = () => {
    mutate();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold flex items-center justify-between">
                  <span>Create Group</span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="focus-visible:outline-none"
                  >
                    <IconX className="w-5 h-5" />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-slate-500">
                    Groups are where your team or business partners communicate.
                    They&apos;re best when organized around a topic.
                  </p>
                </div>

                <div className="flex flex-col space-y-6 mt-6">
                  <label>
                    <InputText
                      name="name"
                      type="text"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="e.g: EdgeIn Wizards"
                      className={`${
                        error.name
                          ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                          : 'ring-1 ring-slate-200'
                      }`}
                    />
                    {error.name && (
                      <div className="mt-2 font-bold text-sm text-rose-400">
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
                          : 'ring-1 ring-slate-200'
                      }`}
                    />
                    {error.description && (
                      <div className="mt-2 font-bold text-sm text-rose-400">
                        {error.description}
                      </div>
                    )}
                  </label>
                </div>

                <div className="mt-6 float-right">
                  <ElemButton
                    btn="primary"
                    disabled={
                      !values.name ||
                      Boolean(error.name) ||
                      Boolean(error.description)
                    }
                    loading={isLoading}
                    onClick={handleCreate}
                  >
                    Create
                  </ElemButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ElemCreateGroupDialog;
