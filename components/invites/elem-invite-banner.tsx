import { FC, Fragment, ReactElement, useState, useEffect } from 'react';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import groupBy from 'lodash/groupBy';
import {
  useGetTeamMemberByCompanyIdsQuery,
  useGetTeamMemberByPersonIdQuery,
} from '@/graphql/types';
import { InviteToEdgeInResponse } from '@/types/api';
import { useUser } from '@/context/user-context';
import {
  IconX,
  IconArrowRight,
  IconPaperAirplane,
  IconChevronDownMini,
} from '../icons';
import { ElemButton } from '../elem-button';
import ElemInviteEmails from './elem-invite-emails';
import { ElemInviteTeamMember } from './elem-invite-team-member';
import { ElemInviteCompanyGroup } from './elem-invite-company-group';

type Props = {
  children?: ReactElement;
};

export const ElemInviteBanner: FC<Props> = ({ children }) => {
  const { user } = useUser();

  const [showBanner, setShowBanner] = useState(true);

  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

  const [selectedPeople, setSelectedPeople] = useState<Record<string, any>[]>(
    [],
  );

  const { data: teamMemberByPerson } = useGetTeamMemberByPersonIdQuery(
    { person_id: user?.person?.id || 0 },
    { enabled: Boolean(user?.person?.id) },
  );

  const personTeamMembers = teamMemberByPerson?.team_members || [];

  const { data: teamMemberByCompany } = useGetTeamMemberByCompanyIdsQuery(
    { company_ids: personTeamMembers.map(mem => mem?.company_id || 0) },
    {
      enabled: personTeamMembers.length > 0,
    },
  );

  const teamMembers =
    teamMemberByCompany?.team_members?.filter(
      mem => mem?.person_id !== user?.person?.id,
    ) || [];

  const membersGroupByCompany = groupBy(teamMembers, 'company_id');

  const {
    data: sendInvitationEmailResponse,
    mutate: sendInvitationEmail,
    reset: resetInvitation,
    isLoading,
  } = useMutation(async (emails: string[]) => {
    const res = await fetch('/api/send-invite-to-edgein-email/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails,
      }),
    });
    const apiResponse = await res.json();
    if (!res.ok) {
      throw apiResponse;
    } else {
      return apiResponse;
    }
  });

  const onOpenUpgradeDialog = () => {
    setIsOpenInviteDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenInviteDialog(false);
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('invite_banner_state')
    ) {
      const data = window.localStorage.getItem('invite_banner_state');
      if (data !== null) setShowBanner(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('invite_banner_state')
    ) {
      window.localStorage.setItem(
        'invite_banner_state',
        JSON.stringify(showBanner),
      );
    }
  }, [showBanner]);

  const handleClickSendInvites = () => {
    sendInvitationEmail(selectedPeople.map(item => item.work_email));
  };

  return (
    <>
      {showBanner && (
        <div className="flex items-center gap-x-6 px-6 py-2.5 bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] shadow rounded-lg sm:px-3.5 sm:before:flex-1">
          <p className="leading-6 text-primary-100">
            <button onClick={onOpenUpgradeDialog}>
              <strong className="font-bold">Share and earn</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Tell a friend and get $14.99 in credit for every person you
              invite.{' '}
              <IconArrowRight className="inline-block h-5 w-5" title="Invite" />
            </button>
            <Link href={'/account'}>
              <a className="ml-2 text-primary-100 opacity-75">details.</a>
            </Link>
          </p>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowBanner(false);
              }}
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">Dismiss</span>
              <IconX className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <Transition appear show={isOpenInviteDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={onCloseUpgradeDialog}
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
                <Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-slate-100 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex items-center justify-between px-6 pt-6 pb-2 rounded-t-2xl bg-white">
                    <div className="flex items-center justify-between gap-x-1">
                      <div className="text-xl font-bold capitalize">
                        Invite to EdgeIn
                      </div>
                    </div>
                    <button type="button" onClick={onCloseUpgradeDialog}>
                      <IconX className="h-6 w-6" />
                    </button>
                  </Dialog.Title>

                  <div className="p-6">
                    {teamMembers.length > 0 && (
                      <div className="relative bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
                        <div className="sticky top-0 z-10 px-3 py-1.5 shadow bg-white">
                          <h3 className="font-bold text-slate-600">
                            Invite your team
                          </h3>
                          <p className="text-sm text-slate-600">
                            Invite people that are part of your team
                          </p>
                        </div>
                        <div className="max-h-[325px] overflow-x-hidden overflow-y-scroll scroll-smooth snap-y snap-mandatory touch-pan-y">
                          {Object.keys(membersGroupByCompany).map(companyId => (
                            <Disclosure key={companyId} defaultOpen>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="flex justify-between items-center w-full px-4 py-1 bg-slate-100 focus:outline-none hover:opacity-75">
                                    <ElemInviteCompanyGroup
                                      company={
                                        membersGroupByCompany[companyId][0]
                                          .company
                                      }
                                    />
                                    <IconChevronDownMini
                                      className={`${
                                        open ? 'rotate-0' : '-rotate-90 '
                                      } h-6 w-6 transform transition-all`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel>
                                    {membersGroupByCompany[companyId].map(
                                      mem => (
                                        <ElemInviteTeamMember
                                          key={mem.id}
                                          teamMember={mem}
                                        />
                                      ),
                                    )}
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          ))}
                        </div>
                      </div>
                    )}

                    {children && (
                      <div className="mt-4 text-slate-600">{children}</div>
                    )}

                    <div className="mt-4">
                      <div className="relative p-5 bg-white rounded-lg border border-black/10">
                        {sendInvitationEmailResponse &&
                        sendInvitationEmailResponse.length > 0 ? (
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
                              {sendInvitationEmailResponse.map(
                                (
                                  res: InviteToEdgeInResponse,
                                  index: number,
                                ) => {
                                  if (res.status === 500) {
                                    return (
                                      <li
                                        className="text-red-500 text-sm"
                                        key={index}
                                      >
                                        {`Failed to send invitation to email `}
                                        <span className="font-bold">
                                          {res.email}
                                        </span>
                                        . Please try again later.
                                      </li>
                                    );
                                  }
                                  return (
                                    <li
                                      className="text-slate-500 text-sm"
                                      key={index}
                                    >
                                      {`Invitation has been sent to `}
                                      <span className="font-bold">
                                        {res.email}
                                      </span>{' '}
                                      successfully.
                                    </li>
                                  );
                                },
                              )}
                            </ul>

                            <ElemButton
                              btn="ol-primary"
                              onClick={() => {
                                setSelectedPeople([]);
                                resetInvitation();
                              }}
                              className="mt-4 w-full"
                            >
                              Invite more people
                            </ElemButton>
                          </>
                        ) : (
                          <>
                            <div className="flex flex-col gap-1">
                              <ElemInviteEmails
                                label="Invite with email"
                                description="Send an email invite"
                                placeholder="Enter multiple emails"
                                selected={selectedPeople}
                                onChange={setSelectedPeople}
                              />
                            </div>
                            <ElemButton
                              btn="purple"
                              onClick={handleClickSendInvites}
                              loading={isLoading}
                              disabled={selectedPeople.length === 0}
                              className="mt-4"
                            >
                              Send invites
                            </ElemButton>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
