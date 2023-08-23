import React, { useState } from 'react';
import { Investors } from '@/graphql/types';
import { ElemPersonCard } from '@/components/elem-person-card';
import { IconEditPencil } from '@/components/icons';
import { ElemFilterTags } from '@/components/elem-filter-tags';
import { uniq, compact, sortBy } from 'lodash';

type Props = {
  className?: string;
  heading?: string;
  people: Investors[];
  showEdit?: boolean;
  // tags?: Maybe<string>[] | null
};

export const ElemInvestorGrid: React.FC<Props> = ({
  className,
  heading,
  people,
  showEdit,
}) => {
  // Show founders first
  const allTags = compact(
    uniq(['All Members', ...sortBy(people.map(people => people.function))]),
  );
  const [selectedTag, setSelectedTag] = useState<string | null>('All Members');
  const peopleFoundersFirst =
    selectedTag === 'All Members'
      ? people.sort(function (a: any, b: any) {
          return b.founder - a.founder;
        })
      : people
          .filter(p => p.function === selectedTag)
          .sort(function (a: any, b: any) {
            return b.founder - a.founder;
          });
  return (
    <section className={`rounded-lg border border-gray-300 ${className}`}>
      {heading && (
        <div className="flex items-center justify-between px-4 pt-2">
          <h2 className="text-lg font-medium">{heading}</h2>
        </div>
      )}

      <div className="px-4 py-4">
        <ElemFilterTags
          onClick={(tag, index) => setSelectedTag(tag)}
          selectedTag={selectedTag}
          tags={allTags}
        />
        <div className="flex flex-col gap-5 mt-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {peopleFoundersFirst.map(teamMember => {
            return (
              <React.Fragment key={teamMember.id}>
                {teamMember.person && (
                  <ElemPersonCard
                    key={teamMember.person.id}
                    href={`/people/${teamMember.person.slug}`}
                    photo={teamMember.person.picture}
                    heading={teamMember.person.name}
                    founder={teamMember.founder}
                    text={teamMember.function}
                    linkedin={teamMember.person.linkedin}
                    personal_email={teamMember.person.personal_email}
                    work_email={teamMember.person.work_email}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
