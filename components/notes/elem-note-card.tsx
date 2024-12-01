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

  const { data: resource } = useSWR(
    [
      '/api/get-note-resource/',
      {
        resourceId: data.resource_id,
        resourceType: data.resource_type,
      },
    ],
    fetcher,
  );

  const [commentContent, setCommentContent] = useState<string>('');

  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] =
    useState<boolean>(false);

  // Edit Notes
  const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [showDeleteNoteConfirm, setShowDeleteNoteConfirm] = useState(false);

  const onCloseNoteForm = () => {
    setIsOpenNoteForm(false);
    setTimeout(() => {
      setSelectedNote(undefined);
    }, 400);
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

  const { mutate: onDeleteNote, isLoading: isDeletingNote } = useMutation(
    () => {
      return fetch('/api/notes/', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedNote?.id,
        }),
      });
    },
    {
      onSuccess: async response => {
        handleCloseDeleteNoteConfirm();
        if (response.status !== 200) {
          const err = await response.json();
          toast.custom(
            t => (
              <div
                className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                {err?.message}
              </div>
            ),
            {
              duration: 3000,
              position: 'top-center',
            },
          );
        } else {
          refetch();
        }
      },
    },
  );

  const onOpenLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(true);
  };

  const onCloseLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(false);
  };

  // note content see more
  const [contentShowAll, setContentShowAll] = useState(false);
  const contentDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [contentDivHeight, setContentDivHeight] = useState(0);

  const likesCount = data.likes.length;
  const isLikedByCurrentUser = data.likes.some(
    item => item.created_by_user_id === user?.id,
  );

  const commentsCount = data.comments.length;

  useEffect(() => {
    if (data.notes && contentDiv?.current) {
      setContentDivHeight(contentDiv.current.scrollHeight);
    }
  }, [data?.notes]);

  const onLikeButton = async () => {
    await fetch('/api/toggle-like-note/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId: data.id,
      }),
    });
    refetch();
  };

  const [commentTextareaHasFocus, setCommentTextareaHasFocus] = useState(false);

  const onCommentButton = () => {
    if (user?.person) {
      setCommentTextareaHasFocus(true);
    } else if (user) {
      onOpenLinkPersonDialog();
    } else {
      router.push(ROUTES.SIGN_IN);
    }
  };

  //Comment form
  const onAddComment = async () => {
    setCommentContent(commentContent);
    await fetch('/api/add-comment/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noteId: data.id,
        content: commentContent,
      }),
    });
    setCommentContent('');
    refetch();
  };

  const onChangeCommentTextarea = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentContent(event.target.value);
  };

  const onCommentTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && commentContent) {
      event.preventDefault();
      onCommentSubmit();
    }
  };

  const onCommentSubmit = () => {
    if (!user) {
      router.push(ROUTES.SIGN_IN);
    } else if (user.person && commentContent) {
      onAddComment();
    } else {
      onOpenLinkPersonDialog();
    }
  };

  //Resource
  const resourceType =
    data.resource_type === 'vc_firms' ? 'investors' : data.resource_type;
  const resourceLink = `/${resourceType}/${resource?.slug}`;

  return (
    <>
      <div
        className={`flex flex-col border border-gray-300 rounded-lg note-${data.id}`}>
        <div className="relative flex items-center px-4 py-2 space-x-3">
          <div className="relative flex-shrink-0">
            {layout === 'organizationAndAuthor' ? (
              <ElemLink href={resourceLink}>
                <ElemPhoto
                  photo={resource?.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 mb-2 p-1 bg-dark-100 rounded-lg border border-gray-300"
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
              // layout === "author"
              <ElemLink
                href={`${ROUTES.PEOPLE}/${data?.created_by_user?.person?.slug}`}>
                <ElemPhoto
                  photo={data?.created_by_user?.person?.picture}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-dark-100 rounded-full border border-gray-200"
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
                  placeholderClass="text-gray-300 bg-dark-100 p-0"
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
                  placeholderClass="text-gray-300 bg-dark-100 p-0"
                />
              </ElemLink>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div>
              <h3 className="font-medium leading-tight underline-offset-1 hover:underline">
                {layout === 'organizationAndAuthor' ? (
                  <ElemLink href={resourceLink}>{resource?.name}</ElemLink>
                ) : layout === 'groupAndAuthor' ? (
                  <ElemLink href={`${ROUTES.GROUPS}/${data?.user_group?.id}`}>
                    {data?.user_group?.name}
                  </ElemLink>
                ) : (
                  // layout === "author"
                  <ElemLink
                    href={`${ROUTES.PEOPLE}/${data?.created_by_user?.person?.slug}`}>
                    {data?.created_by_user?.person?.name}
                  </ElemLink>
                )}
              </h3>
              <div className="text-sm text-slate-600">
                {(layout === 'organizationAndAuthor' ||
                  layout === 'groupAndAuthor') && (
                  <>
                    <ElemLink
                      href={`${ROUTES.PEOPLE}/${data?.created_by_user?.person?.slug}`}
                      className="underline-offset-1 hover:underline">
                      {data?.created_by_user?.person?.name}
                    </ElemLink>
                    <span aria-hidden="true"> · </span>
                  </>
                )}

                {data?.created_at && (
                  <>
                    <ElemTooltip
                      content={moment
                        .utc(data?.created_at)
                        .local()
                        .format('dddd, ll [at] hh:mma')}
                      direction="bottom"
                      mode="dark">
                      <div className="inline-block">
                        {moment.utc(data?.created_at).local().valueOf() >=
                        moment.utc().local().subtract(5, 'days').valueOf()
                          ? moment.utc(data?.created_at).local().fromNow()
                          : moment.utc(data?.created_at).local().format('ll')}
                      </div>
                    </ElemTooltip>
                    <span aria-hidden="true"> · </span>
                  </>
                )}

                {layout === 'groupAndAuthor' ? (
                  <ElemTooltip
                    content={`Shared with group: "${data?.user_group?.name}"`}
                    direction="bottom"
                    mode="dark">
                    <div className="inline-block">
                      <IconUsers className="inline-flex w-4 h-4" title=" " />
                    </div>
                  </ElemTooltip>
                ) : (
                  <>
                    {data.audience === 'only_me' ? (
                      <ElemTooltip
                        content="Only me"
                        direction="bottom"
                        mode="dark">
                        <div className="inline-block">
                          <IconLockClosed
                            className="inline-flex w-4 h-4"
                            title=" "
                          />
                        </div>
                      </ElemTooltip>
                    ) : (
                      <ElemTooltip
                        content="Public"
                        direction="bottom"
                        mode="dark">
                        <div className="inline-block">
                          <IconGlobe
                            className="inline-flex w-4 h-4"
                            title=" "
                          />
                        </div>
                      </ElemTooltip>
                    )}
                  </>
                )}
                {/* {layout === "author" && } */}
              </div>
            </div>
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
                  <Popover.Panel className="absolute right-0 z-10 block w-56 mt-2 overflow-hidden bg-dark-100 border border-gray-300 rounded-lg shadow-lg">
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
        </div>
        <div className="px-4 py-2 grow min-h-fit">
          <p
            className={`break-all whitespace-pre-line text-sm text-gray-300 ${
              !contentShowAll && 'line-clamp-5'
            }`}
            ref={contentDiv}
            dangerouslySetInnerHTML={formatContent(data.notes)}></p>

          {contentDivHeight > 100 && !contentShowAll && (
            <button
              type="button"
              onClick={() => setContentShowAll(!contentShowAll)}
              className="inline text-sm hover:underline">
              See more
            </button>
          )}
        </div>
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
        <ElemNoteCardComments
          note={data}
          comments={data.comments}
          refetch={refetch}
        />

        <div className="flex items-start px-4 py-2 space-x-2">
          <ElemPhoto
            photo={user?.person?.picture}
            wrapClass="aspect-square shrink-0 bg-dark-100 overflow-hidden rounded-full w-8"
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

      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type={selectedNote ? 'edit' : 'create'}
        selectedNote={selectedNote}
        resourceId={data.resource_id as number}
        resourceType={data?.resource_type as string}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />

      <ElemModal
        isOpen={showDeleteNoteConfirm}
        onClose={handleCloseDeleteNoteConfirm}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-4 py-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Delete Note?</h2>
        </div>
        <div className="py-3">Are you sure you want to delete this note?</div>

        <div className="flex items-center justify-end pt-3 border-t gap-x-2 border-slate-200">
          <ElemButton
            onClick={handleCloseDeleteNoteConfirm}
            roundedFull
            btn="default">
            Cancel
          </ElemButton>
          <ElemButton
            onClick={() => onDeleteNote()}
            roundedFull
            btn="danger"
            loading={isDeletingNote}>
            Delete
          </ElemButton>
        </div>
      </ElemModal>

      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="Claim a profile."
        content="To add a comment, search your name and claim profile."
        onClose={onCloseLinkPersonDialog}
      />

      <Toaster />
    </>
  );
};
export default ElemNoteCard;
