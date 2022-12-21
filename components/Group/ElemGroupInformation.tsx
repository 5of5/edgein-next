import React from "react";
import {
  IconCustomList,
  IconChevronDownMini,
  IconTwitter,
  IconTelegram,
  IconDiscord,
  IconPlus,
} from "@/components/Icons";
import { ElemButton } from "@/components/ElemButton";
import { ElemMemberAvatarList } from "./ElemMemberAvatarList";
type Props = {
  onInvite: () => void;
};

export const ElemGroupInformation: React.FC<Props> = ({ onInvite }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <button
            type="button"
            className="flex items-center gap-x-1"
            onClick={() => {}}
          >
            <IconCustomList className="w-6 h-6" />
            <span className="text-2xl font-bold">Near Protocol Wizards</span>
            <IconChevronDownMini className="w-6 h-6" />
          </button>
          <p className="text-slate-600">
            Lists and discussions about Near Protocol and sub-organizations
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <ElemMemberAvatarList
            photos={[
              {
                id: "1",
                url: "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666764807679.jfif",
              },
              {
                id: "2",
                url: "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666762562452.jfif",
              },
              {
                id: "3",
                url: "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666764675946.jfif",
              },
            ]}
          />
          <span className="font-medium">14</span>
          <ElemButton btn="primary" className="gap-x-1" onClick={onInvite}>
            <IconPlus className="w-5 h-5" />
            <span>Invite</span>
          </ElemButton>
        </div>
      </div>

      <ul className="flex items-center gap-x-4 mt-2">
        <li>
          <a href="" className="flex items-center gap-x-1">
            <IconTwitter className="w-6 h-6" />
            <span className="text-primary-500">Twitter</span>
          </a>
        </li>
        <li>
          <a href="" className="flex items-center gap-x-1">
            <IconTelegram className="w-6 h-6" />
            <span className="text-primary-500">Telegram</span>
          </a>
        </li>
        <li>
          <a href="" className="flex items-center gap-x-1">
            <IconDiscord className="w-6 h-6" />
            <span className="text-primary-500">Discord</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
