import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Disclosure } from '@headlessui/react';
import groupBy from 'lodash/groupBy';
import { InviteToEdgeInPayload, InviteToEdgeInResponse } from '@/types/api';
import { useUser } from '@/context/user-context';
import { useGetInvitedPeopleByUserIdQuery } from '@/graphql/types';
import { IconPaperAirplane, IconChevronDownMini } from '../icons';
import { ElemButton } from '../elem-button';
import ElemInviteEmails from './elem-invite-emails';
import { ElemInviteTeamMember } from './elem-invite-team-member';
import { ElemInviteCompanyGroup } from './elem-invite-company-group';
import { ElemAddressBook } from './elem-address-book';

export type SelectedPeople = {
  work_email: string;
  personId?: number;
  name?: string;
  slug?: string;
};

export const ElemInviteUser = () => {
  const { user } = useUser();

  const [selectedPeople, setSelectedPeople] = useState<SelectedPeople[]>([]);

  const { data: invitedPeopleData, refetch: refetchInvitedPeople } =
    useGetInvitedPeopleByUserIdQuery(
      { userId: user?.id || 0 },
      { enabled: Boolean(user?.id) },
    );
  const invitedPeople = invitedPeopleData?.invited_people || [];

  const { data: teamMembers = [] } = useQuery(
    ['get-team-member-to-invite'],
    () => fetch(`/api/get-team-member-to-invite/`).then(res => res.json()),
    { enabled: Boolean(user?.person?.id) },
  );

  const membersGroupByCompany = groupBy(teamMembers, 'company_id');

  const {
    data: sendInvitationEmailResponse,
    mutate: sendInvitationEmail,
    reset: resetInvitation,
    isLoading,
  } = useMutation(async (payload: InviteToEdgeInPayload[]) => {
    const res = await fetch('/api/send-invite-to-edgein-email/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload,
      }),
    });
    const apiResponse = await res.json();
    if (!res.ok) {
      throw apiResponse;
    } else {
      return apiResponse;
    }
  });

  const handleClickSendInvites = () => {
    sendInvitationEmail(
      selectedPeople.map(person => ({
        email: person.work_email,
        personId: person.personId && person.slug ? person.personId : undefined,
      })),
    );
  };

  return (
    <>
      {teamMembers.length > 0 && (
        <div className="relative bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="sticky top-0 z-10 px-5 py-2 bg-white border-b border-gray-200">
            <h3 className="font-medium">Invite your team</h3>
            <p className="text-sm text-gray-500">
              Invite people that are part of your team
            </p>
          </div>
          <div className="max-h-[325px] overflow-x-hidden overflow-y-scroll scroll-smooth scrollbar-hide snap-y snap-mandatory touch-pan-y divide-y divide-gray-200">
            {Object.keys(membersGroupByCompany).map(companyId => (
              <Disclosure key={companyId} defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full px-5 py-1 bg-gray-50 focus:outline-none hover:opacity-75">
                      <ElemInviteCompanyGroup
                        company={membersGroupByCompany[companyId][0].company}
                      />
                      <IconChevronDownMini
                        className={`${
                          open ? 'rotate-0' : '-rotate-90 '
                        } h-6 w-6 transform transition-all`}
                      />
                    </Disclosure.Button>

                    <Disclosure.Panel className="pl-3">
                      {membersGroupByCompany[companyId].map(mem => (
                        <ElemInviteTeamMember
                          key={mem.id}
                          teamMember={mem}
                          isInvited={invitedPeople.some(
                            invitedPerson =>
                              invitedPerson.person_id === mem.person_id,
                          )}
                          refetchInvitedPeople={refetchInvitedPeople}
                        />
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="relative p-5 bg-white rounded-lg border border-black/10">
          {sendInvitationEmailResponse &&
          sendInvitationEmailResponse.length > 0 ? (
            <>
              <div className="w-full text-center">
                <IconPaperAirplane
                  className="mx-auto h-12 w-12 text-gray-200"
                  title="Invitation Sent"
                />
                <h3 className="mt-2 text-lg font-medium">Invitation details</h3>
              </div>

              <ul className="mt-4 list-disc list-outside pl-4">
                {sendInvitationEmailResponse.map(
                  (res: InviteToEdgeInResponse, index: number) => {
                    if (res.status === 200) {
                      return (
                        <li className="text-gray-500 text-sm" key={index}>
                          {`Invitation has been sent to `}
                          <span className="font-medium">
                            {res.emails[index]}
                          </span>{' '}
                          successfully.
                        </li>
                      );
                    }
                    return (
                      <li className="text-red-500 text-sm" key={index}>
                        {`Failed to send invitation to email `}
                        <span className="font-medium">{res.emails[index]}</span>
                        . Please try again later.
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
                className="mt-4 w-full">
                Invite more people
              </ElemButton>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <ElemInviteEmails
                  label="Invite with email"
                  description="Search for a person or type in an email address"
                  placeholder="name@company.com"
                  selectedPeople={selectedPeople}
                  setSelectedPeople={setSelectedPeople}
                />
              </div>

              <div className="flex items-center gap-4 mt-4">
                <ElemButton
                  btn="primary"
                  onClick={handleClickSendInvites}
                  loading={isLoading}
                  disabled={selectedPeople.length === 0}>
                  Invite
                </ElemButton>

                <ElemAddressBook setSelectedPeople={setSelectedPeople} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
