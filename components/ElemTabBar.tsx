import React, { useState } from "react";

type Props = {
	className?: string;
	tabs?: string[];
	onTabClick?: (index: number) => void;
	selectedTab?: number;
};

export const ElemTabBar: React.FC<Props> = ({
	className,
	tabs,
	onTabClick = () => {},
	selectedTab,
}) => {
	const [isActive, setActive] = useState(0);

	const onClick = (i: number) => {
		setActive(i);
		onTabClick(i);
	};

	return (
		<nav
			className={`flex border-y border-black/10 ${className}`}
			role="tablist"
		>
			{tabs &&
				tabs.map((tab: string, i: number) => (
					<button
						key={i}
						onClick={() => onClick(i)}
						className={`whitespace-nowrap flex py-3 px-3 border-b-2 box-border font-bold transition-all ${
							isActive === i
								? "text-primary-500 border-primary-500"
								: "border-transparent  hover:bg-slate-200"
						}`}
						aria-current={isActive === i ? "true" : "false"}
					>
						{tab}
					</button>
				))}
		</nav>
	);
};
