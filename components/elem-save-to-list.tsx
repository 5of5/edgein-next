import React, { FC, useEffect, useState, Fragment } from 'react';
import {
  GetFollowsByUserQuery,
  useGetFollowsByResourceQuery,
} from '@/graphql/types';
import {
  getNameFromListName,
  isOnList,
  toggleFollowOnList,
} from '@/utils/reaction';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconX, IconListPlus, IconListSaved } from '@/components/icons';
import { Dialog, Transition } from '@headlessui/react';
import { InputCheckbox } from '@/components/input-checkbox';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { find } from 'lodash';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';

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
    | '';
};

type List = GetFollowsByUserQuery['list_members'][0]['list'];

export const ElemSaveToList: FC<Props> = ({
  resourceName,
  resourceId,
  resourceType,
  slug,
  buttonStyle = 'purple',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [listsData, setListsData] = useState([] as List[]);
  const { user, listAndFollows, refreshProfile } = useUser();
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { data: followsByResource, refetch: refetchFollows } =
    useGetFollowsByResourceQuery({
      resourceId,
      resourceType,
    });

  const isSaved = followsByResource?.follows?.some(followItem =>
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
        pathname: `/companies/${slug}`,
      });
      refreshProfile();
      refetchFollows();
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

  return (
    <>
      <ElemButton
        onClick={onSaveButton}
        btn={buttonStyle}
        // btn="white"
        roundedFull={true}
        className={`px-2.5 ${isSaved ? savedButtonStyle : ''}`}
      >
        {isSaved ? (
          <IconListSaved className="w-5 h-5 mr-1" />
        ) : (
          <IconListPlus className="w-5 h-5 mr-1" />
        )}
        {isSaved ? 'Saved' : 'Save'}
      </ElemButton>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setIsOpen(false), setShowNew(false);
          }}
          className="relative z-[60]"
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

          <div className="fixed inset-0 z-[50] my-0 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative max-w-sm w-full mx-auto rounded-lg shadow-2xl my-7 bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
                <div className="absolute top-1 right-1">
                  <button
                    onClick={() => {
                      setIsOpen(false), setShowNew(false);
                    }}
                    type="button"
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/10 focus:bg-black/20"
                  >
                    <span className="sr-only">Close</span>
                    <IconX className="h-6 w-6 text-white" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-3 py-1.5 from-blue-800 via-primary-500 to-primary-400 bg-gradient-to-r">
                  <Dialog.Title className="text-lg font-bold text-white">
                    Save to List
                  </Dialog.Title>
                </div>

                {listsData.length === 0 && (
                  <p className="p-3 text-slate-500 text-lg">
                    Group organizations that matter to you in a list so you can
                    compare, sort, and more.
                  </p>
                )}

                <ul className="max-h-96 overflow-y-auto scrollbar-hide divide-y divide-slate-100">
                  {listsData?.map(list => {
                    const selected = isSelected(list);

                    return (
                      <li key={list.id}>
                        <InputCheckbox
                          className="w-full hover:bg-slate-100"
                          inputClass="ml-3"
                          labelClass="grow py-3 pr-3"
                          label={getNameFromListName(list)}
                          checked={selected}
                          onClick={e => onClickHandler(e, list, selected)}
                        />
                      </li>
                    );
                  })}
                </ul>

                {!showNew && listsData.length > 0 && (
                  <div className="flex border-t border-slate-300 p-3">
                    <div className="ml-auto">
                      <ElemButton
                        btn="primary"
                        onClick={() => setShowNew(true)}
                      >
                        <IconListPlus className="w-6 h-6 mr-1" />
                        Create new list
                      </ElemButton>
                    </div>
                  </div>
                )}

                {(showNew || listsData.length === 0) && (
                  <div className="p-3 border-t border-slate-300 ease-in-out duration-300">
                    <label>
                      <InputText
                        label="Name"
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
                        <div className="mt-2 font-bold text-sm text-rose-400">
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
                        btn="primary"
                      >
                        Create
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
    </>
  );
};
