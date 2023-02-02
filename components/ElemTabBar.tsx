import React, { MutableRefObject, useState } from "react";
import {
	IconEllipsisHorizontal,
	IconExclamationTriangle,
	IconPencilSquare,
} from "@/components/Icons";
import { Popover } from "@headlessui/react";
import { useIntercom } from "react-use-intercom";

type Tabs = {
	name?: string;
	ref: MutableRefObject<HTMLDivElement>;
};

type Props = {
	className?: string;
	tabs?: Array<Tabs>;
};

export const ElemTabBar: React.FC<Props> = ({ className, tabs }) => {
	const [isActive, setActive] = useState(0);

	const onClick = (index: number, ref: any) => {
		setActive(index);
		window.scrollTo(0, ref.current.offsetTop - 30);
	};

	const { show } = useIntercom();

	return (
		<div
			className={`flex items-center justify-between border-y border-black/10 ${className}`}
			role="tablist"
		>
			<nav className="flex">
				{tabs &&
					tabs.map((tab: any, index: number) => (
						<button
							key={index}
							onClick={() => onClick(index, tab.ref)}
							className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
								isActive === index
									? "text-primary-500 border-primary-500"
									: "border-transparent  hover:bg-slate-200"
							}`}
						>
							{tab.name}
						</button>
					))}
			</nav>

			<Popover className="relative z-10">
				<Popover.Button className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
					<IconEllipsisHorizontal
						className="h-6 w-6 group-hover:text-primary-500"
						title="Options"
					/>
				</Popover.Button>

				<Popover.Panel className="absolute right-0 overflow-hidden w-48 divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
					<button
						onClick={show}
						className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
					>
						<IconPencilSquare className="h-6 w-6 group-hover:text-primary-500" />
						<span>Suggest edits</span>
					</button>
					<button
						onClick={show}
						className="flex items-center space-x-2 w-full px-2 py-2 hover:bg-gray-50 hover:text-primary-500"
					>
						<IconExclamationTriangle className="h-6 w-6 group-hover:text-primary-500" />
						<span>Report an error</span>
					</button>
				</Popover.Panel>
			</Popover>
		</div>
	);
};
