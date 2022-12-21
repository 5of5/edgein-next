import React from "react";
import { ElemPhoto } from "@/components/ElemPhoto";

type Props = {
  photos: Array<Record<string, any>>;
};

export const ElemMemberAvatarList: React.FC<Props> = ({ photos }) => {
  return (
    <ul className="flex -space-x-3 overflow-hidden">
      {photos.map((photo, index) => (
        <li key={photo.id}>
          <ElemPhoto
            photo={photo}
            wrapClass={`flex items-center justify-center aspect-square shrink-0 p-1 bg-white overflow-hidden rounded-full shadow w-10 z-${
              (3 - index) * 10
            } relative`}
            imgClass="object-contain w-full h-full rounded-full overflow-hidden"
            imgAlt="person1"
            placeholder="user"
            placeholderClass="text-slate-300"
          />
        </li>
      ))}
    </ul>
  );
};
