import React, { useState } from 'react';
import { People, Team_Members, Investors } from '@/graphql/types';
import { ElemPersonCard } from '@/components/elem-person-card';
import { ElemFilterTags } from '@/components/filters/elem-filter-tags';
import { uniq, compact, sortBy } from 'lodash';
import { ElemBulkSavePeople } from './elem-bulk-save-people';
import { ElemButton } from './elem-button';
import { useIntercom } from 'react-use-intercom';
import { ROUTES } from '@/utils/routes';

type Props = {
  className?: string;
  heading?: string;
  resourceName?: string;
  people: Team_Members[] | Investors[];
  showTags?: boolean;
  allowToSaveTeam?: boolean;
};

export const ElemOrganizationTeam: React.FC<Props> = ({
  className,
  heading,
  resourceName,
  people,
  showTags = true,
  allowToSaveTeam = true,
}) => {
  const { showNewMessages } = useIntercom();

  // Show founders first
  const allTags = compact(
    uniq([
      'All Members',
      ...sortBy(people.map((people: any) => people.function)),
    ]),
  );
  const [selectedTag, setSelectedTag] = useState<string | null>('All Members');

  const peopleFoundersFirst =
    selectedTag === 'All Members'
      ? people.sort(function (a: any, b: any) {
          return b.founder - a.founder;
        })
      : ((people as any)
          .filter((p: any) => p.function === selectedTag)
          .sort((a: any, b: any) => {
            return b.founder - a.founder;
          }) as any);

  // Show inactive members last
  const peopleInactiveLast = [...peopleFoundersFirst]
    .slice(0)
    .sort(
      (a: any, b: any) =>
        Date.parse(new Date(a.end_date).toString()) -
        Date.parse(new Date(b.end_date).toString()),
    );

  const personIds = peopleInactiveLast
    .filter(item => item.person !== null)
    .map(item => (item.person as People).id);

  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {heading && (
        <div className="flex items-center justify-between px-4 pt-2">
          <h2 className="text-lg font-medium">{heading}</h2>
        </div>
      )}

      <div className="px-4 py-4">
        {people.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">
              There is no team data on this organization.
            </div>
            <ElemButton
              className="mt-2"
              onClick={() =>
                showNewMessages(
                  `Hi EdgeIn, I'd like to request team data on ${resourceName}`,
                )
              }
              btn="default"
            >
              Request data or contribute
            </ElemButton>
          </div>
        ) : (
          <>
            <div className="lg:flex items-start justify-between">
              {showTags && (
                <ElemFilterTags
                  onClick={(tag, index) => setSelectedTag(tag)}
                  selectedTag={selectedTag}
                  className="mt-2"
                  tags={allTags}
                />
              )}
              {allowToSaveTeam && (
                <div className="mt-2 lg:mt-0 shrink-0">
                  <ElemBulkSavePeople
                    text="Save team to list"
                    personIds={personIds}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5 mt-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {peopleInactiveLast.map(teamMember => {
                return (
                  <React.Fragment key={teamMember.id}>
                    {teamMember.person && (
                      <ElemPersonCard
                        key={teamMember.person.id}
                        href={`${ROUTES.PEOPLE}/${teamMember.person.slug}`}
                        photo={teamMember.person.picture}
                        heading={teamMember.person.name}
                        founder={teamMember.founder}
                        text={teamMember.function}
                        linkedin={teamMember.person.linkedin}
                        personal_email={teamMember.person.personal_email}
                        work_email={teamMember.person.work_email}
                        end_date={teamMember.end_date}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
