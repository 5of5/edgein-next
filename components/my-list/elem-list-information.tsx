import { Dialog, Transition, Switch } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { ModalListName } from '@/components/my-list/modal-list-name';
import {
  IconX,
  IconTrash,
  IconCustomList,
  IconChevronDownMini,
  IconSettings,
  IconCheck,
} from '@/components/icons';
import { EmojiHot, EmojiLike, EmojiCrap } from '@/components/emojis';
import { ModalListGroups } from './modal-list-groups';
import { ElemDeleteConfirmModal } from '../elem-delete-confirm-modal';
import Link from 'next/link';
import { ElemButton } from '@/components/elem-button';

import {
  getNameFromListName,
  getUserIdFromListCreator,
} from '@/utils/reaction';
import { toLabel } from '@/utils';
import moment from 'moment-timezone';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import ElemDashboardBreadcrumb from '../dashboard/elem-dashboard-breadcrumb';

type Props = {
  list: any;
  allowEdit?: boolean;
  groups: Array<any>;
  onSaveListName: (name: string) => void;
  onDeleteList: (id: number) => void;
  onAddGroups: (ids: Array<number>) => void;
  onChangePublic: (value: boolean) => void;
  isFollowing: boolean;
  onFollowList: () => void;
};

export const ElemListInformation: FC<Props> = ({
  list,
  groups,
  onSaveListName,
  onDeleteList,
  onAddGroups,
  onChangePublic,
  isFollowing,
  onFollowList,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const [listSettingsModal, setListSettingsModal] = useState(false);
  const [listNameModal, setListNameModal] = useState(false);
  const [listDeleteModal, setListDeleteModal] = useState(false);
  const [listGroupsModal, setListGroupsModal] = useState(false);

  const onOpenSettingsDialog = () => {
    setListSettingsModal(true);
  };

  const onCloseSettingsDialog = () => {
    setListSettingsModal(false);
  };

  const isListCreator = getUserIdFromListCreator(list) === user?.id;

  const isCustomList = list
    ? !['hot', 'like', 'crap'].includes(getNameFromListName(list))
    : router.query.slug
    ? !['hot', 'like', 'crap'].includes(router.query.slug as string)
    : false;

  const isPublicList = !!list?.public;

  const isReactionList = list
    ? ['hot', 'like', 'crap'].includes(getNameFromListName(list))
    : false;

  const listName =
    getNameFromListName(list) === 'crap' ? 'sh**' : getNameFromListName(list);

  return (
    <>
      <div className="flex flex-wrap space-y-2 items-end justify-between mb-4 lg:space-y-0 lg:border-b lg:pb-2 lg:border-black/10">
        <div>
          <ElemDashboardBreadcrumb
            breadcrumbs={[
              {
                name: 'my-lists',
                to: '/lists',
                component: 'My Lists',
              },
              {
                name: 'current',
                component: isListCreator ? (
                  <button
                    onClick={onOpenSettingsDialog}
                    className="flex items-center rounded-lg px-1 py-0.5 hover:text-primary-500 hover:bg-slate-200"
                  >
                    <IconCustomList className="w-6 h-6 mr-1" />
                    <div className="font-bold text-xl capitalize">
                      {getNameFromListName(list)}
                    </div>
                    <IconChevronDownMini className="h-5 w-5" />
                  </button>
                ) : (
                  <h1 className="mr-2 font-bold text-xl capitalize leading-tight">
                    Previewing:{' '}
                    {list
                      ? getNameFromListName(list)
                      : toLabel(router.query.slug as string)}
                  </h1>
                ),
              },
            ]}
          />
          {!isCustomList && (
            <div className="mt-4">
              <div className="flex items-center">
                {listName === 'hot' && <EmojiHot className="w-6 h-6 mr-2" />}
                {listName === 'like' && <EmojiLike className="w-6 h-6 mr-2" />}
                {listName === 'sh**' && <EmojiCrap className="w-6 h-6 mr-2" />}
                <h1 className="mr-2 font-bold text-xl capitalize leading-tight">
                  {listName}
                </h1>
              </div>

              {listName && (
                <p className="mt-1 first-letter:uppercase text-slate-600">
                  The {listName} list is generated from your {listName}{' '}
                  reactions on EdgeIn.
                </p>
              )}
            </div>
          )}
        </div>

        {isCustomList && (
          <div className="flex items-center gap-x-4 shrink-0">
            <div>
              {list?.created_by && (
                <p className="pt-1 text-slate-600">
                  {list?.created_by?.person ? (
                    <Link
                      href={`/people/${list?.created_by?.person?.slug}`}
                      passHref
                    >
                      <a className="hover:text-primary-500">
                        {list?.created_by?.person?.name}
                      </a>
                    </Link>
                  ) : (
                    <span>{list?.created_by?.display_name}</span>
                  )}
                  <span aria-hidden="true"> · </span>
                  {moment(list?.created_at).format('LL')}
                </p>
              )}
            </div>
            <div className="flex items-center gap-x-2 shrink-0">
              {isListCreator && (
                <ElemButton
                  btn="slate"
                  className="gap-x-1 lg:!pl-3"
                  onClick={onOpenSettingsDialog}
                >
                  <IconSettings className="hidden sm:block w-5 h-5" />
                  <span>Settings</span>
                </ElemButton>
              )}
              {!isFollowing && (
                <ElemButton btn="primary" onClick={onFollowList}>
                  Follow
                </ElemButton>
              )}
              {isFollowing && !isListCreator && (
                <ElemButton btn="slate" onClick={onFollowList}>
                  <IconCheck className="w-5 h-5 mr-1" />
                  Following
                </ElemButton>
              )}
            </div>
          </div>
        )}
      </div>

      <Transition appear show={listSettingsModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={onCloseSettingsDialog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-slate-100 shadow-xl transition-all overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-2 bg-white border-b border-black/10">
                    <h2 className="text-xl font-bold capitalize">
                      {getNameFromListName(list)}
                    </h2>
                    <button
                      onClick={onCloseSettingsDialog}
                      type="button"
                      className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100"
                    >
                      <IconX className="h-6 w-6" title="close" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col gap-y-4">
                    <div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
                      <button
                        className="flex justify-between w-full p-3 hover:bg-slate-100"
                        onClick={() => setListNameModal(true)}
                      >
                        <div className="text-left">
                          <h3 className="font-bold">Name</h3>
                          <p className="capitalize">
                            {getNameFromListName(list)}
                          </p>
                        </div>
                        <div className="text-primary-500 text-sm font-bold">
                          Edit
                        </div>
                      </button>

                      <button
                        className="flex justify-between w-full p-3 hover:bg-slate-100"
                        onClick={() => setListGroupsModal(true)}
                      >
                        <div className="text-left">
                          <h3 className="font-bold">Groups</h3>
                          {groups.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {groups.map((item: any, index: number) => {
                                if (!item) {
                                  return;
                                }
                                return (
                                  <p
                                    key={index}
                                    className="capitalize bg-slate-200 px-2 py-1 rounded-md"
                                  >
                                    {item?.name}
                                  </p>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-slate-500">Share with group</p>
                          )}
                        </div>
                        <div className="text-primary-500 text-sm font-bold">
                          Edit
                        </div>
                      </button>

                      <div>
                        <div className="flex items-center justify-between space-x-1 p-3 cursor-pointer hover:bg-slate-100">
                          <p className="font-bold">Public</p>
                          <Switch
                            checked={isPublicList}
                            onChange={onChangePublic}
                            className={`${
                              isPublicList ? 'bg-primary-600' : 'bg-gray-200'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                          >
                            <span className="sr-only">Set list public</span>
                            <span
                              className={`${
                                isPublicList ? 'translate-x-6' : 'translate-x-1'
                              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                          </Switch>
                        </div>
                      </div>

                      <div className="flex justify-between w-full p-3">
                        <div className="text-left">
                          <h3 className="font-bold">Created by</h3>
                          <p>
                            <span className="capitalize">
                              {list?.created_by?.person?.name ||
                                list?.created_by?.display_name ||
                                ''}
                            </span>{' '}
                            on {moment(list?.created_at).format('LL')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
                      <button
                        className="flex justify-between w-full p-3 hover:bg-slate-100"
                        onClick={() => {
                          setListDeleteModal(true);
                        }}
                      >
                        <div className="text-left text-rose-500">
                          <h3 className="flex items-center font-bold">
                            <IconTrash
                              className="h-5 w-5 mr-2"
                              title="Delete List"
                            />
                            Delete List
                          </h3>
                        </div>
                      </button>
                    </div>
                  </div>
                  <ModalListName
                    isOpen={listNameModal}
                    onCloseModal={() => setListNameModal(false)}
                    theListName={
                      getNameFromListName(list) ? getNameFromListName(list) : ''
                    }
                    onSave={onSaveListName}
                  />
                  <ElemDeleteConfirmModal
                    isOpen={listDeleteModal}
                    title="Delete this list?"
                    content={
                      <div>
                        When you delete a list, everything in it will be removed
                        immediately.
                        <span className="font-bold inline">
                          This can&lsquo;t be undone.
                        </span>
                      </div>
                    }
                    onClose={() => setListDeleteModal(false)}
                    onDelete={() => onDeleteList(list?.id)}
                  />

                  <ModalListGroups
                    isOpen={listGroupsModal}
                    onCloseModal={() => setListGroupsModal(false)}
                    listGroups={groups}
                    onSave={onAddGroups}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
