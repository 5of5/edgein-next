import React, { useState } from 'react';
import { GetEventQuery, People } from '@/graphql/types';
import { ElemPersonCard } from '@/components/elem-person-card';
import { ElemBulkSavePeople } from '../elem-bulk-save-people';
import { ElemButton } from '../elem-button';
import { numberWithCommas } from '@/utils';
import { ROUTES } from '@/utils/routes';

type Props = {
  people: GetEventQuery['events'][0]['event_person'];
};

export const ElemSpeakerGrid: React.FC<Props> = ({ people }) => {
  const [peopleLimit, setPeopleLimit] = useState(41);
  const showAllPeople = () => {
    setPeopleLimit(people?.length);
  };

  const personIds = people
    .filter(item => item.person !== null)
    .map(item => (item.person as People).id);

  return (
    <section>
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="text-lg font-medium">Speakers</h2>
        <ElemBulkSavePeople text="Save speakers" personIds={personIds} />
      </div>

      <div className="px-4 py-4">
        <div className="flex flex-col gap-5 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {people.slice(0, peopleLimit).map(item => {
            const isFounder = item.person?.team_members[0]?.founder
              ? true
              : false;

            let personTitle = undefined;
            let personOrganizationName = undefined;
            if (item.person && item.person.team_members.length > 0) {
              personTitle = item.person.team_members[0].title
                ? item.person?.team_members[0].title
                : '';

              if (item.person.team_members[0].company) {
                personOrganizationName =
                  item.person?.team_members[0].company.name;
              }
            } else if (item.person && item.person.investors.length > 0) {
              personTitle = item.person.investors[0].title
                ? item.person.investors[0].title
                : '';
              if (item.person.investors[0].vc_firm) {
                personOrganizationName = item.person?.investors[0].vc_firm.name;
              }
            }

            return (
              <React.Fragment key={item.id}>
                {item.person && (
                  <ElemPersonCard
                    key={item.person.id}
                    href={`${ROUTES.PEOPLE}/${item.person.slug}`}
                    photo={item.person.picture}
                    heading={item.person.name}
                    linkedin={item.person.linkedin}
                    personal_email={item.person.personal_email}
                    work_email={item.person.work_email}
                    founder={isFounder}
                    text={personTitle}
                    organizationName={personOrganizationName}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        {peopleLimit < people.length && (
          <div className="mt-6">
            <ElemButton
              btn="default"
              onClick={showAllPeople}
              className="w-full"
            >
              Show All {numberWithCommas(people.length)} Speakers
            </ElemButton>
          </div>
        )}
      </div>
    </section>
  );
};
