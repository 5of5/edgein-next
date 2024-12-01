import React, { MutableRefObject, useEffect, useState, Fragment } from 'react';
import moment from 'moment-timezone';
import {
  renderMarkdownToHTML,
  replaceAtMentionsWithLinks,
  wrapHyperlinks,
} from '@/utils/notes';
import { ElemPhoto } from '../elem-photo';
import {
  IconEllipsisVertical,
  IconPaperAirplane,
  IconPaperAirplaneSolid,
} from '@/components/icons';
import { GetNotesQuery } from '@/graphql/types';
import { useUser } from '@/context/user-context';
import { Popover, Transition } from '@headlessui/react';
import { InputTextarea } from '../input-textarea';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '@/components/elem-tooltip';
import { Autocomplete } from '@/components/autocomplete';
import { ROUTES } from '@/routes';
import { ElemModal } from '../elem-modal';
import { ElemButton } from '../elem-button';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

type Note = GetNotesQuery['notes'][0];
type Comments = GetNotesQuery['notes'][0]['comments'];

type CommentsProps = {
  note: Note;
  comments: Comments;
  refetch: () => void;
};

const formatContent = (text: string) => {
  return renderMarkdownToHTML(replaceAtMentionsWithLinks(wrapHyperlinks(text)));
};

export const ElemNoteCardComments: React.FC<CommentsProps> = ({
  note,
  comments,
  refetch,
}) => {
  const { user } = useUser();

  const [isOpenCommentForm, setIsOpenCommentForm] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<Comments[0]>();
  const [commentContent, setCommentContent] = useState<string>('');
  const [showDeleteCommentConfirm, setShowDeleteCommentConfirm] =
    useState(false);

  const onHideDeleteCommentConfirm = () => {
    setShowDeleteCommentConfirm(false);
  };

  const commentInput =
    React.createRef() as MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    if (commentInput.current) {
      setCommentContent(commentInput.current.value);
    }
  }, [commentInput, commentContent]);

  const onCloseCommentForm = () => {
    setIsOpenCommentForm(false);
    setTimeout(() => {
      setSelectedComment({} as Comments[0]);
    }, 400);
  };

  const onEditComment = (comment: Comments[0]) => {
    setSelectedComment(comment);
    setCommentContent(comment.content);
    setIsOpenCommentForm(true);
  };

  const onUpdateComment = async () => {
    // TODO: add update-comment route
    // await fetch('/api/add-comment/', {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     noteId: note.id,
    //     content: commentContent,
    //   }),
    // });
    // refetch();
    setIsOpenCommentForm(false);
  };

  const onConfirmDelete = (comment: Comments[0]) => {
    setSelectedComment(comment);
    setShowDeleteCommentConfirm(true);
  };

  const { mutate: onDeleteComment, isLoading: isDeletingComment } = useMutation(
    () =>
      fetch('/api/delete-comment/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedComment?.id,
        }),
      }),
    {
      onSuccess: async (response, value) => {
        if (response.status !== 200) {
          const err = await response.json();
          toast.custom(
            t => (
              <div
                className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                {err.message}
              </div>
            ),
            {
              duration: 5000,
              position: 'top-center',
            },
          );
        } else {
          setShowDeleteCommentConfirm(false);
          refetch();
          toast.custom(
            t => (
              <div
                className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                  t.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}>
                Comment deleted
              </div>
            ),
            {
              duration: 3000,
              position: 'top-center',
            },
          );
        }
      },
    },
  );

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

  const onCommentUpdate = (comment: Comments[0]) => {
    if (comment.content) {
      onUpdateComment();
    }
  };

  return (
    <>
      {comments.length > 0 && (
        <div className="flex flex-col py-2 space-y-2">
          {comments.map(comment => {
            return (
              <div
                key={comment.id}
                className="flex items-start gap-2 px-4 group">
                <ElemLink
                  href={`${ROUTES.PEOPLE}/${comment.created_by_user?.person?.slug}`}
                  className="shrink-0">
                  <ElemPhoto
                    photo={comment.created_by_user?.person?.picture}
                    wrapClass="aspect-square shrink-0 bg-dark-100 overflow-hidden rounded-full w-8"
                    imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                    imgAlt={
                      comment.created_by_user?.person?.name ||
                      note?.created_by_user?.display_name
                    }
                    placeholder="user"
                    placeholderAlt={
                      comment.created_by_user?.person?.name ||
                      note.created_by_user?.display_name
                    }
                    placeholderClass="text-gray-300"
                  />
                </ElemLink>

                {isOpenCommentForm && comment.id === selectedComment?.id ? (
                  <div className="w-full">
                    <div className="relative">
                      <InputTextarea
                        rows={1}
                        ref={commentInput}
                        name="comment"
                        placeholder="Write a comment..."
                        value={commentContent}
                        onChange={onChangeCommentInput}
                        // onKeyDown={onCommentInputKeyDown}
                        className="!mt-0"
                      />
                      <button
                        onClick={() => onCommentUpdate(comment)}
                        className={`absolute z-10 right-3 bottom-0 flex items-center justify-center w-8 h-8 rounded-full  ${
                          commentContent.length > 0
                            ? 'cursor-pointer hover:bg-neutral-900'
                            : 'cursor-not-allowed'
                        }`}>
                        {commentContent.length > 0 ? (
                          <IconPaperAirplaneSolid
                            className="w-5 h-5 text-primary-500"
                            title="Comment"
                          />
                        ) : (
                          <IconPaperAirplane
                            className="w-5 h-5 text-gray-500"
                            title="Comment"
                          />
                        )}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={onCloseCommentForm}
                        className="inline-block text-xs text-primary-500">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 text-sm bg-neutral-900 grow rounded-xl">
                        <div>
                          <ElemLink
                            href={`${ROUTES.PEOPLE}/${comment.created_by_user?.person?.slug}`}
                            className="font-medium hover:underline">
                            {comment.created_by_user?.person?.name ||
                              comment.created_by_user?.display_name}
                          </ElemLink>
                        </div>
                        <p
                          className="break-all"
                          dangerouslySetInnerHTML={formatContent(
                            comment.content,
                          )}></p>
                      </div>
                      <div>
                        {comment.created_by_user_id === user?.id && (
                          <Popover className="relative lg:opacity-0 lg:group-hover:opacity-100">
                            <Popover.Button className="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-neutral-900">
                              <IconEllipsisVertical
                                className="w-6 h-6 text-gray-600"
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
                              leaveTo="opacity-0 translate-y-1">
                              <Popover.Panel className="absolute right-0 z-10 block w-56 p-2 mt-2 overflow-hidden bg-dark-100 border border-gray-300 rounded-lg shadow-lg">
                                {({ close }) => (
                                  <>
                                    {/* 
                                    <button
                                      onClick={() => {
                                        onEditComment(comment);
                                        close();
                                      }}
                                      className="flex items-center w-full px-4 py-2 text-sm transition-all cursor-pointer gap-x-2 hover:bg-neutral-900">
                                      Edit comment
                                    </button> */}

                                    <button
                                      onClick={() => {
                                        onConfirmDelete(comment);
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
                    <div className="">
                      <ElemTooltip
                        content={moment
                          .utc(comment?.created_at)
                          .local()
                          .format('dddd, ll [at] hh:mma')}
                        direction="bottom">
                        <div className="inline-block text-xs">
                          {moment.utc(comment?.created_at).local().fromNow()}
                        </div>
                      </ElemTooltip>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <ElemModal
        isOpen={showDeleteCommentConfirm}
        onClose={onHideDeleteCommentConfirm}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-4 py-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Delete comment?</h2>
        </div>
        <div className="py-3">
          Are you sure you want to delete this comment?
        </div>

        <div className="flex items-center justify-end pt-3 border-t gap-x-2 border-slate-200">
          <ElemButton
            onClick={onHideDeleteCommentConfirm}
            roundedFull
            btn="default">
            Cancel
          </ElemButton>
          <ElemButton
            onClick={() => onDeleteComment()}
            roundedFull
            btn="danger"
            loading={isDeletingComment}>
            Delete
          </ElemButton>
        </div>
      </ElemModal>
    </>
  );
};
