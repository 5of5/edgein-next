import { IconPlus, IconEllipsisHorizontal } from "@/components/Icons";
import { ElemButton } from "../ElemButton";

type Props = {};

const ElemMemberTab: React.FC<Props> = () => {
  const members = [
    {
      id: "1",
      photoUrl:
        "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666764807679.jfif",
      name: "Ashley Brown",
    },
    {
      id: "2",
      photoUrl:
        "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666762562452.jfif",
      name: "Ed Parsons",
    },
    {
      id: "3",
      photoUrl:
        "https://edgein-image-upload-rmdev-new.s3.us-west-2.amazonaws.com/1666764675946.jfif",
      name: "Dahn Tamir",
    },
  ];

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
                src={item.photoUrl}
                alt={item.name}
                className="object-contain w-full h-full border border-gray-50"
              />
            </div>
            <p className="font-bold ">{item.name}</p>
          </div>
          <IconEllipsisHorizontal className="w-6 h-6 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-250" />
        </li>
      ))}
    </ul>
  );
};

export default ElemMemberTab;
