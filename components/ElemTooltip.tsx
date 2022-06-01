import React, { useState, FC, PropsWithChildren } from "react";

type Props = {
	className?: any;
	delay?: number;
	direction?: string;
	content?: any;
};

export const ElemTooltip: FC<PropsWithChildren<Props>> = ({
	className = "",
	delay,
	direction = "top",
	content,
	children,
}) => {
	let timeout: NodeJS.Timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 200);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div
			className={`${className} Tooltip-Wrapper cursor-pointer`}
			// When to show the tooltip
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
			// onTouchStart={showTip}
			// onTouchEnd={hideTip}
		>
			{children}
			{active && (
				<div
					className={`Tooltip-Tip ${direction} font-medium text-sm text-center`}
				>
					{content}
				</div>
			)}
		</div>
	);
};
