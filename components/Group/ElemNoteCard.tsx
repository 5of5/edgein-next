import React from "react";
import useSWR from "swr";
import moment from "moment-timezone";
import { Notes } from "@/graphql/types";
import { ElemPhoto } from "../ElemPhoto";

type Props = {
  data: Notes;
};

const fetcher = async (url: string, args: any) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resourceId: args.resourceId,
      resourceType: args.resourceType,
    }),
  }).then((res) => res.json());
};

const ElemNoteCard: React.FC<Props> = ({ data }) => {
  const { data: resource } = useSWR(
    [
      "/api/get_note_resource/",
      {
        resourceId: data.resource_id,
        resourceType: data.resource_type,
      },
    ],
    fetcher
  );

  return (
    <div className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-dark-500/10 transition-all hover:scale-102 hover:shadow md:h-full">
      <div className="flex shrink-0 w-full">
        <ElemPhoto
          photo={{}}
          wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
          imgClass="object-fit max-w-full max-h-full"
          imgAlt={data.notes}
        />
        <div className="flex items-center justify-center pl-2 md:overflow-hidden">
          <h3
            className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl"
            title={data.notes ?? ""}
          >
            {resource?.name}
          </h3>
        </div>
      </div>

      <p className="text-sm mt-3">{`Created ${moment(data.created_at).format(
        "LL"
      )}`}</p>
      <p className="text-slate-500 break-words line-clamp-3 mt-3">
        {data.notes}
      </p>
    </div>
  );
};
export default ElemNoteCard;
