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
  IconChevronDown,
  IconChevronUp,
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

const formatContent = (text: string): { __html: string } => {
  const html = renderMarkdownToHTML(
    replaceAtMentionsWithLinks(wrapHyperlinks(text)),
  );
  return html || { __html: '' };
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
  const [showComments, setShowComments] = useState(false);
  const contentDiv = useRef<HTMLDivElement>(null);
  const [contentDivHeight, setContentDivHeight] = useState(0);
  const [commentTextareaHasFocus, setCommentTextareaHasFocus] = useState(false);
  useEffect(() => {
    const updateHeight = () => {
      if (data?.notes && contentDiv.current) {
        setContentDivHeight(contentDiv.current.scrollHeight || 0);
      }
    };
    updateHeight();
  }, [data?.notes]);
  const likesCount = data?.likes?.length || 0;
  let isLikedByCurrentUser;
  if (data?.likes?.length) {
    isLikedByCurrentUser = (data?.likes || [])?.some(
      item => item?.created_by_user_id === user?.id,
    );
  }
  const commentsCount = data?.comments?.length || 0;

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
    setShowComments(!showComments);
  };

  const resourceType =
    data?.resource_type === 'vc_firms' ? 'investors' : data?.resource_type;
  const resourceLink = resource?.slug
    ? `/${resourceType}/${resource.slug}`
    : '#';

  const onChangeCommentTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
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
        className={`flex flex-col border border-neutral-700 rounded-lg bg-black shadow-sm note-${data?.id}`}>
        {/* Header */}
        <div className="relative flex items-center px-4 py-3 space-x-3">
          <div className="relative flex-shrink-0">
            {layout === 'organizationAndAuthor' ? (
              <ElemLink href={resourceLink}>
                <ElemPhoto
                  photo={resource?.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 mb-2 p-1 bg-black rounded-lg border border-neutral-700"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt={resource?.name}
                  placeholder="user"
                  placeholderClass="text-gray-300 w-full h-full"
                />
              </ElemLink>
            ) : layout === 'groupAndAuthor' ? (
              <ElemLink href={`${ROUTES.GROUPS}/${data?.user_group?.id}`}>
                <div className="flex items-center justify-center w-12 h-12 p-1 mb-2 bg-neutral-900 border border-neutral-700 rounded-lg">
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
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-black rounded-full border border-neutral-700"
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
                  wrapClass="flex items-center justify-center shrink-0 w-6 h-6 bg-black rounded-full border border-neutral-700"
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
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1">
              <div className="flex items-center space-x-1 text-sm font-medium">
                {(layout === 'organizationAndAuthor' ||
                  layout === 'groupAndAuthor') && (
                  <>
                    {layout === 'organizationAndAuthor' ? (
                      <ElemLink
                        href={resourceLink}
                        className="text-base font-medium hover:text-primary-500 transition-colors">
                        {resource?.name}
                      </ElemLink>
                    ) : (
                      <ElemLink
                        href={`${ROUTES.GROUPS}/${data?.user_group?.id}`}
                        className="text-base font-medium hover:text-primary-500 transition-colors">
                        {data?.user_group?.name}
                      </ElemLink>
                    )}
                    <span className="mx-1 text-gray-500">·</span>
                  </>
                )}
                <ElemLink
                  href={`${ROUTES.PEOPLE}/${data?.created_by_user?.person?.slug}`}
                  className="text-base font-medium hover:text-primary-500 transition-colors">
                  {data?.created_by_user?.person?.name ||
                    data?.created_by_user?.display_name ||
                    `User: ${data?.created_by}`}
                </ElemLink>
              </div>
            </div>
            <div className="flex items-center mt-0.5 text-xs text-gray-500">
              <div>
                {moment(data?.created_at).format('MMM D, YYYY [at] h:mma')}
              </div>
              <span className="mx-1">·</span>
              <div className="flex items-center">
                {data?.audience === 'public' ? (
                  <IconGlobe className="w-3 h-3 mr-0.5" title="Public" />
                ) : data?.audience === 'only_me' ? (
                  <IconLockClosed className="w-3 h-3 mr-0.5" title="Only me" />
                ) : data?.user_group ? (
                  <IconUsers className="w-3 h-3 mr-0.5" title="Group" />
                ) : null}
                {data?.audience === 'public'
                  ? 'Public'
                  : data?.audience === 'only_me'
                  ? 'Only me'
                  : data?.user_group
                  ? data?.user_group?.name
                  : ''}
              </div>
            </div>
          </div>

          {data?.created_by === user?.id && (
            <Popover className="relative shrink-0">
              <Popover.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-800">
                <IconEllipsisVertical className="w-5 h-5" title="Options" />
              </Popover.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Popover.Panel className="absolute right-0 z-10 w-48 mt-1 bg-black border border-neutral-700 rounded-lg shadow-lg">
                  <div className="py-1">
                    <button
                      className="flex items-center w-full px-4 py-2 text-left hover:bg-neutral-800"
                      onClick={() => onEditNote(data)}>
                      Edit note
                    </button>
                    <button
                      className="flex items-center w-full px-4 py-2 text-left text-red-500 hover:bg-neutral-800"
                      onClick={() => onConfirmDeleteNote(data)}>
                      Delete note
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          <div
            ref={contentDiv}
            className={`prose-sm prose-invert max-w-none text-gray-300 ${
              !contentShowAll && contentDivHeight > 150 ? 'line-clamp-4' : ''
            }`}
            dangerouslySetInnerHTML={formatContent(data?.notes || '')}
          />
          {contentDivHeight > 150 && (
            <button
              className="mt-1 text-sm text-primary-500 hover:underline"
              onClick={() => setContentShowAll(!contentShowAll)}>
              {contentShowAll ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col px-4 py-3 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center text-sm ${
                  isLikedByCurrentUser
                    ? 'text-primary-500'
                    : 'text-gray-400 hover:text-primary-500'
                }`}
                onClick={onLikeButton}>
                {isLikedByCurrentUser ? (
                  <IconThumbUpSolid className="w-4 h-4 mr-1.5" title="Unlike" />
                ) : (
                  <IconThumbUp className="w-4 h-4 mr-1.5" title="Like" />
                )}
                <span>{likesCount > 0 ? likesCount : ''}</span>
              </button>
              <button
                className="flex items-center text-sm text-gray-400 hover:text-primary-500"
                onClick={onCommentButton}>
                <IconAnnotation className="w-4 h-4 mr-1.5" title="Comment" />
                <span>{commentsCount > 0 ? commentsCount : ''}</span>
                {commentsCount > 0 && (
                  <span className="ml-1">
                    {showComments ? (
                      <IconChevronUp className="w-4 h-4" />
                    ) : (
                      <IconChevronDown className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Comments */}
          {showComments && commentsCount > 0 && (
            <div className="mt-3">
              <ElemNoteCardComments
                comments={data?.comments || []}
                refetch={refetch}
              />
            </div>
          )}

          {/* Add comment */}
          {showComments && (
            <div className="flex items-start mt-3 space-x-2">
              <ElemPhoto
                photo={user?.profilePicture || user?.person?.picture}
                wrapClass="aspect-square shrink-0 bg-black overflow-hidden rounded-full w-8"
                imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                imgAlt={user?.display_name}
                placeholder="user"
                placeholderClass="text-gray-300"
              />
              <div className="flex-1 relative">
                <Autocomplete
                  value={commentContent}
                  onChange={onChangeCommentTextarea}
                  onKeyDown={onCommentTextareaKeyDown}
                  onFocus={() => {
                    if (!user) {
                      router.push(ROUTES.SIGN_IN);
                      return;
                    }
                    if (!user?.person) {
                      setIsOpenLinkPersonDialog(true);
                      return;
                    }
                    setCommentTextareaHasFocus(true);
                  }}
                  onBlur={() => setCommentTextareaHasFocus(false)}
                  placeholder={
                    !user ? 'Sign in to comment' : 'Write a comment...'
                  }
                  className={`w-full ${
                    !user ? 'opacity-70 pointer-events-none' : ''
                  }`}
                  textareaClass={`!px-4 !py-0 !ring-0 hover:!bg-neutral-800 text-white placeholder:text-gray-400 focus:!border-primary-500 min-h-[36px] max-h-[100px] border border-neutral-700 rounded-full bg-neutral-900 flex items-center leading-[36px] align-middle ${
                    !user ? 'cursor-not-allowed bg-neutral-800 opacity-60' : ''
                  }`}
                />
                <button
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    commentContent.trim() && user
                      ? 'text-primary-500 hover:text-primary-400'
                      : 'text-gray-500'
                  }`}
                  onClick={onCommentSubmit}
                  disabled={!commentContent.trim() || !user}>
                  {commentTextareaHasFocus || commentContent ? (
                    <IconPaperAirplaneSolid
                      className="w-5 h-5"
                      title="Send comment"
                    />
                  ) : (
                    <IconPaperAirplane
                      className="w-5 h-5"
                      title="Send comment"
                    />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type="edit"
        selectedNote={selectedNote as Note | undefined}
        resourceId={data?.resource_id || 0}
        resourceType={data?.resource_type || ''}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />

      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="Claim a profile."
        content="To add a comment, search your name and claim profile."
        onClose={() => {
          setIsOpenLinkPersonDialog(false);
        }}
      />

      <ElemModal
        isOpen={showDeleteNoteConfirm}
        onClose={handleCloseDeleteNoteConfirm}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-md bg-black rounded-lg px-4 py-5 z-10 my-10 shadow-xl border border-neutral-800">
        <div className="mb-2">
          <h2 className="text-xl font-medium">Delete Note</h2>
        </div>
        <div className="my-4">
          <p className="text-gray-400">
            Are you sure you want to delete this note? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex items-center justify-end space-x-3">
          <ElemButton
            onClick={handleCloseDeleteNoteConfirm}
            btn="default"
            className="rounded-md">
            Cancel
          </ElemButton>
          <ElemButton
            btn="danger"
            onClick={async () => {
              if (!selectedNote?.id) return;
              await fetch('/api/notes/', {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: selectedNote.id }),
              });
              handleCloseDeleteNoteConfirm();
              refetch();
              toast.success('Note deleted successfully');
            }}
            className="rounded-md">
            Delete
          </ElemButton>
        </div>
      </ElemModal>

      <Toaster position="bottom-center" />
    </>
  );
};

export default ElemNoteCard;
