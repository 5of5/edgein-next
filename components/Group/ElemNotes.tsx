import React from "react";
import { Notes } from "@/graphql/types";
import ElemNoteCard from "./ElemNoteCard";

type Props = {
  notes: Array<Notes>;
};

export const ElemNotes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">{`Notes (${notes.length})`}</h2>

      <div className="grid grid-cols-3 gap-4 mt-2">
        {notes.map((item) => (
          <ElemNoteCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};
