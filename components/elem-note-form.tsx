import { ChangeEvent, useState, useEffect, useMemo } from 'react';
import { useMutation } from 'react-query';
import { ElemTooltip } from '@/components/elem-tooltip';
import { useUser } from '@/context/user-context';
import { ElemModal } from '@/components/elem-modal';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { InputSelect } from '@/components/input-select';
import moment from 'moment-timezone';
import { GetNotesQuery } from '@/graphql/types';
import {
  IconSidebarGroups,
  IconLockClosed,
  IconGlobe,
} from '@/components/icons';
import { CreateGroupDialog } from './group/create-group-dialog';
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
       // description: `by ${item.created_by?.display_name}`,
      })),
      // { id: 'create_group', icon: IconGroupPlus, title: 'Create group' },
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

  // const createGroup = useMemo(() => {
  //   if (selectedGroup.id === 'create_group') {
  //     return setIsOpenCreateGroupDialog(true);
  //   }
  // }, [selectedGroup]);

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
    setNotes(event.target.value.trim());
  };

  const handleSubmit = () => {
    mutate();
    setNotes('');
  };

  const onNoteTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && notes) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const closeAndReset = () => {
    onClose();
    setNotes('');
  };

  return (
    <>
      <ElemModal
        isOpen={isOpen}
        onClose={closeAndReset}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-4 py-3 z-10 my-10 !overflow-visible">
        <div className="">
          <h2 className="text-xl font-medium">
            {type === 'edit' ? 'Edit Note' : 'Create Note'}
          </h2>
        </div>

        <div className="flex items-start gap-2 pt-3 my-3 border-t border-slate-200">
          {type === 'edit' ? (
            <ElemTooltip
              content={`Last edited by ${user?.display_name} on ${moment(
                selectedNote?.updated_at,
              ).format('LL h:mma')}`}
              direction="top-start">
              <div className="cursor-pointer">
                <ElemPhoto
                  photo={user?.profilePicture || user?.person?.picture}
                  wrapClass="aspect-square shrink-0 bg-dark-100 overflow-hidden rounded-full w-10"
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
              wrapClass="aspect-square shrink-0 bg-dark-100 overflow-hidden rounded-full w-10"
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
              onKeyDown={onNoteTextareaKeyDown}
              placeholder="Write your note..."
              className=""
              textareaClass="h-24 max-h-[9rem] !px-0 !py-0 !ring-0 hover:!bg-dark-100"
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

        <div className="flex items-center justify-end pt-3 border-t gap-x-2 border-slate-200">
          <ElemButton onClick={closeAndReset} roundedFull btn="default">
            Cancel
          </ElemButton>

          <ElemButton
            btn="primary"
            disabled={!notes || !selectedGroup}
            loading={isLoading}
            onClick={handleSubmit}>
            {type === 'edit' ? 'Save Note' : 'Create Note'}
          </ElemButton>
        </div>
      </ElemModal>

      <CreateGroupDialog
        isOpen={isOpenCreateGroupDialog}
        onClose={onCloseCreateGroupDialog}
      />
    </>
  );
};

export default ElemNoteForm;
