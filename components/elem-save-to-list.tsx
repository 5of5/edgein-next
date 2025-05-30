import React, { FC, useEffect, useState } from 'react';
import { Follows, GetFollowsByUserQuery } from '@/graphql/types';
import { isOnList, toggleFollowOnList } from '@/utils/reaction';
import { getNameFromListName } from '@/utils/lists';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconPlus } from '@/components/icons';
import { Heart } from 'lucide-react';
import { InputCheckbox } from '@/components/input-checkbox';
import { Toaster } from 'react-hot-toast';
import useToast from '@/hooks/use-toast';
import { useUser } from '@/context/user-context';
import { listSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';
import { find, isEqual } from 'lodash';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { ElemWithSignInModal } from './elem-with-sign-in-modal';
import { ROUTES } from '@/routes';
import { ElemModal } from './elem-modal';
import Image from 'next/image';

type Props = {
  resourceName: string | null;
  resourceId: number;
  resourceType: 'companies' | 'vc_firms' | 'people';
  slug: string;
  buttonStyle?:
    | 'primary'
    | 'ol-primary'
    | 'ol-white'
    | 'danger'
    | 'dark'
    | 'transparent'
    | 'gray'
    | 'default'
    | 'black-to-white'
    | '';
  follows?: Pick<Follows, 'list_id'>[];
  icon?: React.ReactNode;
};

type List = GetFollowsByUserQuery['list_members'][0]['list'];

export const ElemSaveToList: FC<Props> = ({
  resourceName,
  resourceId,
  resourceType,
  slug,
  buttonStyle = 'gray',
  follows = [],
  icon,
}) => {
  const { user, listAndFollows, refreshProfile } = useUser();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [listsData, setListsData] = useState([] as List[]);

  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [followsByResource, setFollowsByResource] = useState<
    Pick<Follows, 'list_id'>[]
  >([]);

  useEffect(() => {
    if (Array.isArray(follows) && !isEqual(follows, followsByResource)) {
      setFollowsByResource(follows);
    }
    // This is intentional as we only want to update when follows changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [follows]);

  let isSaved = false;

  if (Array.isArray(followsByResource) && Array.isArray(listsData)) {
    for (const followItem of followsByResource) {
      for (const listItem of listsData) {
        if (listItem.id === followItem.list_id) {
          isSaved = true;
          break;
        }
      }
      if (isSaved) break;
    }
  }

  const savedButtonStyle = 'border-neutral-500 bg-neutral-900';

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
            list.follows_companies = Array.isArray(list.follows_companies)
              ? [
                  ...list.follows_companies,
                  { __typename: 'follows_companies', resource_id: resourceId },
                ]
              : [{ __typename: 'follows_companies', resource_id: resourceId }];
          }
          if (resourceType === 'vc_firms') {
            list.follows_vcfirms = [
              ...(list.follows_vcfirms || []),
              { __typename: 'follows_vc_firms', resource_id: resourceId },
            ];
          }
          if (resourceType === 'people') {
            list.follows_people = [
              ...(list.follows_people || []),
              { __typename: 'follows_people', resource_id: resourceId },
            ];
          }
        } else {
          if (resourceType === 'companies') {
            list.follows_companies = [
              ...(list.follows_companies || []).filter(
                i => i.resource_id !== resourceId,
              ),
            ];
          }
          if (resourceType === 'vc_firms') {
            list.follows_vcfirms = [
              ...(list.follows_vcfirms || []).filter(
                i => i.resource_id !== resourceId,
              ),
            ];
          }
          if (resourceType === 'people') {
            list.follows_people = [
              ...(list.follows_people || []).filter(
                i => i.resource_id !== resourceId,
              ),
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
        pathname: `${ROUTES.COMPANIES}/${slug}`,
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
      toast(
        <>
          {action === 'add' ? ' Added ' : ' Removed '}
          {resourceName ? <>&nbsp;&ldquo;{resourceName}&rdquo;&nbsp;</> : ''}
          {action === 'add' ? ' to ' : ' from '}
          &ldquo;{getNameFromListName({ name: listName })}&rdquo; list
        </>,
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
    if (
      user?.entitlements?.listsCount &&
      listsData.length > user.entitlements.listsCount
    ) {
      onOpenUpgradeDialog();
    } else {
      setShowNew(true);
    }
  };

  return (
    <>
      {user ? (
        <div className="justify-center items-center flex">
          <ElemButton
            onClick={onSaveButton}
            roundedFull={true}
            btn={buttonStyle}
            className={`px-2.5 shrink-0 flex items-center ${
              isSaved ? savedButtonStyle : ''
            }`}>
            {isSaved ? (
              <Heart
                className="w-4 h-4 mr-1 text-neutral-400"
                fill="currentColor"
                stroke="currentColor"
              />
            ) : (
              icon || (
                <Image
                  src="/images/checklist.png"
                  alt="Saved"
                  width={24}
                  height={24}
                  className="shrink-0 transition-all duration-200 group-hover:invert"
                />
              )
            )}
            <span>{isSaved ? 'Saved' : 'Save to list'}</span>
          </ElemButton>
        </div>
      ) : (
        <ElemWithSignInModal
          text="Sign in to save this profile into a list. We'll even let you know of all the updates."
          buttonComponent={open => (
            <ElemButton
              roundedFull={true}
              btn={buttonStyle}
              className={`px-2.5 flex items-center ${
                open ? 'border border-primary-500' : ''
              }`}>
              {icon || (
                <Image
                  src="/images/checklist.png"
                  alt="Saved"
                  width={24}
                  height={24}
                  className="shrink-0 transition-all duration-200 group-hover:invert mr-1"
                />
              )}
              Save to list
            </ElemButton>
          )}
        />
      )}

      <ElemModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false), setShowNew(false);
        }}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-40 my-10">
        <div className="pb-3 border-b  border-neutral-700">
          <h2 className="text-xl font-medium">Save to List</h2>
        </div>

        <div className="mt-2">
          {listsData.length === 0 ? (
            <p className="text-gray-500">
              Save organizations that matter to you in a list so you can
              compare, sort, and more.
            </p>
          ) : (
            <ul className="grid overflow-y-auto max-h-96 scrollbar-hide gap-y-1">
              {listsData?.map(list => {
                const selected = isSelected(list);

                return (
                  <li key={list.id}>
                    <InputCheckbox
                      className="w-full px-4 py-3 rounded-lg hover:bg-neutral-900"
                      labelClass="grow text-sm"
                      label={getNameFromListName(list)}
                      checked={selected}
                      onClick={e => onClickHandler(e, list, selected)}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex justify-start mt-3">
          {!showNew && listsData.length > 0 ? (
            <ElemButton
              onClick={onClickShowCreateNew}
              className="w-full !justify-start gap-2 rounded-lg px-4 py-3 font-normal hover:bg-neutral-900">
              <IconPlus className="w-4 h-4" />
              <span className="self-start text-sm">Save to new list</span>
            </ElemButton>
          ) : (
            <div className="w-full">
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
                  <div className="mt-2 text-sm font-medium text-rose-400">
                    {error}
                  </div>
                )}
              </label>
              <div className="flex justify-end mt-3 space-x-3">
                <ElemButton
                  onClick={() => {
                    setShowNew(!showNew);
                  }}
                  roundedFull
                  btn="default">
                  Cancel
                </ElemButton>
                <ElemButton
                  onClick={handleCreate}
                  disabled={listName === '' || error ? true : false}
                  roundedFull
                  btn="primary">
                  Create list
                </ElemButton>
              </div>
            </div>
          )}
        </div>
      </ElemModal>

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
      <Toaster />
    </>
  );
};
