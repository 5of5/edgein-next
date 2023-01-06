import { IconPlus, IconEllipsisHorizontal } from "@/components/Icons";
import { User_Group_Members } from "@/graphql/types";
import { ElemButton } from "@/components/ElemButton";
import { ElemPhoto } from "@/components/ElemPhoto";

type Props = {
	members: Array<User_Group_Members>;
};

const ElemMemberTab: React.FC<Props> = ({ members }) => {
	return (
		<div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10 overflow-hidden">
			<div className="hover:bg-slate-100">
				<ElemButton
					btn="transparent"
					className="flex items-center gap-x-2 w-full px-4 py-3 !justify-start"
				>
					<div className="p-2 bg-primary-100 rounded-md">
						<IconPlus className="w-6 h-6 text-primary-500" />
					</div>
					<p className="font-bold text-primary-500">Add People</p>
				</ElemButton>
			</div>

			{members.map((item) => (
				<div
					key={item.id}
					className="flex items-center justify-between px-4 py-3 cursor-pointer group hover:bg-slate-100"
				>
					<div className="flex items-center gap-x-2">
						{item.user.person?.picture ? (
							<ElemPhoto
								wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
								imgClass="object-contain w-full h-full border border-slate-100 "
								photo={item.user.person?.picture}
								placeholder="user2"
								placeholderClass="text-slate-300"
								imgAlt={item.user.display_name}
							/>
						) : (
							<div className="flex items-center justify-center aspect-square w-10 rounded-lg bg-slate-200 text-dark-500 text-xl capitalize">
								{item.user.display_name?.charAt(0)}
							</div>
						)}

						<p className="font-bold">{item.user.display_name}</p>
					</div>
					<IconEllipsisHorizontal className="w-6 h-6 bg-slate-200 rounded-full cursor-pointer opacity-0 hover:bg-slate-300 group-hover:opacity-100" />
				</div>
			))}
		</div>
	);
};

export default ElemMemberTab;
