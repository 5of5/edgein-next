import React, { useState, FC, PropsWithChildren } from "react";

type Props = {
	className?: any;
	delay?: number;
	direction?: "top" | "right" | "bottom" | "left";
	size?: "md" | "lg" | "";
	content?: any;
};

export const ElemTooltip: FC<PropsWithChildren<Props>> = ({
	className = "",
	delay,
	direction = "top",
	content,
	size = "",
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

	// Direction
	let directionClasses = "";
	let triangleClasses = "";

	if (direction === "top") {
		directionClasses = "-top-2 -translate-y-full left-1/2 -translate-x-1/2";
		triangleClasses = "top-full border-t-dark-500";
	} else if (direction === "right") {
		directionClasses = "left-full translate-x-2 top-1/2 -translate-y-1/2";
		triangleClasses =
			"top-1/2 -left-1.5 translate-x-0 -translate-y-1/2 border-r-dark-500";
	} else if (direction === "bottom") {
		directionClasses = "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full";
		triangleClasses = "bottom-full border-b-dark-500";
	} else if (direction === "left") {
		directionClasses = "-left-2 -translate-x-full top-1/2 -translate-y-1/2";
		triangleClasses =
			"left-auto top-1/2 -right-3 translate-x-0 -translate-y-1/2 border-l-dark-500";
	}

	// Sizes
	let sizeClasses = "max-w-[9rem]";
	if (size === "md") {
		sizeClasses = "max-w-[16rem]";
	} else if (size === "lg") {
		sizeClasses = "max-w-[24rem]";
	}

	return (
		<div
			className={`${className} Tooltip-Wrapper relative inline-block cursor-pointer`}
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
			onTouchStart={showTip}
			onTouchEnd={hideTip}
		>
			{children}
			{active && (
				<div
					className={`absolute z-[100] w-max px-2 py-0.5 bg-gray-900 text-gray-100 rounded-md font-medium text-sm text-center break-words ${sizeClasses} ${directionClasses}`}
				>
					<span
						className={`triangle left-1/2 border-transparent h-0 w-0 absolute cursor-none border-[6px] -ml-1.5 ${triangleClasses}`}
					></span>
					{content}
				</div>
			)}
		</div>
	);
};
