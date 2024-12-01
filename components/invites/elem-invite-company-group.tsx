import { FC } from 'react';
import { GetTeamMemberByCompanyIdsQuery } from '@/graphql/types';
import { ElemPhoto } from '../elem-photo';
import { ElemTooltip } from '../elem-tooltip';

type Props = {
  company: GetTeamMemberByCompanyIdsQuery['team_members'][0]['company'];
};

export const ElemInviteCompanyGroup: FC<Props> = ({ company }) => {
  return (
    <div className="flex items-center justify-between group snap-start">
      <ElemTooltip content={company?.name} direction="top-start">
        <div className="flex grow items-center gap-x-2 cursor-pointer hover:opacity-75">
          <ElemPhoto
            wrapClass="w-10 h-10 aspect-square shrink-0 bg-dark-100 overflow-hidden border border-gray-200 rounded-lg"
            imgClass="object-contain w-full h-full"
            photo={company?.logo}
            placeholder="company"
            placeholderClass="p-1 text-gray-300"
            imgAlt={company?.name || ''}
          />
          <p className="font-medium capitalize">{company?.name || ''}</p>
        </div>
      </ElemTooltip>
    </div>
  );
};
