import React from "react";
import { GetEventQuery, People } from "@/graphql/types";
import { ElemPersonCard } from "@/components/ElemPersonCard";
import { ElemBulkSavePeople } from "../ElemBulkSavePeople";

type Props = {
  people: GetEventQuery["events"][0]["event_person"];
};

export const ElemSpeakerGrid: React.FC<Props> = ({ people }) => {
  const personIds = people
    .filter((item) => item.person !== null)
    .map((item) => (item.person as People).id);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Speakers</h2>
      </div>
      <div className="flex justify-end">
        <ElemBulkSavePeople
          text="Save speakers to list"
          personIds={personIds}
        />
      </div>
      <div className="flex flex-col gap-5 mt-4 sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {people.map((item) => {
          return (
            <React.Fragment key={item.id}>
              {item.person && (
                <ElemPersonCard
                  key={item.person.id}
                  href={`/people/${item.person.slug}`}
                  photo={item.person.picture}
                  heading={item.person.name}
                  linkedin={item.person.linkedin}
                  personal_email={item.person.personal_email}
                  work_email={item.person.work_email}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
