import { GetTeamMemberByCompanyIdsQuery } from '@/graphql/types';
import { ElemPhoto } from '../elem-photo';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  company: GetTeamMemberByCompanyIdsQuery['team_members'][0]['company'];
};

export const ElemInviteCompanyGroup: React.FC<Props> = ({ company }) => {
  return (
    <div className="flex items-center justify-between group snap-start hover:text-primary-500">
      <ElemTooltip content={company?.name} direction="top-start">
        <div className="flex grow items-center gap-x-2 cursor-pointer hover:opacity-75">
          <ElemPhoto
            wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
            imgClass="object-contain w-full h-full border border-slate-100 "
            photo={company?.logo}
            placeholder={'user'}
            placeholderClass="text-slate-300"
            imgAlt={company?.name || ''}
          />
          <p className="font-bold capitalize">{company?.name || ''}</p>
        </div>
      </ElemTooltip>
    </div>
  );
};
