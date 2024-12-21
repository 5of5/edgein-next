import { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { Combobox } from '@headlessui/react';
import useSWR from 'swr';
import { useMutation } from 'react-query';
import { User_Groups } from '@/graphql/types';
import { InviteGroupMemberPayloadEmailResource } from '@/types/api';
import { useDebounce } from '@/hooks/use-debounce';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemButton } from '../elem-button';
import { IconX } from '@/components/icons';
import { PlaceholderPerson } from '../placeholders';
import { DEBOUNCE_TIME } from '@/utils/constants';
import { ElemModal } from '../elem-modal';

type Props = {
  isOpen: boolean;
  group: User_Groups;
  onUpdateGroupData: (data: any) => void;
  onClose: () => void;
};

async function peopleFetcher(url: string, query: string) {
  const data = await fetch(`${url}?searchText=${query}`);
  return data.json();
}

const ElemInviteDialog: React.FC<Props> = ({
  isOpen,
  group,
  onUpdateGroupData,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Record<string, any>[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);

  const { data: searchedPeople, error } = useSWR(
    () => (debouncedQuery ? ['/api/search-people/', query] : null),
    peopleFetcher,
  );

  const isLoading = !error && !searchedPeople;

  const onSendInvitationMail = async (
    emailResources: InviteGroupMemberPayloadEmailResource[],
  ) => {
    await fetch('/api/send-invite-group-member-mail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        emailResources,
        groupId: group.id,
        groupName: group.name,
      }),
    });
  };

  const {
    data: inviteResponse,
    mutate,
    isLoading: isSubmitting,
    reset,
  } = useMutation(
    async () => {
      const res = await fetch('/api/invite-group-member/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: group.id,
          inviteUsers: selectedUsers.map(item => ({
            id: item.id,
            email: item.email,
          })),
        }),
      });
      const apiResponse = await res.json();
      if (!res.ok) {
        throw apiResponse;
      } else {
        return apiResponse;
      }
    },
    {
      onSuccess: async response => {
        const emailResources: InviteGroupMemberPayloadEmailResource[] = [];
        response.forEach((item: any) => {
          if (item.member) {
            onUpdateGroupData((prev: User_Groups) => ({
              ...prev,
              user_group_members: [...prev.user_group_members, item.member],
            }));
            const userOne = selectedUsers.find(
              opt => opt.email === item.member?.user?.email,
            );
            emailResources.push({
              isExistedUser: true,
              email: userOne?.email,
              recipientName: userOne?.person?.name || userOne?.display_name,
            });
          } else if (item.invite) {
            onUpdateGroupData((prev: User_Groups) => ({
              ...prev,
              user_group_invites: [...prev.user_group_invites, item.invite],
            }));
            const userOne = selectedUsers.find(
              opt => opt.email === item.invite.email,
            );
            emailResources.push({
              isExistedUser: false,
              email: userOne?.email,
              recipientName: userOne?.person?.name || userOne?.display_name,
            });
          }
        });
        if (emailResources.length > 0) {
          onSendInvitationMail(emailResources);
        }
      },
    },
  );

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        reset();
        setSelectedUsers([]);
      }, 300);
    }
  }, [isOpen, reset]);

  const handleInvite = () => {
    mutate();
  };

  const handleRemove = (id: number) => {
    setSelectedUsers(selectedUsers.filter((item: any) => item.id !== id));
  };

  const handleSelect = (values: Record<string, any>[]) => {
    setSelectedUsers(values);
    setQuery('');
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const emailHasBeenAdded = selectedUsers.some(el => el.email === query);

  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-10 mt-10 mb-20 !overflow-visible">
      <div className="pb-3 border-b  border-neutral-700">
        <h2 className="text-xl font-medium">
          {inviteResponse && inviteResponse.length > 0 ? (
            `Invitation details`
          ) : (
            <>
              Invite people to group:{' '}
              <span className="capitalize">{group.name}</span>
            </>
          )}
        </h2>
      </div>

      <div className="flex flex-col pt-6 gap-y-4">
        {inviteResponse && inviteResponse.length > 0 ? (
          <ul className="pl-4 list-disc list-outside">
            {inviteResponse.map((res: any, index: number) => {
              if (res.error) {
                return (
                  <li className="text-rose-400" key={index}>
                    {res.error}
                  </li>
                );
              }
              return (
                <li className="text-gray-600" key={index}>
                  Invitation has been sent to{' '}
                  <span className="font-medium">
                    {' '}
                    {res.member?.email || res.invite?.email}
                  </span>{' '}
                  successfully.
                </li>
              );
            })}
          </ul>
        ) : (
          <>
            <Combobox value={selectedUsers} onChange={handleSelect} multiple>
              <div className="relative">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Name or Email</label>
                  <div className="flex flex-wrap p-1.5 text-sm rounded-md ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
                    {selectedUsers.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {selectedUsers.map(item => (
                          <li
                            key={item.id}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md">
                            <div title={item.email && item.email}>
                              {item?.person?.name || item?.display_name}
                            </div>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="focus:outline-none"
                              title="Remove">
                              <IconX
                                className="w-3 h-3 ml-1 cursor-pointer hover:text-primary-500"
                                title="Remove"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <Combobox.Input
                      className="relative flex-1 px-3 py-1 bg-black border-none rounded-md outline-none ring-0 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                      placeholder="e.g: Redg or redg@edgein.io"
                      autoComplete={'off'}
                      ref={inputRef}
                      onChange={event => setQuery(event.target.value)}
                    />
                  </div>
                </div>

                {query && (
                  <div className="relative">
                    <Combobox.Options className="absolute z-20 w-full mt-1 overflow-scroll bg-black border  border-neutral-700 rounded-md shadow-lg mb-36 top-full max-h-60 scrollbar-hide">
                      {isLoading && query != '' ? (
                        <div className="px-4 py-2">
                          {Array.from({ length: 3 }, (_, i) => (
                            <PlaceholderPerson key={i} />
                          ))}
                        </div>
                      ) : searchedPeople?.length > 0 ? (
                        searchedPeople.map((item: any) => (
                          <Combobox.Option
                            key={item.id}
                            value={item}
                            className="flex items-center px-4 py-2 cursor-pointer gap-x-2 hover:bg-gray-50 hover:text-primary-500">
                            {item?.person?.picture ? (
                              <ElemPhoto
                                wrapClass="w-10 h-10 aspect-square shrink-0"
                                imgClass="object-cover rounded-full border border-gray-100"
                                photo={item.person.picture}
                                placeholder="user2"
                                placeholderClass="text-gray-300"
                                imgAlt={item.person.name}
                              />
                            ) : (
                              <div className="flex items-center justify-center flex-shrink-0 w-10 text-xl capitalize bg-gray-200 rounded-full aspect-square">
                                {item?.display_name?.charAt(0)}
                              </div>
                            )}

                            <div className="flex-shrink-0">
                              {item?.person?.name || item?.display_name}
                            </div>
                            {item?.email && (
                              <div
                                className="text-sm text-gray-600 truncate"
                                title={item.email}>
                                {item.email}
                              </div>
                            )}
                          </Combobox.Option>
                        ))
                      ) : (
                        <div className="text-center">
                          {query != '' && (
                            <div className="px-6 py-4 text-lg font-medium">
                              Not Found
                            </div>
                          )}

                          {emailHasBeenAdded && (
                            <div className="py-2 text-rose-400">
                              Email already added
                            </div>
                          )}

                          {validator.isEmail(query) && !emailHasBeenAdded && (
                            <Combobox.Option
                              value={{
                                id: null,
                                display_name: query,
                                email: query,
                              }}
                              className="py-2 underline cursor-pointer text-primary-500 hover:bg-gray-50 hover:text-dark-500">
                              Send an invitation to email address{' '}
                              <span className="font-medium">{query}</span>
                            </Combobox.Option>
                          )}
                        </div>
                      )}
                    </Combobox.Options>
                  </div>
                )}
              </div>
            </Combobox>
          </>
        )}
      </div>
      <div className="flex justify-end pt-3 mt-6 border-t  border-neutral-700 gap-x-2">
        {inviteResponse && inviteResponse.length > 0 ? (
          <ElemButton
            btn="primary"
            onClick={() => {
              reset();
              setSelectedUsers([]);
            }}>
            Invite more people
          </ElemButton>
        ) : (
          <>
            <ElemButton btn="gray" onClick={onClose}>
              Cancel
            </ElemButton>
            <ElemButton
              btn="primary"
              disabled={selectedUsers.length === 0}
              loading={isSubmitting}
              onClick={handleInvite}>
              Invite
            </ElemButton>
          </>
        )}
      </div>
    </ElemModal>
  );
};

export default ElemInviteDialog;
