import React from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { User_Group_Members } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  members: Array<User_Group_Members>;
};

export const ElemMemberAvatarList: React.FC<Props> = ({ members }) => {
  return (
    <ul className="flex -space-x-3 overflow-hidden">
      {members.slice(0, 10).map(mem => {
        const member = (
          <div>
            {mem.user?.person?.picture ? (
              <ElemPhoto
                photo={mem.user?.person?.picture}
                wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8"
                imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                imgAlt={mem.user?.display_name}
              />
            ) : (
              <div
                className="flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize"
                title={mem.user?.display_name ? mem.user?.display_name : ''}
              >
                {mem.user?.display_name?.charAt(0)}
              </div>
            )}
          </div>
        );
        return (
          <li key={mem.id}>
            {mem.user?.person?.slug ? (
              <ElemLink href={`${ROUTES.PEOPLE}/${mem.user?.person?.slug}/`}>
                {member}
              </ElemLink>
            ) : (
              member
            )}
          </li>
        );
      })}
    </ul>
  );
};
