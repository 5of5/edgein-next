import { Dialog, Transition, Switch } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { ModalListName } from './modal-list-name';
import { ModalListDescription } from './modal-list-description';
import { IconX, IconSettings } from '@/components/icons';
import { ModalListGroups } from './modal-list-groups';
import { ElemConfirmModal } from '../elem-confirm-modal';
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
import { ElemSocialShare } from '../elem-social-share';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  list: any;
  groups: Array<any>;
  onSaveListName: (name: string) => void;
  onSaveListDescription: (name: string) => void;
  onDeleteList: (id: number) => void;
  onAddGroups: (ids: Array<number>) => void;
  onChangePublic: (value: boolean) => void;
  isFollowing: boolean;
  isFollowButtonLoading: boolean;
  onFollowList: () => void;
};

export const ElemListInformation: FC<Props> = ({
  list,
  groups,
  onSaveListName,
  onSaveListDescription,
  onDeleteList,
  onAddGroups,
  onChangePublic,
  isFollowing,
  isFollowButtonLoading,
  onFollowList,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const [listSettingsModal, setListSettingsModal] = useState(false);
  const [listNameModal, setListNameModal] = useState(false);
  const [listDescriptionModal, setListDescriptionModal] = useState(false);
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
  ``;
  const listName =
    getNameFromListName(list) === 'crap' ? 'sh**' : getNameFromListName(list);

  return (
    <>
      <div className="mb-4 px-4 py-3 border-b border-gray-200">
        <ElemDashboardBreadcrumb
          breadcrumbs={[
            {
              name: 'my-lists',
              to: ROUTES.LISTS,
              component: 'Lists',
            },
            {
              name: 'current',
              component: isListCreator ? (
                <button
                  onClick={onOpenSettingsDialog}
                  className="inline-flex items-center justify-start hover:underline"
                >
                  <span className="text-left capitalize">
                    {getNameFromListName(list)}
                  </span>
                </button>
              ) : (
                <h1 className="text-left capitalize">
                  {list
                    ? getNameFromListName(list)
                    : toLabel(router.query.slug as string)}
                </h1>
              ),
            },
          ]}
        />

        <div className="flex items-center justify-between flex-wrap space-y-2 lg:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              {isListCreator && isCustomList ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-start lg:items-center justify-start hover:underline"
                    onClick={onOpenSettingsDialog}
                  >
                    <span className="font-medium text-left text-xl capitalize">
                      {getNameFromListName(list)}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="text-primary-500 text-sm font-medium"
                    onClick={onOpenSettingsDialog}
                  >
                    Edit
                  </button>
                </>
              ) : (
                <h1 className="mr-2 font-medium text-xl capitalize">
                  {list
                    ? getNameFromListName(list)
                    : toLabel(router.query.slug as string)}
                </h1>
              )}
            </div>

            <div className="flex items-center">
              <div className="text-sm text-gray-500">
                <div className="lg:inline">
                  {isPublicList === true ? 'Public list' : 'Private list'}
                </div>
                {list?.updated_at && (
                  <div className="lg:inline">
                    <span aria-hidden="true" className="hidden lg:inline">
                      {' · '}
                    </span>
                    <span>
                      Last edited{' '}
                      {moment.utc(list?.updated_at).local().format('ll HH:mma')}
                    </span>
                  </div>
                )}

                {list?.created_by && (
                  <div className="lg:inline">
                    <span aria-hidden="true" className="hidden lg:inline">
                      {' · '}
                    </span>
                    {list?.created_by?.person ? (
                      <>
                        Created by{' '}
                        <ElemLink
                          href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                          className="hover:underline"
                        >
                          {list?.created_by?.person?.name}
                        </ElemLink>
                      </>
                    ) : (
                      <span>Created by {list?.created_by?.display_name}</span>
                    )}{' '}
                    {moment(list?.created_at).format('ll HH:mma')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {isCustomList && (
            <div className="flex items-center gap-x-2 shrink-0">
              <ElemSocialShare
                resourceName={`"${listName}" list`}
                resourceTwitterUrl={null}
              />
              {isListCreator && (
                <ElemButton
                  btn="default"
                  className="gap-x-1 lg:!pl-3"
                  onClick={onOpenSettingsDialog}
                >
                  <IconSettings className="hidden sm:block w-5 h-5" />
                  <span>Settings</span>
                </ElemButton>
              )}

              {user && !isFollowing && (
                <ElemButton
                  btn="purple"
                  loading={isFollowButtonLoading}
                  onClick={onFollowList}
                >
                  Follow
                </ElemButton>
              )}
              {isFollowing && !isListCreator && (
                <ElemButton
                  btn="default"
                  loading={isFollowButtonLoading}
                  onClick={onFollowList}
                >
                  Following
                </ElemButton>
              )}
            </div>
          )}
        </div>

        {list?.description && (
          <div className="pt-2 max-w-xl text-gray-500 text-sm">
            {list?.description}
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
                <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-gray-50 shadow-xl transition-all overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-2 bg-white border-b border-gray-200">
                    <h2 className="text-xl font-medium">List settings</h2>
                    <button
                      onClick={onCloseSettingsDialog}
                      type="button"
                      className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-50"
                    >
                      <IconX className="h-6 w-6" title="close" />
                    </button>
                  </div>

                  <div className="p-6 flex flex-col gap-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200 overflow-hidden">
                      <button
                        className="flex justify-between w-full p-3 hover:bg-gray-50"
                        onClick={() => setListNameModal(true)}
                      >
                        <div className="text-left">
                          <h3 className="font-medium">Name</h3>
                          <p className="capitalize">
                            {getNameFromListName(list)}
                          </p>
                        </div>
                        <div className="text-primary-500 text-sm font-medium">
                          Edit
                        </div>
                      </button>

                      <button
                        className="flex justify-between w-full p-3 hover:bg-gray-50"
                        onClick={() => setListDescriptionModal(true)}
                      >
                        <div className="text-left">
                          <h3 className="font-medium">Description</h3>
                          <p
                            className={`capitalize ${
                              list?.description != null ? '' : 'text-gray-500'
                            }`}
                          >
                            {list?.description
                              ? list?.description
                              : 'Add description'}
                          </p>
                        </div>
                        <div className="text-primary-500 text-sm font-medium">
                          Edit
                        </div>
                      </button>

                      <button
                        className="flex justify-between w-full p-3 hover:bg-gray-50"
                        onClick={() => setListGroupsModal(true)}
                      >
                        <div className="text-left">
                          <h3 className="font-medium">Groups</h3>
                          {groups.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {groups.map((item: any, index: number) => {
                                if (!item) {
                                  return;
                                }
                                return (
                                  <p
                                    key={index}
                                    className="capitalize bg-gray-100 px-2 py-1 rounded-md"
                                  >
                                    {item?.name}
                                  </p>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-gray-500">
                              Share list with group
                            </p>
                          )}
                        </div>
                        <div className="text-primary-500 text-sm font-medium">
                          Edit
                        </div>
                      </button>

                      <div>
                        <div className="flex items-center justify-between space-x-1 p-3 cursor-pointer hover:bg-gray-50">
                          <p className="font-medium">Public</p>
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
                          <h3 className="font-medium">Created by</h3>
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
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        className="w-full p-3 text-rose-500 hover:bg-red-500 hover:text-white"
                        onClick={() => {
                          setListDeleteModal(true);
                        }}
                      >
                        <div className="text-left ">
                          <h3 className="flex items-center font-medium">
                            Delete List
                          </h3>
                        </div>
                      </button>
                    </div>
                  </div>
                  <ModalListName
                    isOpen={listNameModal}
                    onCloseModal={() => setListNameModal(false)}
                    theListName={getNameFromListName(list) ?? ''}
                    onSave={onSaveListName}
                  />
                  <ModalListDescription
                    isOpen={listDescriptionModal}
                    onCloseModal={() => setListDescriptionModal(false)}
                    listDescription={list?.description ?? ''}
                    onSave={onSaveListDescription}
                  />
                  <ElemConfirmModal
                    isOpen={listDeleteModal}
                    title="Delete this list?"
                    content={
                      <div>
                        When you delete a list, everything in it will be removed
                        immediately.
                        <span className="font-medium inline">
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
