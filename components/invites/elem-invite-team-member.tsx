import { FC } from 'react';
import { useMutation } from 'react-query';
import { GetTeamMemberByCompanyIdsQuery } from '@/graphql/types';
import { InviteToMentibusPayload } from '@/types/api';
import { ElemButton } from '../elem-button';
import { ElemPhoto } from '../elem-photo';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  isInvited: boolean;
  teamMember: GetTeamMemberByCompanyIdsQuery['team_members'][0];
  refetchInvitedPeople: () => void;
};

export const ElemInviteTeamMember: FC<Props> = ({
  isInvited,
  teamMember,
  refetchInvitedPeople,
}) => {
  const {
    mutate: sendInvitationEmail,
    isLoading,
    isSuccess,
  } = useMutation(
    (payload: InviteToMentibusPayload[]) =>
      fetch('/api/send-invite-to-edgein-email/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload,
        }),
      }),
    {
      onSuccess: () => {
        refetchInvitedPeople();
      },
    },
  );

  const isInvitationSent = isInvited || isSuccess;

  const handleClickInvite = () => {
    sendInvitationEmail([
      {
        email: teamMember.person?.work_email || '',
        personId: teamMember.person?.id,
      },
    ]);
  };

  return (
    <div className="flex items-center justify-between px-5 py-2 group snap-start">
      <ElemTooltip
        content={
          <>
            {teamMember?.person?.name
              ? `Invite ${teamMember?.person?.name}`
              : `Invite teammate`}
          </>
        }
        direction="top-start">
        <div
          className="flex grow items-center gap-x-2 cursor-pointer hover:opacity-75"
          onClick={handleClickInvite}>
          <ElemPhoto
            wrapClass="w-10 h-10 aspect-square shrink-0 bg-black overflow-hidden border  border-neutral-700 rounded-full"
            imgClass="object-contain w-full h-full"
            photo={teamMember?.person?.picture}
            placeholder="user"
            placeholderClass="text-gray-300"
            imgAlt={teamMember?.person?.name || ''}
          />
          <p className="font-medium text-sm capitalize underline group-hover:no-underline">
            {teamMember?.person?.name || ''}
          </p>
        </div>
      </ElemTooltip>

      <ElemButton
        onClick={handleClickInvite}
        btn="default"
        loading={isLoading}
        className={isInvitationSent ? ' cursor-auto pointer-events-none' : ''}>
        {isInvitationSent ? 'Sent' : 'Invite'}
      </ElemButton>
    </div>
  );
};
