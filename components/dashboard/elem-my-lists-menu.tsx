import { kebabCase } from 'lodash';
import { useRouter } from 'next/router';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { IconSidebarList } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { CreateListDialog } from '../my-list/create-list-dialog';
import { ElemWithSignInModal } from '../elem-with-sign-in-modal';
import { ElemSidebarItem } from './elem-sidebar-item';
import { InputText } from '@/components/input-text';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { ElemButton } from '../elem-button';
import { SIDEBAR_DEFAULT_LISTS_LIMIT } from '@/utils/constants';
import { getNameFromListName, getListDisplayName } from '@/utils/lists';
import { useSidebar } from '@/context/sidebar-context';
import { ElemListTooltip } from '../lists/elem-list-tooltip';

type Props = {
  className?: string;
};
export const GET_PUBLIC_LISTS = `
  query GetPublicLists {
  lists(where: {public: {_eq: true}}) {
    id
    public
    name
    created_by {
      id
      display_name
      email
      person {
        id
        slug
        name
      }
    }
        created_at
    updated_at
    total_no_of_resources
    follows_companies {
      resource_id
    }
    follows_vcfirms {
      resource_id
    }
    follows_people {
      resource_id
    }
  }
}`;

 export const fetchGraphQL = async (
   query: string,
   variables: Record<string, any> = {},
 ) => {
   const response = await fetch(
     'https://unique-crow-54.hasura.app/v1/graphql',
     {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'x-hasura-admin-secret': `H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid`, // Replace with your authentication token
       },
       body: JSON.stringify({ query,variables }),
     },
   );

   const data = await response.json();
   if (data.errors) {
     throw new Error(data.errors.map((e: any) => e.message).join(', '));
   }

   return data.data;
 };

const ElemMyListsMenu: FC<Props> = ({ className = '' }) => {
  const { showSidebar, setShowSidebar } = useSidebar();
  const { listAndFollows: lists, user } = useUser();
  const router = useRouter();

  const getActiveClass = (id: number, name: string) => {
    return `${ROUTES.LISTS}/${id}/${name}/` === router.asPath
      ? 'bg-neutral-900 text-gray-300'
      : 'text-gray-500';
  };

  useEffect(() => {
    const fetchPublicList = async () => {
      try {
        const data = await fetchGraphQL(GET_PUBLIC_LISTS);
        const newList = data?.lists?.filter(
          x => !['hot', 'crap', 'like'].includes(getNameFromListName(x.name)),
        );
        
        setFilteredLists(newList)
        setCustomLists(newList)
      } catch (err: any) {
        console.log(err);
      }
    };
    if (!user) {
      fetchPublicList();
    }
  }, []);

  const [customLists, setCustomLists] = useState(
    lists?.filter(
      list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
    ),
  );
  const [limitLists, setLimitLists] = useState(true);

  useEffect(() => {
    setCustomLists(
      lists.filter(
        list => !['hot', 'crap', 'like'].includes(getNameFromListName(list)),
      ),
    );
  }, [lists]);

  const [openCreateList, setOpenCreateList] = useState(false);
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenCreateListDialog = () => {
    setOpenCreateList(true);
  };
  const onCloseCreateListDialog = () => {
    setOpenCreateList(false);
  };

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onShowMoreLists = () => {
    setLimitLists(false);
  };

  const onClickCreate = () => {
    if (
      user?.entitlements?.listsCount &&
      customLists.length > user.entitlements.listsCount
    ) {
      return onOpenUpgradeDialog();
    }

    return onOpenCreateListDialog();
  };

  const [searchText, setSearchText] = useState('');
  const [filteredLists, setFilteredLists] = useState(customLists);

  const handleSearchTextChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText) {
      setFilteredLists(
        customLists.filter(list => {
          return getNameFromListName(list).toLowerCase().includes(searchText);
        }),
      );
      setLimitLists(false);
    } else {
      setFilteredLists(customLists);
      setLimitLists(true);
    }
  }, [searchText, customLists]);

  return (
    <li className={className}>
      {/* {user ? ( */}
        <div className="relative">
          <ElemSidebarItem
            IconComponent={IconSidebarList}
            text="Lists"
            url={ROUTES.LISTS}
            onClick={() => setShowSidebar(false)}
          />
          {user&&<div className="absolute right-2 top-1.5 bottom-1.5">
            <ElemButton btn="primary" size="xs" onClick={onClickCreate}>
              Create
            </ElemButton>
          </div>}
        </div>
      {/* ) : ( */}
        {/* <ElemWithSignInModal
          wrapperClass="w-full"
          text="Sign in to use lists for tracking and updates on interesting companies, investors, and people."
          buttonComponent={open => (
            <button
              className={`${
                open ? 'bg-neutral-900' : ''
              } flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-300 rounded-md flex-1 transition-all hover:bg-neutral-900`}>
              <IconSidebarList
                className={`w-5 h-5 ${
                  open ? 'text-primary-500' : 'text-gray-300'
                }`}
              />
              <p className="text-sm font-medium text-gray-300">Lists</p>
            </button>
          )}
        /> */}
      {/* )} */}

    
        <>
          {customLists.length > SIDEBAR_DEFAULT_LISTS_LIMIT && (
            <InputText
              type="text"
              onChange={handleSearchTextChange}
              value={searchText}
              name="name"
              autoComplete="off"
              placeholder="Find list..."
              className="mt-2 ring-1 ring-gray-200"
            />
          )}

          <ul className="mt-1 space-y-1">
            {filteredLists
              ?.slice(
                0,
                limitLists ? SIDEBAR_DEFAULT_LISTS_LIMIT : customLists.length,
              )
              .map(list => {
                const listName = getNameFromListName(list);

                return (
                  <li
                    key={list.id}
                    role="button"
                    onClick={() => setShowSidebar(false)}>
                    <ElemListTooltip list={list}>
                      <ElemLink
                        href={`${ROUTES.LISTS}/${list.id}/${
                          listName === 'crap' ? 'sh**' : kebabCase(listName)
                        }`}
                        className={`flex items-center space-x-2 py-2 pl-4 font-medium text-sm rounded-md flex-1 transition-all hover:bg-neutral-900 hover:text-gray-300 ${getActiveClass(
                          list.id,
                          listName === 'crap' ? 'sh**' : kebabCase(listName),
                        )} `}>
                        <div className="break-all line-clamp-1 first-letter:uppercase">
                          {getListDisplayName(list)}
                        </div>
                      </ElemLink>
                    </ElemListTooltip>
                  </li>
                );
              })}

            {limitLists && customLists.length > SIDEBAR_DEFAULT_LISTS_LIMIT && (
              <li
                role="button"
                onClick={onShowMoreLists}
                className="flex items-center flex-1 py-2 pl-4 text-xs font-normal text-gray-500 transition-all hover:text-primary-500">
                Show more
              </li>
            )}
          </ul>
        </>
    

      <CreateListDialog
        isOpen={openCreateList}
        onClose={onCloseCreateListDialog}
      />
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </li>
  );
};

export default ElemMyListsMenu;
