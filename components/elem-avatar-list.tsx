import React from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { User_Group_Members, List_Members } from '@/graphql/types';
import { ROUTES } from '@/routes';
import { ElemTooltip } from './elem-tooltip';
import { getNameFromListMember } from '@/utils/lists';

type Props = {
  people: Array<List_Members> | Array<User_Group_Members>;
  limit?: number;
};

export const ElemAvatarList: React.FC<Props> = ({ people, limit }) => {
  const peopleArray = limit ? people?.slice(0, limit) : people;

  if (peopleArray && peopleArray.length === 0) {
    return <></>;
  }

  return (
    <ul className="flex -space-x-3 overflow-hidden">
      {peopleArray?.map(person => {
        return (
          <li key={person.id}>
            <ElemTooltip
              content={getNameFromListMember(person)}
              mode="dark"
              direction="top"
              size="lg">
              {person?.user?.person?.slug ? (
                <div>
                  <a href={`${ROUTES.PEOPLE}/${person?.user?.person?.slug}/`}>
                    <ElemPhoto
                      photo={person?.user.person?.picture}
                      wrapClass="flex items-center justify-center shrink-0 bg-white overflow-hidden rounded-full w-7 h-7"
                      imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
                      imgAlt={getNameFromListMember(person)}
                      placeholder="user"
                      placeholderClass="text-gray-500"
                    />
                  </a>
                </div>
              ) : (
                <div className="flex items-center justify-center text-lg capitalize bg-gray-200 border rounded-full w-7 h-7 text-dark-500 border-gray-50">
                  {getNameFromListMember(person).charAt(0)}
                </div>
              )}
            </ElemTooltip>
          </li>
        );
      })}
    </ul>
  );
};
