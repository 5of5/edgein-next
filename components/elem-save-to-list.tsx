import React, { FC, useEffect, useState, Fragment } from 'react';
import { Follows, GetFollowsByUserQuery } from '@/graphql/types';
import {
  getNameFromListName,
  isOnList,
  toggleFollowOnList,
} from '@/utils/reaction';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconX, IconPlus } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { InputCheckbox } from '@/components/input-checkbox';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';
import { find, isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { FREE_USER_MAXIMUM_LISTS } from '@/utils/constants';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { ElemWithSignInModal } from './elem-with-sign-in-modal';
import { COMPANIES } from '@/routes';

type Props = {
  resourceName: string | null;
  resourceId: number;
  resourceType: 'companies' | 'vc_firms' | 'people';
  slug: string;
  buttonStyle?:
    | 'danger'
    | 'dark'
    | 'primary'
    | 'purple'
    | 'primary-light'
    | 'transparent'
    | 'white'
    | 'slate'
    | 'ol-white'
    | 'ol-primary'
    | 'default'
    | '';
  follows?: Pick<Follows, 'list_id'>[];
};

type List = GetFollowsByUserQuery['list_members'][0]['list'];

export const ElemSaveToList: FC<Props> = ({
  resourceName,
  resourceId,
  resourceType,
  slug,
  buttonStyle = 'purple',
  follows = [],
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [listsData, setListsData] = useState([] as List[]);
  const { user, listAndFollows, refreshProfile } = useUser();
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [followsByResource, setFollowsByResource] = useState<
    Pick<Follows, 'list_id'>[]
  >([]);

  useEffect(() => {
    if (!isEqual(follows, followsByResource)) {
      setFollowsByResource(follows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follows]);

  const isSaved = followsByResource?.some(followItem =>
    listsData?.some(listItem => listItem.id === followItem.list_id),
  );

  const savedButtonStyle =
    buttonStyle === 'white'
      ? 'text-dark-500 !bg-slate-200 hover:bg-slate-300'
      : 'bg-primary-800';

  useEffect(() => {
    setListName(listName);
    if (listName) {
      const { errors } = zodValidate({ name: listName }, listSchema);
      if (errors) {
        setError(errors['name']?.[0] || '');
      } else {
        setError('');
      }
    } else {
      setError('');
    }
  }, [listName]);

  useEffect(() => {
    if (listAndFollows)
      setListsData(() => {
        return listAndFollows
          .filter(item => {
            const sentiment = getNameFromListName(item);
            return (
              !['hot', 'like', 'crap'].includes(sentiment) &&
              item.created_by_id === user?.id
            );
          })
          .sort((a, b) => (a.name < b.name ? -1 : 1));
      });
  }, [listAndFollows, user]);

  const toggleToList = async (listName: string, action: 'add' | 'remove') => {
    if (listName && user) {
      setListsData(prev => {
        const newLists = [...prev];
        let list = find(prev, list => list.name === listName);
        if (!list) {
          list = {
            __typename: 'lists',
            name: listName,
            description: '',
            id: -1,
            created_by_id: user.id,
            created_by: null,
            created_at: '',
            follows_companies: [],
            follows_vcfirms: [],
            follows_people: [],
            total_no_of_resources: 0,
            public: false,
            updated_at: '',
          };
          newLists.push(list);
        } else {
          list = { ...list };
        }
        if (action === 'add') {
          if (resourceType === 'companies') {
            list.follows_companies = [
              ...list.follows_companies,
              { __typename: 'follows_companies', resource_id: resourceId },
            ];
          }
          if (resourceType === 'vc_firms') {
            list.follows_vcfirms = [
              ...list.follows_vcfirms,
              { __typename: 'follows_vc_firms', resource_id: resourceId },
            ];
          }
          if (resourceType === 'people') {
            list.follows_people = [
              ...list.follows_people,
              { __typename: 'follows_people', resource_id: resourceId },
            ];
          }
        } else {
          if (resourceType === 'companies') {
            list.follows_companies = [
              ...list.follows_companies.filter(
                i => i.resource_id !== resourceId,
              ),
            ];
          }
          if (resourceType === 'vc_firms') {
            list.follows_vcfirms = [
              ...list.follows_vcfirms.filter(i => i.resource_id !== resourceId),
            ];
          }
          if (resourceType === 'people') {
            list.follows_people = [
              ...list.follows_people.filter(i => i.resource_id !== resourceId),
            ];
          }
        }
        return newLists.sort((a, b) => (a.name < b.name ? -1 : 1));
      });
      // pass event and reaction name to handleReactionClick function
      const newSentiment = await toggleFollowOnList({
        resourceId,
        resourceType,
        listName,
        pathname: `${COMPANIES}/${slug}`,
      });
      if (newSentiment?.id) {
        setFollowsByResource(prev => {
          if (action === 'add') {
            return [...prev, { list_id: newSentiment.id }];
          }

          return [
            ...prev.filter(
              followItem => followItem.list_id !== newSentiment.id,
            ),
          ];
        });
      }
      refreshProfile();
      toast.custom(
        t => (
          <div
            className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
              t.visible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            {action === 'add' ? ' Added ' : ' Removed '}
            {resourceName ? <>&nbsp;&ldquo;{resourceName}&rdquo;&nbsp;</> : ''}
            {action === 'add' ? ' to ' : ' from '}
            &ldquo;{getNameFromListName({ name: listName })}&rdquo; list
          </div>
        ),
        {
          duration: 3000,
          position: 'top-center',
        },
      );
    }
  };

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpen(true);
    setIsOpenUpgradeDialog(false);
  };

  const handleCreate = async () => {
    if (error || !listName || !user) {
      return;
    } else {
      await toggleToList(`${user.id}-${listName}`, 'add');
      // hide input
      setShowNew(false);
      setListName('');
    }
  };

  const isSelected = (list: List) => {
    return isOnList(list, resourceId);
  };

  const onClickHandler = (
    event: React.MouseEvent<HTMLInputElement>,
    list: List,
    isSelected: boolean,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    toggleToList(list.name, isSelected ? 'remove' : 'add');
  };

  const onSaveButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsOpen(true);
  };

  const onClickShowCreateNew = () => {
    const userListsLimit =
      user?.entitlements.listsCount ?? FREE_USER_MAXIMUM_LISTS;

    if (listsData.length > userListsLimit) {
      onOpenUpgradeDialog();
    } else {
      setShowNew(true);
    }
  };

  return (
    <>
      {user ? (
        <ElemButton
          onClick={onSaveButton}
          roundedFull={true}
          btn={buttonStyle}
          className={`px-2.5 ${isSaved ? savedButtonStyle : ''}`}
        >
          {isSaved ? 'Saved' : 'Save to list'}
        </ElemButton>
      ) : (
        <ElemWithSignInModal
          text="Sign in to save this profile into a list. We'll even let you know of all the updates."
          buttonComponent={open => (
            <ElemButton
              roundedFull={true}
              btn={buttonStyle}
              className={`px-2.5 ${open ? 'border border-primary-500' : ''}`}
            >
              Save to list
            </ElemButton>
          )}
        />
      )}

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setIsOpen(false), setShowNew(false);
          }}
          className="relative z-[40]"
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
            <div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 my-0 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg px-4 py-3 bg-white shadow-xl transition-all overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
                <div className="pb-3 border-b border-gray-200">
                  <Dialog.Title className="text-xl font-medium flex items-center justify-between">
                    <span>Save to List</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false), setShowNew(false);
                      }}
                      className="focus-visible:outline-none"
                    >
                      <IconX className="w-5 h-5" />
                    </button>
                  </Dialog.Title>

                  {listsData.length === 0 && (
                    <p className="mt-2 text-gray-500">
                      Save organizations that matter to you in a list so you can
                      compare, sort, and more.
                    </p>
                  )}
                </div>

                <ul className="max-h-96 pt-3 overflow-y-auto scrollbar-hide grid gap-y-1">
                  {listsData?.map(list => {
                    const selected = isSelected(list);

                    return (
                      <li key={list.id}>
                        <InputCheckbox
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                          labelClass="grow text-sm"
                          label={getNameFromListName(list)}
                          checked={selected}
                          onClick={e => onClickHandler(e, list, selected)}
                        />
                      </li>
                    );
                  })}
                </ul>

                {!showNew && listsData.length > 0 && (
                  <div className="pt-3">
                    <ElemButton
                      onClick={onClickShowCreateNew}
                      className="w-full !justify-start gap-2 rounded-lg px-4 py-3 font-normal bg-gray-50 hover:bg-gray-100"
                    >
                      <IconPlus className="w-4 h-4 " />
                      <span className="self-start text-sm">
                        Save to new list
                      </span>
                    </ElemButton>
                  </div>
                )}

                {(showNew || listsData.length === 0) && (
                  <div className="pt-3">
                    <label>
                      <InputText
                        label="New list name"
                        type="text"
                        onChange={e => setListName(e.target.value)}
                        value={listName}
                        required={true}
                        name="name"
                        placeholder="Enter List Name..."
                        className={`${
                          error === ''
                            ? 'ring-1 ring-slate-200'
                            : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                        }`}
                      />
                      {error === '' ? null : (
                        <div className="mt-2 font-medium text-sm text-rose-400">
                          {error}
                        </div>
                      )}
                    </label>
                    <div className="flex">
                      <ElemButton
                        onClick={handleCreate}
                        className="mt-3 ml-auto"
                        disabled={listName === '' || error ? true : false}
                        roundedFull
                        btn="purple"
                      >
                        Create list
                      </ElemButton>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
          <Toaster />
        </Dialog>
      </Transition.Root>

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </>
  );
};
