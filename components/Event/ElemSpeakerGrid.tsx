import React from "react";
import { GetEventQuery } from "@/graphql/types";
import { ElemPersonCard } from "@/components/ElemPersonCard";

type Props = {
  people: GetEventQuery["events"][0]["event_person"];
};

export const ElemSpeakerGrid: React.FC<Props> = ({ people }) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Speakers</h2>
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
