import React, { MutableRefObject, useState } from "react";

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

	return (
		<nav
			className={`flex border-y border-black/10 ${className}`}
			role="tablist"
		>
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
	);
};
