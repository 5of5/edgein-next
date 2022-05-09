import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	columns: Record<string, any>[];
	// data?: Record<string, any>[];
};

export const ElemTable: FC<PropsWithChildren<Props>> = ({
	className,
	columns,
	// data,
	children,
}) => {
	// const items = Object.entries(data);

	return (
		<table className={className}>
			<thead>
				<tr>
					{columns.map((col: any, index: number) => (
						<th
							key={index}
							className="p-2 uppercase font-bold text-sm text-left"
						>
							{col.label}
						</th>
					))}
				</tr>
			</thead>

			<tbody className="bg-white rounded-xl">{children}</tbody>
		</table>
	);
};
