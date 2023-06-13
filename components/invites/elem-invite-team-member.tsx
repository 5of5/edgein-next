import Link from 'next/link';
import { useMutation } from 'react-query';
import { GetTeamMemberByCompanyIdQuery } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import { ElemPhoto } from '../elem-photo';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  teamMember: GetTeamMemberByCompanyIdQuery['team_members'][0];
};

export const ElemInviteTeamMember: React.FC<Props> = ({ teamMember }) => {
  const {
    mutate: sendInvitationEmail,
    isLoading,
    isSuccess,
  } = useMutation((emails: string[]) =>
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
  );

  const handleClickInvite = () => {
    sendInvitationEmail([teamMember.person?.work_email || '']);
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 group snap-start hover:text-primary-500">
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
        btn="slate"
        loading={isLoading}
        className={isSuccess ? ' cursor-auto pointer-events-none' : ''}
      >
        {isSuccess ? 'Sent' : 'Invite'}
      </ElemButton>
    </div>
  );
};
