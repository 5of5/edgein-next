import { PropsWithChildren } from "react";

type Props = {
	className?: string;
};

export const ElemFiltersWrap: React.FC<PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return (
		<section
			className={`w-full flex flex-col py-3 space-y-3 md:flex-row md:space-y-0 md:space-x-3 ${className}`}
		>
			{children}
		</section>
	);
};
