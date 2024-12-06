import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { GetFollowsByUserQuery } from '@/graphql/types';
import { getNameFromListName } from '@/utils/lists';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconSpinner, IconPlus } from '@/components/icons';
import { InputCheckbox } from '@/components/input-checkbox';
import { Toaster } from 'react-hot-toast';
import { useUser } from '@/context/user-context';
import { find } from 'lodash';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import useToast from '@/hooks/use-toast';
import { ElemModal } from './elem-modal';

type Props = {
  text: string;
  personIds: number[];
};

type List = GetFollowsByUserQuery['list_members'][0]['list'];

export const ElemBulkSavePeople: FC<Props> = ({ text, personIds }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const { user, listAndFollows, refreshProfile } = useUser();
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const listsData = listAndFollows
    .filter(item => {
      const sentiment = getNameFromListName(item);
      return (
        !['hot', 'like', 'crap'].includes(sentiment) &&
        item.created_by_id === user?.id
      );
    })
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  useEffect(() => {
    setListName(listName);
    if (listName && listName.length < 3) {
      setError('List name should have at least 3 characters.');
    } else {
      setError('');
    }
  }, [listName]);

  const { mutate: handleSaveToList, isLoading } = useMutation(
    ({ listName, action }: { listName: string; action: 'add' | 'remove' }) =>
      fetch('/api/bulk-save-people/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personIds,
          listName,
          action,
          pathname: router.pathname,
        }),
      }).then(res => res.json()),
    {
      onSuccess: (response, { listName, action }) => {
        if (response?.error) {
          toast(response.error || GENERAL_ERROR_MESSAGE, 'error');
        } else {
          refreshProfile();
          toast(
            <>
              {action === 'add' ? ' Added ' : ' Removed '}
              {action === 'add' ? ' to ' : ' from '}
              &ldquo;{getNameFromListName({ name: listName })}&rdquo; list
            </>,
          );
        }
      },
    },
  );

  const onCloseSaveToListDialog = () => {
    setIsOpen(false);
    setShowNew(false);
  };

  const showCreateNewList = () => {
    setShowNew(true);
  };

  const hideCreateNewList = () => {
    setShowNew(false);
  };

  const toggleToList = async (listName: string, action: 'add' | 'remove') => {
    if (listName && user) {
      handleSaveToList({ listName, action });
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
    let selected = true;
    personIds.every(personId => {
      const personIsOnList = find(
        list?.follows_people,
        follow => follow?.resource_id === personId,
      );
      if (!personIsOnList) {
        selected = false;
        return false;
      }
      return true;
    });

    return selected;
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
      <ElemButton onClick={onSaveButton} btn="default">
        {text}
      </ElemButton>
      <ElemModal
        isOpen={isOpen}
        onClose={onCloseSaveToListDialog}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-10 my-10">
        <div className="pb-3 border-b border-gray-200">
          <h2 className="text-xl font-medium">{text}</h2>
        </div>
        <div className="flex flex-col pt-3 gap-y-3">
          <ul className="grid overflow-y-auto max-h-96 scrollbar-hide gap-y-1">
            {listsData?.map(list => {
              const selected = isSelected(list);

              return (
                <li key={list.id}>
                  <InputCheckbox
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 hover:bg-neutral-900"
                    labelClass="grow text-sm"
                    label={getNameFromListName(list)}
                    checked={selected}
                    onClick={e => onClickHandler(e, list, selected)}
                  />
                </li>
              );
            })}
          </ul>

          {(showNew || listsData.length === 0) && (
            <div className="pt-3 duration-300 ease-in-out border-t border-slate-200">
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
                  <div className="mt-2 text-sm font-bold text-rose-400">
                    {error}
                  </div>
                )}
              </label>
              <div className="flex items-center justify-end mt-3 gap-x-2">
                <ElemButton
                  onClick={hideCreateNewList}
                  className=""
                  roundedFull
                  btn="default">
                  Cancel
                </ElemButton>

                <ElemButton
                  onClick={handleCreate}
                  className=""
                  disabled={listName === '' || error ? true : false}
                  roundedFull
                  btn="primary">
                  Create
                </ElemButton>
              </div>
            </div>
          )}

          {!showNew && listsData.length > 0 && (
            <div className="pt-3 border-t border-t-gray-200">
              <ElemButton
                onClick={showCreateNewList}
                className="w-full !justify-start gap-2 rounded-lg px-4 py-3 font-normal bg-gray-50 hover:bg-neutral-900">
                <IconPlus className="w-4 h-4" />
                <span className="self-start text-sm">Save to new list</span>
              </ElemButton>
            </div>
          )}
          {isLoading && (
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-slate-200 bg-opacity-60">
              <IconSpinner className="w-8 h-8 animate-spin" />
            </div>
          )}
        </div>
      </ElemModal>
      <Toaster />
    </>
  );
};
