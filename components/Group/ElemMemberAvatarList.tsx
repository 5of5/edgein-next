import React from "react";
import { ElemPhoto } from "@/components/elem-photo";
import { User_Group_Members } from "@/graphql/types";

type Props = {
	members: Array<User_Group_Members>;
	onClick: () => void;
};

export const ElemMemberAvatarList: React.FC<Props> = ({ members, onClick }) => {
	return (
		<ul
			className="flex -space-x-3 overflow-hidden cursor-pointer"
			onClick={onClick}
		>
			{members.slice(0, 3).map((mem, index) => (
				<li key={mem.id}>
					{mem.user.person?.picture ? (
						<ElemPhoto
							photo={mem.user.person?.picture}
							wrapClass={`flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full w-8 relative z-${
								(3 - index) * 10
							} relative`}
							imgClass="object-contain w-full h-full rounded-full overflow-hidden border border-gray-50"
							imgAlt={mem.user.display_name}
						/>
					) : (
						<div
							className={`flex items-center justify-center aspect-square w-8 rounded-full bg-slate-300 text-dark-500 border border-gray-50 text-lg capitalize relative  z-${
								(3 - index) * 10
							}`}
						>
							{mem.user.display_name?.charAt(0)}
						</div>
					)}
				</li>
			))}
		</ul>
	);
};
