import React from 'react';
import { GetNotesQuery } from '@/graphql/types';
import {
  IconDocumentDownload,
  IconInformationCircle,
} from '@/components/icons';
import { orderBy } from 'lodash';
import ElemNoteCard from './elem-note-card';
import { ElemTooltip } from '@/components/elem-tooltip';

type Props = {
  className?: string;
  notes: GetNotesQuery['notes'];
  refetchNotes: () => void;
};

export const ElemNotes: React.FC<Props> = props => {
  //sort by created date
  const sortedNotes = orderBy(props.notes, a => new Date(a.created_at), [
    'desc',
  ]);
  return (
    <div className={`${props.className}`}>
      <div className="flex items-center mb-4 px-4 py-2 shrink-0 border border-gray-300 rounded-lg">
        <h2 className="text-lg font-medium mr-1">{`Notes (${props.notes.length})`}</h2>
        <ElemTooltip
          size="md"
          content="Notes are added on a Company or Investor profile and shared with a selected audience."
          mode="light">
          <div>
            <IconInformationCircle
              className="h-5 w-5 text-gray-500"
              title="About notes"
            />
          </div>
        </ElemTooltip>
      </div>

      {props.notes.length === 0 ? (
        <div className="px-4 py-4 shrink-0 border border-gray-300 rounded-lg">
          <div className="p-12 text-center">
            <IconDocumentDownload
              className="mx-auto h-12 w-12 text-gray-300"
              title="Notes"
            />
            <h3 className="mt-2 text-lg font-medium">
              No notes have been added to group yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create a note in a company or investor profile and select group as
              audience.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-y-4">
            {sortedNotes.map(item => (
              <ElemNoteCard
                key={item.id}
                data={item}
                refetch={props.refetchNotes}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
