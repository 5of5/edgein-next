import { useAuth } from "@/hooks/useAuth";
import { getName } from "@/utils/reaction";
import { findIndex } from "lodash";
import { FC, useEffect, useState } from "react";
import { IconCrap } from "./reactions/IconCrap";
import { IconHot } from "./reactions/IconHot";
import { IconLike } from "./reactions/IconLike";
import { IconSave } from "@/components/Icons"
import { ElemTooltip } from "@/components/ElemTooltip";

type Props = {
	className?: string;
	data: any;
	handleReactionClick: (
		reaction: string,
		isSelected: boolean
	) => (
		e: React.MouseEvent<HTMLButtonElement | HTMLInputElement | HTMLElement>
	) => void;
};

export const ElemReactions: FC<Props> = ({
	className = "",
	data,
	handleReactionClick,
}) => {
	const { user } = useAuth();

	const [hot, setHot] = useState(-1);
	const [like, setLike] = useState(-1);
	const [crap, setCrap] = useState(-1);

	useEffect(() => {
		setHot(() =>
			findIndex(data.follows, (item: any) => {
				return getName(item.list) === "hot";
			})
		);

		setLike(
			findIndex(data.follows, (item: any) => {
				return getName(item.list) === "like";
			})
		);

		setCrap(
			findIndex(data.follows, (item: any) => {
				return getName(item.list) === "crap";
			})
		);
	}, [data]);

	const alreadyReacted = (sentiment: number): boolean => {
		return sentiment !== -1;
	};

	const alreadyReactedClasses = (sentiment: number, reaction: string) => {
		let classes = "";

		if (sentiment !== -1 && reaction === "hot") {
			classes = "text-red-500 hover:text-red-500";
		} else if (sentiment !== -1 && reaction === "like") {
			classes = "text-primary-500 hover:text-primary-500";
		} else if (sentiment !== -1 && reaction === "crap") {
			classes = "text-yellow-800 hover:text-yellow-800";
		} else {
			classes = "text-slate-400 hover:text-slate-600";
		}

		return classes;
	};

	return (
		<div className={`flex flex-nowrap space-x-3 -ml-1 ${className}`}>
			<div
				onClick={handleReactionClick("hot", alreadyReacted(hot))}
				title="Hot"
				role="button"
				className={`flex items-center cursor-pointer font-bold group ease-in-out duration-150 ${alreadyReactedClasses(
					hot,
					"hot"
				)}`}
			>
				<ElemTooltip content="Hot">
					<div className="flex items-center justify-center h-9 w-9 group-active:scale-75 group-active:rotate-6 mr-1 rounded-full overflow-visible ease-in-out duration-150 group-hover:bg-slate-100">
						<IconHot className="h-6 w-6" />{" "}
					</div>
				</ElemTooltip>
				{data?.sentiment?.hot || 0}
			</div>

			<div
				onClick={handleReactionClick("like", alreadyReacted(like))}
				title="Like"
				role="button"
				className={`flex items-center cursor-pointer font-bold group ease-in-out duration-150 ${alreadyReactedClasses(
					like,
					"like"
				)}`}
			>
				<ElemTooltip content="Like">
					<div className="flex items-center justify-center h-9 w-9 group-active:scale-75 group-active:rotate-6 mr-1 rounded-full overflow-visible ease-in-out duration-150 group-hover:bg-slate-100">
						<IconLike className="h-6 w-6" />{" "}
					</div>
				</ElemTooltip>
				{data?.sentiment?.like || 0}
			</div>

			<div
				onClick={handleReactionClick("crap", alreadyReacted(crap))}
				title="Sh**"
				role="button"
				className={`flex items-center cursor-pointer font-bold group ease-in-out duration-150 ${alreadyReactedClasses(
					crap,
					"crap"
				)}`}
			>
				<ElemTooltip content="Sh**">
					<div className="flex items-center justify-center h-9 w-9 group-active:scale-75 group-active:rotate-6 mr-1 rounded-full overflow-visible ease-in-out duration-150 group-hover:bg-slate-100">
						<IconCrap className="h-6 w-6" />{" "}
					</div>
				</ElemTooltip>
				{data?.sentiment?.crap || 0}
			</div>
		</div>
	);
};
