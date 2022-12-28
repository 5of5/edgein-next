import { IconPlus, IconEllipsisHorizontal } from "@/components/Icons";
import { User_Group_Members } from "@/graphql/types";
import { ElemButton } from "../ElemButton";

type Props = {
  members: Array<User_Group_Members>;
};

const ElemMemberTab: React.FC<Props> = ({ members }) => {
  return (
    <ul className="bg-white shadow rounded-lg">
      <li>
        <ElemButton
          btn="transparent"
          className="flex items-center gap-x-2 w-full py-4 !justify-start"
        >
          <div className="p-3 bg-gray-50 rounded-md">
            <IconPlus className="w-6 h-6 text-primary-800" />
          </div>
          <p className="font-bold text-primary-800">Add People</p>
        </ElemButton>
      </li>
      {members.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between border-t border-gray-50 p-4"
        >
          <div className="flex items-center gap-x-2">
            <div className="w-12 h-12 aspect-square shrink-0 bg-white overflow-hidden rounded-lg">
              <img
                src={item.user.person?.picture?.url}
                alt={item.user.display_name || ""}
                className="object-contain w-full h-full border border-gray-50"
              />
            </div>
            <p className="font-bold ">{item.user.display_name}</p>
          </div>
          <IconEllipsisHorizontal className="w-6 h-6 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-250" />
        </li>
      ))}
    </ul>
  );
};

export default ElemMemberTab;
