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
        <div className="px-5 py-4 border border-neutral-800 rounded-lg bg-black shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <h2 className="text-lg font-medium">
                Notes{` ${notes.length > 0 ? '(' + notes.length + ')' : ''}`}{' '}
              </h2>
            </div>
            <ElemButton
              btn="primary"
              onClick={onOpenNoteForm}
              className="!pl-3 rounded-md">
              <IconPlus className="w-5 h-5 mr-1" />
              <span>Create note</span>
            </ElemButton>
          </div>
          <div
            className="flex items-start gap-3 py-4 px-4 mt-2 border border-neutral-700 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-colors cursor-pointer"
            onClick={onOpenNoteForm}>
            <ElemPhoto
              photo={user?.profilePicture || user?.person?.picture}
              wrapClass="aspect-square shrink-0 bg-black overflow-hidden rounded-full w-10"
              imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
              imgAlt={user?.display_name}
              placeholder="user"
              placeholderClass="text-gray-300"
            />
            <div className="w-full py-2 text-sm text-gray-400">
              Write a few sentences about {resourceName}...
            </div>
          </div>

          {notes?.length > 0 && (
            <div className="grid grid-cols-1 gap-4 mt-6">
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
        title="Claim a profile."
        content="To add a note, search your name and claim profile."
        onClose={() => {
          setIsOpenLinkPersonDialog(false);
        }}
      />
    </>
  );
};

export default ElemOrganizationNotes;
