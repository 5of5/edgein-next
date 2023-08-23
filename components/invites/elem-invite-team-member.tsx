import { FC } from 'react';
import { useMutation } from 'react-query';
import { GetTeamMemberByCompanyIdsQuery } from '@/graphql/types';
import { InviteToEdgeInPayload } from '@/types/api';
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
    (payload: InviteToEdgeInPayload[]) =>
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
    <div className="flex items-center justify-between px-8 py-3 group snap-start hover:text-primary-500">
      <ElemTooltip
        content={
          <>
            {teamMember?.person?.name
              ? `Invite ${teamMember?.person?.name}`
              : `Invite teammate`}
          </>
        }
        direction="top-start"
      >
        <div
          className="flex grow items-center gap-x-2 cursor-pointer hover:opacity-75"
          onClick={handleClickInvite}
        >
          <ElemPhoto
            wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
            imgClass="object-contain w-full h-full border border-slate-100 "
            photo={teamMember?.person?.picture}
            placeholder={'user'}
            placeholderClass="text-slate-300"
            imgAlt={teamMember?.person?.name || ''}
          />
          <p className="font-bold capitalize">
            {teamMember?.person?.name || ''}
          </p>
        </div>
      </ElemTooltip>

      <ElemButton
        onClick={handleClickInvite}
        btn="gray"
        loading={isLoading}
        className={isInvitationSent ? ' cursor-auto pointer-events-none' : ''}
      >
        {isInvitationSent ? 'Sent' : 'Invite'}
      </ElemButton>
    </div>
  );
};
