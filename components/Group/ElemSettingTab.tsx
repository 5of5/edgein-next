import { IconSignOut, IconTrash } from "@/components/Icons";
import { User_Groups } from "@/graphql/types";
import moment from "moment-timezone";
import { ElemButton } from "../ElemButton";

type Props = {
  group: User_Groups;
};

const ElemSettingTab: React.FC<Props> = ({ group }) => {
  return (
    <>
      <ul className="bg-white shadow rounded-lg">
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Name</p>
            <p className="text-slate-500">{group.name}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Description</p>
            <p className="text-slate-500">{group.description}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Twitter</p>
            <p className="text-slate-500">{group.twitter}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Telegram</p>
            <p className="text-slate-500">{group.telegram}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Discord</p>
            <p className="text-slate-500">{group.discord}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
          <div>
            <p className="font-bold">Created by</p>
            <p className="text-slate-500">{`Redg Snog on ${moment(
              group.created_at
            ).format("LL")}`}</p>
          </div>
          <ElemButton btn="transparent">Edit</ElemButton>
        </li>
        <li>
          <ElemButton
            btn="transparent"
            className="flex items-center gap-x-2 w-full py-4 !justify-start"
          >
            <IconSignOut className="w-6 h-6 text-red-500" />
            <p className="font-bold text-red-500">Leave Group</p>
          </ElemButton>
        </li>
      </ul>

      <div className="bg-white shadow rounded-lg mt-6">
        <ElemButton
          btn="transparent"
          className="flex items-center gap-x-2 w-full py-4 !justify-start"
        >
          <IconTrash className="w-6 h-6 text-red-500" />
          <p className="font-bold text-red-500">Delete This Group</p>
        </ElemButton>
      </div>
    </>
  );
};

export default ElemSettingTab;
