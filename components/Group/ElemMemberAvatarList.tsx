import React from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { User_Group_Members } from "@/graphql/types";

type Props = {
  members: Array<User_Group_Members>;
  onClick: () => void;
};

export const ElemMemberAvatarList: React.FC<Props> = ({ members, onClick }) => {
  return (
    <ul className="flex -space-x-3 overflow-hidden cursor-pointer" onClick={onClick}>
      {members.slice(0, 3).map((mem, index) => (
        <li key={mem.id}>
          <ElemPhoto
            photo={mem.user.person?.picture}
            wrapClass={`flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8 z-${
              (3 - index) * 10
            } relative`}
            imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
            imgAlt={mem.user.display_name}
            placeholder="user"
            placeholderClass="text-slate-300"
          />
        </li>
      ))}
    </ul>
  );
};
