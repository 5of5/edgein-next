import React, { useState, FC, PropsWithChildren } from "react";

type Props = {
	className?: any;
	delay?: number;
	direction?: string;
	content?: string;
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
			className={`${className} Tooltip-Wrapper`}
			// When to show the tooltip
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
		>
			{children}
			{active && <div className={`Tooltip-Tip ${direction} `}>{content}</div>}
		</div>
	);
};
