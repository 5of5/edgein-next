import { Fragment, ChangeEvent, useState, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';
import { Dialog, Transition } from '@headlessui/react';
import { ElemTooltip } from '@/components/elem-tooltip';
import { useUser } from '@/context/user-context';
import { ElemButton } from './elem-button';
import { ElemPhoto } from './elem-photo';
import { InputSelect } from './input-select';
import moment from 'moment-timezone';
import { GetNotesQuery } from '@/graphql/types';
import {
  IconX,
  IconSidebarGroups,
  IconLockClosed,
  IconGlobe,
} from '@/components/icons';
import ElemCreateGroupDialog from './group/elem-create-group-dialog';
import { Autocomplete } from '@/components/autocomplete';

type Props = {
  isOpen: boolean;
  type: 'create' | 'edit';
  selectedNote?: GetNotesQuery['notes'][0];
  resourceId: number;
  resourceType: string;
  onClose: () => void;
  onRefetchNotes: () => void;
};

const ElemNoteForm: React.FC<Props> = ({
  isOpen,
  type,
  selectedNote,
  resourceId,
  resourceType,
  onClose,
  onRefetchNotes,
}) => {
  const { user, myGroups } = useUser();

  const [notes, setNotes] = useState(selectedNote?.notes);

  const groupOptions = useMemo(() => {
    const options = [
      { id: 'public', icon: IconGlobe, title: 'Everyone can see' },
      { id: 'only_me', icon: IconLockClosed, title: 'Only me' },
      ...myGroups.map(item => ({
        id: item.id,
        icon: IconSidebarGroups,
        title: `${item.name}`,
        description: `by ${item.created_by?.display_name}`,
      })),
    ];

    return options;
  }, [myGroups]);

  const defaultSelectedGroup =
    groupOptions.find(item => item.id === selectedNote?.user_group_id) ||
    groupOptions[0];

  const [selectedGroup, setSelectedGroup] = useState(defaultSelectedGroup);

  useEffect(() => {
    setNotes(selectedNote?.notes);
    setSelectedGroup(
      groupOptions.find(item => item.id === selectedNote?.user_group_id) ||
        groupOptions.find(item => item.id === selectedNote?.audience) ||
        groupOptions[0],
    );
  }, [selectedNote, groupOptions]);

  //Create Group
  const [isOpenCreateGroupDialog, setIsOpenCreateGroupDialog] = useState(false);

  const onOpenCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(true);
  };

  const onCloseCreateGroupDialog = () => {
    setIsOpenCreateGroupDialog(false);
  };

  const { mutate, isLoading } = useMutation(
    () => {
      const args = {
        create: {
          method: 'POST',
          params: {
            notes,
            groupId: selectedGroup.id,
            resourceType,
            resourceId: resourceId,
          },
        },
        edit: {
          method: 'PUT',
          params: {
            id: selectedNote?.id,
            notes,
          },
        },
      };
      return fetch('/api/notes/', {
        method: args[type].method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(args[type].params),
      }).then(res => res.json());
    },
    {
      onSuccess: () => {
        onClose();
        onRefetchNotes();
      },
    },
  );

  const handleChangeNote = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = () => {
    mutate();
    setNotes('');
  };

  const closeAndReset = () => {
    onClose();
    setNotes('');
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeAndReset}>
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
                <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <div className="relative flex items-center justify-between pb-2 border-b border-gray-200">
                    <Dialog.Title className="flex-1 text-xl text-center font-bold">
                      {type === 'edit' ? 'Edit Note' : 'Create Note'}
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={closeAndReset}
                      className="absolute -top-0.5 right-0 flex items-center justify-center h-8 w-8 bg-transparent active:bg-transparent rounded-full focus:outline-none hover:bg-black/10"
                    >
                      <IconX className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="flex items-start gap-2 mt-3 mb-2">
                    {type === 'edit' ? (
                      <ElemTooltip
                        content={`Last edited by ${
                          user?.display_name
                        } on ${moment(selectedNote?.updated_at).format(
                          'LL h:mma',
                        )}`}
                        direction="top-start"
                      >
                        <div className="cursor-pointer">
                          <ElemPhoto
                            photo={
                              user?.profilePicture || user?.person?.picture
                            }
                            wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
                            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                            imgAlt={user?.display_name}
                            placeholder="user"
                            placeholderClass="text-gray-300"
                          />
                        </div>
                      </ElemTooltip>
                    ) : (
                      <ElemPhoto
                        photo={user?.person?.picture}
                        wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
                        imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                        imgAlt={user?.display_name}
                        placeholder="user"
                        placeholderClass="text-gray-300"
                      />
                    )}

                    <div className="ml-2 grow">
                      <Autocomplete
                        value={notes}
                        onChange={handleChangeNote}
                        handleSubmit={handleSubmit}
                        placeholder="Write your note..."
                        className=""
                        textareaClass="h-24 max-h-[9rem] !px-0 !py-0 !ring-0 hover:!bg-white"
                      />

                      <InputSelect
                        options={groupOptions}
                        value={selectedGroup}
                        onChange={setSelectedGroup}
                        className={`text-primary-500 text-base w-full ${
                          selectedNote ? 'cursor-not-allowed' : ''
                        }`}
                        buttonClasses="mt-2 w-full font-bold !pl-1 !pr-8 !py-0 sm:w-fit focus:!ring-1"
                        disabled={!!selectedNote}
                      />
                    </div>
                  </div>

                  {/* <label>
                    <InputTextarea
                      name="notes"
                      rows={8}
                      value={notes}
                      onChange={handleChangeNote}
                      placeholder="Write your note..."
                      className="ring-1 ring-slate-200"
                    />
                  </label> */}

                  <div className="mt-3 pt-3 flex items-center justify-between border-t border-gray-300">
                    <ElemButton
                      btn="primary"
                      disabled={!notes || !selectedGroup}
                      loading={isLoading}
                      onClick={handleSubmit}
                      className="ml-auto"
                    >
                      {type === 'edit' ? 'Save Note' : 'Create Note'}
                    </ElemButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <ElemCreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </>
  );
};

export default ElemNoteForm;
