import { Fragment, PropsWithChildren, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  useGetTeamMemberByCompanyIdQuery,
  useGetTeamMemberByPersonIdQuery,
} from '@/graphql/types';
import { useUser } from '@/context/user-context';
import { IconX, IconArrowRight } from '../icons';
import { ElemButton } from '../elem-button';
import ElemInviteEmails from '../elem-invite-emails';
import { useMutation } from 'react-query';
import { ElemTeamMember } from './elem-team-member';
import { toast } from 'react-hot-toast';

type Props = {
  //isOpen: boolean;
  //onClose: () => void;
  //title?: string;
};

export const ElemInviteBanner: React.FC<PropsWithChildren<Props>> = ({
  //isOpen,
  //onClose,
  //title,
  children,
}) => {
  const { user } = useUser();

  const [showBanner, setShowBanner] = useState(true);

  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState<boolean>(false);

  const [selectedPeople, setSelectedPeople] = useState<Record<string, any>[]>(
    [],
  );

  const { data: teamMemberByPerson } = useGetTeamMemberByPersonIdQuery(
    { person_id: user?.person?.id || 0 },
    { enabled: !!user?.person?.id },
  );

  const { data: teamMemberByCompany } = useGetTeamMemberByCompanyIdQuery(
    { company_id: teamMemberByPerson?.team_members[0]?.company_id || 0 },
    {
      enabled: !!teamMemberByPerson?.team_members[0]?.company_id,
    },
  );

  const teamMembers =
    teamMemberByCompany?.team_members?.filter(
      mem => mem?.person_id !== user?.person?.id,
    ) || [];

  const { mutate: sendInvitationEmail, isLoading } = useMutation(
    (emails: string[]) =>
      fetch('/api/send-invite-to-edgein-email/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails,
        }),
      }),
    {
      onSuccess: () => {
        toast.custom(
          t => (
            <div
              className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                t.visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              Sent invitations successfully
            </div>
          ),
          {
            duration: 3000,
            position: 'top-center',
          },
        );
      },
    },
  );

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
          <p className="leading-6 text-white">
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
              invite.&nbsp;
              <IconArrowRight className="inline-block h-5 w-5" title="Invite" />
            </button>
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
                          {teamMembers.map(mem => (
                            <ElemTeamMember key={mem.id} teamMember={mem} />
                          ))}
                        </div>
                      </div>
                    )}

                    {children && (
                      <div className="mt-4 text-slate-600">{children}</div>
                    )}

                    <div className="mt-4">
                      <div className="relative p-5 bg-white rounded-lg border border-black/10">
                        <div className="flex flex-col gap-1">
                          <ElemInviteEmails
                            label="Invite with email"
                            description="Send an email invite to people"
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
