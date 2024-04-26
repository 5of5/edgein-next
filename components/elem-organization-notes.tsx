import React, { useState, FC } from 'react';
import { Notes_Bool_Exp, useGetNotesQuery } from '@/graphql/types';
import { PlaceholderNote } from './placeholders';
import { ElemButton } from './elem-button';
import ElemNoteForm from './elem-note-form';
import { ElemPhoto } from './elem-photo';
import { useUser } from '@/context/user-context';
import { IconPlus } from '@/components/icons';
import ElemNoteCard from '@/components/notes/elem-note-card';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemRequiredProfileDialog } from './elem-required-profile-dialog';

type Props = {
  resourceId: number;
  resourceType: string;
  resourceName?: string;
};

const ElemOrganizationNotes: FC<Props> = ({
  resourceId,
  resourceType,
  resourceName,
}) => {
  const { user, myGroups } = useUser();
  const router = useRouter();

  const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);
  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] =
    useState<boolean>(false);

  const onOpenNoteForm = () => {
    if (user?.person) {
      setIsOpenNoteForm(true);
    } else if (user) {
      setIsOpenLinkPersonDialog(true);
    } else {
      router.push(ROUTES.SIGN_IN);
    }
  };

  const onCloseNoteForm = () => {
    setIsOpenNoteForm(false);
  };

  const {
    data: noteList,
    error,
    isLoading,
    refetch,
  } = useGetNotesQuery({
    where: {
      resource_id: { _eq: resourceId },
      resource_type: { _eq: resourceType },
      _or: [
        { _or: [{ audience: { _eq: 'public' } }] },
        { _or: [{ user_group_id: { _in: myGroups.map(item => item.id) } }] },
        user?.id
          ? {
              _or: [
                {
                  _and: [
                    { audience: { _eq: 'only_me' } },
                    { created_by: { _eq: user?.id } },
                  ],
                },
              ],
            }
          : {
              _or: [{ audience: { _neq: 'only_me' } }],
            },
      ],
    } as Notes_Bool_Exp,
  });

  const notes = noteList?.notes || [];

  return (
    <>
      {error ? (
        <h4>Error loading notes</h4>
      ) : isLoading ? (
        <div className="grid gap-4 mt-4">
          {Array.from({ length: 2 }, (_, i) => (
            <PlaceholderNote key={i} />
          ))}
        </div>
      ) : (
        <div className="px-5 py-4 border border-gray-300 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1">
              <h2 className="text-lg font-medium">
                Notes{` ${notes.length > 0 ? '(' + notes.length + ')' : ''}`}{' '}
              </h2>
            </div>
            <ElemButton btn="purple" onClick={onOpenNoteForm} className="!pl-3">
              <IconPlus className="w-5 h-5 mr-1" />
              <span>Create note</span>
            </ElemButton>
          </div>
          <div className="flex items-start gap-2 py-4 mt-4">
            <ElemPhoto
              photo={user?.profilePicture || user?.person?.picture}
              wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
              imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
              imgAlt={user?.display_name}
              placeholder="user"
              placeholderClass="text-gray-300"
            />
            <div
              className="w-full px-4 py-2 text-sm text-gray-500 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-50"
              onClick={onOpenNoteForm}
            >
              Write a few sentences about {resourceName}...
            </div>
          </div>

          {notes?.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {notes.map(note => (
                <ElemNoteCard
                  key={note.id}
                  data={note}
                  refetch={refetch}
                  layout={`${note.user_group_id ? 'groupAndAuthor' : 'author'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type={'create'}
        resourceId={resourceId}
        resourceType={resourceType}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />
      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="To add a note, please claim a profile."
        content="Search your name and claim profile."
        onClose={() => {
          setIsOpenLinkPersonDialog(false);
        }}
      />
    </>
  );
};

export default ElemOrganizationNotes;
