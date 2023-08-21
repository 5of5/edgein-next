import React, { useState, FC } from 'react';
import { Notes_Bool_Exp, useGetNotesQuery } from '@/graphql/types';
import { PlaceholderNote } from './placeholders';
import { ElemButton } from './elem-button';
import ElemNoteForm from './elem-note-form';
import { ElemPhoto } from './elem-photo';
import { useUser } from '@/context/user-context';
import {
  IconPlus,
  IconLockClosed,
  IconInformationCircle,
} from '@/components/icons';
import ElemNoteCard from '@/components/group/elem-note-card';
import { ElemTooltip } from '@/components/elem-tooltip';
import { orderBy } from 'lodash';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const { user, myGroups } = useUser();

  const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);

  const onOpenNoteForm = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setIsOpenNoteForm(true);
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

  const sortedNotes = orderBy(notes, a => new Date(a.created_at), ['desc']);

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
        <div className="border border-gray-300 rounded-lg px-5 py-4">
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
          <div className="mt-4 flex items-start gap-2 py-4">
            <ElemPhoto
              photo={user?.profilePicture || user?.person?.picture}
              wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-10"
              imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
              imgAlt={user?.display_name}
              placeholder="user"
              placeholderClass="text-slate-300"
            />
            <div
              className="w-full cursor-pointer px-4 py-2 border border-gray-300 text-gray-500 text-sm rounded-lg"
              onClick={onOpenNoteForm}
            >
              Write a few sentences about {resourceName}...
            </div>
          </div>

          {sortedNotes?.length != 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4">
              {sortedNotes.map(item => (
                <ElemNoteCard
                  key={item.id}
                  data={item}
                  refetch={refetch}
                  layout={`${item.user_group_id ? 'groupAndAuthor' : 'author'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type={'create'}
        //selectedNote={undefined}
        resourceId={resourceId}
        resourceType={resourceType}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />
    </>
  );
};

export default ElemOrganizationNotes;
