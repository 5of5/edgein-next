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
  IconEllipsisHorizontal,
  IconThumbUp,
  IconThumbUpSolid,
  IconAnnotation,
  IconTrash,
  IconEditPencil,
  IconGroup,
  IconLockClosed,
  IconGlobe,
  IconUsers,
  IconPaperAirplane,
  IconPaperAirplaneSolid,
} from '@/components/icons';
import { ElemTooltip } from '@/components/elem-tooltip';
import { GetNotesQuery, People } from '@/graphql/types';
import { useUser } from '@/context/user-context';
import { Popover, Transition } from '@headlessui/react';
import { InputTextarea } from '../input-textarea';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import { Popups } from '@/components/the-navbar';
import ElemNoteForm from '@/components/elem-note-form';

type Props = {
  data: GetNotesQuery['notes'][0];
  refetch: () => void;
  layout?: 'organizationAndAuthor' | 'groupAndAuthor' | 'author';
  setShowPopup?: React.Dispatch<React.SetStateAction<Popups>>;
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

const ElemNoteCard: React.FC<Props> = ({
  data,
  refetch,
  layout = 'organizationAndAuthor',
  setShowPopup,
}) => {
  const { user } = useUser();

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

  const commentsCount = data.comments.length;

  useEffect(() => {
    if (data.notes && contentDiv?.current) {
      setContentDivHeight(contentDiv.current.scrollHeight);
    }
  }, [data.notes]);

  const formatDateShown = (date: Date) => {
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
    });

    const utcTime = date;
    const local_date = moment
      .utc(utcTime)
      .local()
      .format('YYYY-MM-DD HH:mm:ss');

    const lastMonth = moment().subtract(1, 'weeks').valueOf();
    const noteCreated = moment(local_date).valueOf();

    // if note is older than a month
    if (lastMonth > noteCreated) {
      return moment(local_date).format('LL');
    } else {
      return moment(local_date).fromNow(true);
    }
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
    if (user?.person) {
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
    if (event.key === 'Enter' && commentContent) {
      onAddComment();
      setCommentContent('');
    }
  };

  const onCommentSend = () => {
    if (commentContent) {
      onAddComment();
      setCommentContent('');
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
      <Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
        <IconEllipsisHorizontal
          className="h-6 w-6 group-hover:text-primary-500"
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
        <Popover.Panel className="absolute right-0 overflow-hidden w-48 p-1 divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          {({ close }) => (
            <>
              <button
                onClick={() => {
                  onSelectNote(data);
                  close();
                }}
                className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
              >
                <IconEditPencil className="h-4 aspect-square group-hover:text-primary-500" />
                <span className="text-sm font-medium">Edit note</span>
              </button>
              {/* <button
								onClick={() => {
									setIsEdit(true);
									close();
								}}
								className="flex items-center space-x-1 w-full px-2 py-2 rounded-lg hover:bg-gray-50 hover:text-primary-500"
							>
								<IconEditPencil className="h-4 aspect-square group-hover:text-primary-500" />
								<span className="text-sm font-medium">Edit note old</span>
							</button> */}
              <button
                onClick={onDeleteNote}
                className="flex items-center space-x-1 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
              >
                <IconTrash className="h-4 aspect-square group-hover:text-primary-500" />
                <span className="text-sm font-medium">Delete note</span>
              </button>
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );

  const resourceType =
    data.resource_type === 'vc_firms' ? 'investors' : data.resource_type;
  const resourceLink = `/${resourceType}/${resource?.slug}`;

  return (
    <>
      <div className="flex flex-col bg-white shadow rounded-lg px-4 py-3">
        <div className="relative flex items-center space-x-3">
          <div className="flex-shrink-0 relative">
            {layout === 'organizationAndAuthor' ? (
              <Link href={resourceLink}>
                <a>
                  <ElemPhoto
                    photo={resource?.logo}
                    wrapClass="flex items-center justify-center shrink-0 w-12 h-12 mb-2 p-1 bg-white rounded-lg shadow"
                    imgClass="object-fit max-w-full max-h-full"
                    imgAlt={resource?.name}
                  />
                </a>
              </Link>
            ) : layout === 'groupAndAuthor' ? (
              <Link href={`/groups/${data?.user_group?.id}`}>
                <a>
                  <div className="flex items-center justify-center w-12 h-12 mb-2 p-1 bg-slate-200 rounded-lg shadow">
                    <IconGroup
                      className="w-7 h-7"
                      title={data?.user_group?.name}
                    />
                  </div>
                </a>
              </Link>
            ) : (
              // layout === "author"
              <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                <a>
                  <ElemPhoto
                    photo={data?.created_by_user?.person?.picture}
                    wrapClass="flex items-center justify-center shrink-0 w-12 h-12 bg-white rounded-full shadow"
                    imgClass="object-fit max-w-full max-h-full rounded-full"
                    imgAlt={
                      data?.created_by_user?.person?.name ||
                      data?.created_by_user?.display_name ||
                      `User: ${data?.created_by}`
                    }
                    placeholder="user"
                    placeholderClass="text-slate-400 bg-white p-0"
                  />
                </a>
              </Link>
            )}

            {(layout === 'organizationAndAuthor' ||
              layout === 'groupAndAuthor') && (
              <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                <a className="absolute -right-1 -bottom-1">
                  <ElemPhoto
                    photo={data?.created_by_user?.person?.picture}
                    wrapClass=""
                    imgClass="object-fit h-7 w-7 border border-white rounded-full"
                    imgAlt={
                      data?.created_by_user?.person?.name ||
                      data?.created_by_user?.display_name
                    }
                    placeholder="user"
                    placeholderClass="text-slate-400 bg-white p-0"
                  />
                </a>
              </Link>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div>
              <h2 className="text-lg leading-tight font-bold underline-offset-1 hover:underline">
                {layout === 'organizationAndAuthor' ? (
                  <Link href={resourceLink}>
                    <a>{resource?.name}</a>
                  </Link>
                ) : layout === 'groupAndAuthor' ? (
                  <Link href={`/groups/${data?.user_group?.id}`}>
                    <a>{data?.user_group?.name}</a>
                  </Link>
                ) : (
                  // layout === "author"
                  <Link href={`/people/${data?.created_by_user?.person?.slug}`}>
                    <a>{data?.created_by_user?.person?.name}</a>
                  </Link>
                )}
              </h2>
              <div className="text-sm text-slate-600">
                {(layout === 'organizationAndAuthor' ||
                  layout === 'groupAndAuthor') && (
                  <>
                    <Link
                      href={`/people/${data?.created_by_user?.person?.slug}`}
                    >
                      <a className="underline-offset-1 hover:underline">
                        {data?.created_by_user?.person?.name}
                      </a>
                    </Link>
                    <span aria-hidden="true"> · </span>
                  </>
                )}

                {/* <ElemTooltip
                  content={`${moment(data?.created_at).format(
                    'LL [at] h:mma',
                  )}`}
                  size="md"
                  className="inline-flex items-center overflow-visible"
                >
                  {formatDateShown(data?.created_at)}
                </ElemTooltip> */}

                {layout === 'organizationAndAuthor' ||
                layout === 'groupAndAuthor' ? (
                  <IconUsers
                    className="inline-flex w-4 h-4"
                    title={`Members of ${data?.user_group?.name}`}
                  />
                ) : (
                  <>
                    {data.audience === 'only_me' ? (
                      <IconLockClosed
                        className="inline-flex w-4 h-4"
                        title="Only me"
                      />
                    ) : (
                      <IconGlobe
                        className="inline-flex w-4 h-4"
                        title="Public"
                      />
                    )}
                  </>
                )}

                {/* {layout === "author" && } */}
              </div>
            </div>
          </div>
          <div>{data?.created_by_user?.id === user?.id && noteOptions}</div>
        </div>

        <div className="grow py-2 min-h-fit">
          <p
            className={`break-words whitespace-pre-line ${
              !contentShowAll && 'line-clamp-5'
            } text-gray-400`}
            ref={contentDiv}
          >
            {data.notes}
          </p>
          {contentDivHeight > 120 && !contentShowAll && (
            <button
              type="button"
              onClick={() => setContentShowAll(!contentShowAll)}
              className="inline text-primary-500"
            >
              See more
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            {likesCount > 0
              ? `${likesCount} like${likesCount > 1 ? 's' : ''}`
              : null}
          </span>
          <span className="text-sm text-slate-600">
            {commentsCount > 0
              ? `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`
              : null}
          </span>
        </div>
        <div className="flex space-x-1 py-1 border-t border-b border-black/10">
          <button
            className={`flex flex-1 items-center justify-center px-2 py-1 rounded-md shrink grow font-medium hover:bg-slate-200 active:bg-slate-300 ${
              isLikedByCurrentUser ? 'text-primary-500' : 'text-slate-600'
            }`}
            onClick={onToggleLike}
          >
            {isLikedByCurrentUser ? (
              <IconThumbUpSolid className="h-5 w-5 mr-1" />
            ) : (
              <IconThumbUp className="h-5 w-5 mr-1" />
            )}
            Like
          </button>
          <button
            className="flex flex-1 items-center justify-center px-2 py-1 rounded-md shrink grow font-medium text-slate-600 hover:bg-slate-200 active:bg-slate-300"
            onClick={onCommentButton}
          >
            <IconAnnotation className="h-5 w-5 mr-1" /> Comment
          </button>
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          {data.comments.map(comment => (
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
                  <div className="inline-flex py-2 px-3 text-sm bg-slate-100 rounded-[18px]">
                    <div>
                      <p className="">
                        <Link
                          href={`/people/${comment.created_by_user?.person?.slug}`}
                        >
                          <a className="font-bold hover:underline">
                            {comment.created_by_user?.person?.name ||
                              comment.created_by_user?.display_name}
                          </a>
                        </Link>
                        <span aria-hidden="true"> · </span>
                        <span className="text-slate-600">
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
                  <Popover.Button className="inline-flex items-center text-sm rounded-full aspect-square p-1 transition ease-in-out duration-150 group hover:text-primary-500 hover:bg-slate-200 focus:outline-none">
                    <IconEllipsisHorizontal
                      className="h-6 w-6 group-hover:text-primary-500"
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
                    <Popover.Panel className="absolute left-1/2 -translate-x-1/2 bg-white z-10 rounded-md shadow-md p-1 w-48">
                      <button
                        onClick={() => {
                          onDeleteComment(comment.id);
                        }}
                        className="cursor-pointer text-left w-full rounded-md p-2 m-0 transition-all hover:bg-slate-100"
                      >
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-start space-x-2 mt-2">
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
              className="bg-slate-100 ring-0 rounded-[18px] !mt-0 px-4 !py-1 min-h-[2rem] overflow-y-auto overscroll-y-none scrollbar-hide text-slate-600 transition-all hover:bg-slate-200"
            />

            <button
              onClick={onCommentSend}
              className={`absolute z-10 right-3 bottom-0 flex items-center justify-center w-8 h-8 rounded-full  ${
                commentContent.length > 0
                  ? 'cursor-pointer hover:bg-slate-200'
                  : 'cursor-not-allowed'
              }`}
            >
              {commentContent.length > 0 ? (
                <IconPaperAirplaneSolid
                  className="w-5 h-5 text-primary-500"
                  title="Comment"
                />
              ) : (
                <IconPaperAirplane
                  className="w-5 h-5 text-slate-600"
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
