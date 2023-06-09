import Link from 'next/link';
import { useMutation } from 'react-query';
import { GetTeamMemberByCompanyIdQuery } from '@/graphql/types';
import { ElemButton } from '../elem-button';
import { ElemPhoto } from '../elem-photo';

type Props = {
  teamMember: GetTeamMemberByCompanyIdQuery['team_members'][0];
};

export const ElemTeamMember: React.FC<Props> = ({ teamMember }) => {
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
      <Link href={`/people/${teamMember?.person?.slug}/`}>
        <a className="flex items-center gap-x-2 hover:opacity-75">
          <ElemPhoto
            wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
            imgClass="object-contain w-full h-full border border-slate-100 "
            photo={teamMember?.person?.picture}
            placeholder={teamMember?.person?.name || ''}
            placeholderClass="text-slate-300"
            imgAlt={teamMember?.person?.name || ''}
          />
          <p className="font-bold capitalize">
            {teamMember?.person?.name || ''}
          </p>
        </a>
      </Link>

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
