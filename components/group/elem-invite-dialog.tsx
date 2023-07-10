import { Fragment, useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import useSWR from 'swr';
import { useMutation } from 'react-query';
import { User_Groups } from '@/graphql/types';
import { InviteGroupMemberPayloadEmailResource } from '@/types/api';
import { useDebounce } from '@/hooks/use-debounce';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemButton } from '../elem-button';
import { IconX, IconPaperAirplane } from '@/components/icons';
import { PlaceholderPerson } from '../placeholders';
import { DEBOUNCE_TIME } from '@/utils/constants';

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        initialFocus={inputRef}
        onClose={onClose}
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all">
                <div className="relative flex items-center justify-between">
                  {!inviteResponse && (
                    <Dialog.Title className="flex-1 text-xl font-bold pb-2 border-b border-slate-200">
                      Invite people to group:{' '}
                      <span className="capitalize">{group.name}</span>
                    </Dialog.Title>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-0.5 right-0 flex items-center justify-center h-8 w-8 bg-transparent active:bg-transparent rounded-full focus:outline-none hover:bg-black/10"
                  >
                    <IconX className="h-6 w-6" />
                  </button>
                </div>

                {inviteResponse && inviteResponse.length > 0 ? (
                  <>
                    <div className="w-full text-center">
                      <IconPaperAirplane
                        className="mx-auto h-12 w-12 text-slate-300"
                        title="Invitation Sent"
                      />
                      <h3 className="mt-2 text-lg font-bold">
                        Invitation details
                      </h3>
                      <p className="mt-1 text-primary-500 hover:underline"></p>
                    </div>

                    <ul className="mt-4 list-disc list-outside pl-4">
                      {inviteResponse.map((res: any, index: number) => {
                        if (res.error) {
                          return (
                            <li className="text-red-500" key={index}>
                              {res.error}
                            </li>
                          );
                        }
                        return (
                          <li className="text-slate-500" key={index}>
                            {`Invitation has been sent to ${
                              res.member?.email || res.invite?.email
                            } successfully`}
                          </li>
                        );
                      })}
                    </ul>

                    <ElemButton
                      btn="ol-primary"
                      onClick={() => {
                        reset();
                        setSelectedUsers([]);
                      }}
                      className="mt-4 w-full"
                    >
                      Invite more people
                    </ElemButton>
                  </>
                ) : (
                  <>
                    <Combobox
                      value={selectedUsers}
                      onChange={handleSelect}
                      multiple
                    >
                      <div className="relative">
                        <div className="flex flex-col gap-1 mt-6">
                          <label className="font-bold text-slate-600">
                            Name or Email
                          </label>
                          <div className="flex flex-wrap p-2 rounded-md ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
                            {selectedUsers.length > 0 && (
                              <ul className="flex flex-wrap gap-2">
                                {selectedUsers.map(item => (
                                  <li
                                    key={item.id}
                                    className="flex items-center gap-1 bg-slate-200 rounded-md px-2 py-1"
                                  >
                                    <div title={item.email && item.email}>
                                      {item?.person?.name || item?.display_name}
                                    </div>
                                    <button
                                      onClick={() => handleRemove(item.id)}
                                      className="focus:outline-none"
                                      title="Remove"
                                    >
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
                              className="flex-1 px-3 py-1 text-dark-500 relative bg-white rounded-md border-none outline-none ring-0 placeholder:text-slate-400 focus:outline-none focus:ring-0"
                              placeholder="e.g: Ashley or ashley@edgein.io"
                              autoComplete={'off'}
                              ref={inputRef}
                              onChange={event => setQuery(event.target.value)}
                            />
                          </div>
                        </div>

                        {query && (
                          <Combobox.Options className="absolute mt-1 shadow-md z-20 bg-white rounded-md border border-slate-200 w-full max-h-60 overflow-scroll scrollbar-hide">
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
                                  className="flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-50 hover:text-primary-500"
                                >
                                  {item?.person?.picture ? (
                                    <ElemPhoto
                                      wrapClass="w-10 h-10 aspect-square shrink-0"
                                      imgClass="object-cover rounded-full border border-slate-100"
                                      photo={item.person.picture}
                                      placeholder="user2"
                                      placeholderClass="text-slate-300"
                                      imgAlt={item.person.name}
                                    />
                                  ) : (
                                    <div className="flex flex-shrink-0 items-center justify-center aspect-square w-10 rounded-full bg-slate-200 text-dark-500 text-xl capitalize">
                                      {item?.display_name?.charAt(0)}
                                    </div>
                                  )}

                                  <div className="flex-shrink-0">
                                    {item?.person?.name || item?.display_name}
                                  </div>
                                  {item?.email && (
                                    <div
                                      className="text-sm text-slate-600 truncate"
                                      title={item.email}
                                    >
                                      {item.email}
                                    </div>
                                  )}
                                </Combobox.Option>
                              ))
                            ) : (
                              <div className="text-center">
                                {query != '' && (
                                  <div className="px-6 py-4 text-lg font-bold">
                                    Not Found
                                  </div>
                                )}

                                {emailHasBeenAdded && (
                                  <div className="py-2 text-red-600">
                                    Email already added
                                  </div>
                                )}

                                {validator.isEmail(query) &&
                                  !emailHasBeenAdded && (
                                    <Combobox.Option
                                      value={{
                                        id: null,
                                        display_name: query,
                                        email: query,
                                      }}
                                      className="py-2 cursor-pointer text-primary-500 underline hover:bg-gray-50 hover:text-dark-500"
                                    >
                                      Send an invitation to email address{' '}
                                      <span className="font-bold">{query}</span>
                                    </Combobox.Option>
                                  )}
                              </div>
                            )}
                          </Combobox.Options>
                        )}
                      </div>
                    </Combobox>

                    <div className="mt-6 float-right">
                      <ElemButton
                        btn="primary"
                        disabled={selectedUsers.length === 0}
                        loading={isSubmitting}
                        onClick={handleInvite}
                      >
                        Invite
                      </ElemButton>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ElemInviteDialog;
