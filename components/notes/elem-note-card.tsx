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
  const [commentTextareaHasFocus, setCommentTextareaHasFocus] = useState(false);

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
    const updateHeight = () => {
      if (data?.notes && contentDiv.current) {
        setContentDivHeight(contentDiv.current.scrollHeight || 0);
      }
    };
    updateHeight();
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
      setIsOpenLinkPersonDialog(true);
    }
  };

  const onCommentButton = () => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    } else if (!user?.person) {
      setIsOpenLinkPersonDialog(true);
    }
  };

  const resourceType =
    data?.resource_type === 'vc_firms' ? 'investors' : data?.resource_type;
  const resourceLink = resource?.slug
    ? `/${resourceType}/${resource.slug}`
    : '#';

  const onChangeCommentTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const onCommentTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onCommentSubmit();
    }
  };

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
                  photo={resource?.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 mb-2 p-1 bg-black rounded-lg border border-gray-300"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt={resource?.name}
                  placeholder="user"
                  placeholderClass="text-gray-300 w-full h-full"
                />
              </ElemLink>
            ) : layout === 'groupAndAuthor' ? (
              <ElemLink href={`${ROUTES.GROUPS}/${data?.user_group?.id}`}>
                <div className="flex items-center justify-center w-12 h-12 p-1 mb-2 bg-neutral-900 border border-gray-100 rounded-lg">
                  <IconSidebarGroups
                    className="w-7 h-7"
                    title={data?.user_group?.name}
                  />
                </div>
              </ElemLink>
            ) : (
              <ElemLink
                href={`${ROUTES.PEOPLE}/${
                  data?.created_by_user?.person?.slug || ''
                }`}>
                <ElemPhoto
                  photo={data?.created_by_user?.person?.picture}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-black rounded-full border border-gray-200"
                  imgClass="object-fit max-w-full max-h-full rounded-full"
                  imgAlt={
                    data?.created_by_user?.person?.name ||
                    data?.created_by_user?.display_name ||
                    `User: ${data?.created_by}`
                  }
                  placeholder="user"
                  placeholderAlt={
                    data?.created_by_user?.person?.name ||
                    data?.created_by_user?.display_name ||
                    `User: ${data?.created_by}`
                  }
                  placeholderClass="text-gray-300 bg-black p-0"
                />
              </ElemLink>
            )}

            {(layout === 'organizationAndAuthor' ||
              layout === 'groupAndAuthor') && (
              <ElemLink
                href={`${ROUTES.PEOPLE}/${data?.created_by_user?.person?.slug}`}
                className="absolute -right-1 -bottom-1">
                <ElemPhoto
                  photo={data?.created_by_user?.person?.picture}
                  wrapClass=""
                  imgClass="object-fit h-7 w-7 border border-white rounded-full"
                  imgAlt={
                    data?.created_by_user?.person?.name ||
                    data?.created_by_user?.display_name
                  }
                  placeholder="user"
                  placeholderClass="text-gray-300 bg-black p-0"
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
        <div className="px-4 py-2 grow min-h-fit">
          <p
            className={`break-all whitespace-pre-line text-sm text-gray-300 ${
              !contentShowAll && 'line-clamp-5'
            }`}
            ref={contentDiv}
            dangerouslySetInnerHTML={formatContent(data.notes)}></p>
        </div>
        <div>
          {data?.created_by_user?.id === user?.id && (
            <Popover className="relative z-10 transition-all">
              <Popover.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-900 focus:outline-none">
                <IconEllipsisVertical
                  className="w-6 h-6 text-gray-600"
                  title="Options"
                />
              </Popover.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Popover.Panel className="absolute right-0 z-10 block w-56 mt-2 overflow-hidden bg-black border border-gray-300 rounded-lg shadow-lg">
                  {({ close }) => (
                    <>
                      <button
                        onClick={() => {
                          onEditNote(data);
                          close();
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm transition-all cursor-pointer gap-x-2 hover:bg-neutral-900">
                        Edit note
                      </button>
                      <button
                        onClick={() => {
                          onConfirmDeleteNote(data);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm transition-all cursor-pointer gap-x-2 hover:bg-neutral-900">
                        Delete
                      </button>
                    </>
                  )}
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
        </div>

        {/* Content */}
        {/* <div className="px-4 py-2">
          <p
            ref={contentDiv}
            className={`text-sm ${!contentShowAll ? 'line-clamp-5' : ''}`}
            dangerouslySetInnerHTML={
              formatContent(data?.notes)
            }></p>
          {contentDivHeight > 100 && !contentShowAll && (
            <button
              type="button"
              className="text-blue-500 text-sm hover:underline"
              onClick={() => setContentShowAll(true)}>
              See more
            </button>
          )}
        </div> */}

        {/* Like/Comment counts */}
        {(likesCount > 0 || commentsCount > 0) && (
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-gray-500">
              {likesCount > 0
                ? `${likesCount} like${likesCount > 1 ? 's' : ''}`
                : null}
            </span>
            <span className="text-sm text-gray-500">
              {commentsCount > 0
                ? `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`
                : null}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-1 border-gray-300 border-y">
          <button
            className={`flex flex-1 items-center justify-center px-2 py-1 shrink grow font-medium hover:bg-neutral-900 ${
              isLikedByCurrentUser ? 'text-primary-500' : 'text-gray-500'
            }`}
            onClick={onLikeButton}>
            {isLikedByCurrentUser ? (
              <>
                <IconThumbUpSolid className="w-5 h-5 mr-1" /> Liked
              </>
            ) : (
              <>
                <IconThumbUp className="w-5 h-5 mr-1" /> Like
              </>
            )}
          </button>
          <button
            className="flex items-center justify-center flex-1 px-2 py-1 font-medium text-gray-500 shrink grow hover:bg-neutral-900"
            onClick={onCommentButton}>
            <IconAnnotation className="w-5 h-5 mr-1" title="Comment" /> Comment
          </button>
        </div>

        {/* Comments section */}
        <ElemNoteCardComments
          note={data}
          comments={data?.comments || []}
          refetch={refetch}
        />

        {/* Comment input */}
        <div className="flex items-start px-4 py-2 space-x-2">
          <ElemPhoto
            photo={user?.person?.picture}
            wrapClass="aspect-square shrink-0 bg-black overflow-hidden rounded-full w-8"
            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
            imgAlt={user?.person?.name || user?.display_name}
            placeholder="user"
            placeholderAlt={user?.person?.name || user?.display_name}
            placeholderClass="text-gray-300"
          />
          <div className="relative flex w-full group">
            <Autocomplete
              value={commentContent}
              onChange={onChangeCommentTextarea}
              hasFocus={commentTextareaHasFocus}
              onFocus={() => setCommentTextareaHasFocus(true)}
              onBlur={() => setCommentTextareaHasFocus(false)}
              onKeyDown={onCommentTextareaKeyDown}
              placeholder="Write a comment..."
              textareaClass="h-9 group-focus-within:h-16 max-h-fit !text-sm transition-all focus:bg-gray-50"
            />
            <button
              onClick={onCommentSubmit}
              className={`absolute z-10 right-2 bottom-[0.3rem] flex items-center justify-center w-8 h-8 rounded-full  ${
                commentContent.length > 0
                  ? 'cursor-pointer hover:bg-neutral-900'
                  : 'cursor-not-allowed'
              }`}>
              {commentContent.length > 0 ? (
                <IconPaperAirplaneSolid className="w-5 h-5" title="Comment" />
              ) : (
                <IconPaperAirplane
                  className="w-5 h-5 text-gray-500"
                  title="Comment"
                />
              )}
            </button>
          </div>
        </div>
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
