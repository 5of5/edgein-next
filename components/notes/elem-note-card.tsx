import React, { MutableRefObject, useRef, useEffect, useState } from 'react';
import useSWR from 'swr';
import moment from 'moment-timezone';
import {
  renderMarkdownToHTML,
  replaceAtMentionsWithLinks,
  wrapHyperlinks,
} from '@/utils/notes';
import { ElemPhoto } from '../elem-photo';
import {
  IconEllipsisVertical,
  IconThumbUp,
  IconThumbUpSolid,
  IconAnnotation,
  IconSidebarGroups,
  IconLockClosed,
  IconGlobe,
  IconUsers,
  IconPaperAirplane,
  IconPaperAirplaneSolid,
} from '@/components/icons';
import { GetNotesQuery } from '@/graphql/types';
import { useUser } from '@/context/user-context';
import { Popover, Transition } from '@headlessui/react';
// import { InputTextarea } from '../input-textarea';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import ElemNoteForm from '@/components/elem-note-form';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '@/components/elem-tooltip';
import { Autocomplete } from '@/components/autocomplete';
import { useMutation } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';
import { ElemNoteCardComments } from './elem-note-card-comments';
import { ElemModal } from '../elem-modal';
import { ElemButton } from '../elem-button';

type Note = GetNotesQuery['notes'][0];

type NoteProps = {
  data: Note;
  refetch: () => void;
  layout?: 'organizationAndAuthor' | 'groupAndAuthor' | 'author';
};

const fetcher = async (url: string, args: any) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resourceId: args.resourceId,
      resourceType: args.resourceType,
    }),
  }).then(res => res.json());
};

const formatContent = (text: string) => {
  return renderMarkdownToHTML(replaceAtMentionsWithLinks(wrapHyperlinks(text)));
};

const ElemNoteCard: React.FC<NoteProps> = ({
  data,
  refetch,
  layout = 'organizationAndAuthor',
}) => {
  const { user } = useUser();
  const router = useRouter();

  // Fetch resource data
  const { data: resource } = useSWR(
    data?.resource_id && data?.resource_type
      ? [
          '/api/get-note-resource/',
          { resourceId: data.resource_id, resourceType: data.resource_type },
        ]
      : null,
    fetcher,
  );

  // States
  const [commentContent, setCommentContent] = useState('');
  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] = useState(false);
  const [isOpenNoteForm, setIsOpenNoteForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showDeleteNoteConfirm, setShowDeleteNoteConfirm] = useState(false);
  const [contentShowAll, setContentShowAll] = useState(false);
  const contentDiv = useRef<HTMLDivElement>(null);
  const [contentDivHeight, setContentDivHeight] = useState(0);

  const likesCount = data?.likes?.length || 0;
  let isLikedByCurrentUser;
  if (data?.likes?.length) {
    isLikedByCurrentUser = (data?.likes || [])?.some(
      item => item?.created_by_user_id === user?.id,
    );
  }
  const commentsCount = data?.comments?.length || 0;

  // Handle content height calculation
  useEffect(() => {
    if (data?.notes && contentDiv.current) {
      setContentDivHeight(contentDiv.current.scrollHeight || 0);
    }
  }, [data?.notes]);

  // Event Handlers
  const onCloseNoteForm = () => {
    setIsOpenNoteForm(false);
    setTimeout(() => setSelectedNote(null), 400);
  };

  const onEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsOpenNoteForm(true);
  };

  const onConfirmDeleteNote = (note: Note) => {
    setSelectedNote(note);
    setShowDeleteNoteConfirm(true);
  };

  const handleCloseDeleteNoteConfirm = () => {
    setShowDeleteNoteConfirm(false);
  };

  const onLikeButton = async () => {
    if (!data?.id) return;
    await fetch('/api/toggle-like-note/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ noteId: data.id }),
    });
    refetch();
  };

  const onAddComment = async () => {
    if (!data?.id || !commentContent.trim()) return;
    await fetch('/api/add-comment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        noteId: data.id,
        content: commentContent.trim(),
      }),
    });
    setCommentContent('');
    refetch();
  };

  const onCommentSubmit = () => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    } else if (user?.person && commentContent.trim()) {
      onAddComment();
    } else {
      onOpenLinkPersonDialog();
    }
  };

  const resourceType =
    data?.resource_type === 'vc_firms' ? 'investors' : data?.resource_type;
  const resourceLink = resource?.slug
    ? `/${resourceType}/${resource.slug}`
    : '#';

  return (
    <>
      <div
        className={`flex flex-col border border-gray-300 rounded-lg note-${data?.id}`}>
        {/* Header */}
        <div className="relative flex items-center px-4 py-2 space-x-3">
          <div className="relative flex-shrink-0">
            {layout === 'organizationAndAuthor' ? (
              <ElemLink href={resourceLink}>
                <ElemPhoto
                  photo={resource?.logo || ''}
                  wrapClass="w-12 h-12 rounded-lg border"
                  imgClass="object-cover"
                  imgAlt={resource?.name || 'Resource'}
                />
              </ElemLink>
            ) : layout === 'groupAndAuthor' ? (
              <ElemLink href={`${ROUTES.GROUPS}/${data?.user_group?.id || ''}`}>
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg">
                  <IconSidebarGroups title={data?.user_group?.name || ''} />
                </div>
              </ElemLink>
            ) : (
              <ElemLink
                href={`${ROUTES.PEOPLE}/${
                  data?.created_by_user?.person?.slug || ''
                }`}>
                <ElemPhoto
                  photo={data?.created_by_user?.person?.picture || ''}
                  wrapClass="w-12 h-12 rounded-full border"
                  imgClass="object-cover"
                  imgAlt={data?.created_by_user?.person?.name || 'Author'}
                />
              </ElemLink>
            )}
          </div>

          {/* Metadata */}
          <div className="flex-1">
            <h3 className="text-sm font-medium">
              {layout === 'organizationAndAuthor' ? (
                <ElemLink href={resourceLink}>{resource?.name}</ElemLink>
              ) : layout === 'groupAndAuthor' ? (
                <ElemLink
                  href={`${ROUTES.GROUPS}/${data?.user_group?.id || ''}`}>
                  {data?.user_group?.name || ''}
                </ElemLink>
              ) : (
                <ElemLink
                  href={`${ROUTES.PEOPLE}/${
                    data?.created_by_user?.person?.slug || ''
                  }`}>
                  {data?.created_by_user?.person?.name || 'Author'}
                </ElemLink>
              )}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-2">
          <p
            ref={contentDiv}
            className={`text-sm ${!contentShowAll ? 'line-clamp-5' : ''}`}
            dangerouslySetInnerHTML={{
              __html: formatContent(data?.notes || ''),
            }}></p>
          {contentDivHeight > 100 && !contentShowAll && (
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline"
              onClick={() => setContentShowAll(true)}>
              See more
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between px-4 py-2">
          <button onClick={onLikeButton}>
            {isLikedByCurrentUser ? <IconThumbUpSolid /> : <IconThumbUp />} Like
          </button>
          <button onClick={onCommentSubmit}>
            <IconAnnotation /> Comment
          </button>
        </div>

        {/* Comments */}
        <ElemNoteCardComments
          note={data}
          comments={data?.comments || []}
          refetch={refetch}
        />
      </div>

      {/* Modals */}
      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type={selectedNote ? 'edit' : 'create'}
        selectedNote={selectedNote}
        resourceId={data?.resource_id || 0}
        resourceType={data?.resource_type || ''}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />

      <ElemModal
        isOpen={showDeleteNoteConfirm}
        onClose={handleCloseDeleteNoteConfirm}
        showCloseIcon>
        <h2>Delete Note</h2>
        <p>Are you sure you want to delete this note?</p>
        {/* <ElemButton onClick={() => onDeleteNote()} loading={isDeletingNote}>
          Delete
        </ElemButton> */}
      </ElemModal>

      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="Claim your profile"
        content="To comment, claim your profile."
        onClose={() => setIsOpenLinkPersonDialog(false)}
      />

      <Toaster />
    </>
  );
};

export default ElemNoteCard;
