import React, {
  MutableRefObject,
  useRef,
  useEffect,
  useState,
  Fragment,
} from 'react';
import useSWR from 'swr';
import moment from 'moment-timezone';
import { ElemPhoto } from '../elem-photo';
import Link from 'next/link';
import {
  IconEllipsisVertical,
  IconThumbUp,
  IconThumbUpSolid,
  IconAnnotation,
  IconLockClosed,
  IconGlobe,
  IconUsers,
  IconPaperAirplane,
  IconPaperAirplaneSolid,
} from '@/components/icons';
import { GetNotesQuery, useGetUserByIdQuery } from '@/graphql/types';
import { useUser } from '@/context/user-context';
import { Popover, Transition } from '@headlessui/react';
import { InputTextarea } from '../input-textarea';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import ElemNoteForm from '@/components/elem-note-form';
import { usePopup } from '@/context/popup-context';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  data: GetNotesQuery['notes'][0];
  refetch: () => void;
  layout?: 'organizationAndAuthor' | 'author';
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

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: '%dm', //minute
    mm: '%dm', //minutes
    h: '%dh', //hour
    hh: '%dh', //hours
    d: '%dd', //day
    dd: '%dd', //days
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years',
  },
  calendar: {
    lastDay: '[Yesterday at] LT',
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    lastWeek: '[last] dddd [at] LT',
    nextWeek: 'dddd [at] LT',
    sameElse: 'll [at] LT',
  },
});

const ElemNoteCard: React.FC<Props> = ({
  data,
  refetch,
  layout = 'organizationAndAuthor',
}) => {
  const { user } = useUser();

  const { setShowPopup } = usePopup();

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

  const { data: userById } = useGetUserByIdQuery({
    id: data?.created_by || 0,
  });

  const userHasProfile = userById?.users[0]?.person ? true : false;

  const noteCreatedByName = userHasProfile
    ? data?.created_by_user?.person?.name || data?.created_by_user?.display_name
    : userById?.users[0]?.display_name || userById?.users[0]?.person?.name;

  // Edit Notes
  const [isOpenNoteForm, setIsOpenNoteForm] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<GetNotesQuery['notes'][0]>();

  const onOpenNoteForm = () => {
    setIsOpenNoteForm(true);
  };

  const onCloseNoteForm = () => {
    setIsOpenNoteForm(false);
    setTimeout(() => {
      setSelectedNote(undefined);
    }, 400);
  };

  const onSelectNote = (note: GetNotesQuery['notes'][0]) => {
    setSelectedNote(note);
    onOpenNoteForm();
  };

  const onOpenLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(true);
  };

  const onCloseLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(false);
  };

  const onClickSearchName = () => {
    onCloseLinkPersonDialog();

    if (setShowPopup) {
      setShowPopup('search');
    }
  };

  // note content see more
  const [contentShowAll, setContentShowAll] = useState(false);
  const contentDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [contentDivHeight, setContentDivHeight] = useState(0);

  const likesCount = data.likes.length;
  const isLikedByCurrentUser = data.likes.some(
    item => item.created_by_user_id === user?.id,
  );

  const commentsCount = data?.comments.length;

  useEffect(() => {
    if (data.notes && contentDiv?.current) {
      setContentDivHeight(contentDiv.current.scrollHeight);
    }
  }, [data.notes]);

  const formatDateShown = (date: Date) => {
    const getUTCDate = moment.utc(date);
    const localDate = moment(getUTCDate).local().format('YYYY-MM-DD HH:mm:ss');
    const lastWeek = moment().subtract(1, 'weeks').valueOf();
    const noteCreated = moment(localDate).valueOf();

    // if note is older than a week
    if (lastWeek > noteCreated) {
      return moment(localDate).format('LL');
    } else {
      return moment(localDate).fromNow(true);
    }
  };

  const formatDateTooltip = (date: Date) => {
    const getUTCDate = moment.utc(date);
    const localDate = moment(getUTCDate).local().calendar();
    return localDate;
  };

  const onToggleLike = async () => {
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

  const commentInput =
    React.createRef() as MutableRefObject<HTMLTextAreaElement>;

  const onCommentButton = () => {
    if (user?.person && userHasProfile) {
      commentInput.current.focus();
    } else {
      onOpenLinkPersonDialog();
    }
  };

  const onAddComment = async () => {
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

  const onDeleteComment = async (id: number) => {
    await fetch('/api/delete-comment/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    refetch();
  };

  const onDeleteNote = async () => {
    await fetch('/api/notes/', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
      }),
    });
    refetch();
  };

  useEffect(() => {
    if (commentInput.current) {
      setCommentContent(commentInput.current.value);
    }
  }, [commentInput, commentContent]);

  const onChangeCommentInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCommentContent(event.target.value);

    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'inherit';

    if (commentContent.length > 0 && target.scrollHeight > 32) {
      target.style.height = `${target.scrollHeight}px`;
    } else {
      target.style.height = '2rem';
    }
  };

  const onCommentInputKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter' && !userHasProfile) {
      onOpenLinkPersonDialog();
    } else if (event.key === 'Enter' && commentContent) {
      onAddComment();
      setCommentContent('');
    }
  };

  const onCommentSend = () => {
    if (commentContent && userHasProfile) {
      onAddComment();
      setCommentContent('');
    } else {
      onOpenLinkPersonDialog();
    }
  };

  const onCommentInputClick = (
    event: React.MouseEvent<HTMLTextAreaElement>,
  ) => {
    if (!user?.person) {
      event.currentTarget.blur();
      onOpenLinkPersonDialog();
    }
  };

  const noteOptions = (
    <Popover className="relative z-10 transition-all">
      <Popover.Button className="flex items-center focus:outline-none">
        <IconEllipsisVertical
          className="h-6 w-6 text-gray-600"
          title="Options"
        />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
          {({ close }) => (
            <>
              <button
                onClick={() => {
                  onSelectNote(data);
                  close();
                }}
                className="flex items-center gap-x-2 cursor-pointer w-full text-sm px-4 py-2 transition-all hover:bg-gray-100"
              >
                Edit note
              </button>

              <button
                onClick={onDeleteNote}
                className="flex items-center gap-x-2 cursor-pointer w-full text-sm px-4 py-2 transition-all hover:bg-gray-100"
              >
                Delete note
              </button>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );

  const NoteComment: React.FC<any> = ({ comment }) => {
    return (
      <div key={comment.id} className="flex items-center gap-2">
        <div className="flex items-start gap-2">
          <Link href={`/people/${comment.created_by_user?.person?.slug}`}>
            <a>
              <ElemPhoto
                photo={comment.created_by_user?.person?.picture}
                wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                imgAlt={
                  comment.created_by_user?.person?.name ||
                  data?.created_by_user?.display_name
                }
                placeholder="user"
                placeholderClass="text-slate-300"
              />
            </a>
          </Link>
          <div className="">
            <div className="inline-flex py-2 px-3 text-sm bg-gray-100 rounded-lg">
              <div>
                <p>
                  <Link
                    href={`/people/${comment.created_by_user?.person?.slug}`}
                  >
                    <a className="font-medium underline hover:no-underline">
                      {comment.created_by_user?.person?.name ||
                        comment.created_by_user?.display_name}
                    </a>
                  </Link>
                  <span aria-hidden="true"> · </span>
                  <span className="text-gray-500">
                    {formatDateShown(comment?.created_at)}
                  </span>
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
        {comment.created_by_user_id === user?.id && (
          <Popover className="relative">
            <Popover.Button className="flex items-center focus:outline-none">
              <IconEllipsisVertical
                className="h-6 w-6 text-gray-600"
                title="Options"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
                <button
                  onClick={() => {
                    onDeleteComment(comment.id);
                  }}
                  className="flex items-center gap-x-2 cursor-pointer w-full text-sm px-4 py-2 transition-all hover:bg-gray-100"
                >
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </div>
    );
  };

  const resourceType =
    data.resource_type === 'vc_firms' ? 'investors' : data.resource_type;
  const resourceLink = `/${resourceType}/${resource?.slug}`;

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-lg">
        <div className="relative flex items-center space-x-3 px-4 py-2">
          <div className="flex-shrink-0 relative">
            {layout === 'organizationAndAuthor' ? (
              <>
                <Link href={resourceLink}>
                  <a>
                    <ElemPhoto
                      photo={resource?.logo}
                      wrapClass="flex items-center justify-center shrink-0 w-12 h-12  p-1 bg-white rounded-lg border border-gray-300"
                      imgClass="object-fit max-w-full max-h-full"
                      imgAlt={resource?.name}
                    />
                  </a>
                </Link>

                {data?.created_by_user?.person ? (
                  <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                    <a className="absolute -right-1 -bottom-1">
                      <ElemPhoto
                        photo={data?.created_by_user?.person?.picture}
                        wrapClass=""
                        imgClass="object-fit h-7 w-7 border border-white rounded-full"
                        imgAlt={noteCreatedByName}
                        placeholder="user"
                        placeholderClass="text-gray-300 bg-white p-0"
                      />
                    </a>
                  </Link>
                ) : (
                  <ElemPhoto
                    wrapClass="absolute -right-1 -bottom-1"
                    imgClass="object-fit h-7 w-7 border border-white rounded-full"
                    imgAlt={noteCreatedByName}
                    placeholder="user"
                    placeholderClass="text-gray-300 bg-white p-0"
                  />
                )}
              </>
            ) : layout === 'author' ? (
              <>
                {data?.created_by_user?.person ? (
                  <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                    <a>
                      <ElemPhoto
                        photo={data?.created_by_user?.person?.picture}
                        wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-white rounded-full border border-gray-200"
                        imgClass="object-fit max-w-full max-h-full rounded-full"
                        imgAlt={noteCreatedByName}
                        placeholder="user"
                        placeholderClass="text-gray-300 bg-white p-0"
                      />
                    </a>
                  </Link>
                ) : (
                  <ElemPhoto
                    wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-white rounded-full border border-gray-200"
                    imgClass="object-fit max-w-full max-h-full rounded-full"
                    imgAlt={noteCreatedByName}
                    placeholder="user"
                    placeholderClass="text-gray-300 bg-white p-0"
                  />
                )}
              </>
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                {data?.created_by_user ? (
                  <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                    <a className="font-medium underline hover:no-underline">
                      {data?.created_by_user?.person?.name}
                    </a>
                  </Link>
                ) : (
                  <div className="inline font-medium">{noteCreatedByName}</div>
                )}{' '}
                {layout === 'organizationAndAuthor' && (
                  <div className="inline">
                    <span>posted in </span>
                    <Link href={resourceLink}>
                      <a className="font-medium underline hover:no-underline">
                        {resource?.name}
                      </a>
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-1 flex space-x-2 flex-wrap text-xs text-gray-500">
                <ElemTooltip content={formatDateTooltip(data?.created_at)}>
                  <div className="inline-flex">
                    {formatDateShown(data?.created_at)}
                  </div>
                </ElemTooltip>

                {data.audience === 'only_me' ? (
                  <ElemTooltip content={'Only me'}>
                    <div className="inline-flex items-center">
                      <IconLockClosed
                        className=" w-4 h-4 mr-0.5"
                        title="Only me"
                      />
                      Only me
                    </div>
                  </ElemTooltip>
                ) : data.audience === 'public' ? (
                  <ElemTooltip content={'Public'}>
                    <div className="inline-flex items-center">
                      <IconGlobe className="w-4 h-4 mr-0.5" title="Public" />
                      <div>Public note</div>
                    </div>
                  </ElemTooltip>
                ) : (
                  <ElemTooltip
                    content={`Shared with group: ${data?.user_group?.name}`}
                  >
                    <div className="inline-flex">
                      <IconUsers
                        className="inline-flex w-4 h-4 mr-0.5"
                        title={`Shared with ${data?.user_group?.name}`}
                      />
                      <Link href={`/groups/${data?.user_group?.id}`}>
                        <a className="inline font-medium hover:underline">
                          {data?.user_group?.name}
                        </a>
                      </Link>
                    </div>
                  </ElemTooltip>
                )}
              </div>
            </div>
          </div>
          <div>{data?.created_by_user?.id === user?.id && noteOptions}</div>
        </div>

        <div className="grow min-h-fit px-4 py-2">
          <p
            className={`break-words whitespace-pre-line text-sm text-gray-900 ${
              !contentShowAll && 'line-clamp-5'
            }`}
            ref={contentDiv}
          >
            {data.notes}
          </p>
          {contentDivHeight > 120 && !contentShowAll && (
            <button
              type="button"
              onClick={() => setContentShowAll(!contentShowAll)}
              className="text-sm inline hover:underline"
            >
              See more
            </button>
          )}
        </div>

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
        <div className="flex space-x-1 border-y border-gray-300">
          <button
            className={`flex flex-1 items-center justify-center px-2 py-1 shrink grow font-medium hover:bg-gray-100 ${
              isLikedByCurrentUser ? 'text-gray-900' : 'text-gray-500'
            }`}
            onClick={onToggleLike}
          >
            {isLikedByCurrentUser ? (
              <>
                <IconThumbUpSolid className="h-5 w-5 mr-1" /> Liked
              </>
            ) : (
              <>
                <IconThumbUp className="h-5 w-5 mr-1" /> Like
              </>
            )}
          </button>
          <button
            className="flex flex-1 items-center justify-center px-2 py-1 shrink grow font-medium hover:bg-gray-100 text-gray-500"
            onClick={onCommentButton}
          >
            <IconAnnotation className="h-5 w-5 mr-1" /> Comment
          </button>
        </div>
        {data.comments.length > 0 && (
          <div className="flex flex-col space-y-2 px-4 py-2">
            {data.comments.map(comment => {
              return <NoteComment key={comment.id} comment={comment} />;
            })}
          </div>
        )}

        <div className="flex items-start space-x-2 px-4 py-2">
          <ElemPhoto
            photo={user?.person?.picture}
            wrapClass="aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
            imgAlt={user?.person?.name || user?.display_name}
            placeholder="user"
            placeholderClass="text-slate-300"
          />

          <div className="relative flex w-full">
            <InputTextarea
              rows={1}
              ref={commentInput}
              name="comment"
              placeholder="Write a comment..."
              value={commentContent}
              onChange={onChangeCommentInput}
              onKeyDown={onCommentInputKeyDown}
              onClick={onCommentInputClick}
              className="!mt-0"
            />

            <button
              onClick={onCommentSend}
              className={`absolute z-10 right-3 bottom-0 flex items-center justify-center w-8 h-8 rounded-full  ${
                commentContent.length > 0
                  ? 'cursor-pointer hover:bg-gray-100'
                  : 'cursor-not-allowed'
              }`}
            >
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
      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="You have not linked your account to a profile on EdgeIn"
        content="Search your name and claim profile to be able to comment."
        onClose={onCloseLinkPersonDialog}
        onClickSearch={onClickSearchName}
      />

      <ElemNoteForm
        isOpen={isOpenNoteForm}
        type={selectedNote ? 'edit' : 'create'}
        selectedNote={selectedNote}
        resourceId={data.resource_id as number}
        resourceType={data?.resource_type as string}
        onClose={onCloseNoteForm}
        onRefetchNotes={refetch}
      />
    </>
  );
};
export default ElemNoteCard;
