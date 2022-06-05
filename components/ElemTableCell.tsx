import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	header?: string;
	colSpan?: number;
};

export const ElemTableCell: FC<PropsWithChildren<Props>> = ({
	className = "",
	header = "",
	colSpan = 1,
	children,
}) => {
	return (
		<>
			{header && <th className="text-left px-4 pt-4 md:hidden">{header}</th>}
			<td
				className={`align-top px-4 pb-4 whitespace-nowrap md:p-4 ${className}`}
				colSpan={colSpan}
			>
				{children}
			</td>
		</>
	);
};
