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
				<tr className="hidden sm:table-row">
					{columns.map((col: any, index: number) => (
						<th
							key={index}
							className="px-4 py-2 whitespace-nowrap font-bold text-left"
						>
							{col.label}
						</th>
					))}
				</tr>
			</thead>

			<tbody className="bg-white divide-y-2 divide-dark-100 flex-1 sm:flex-none">
				{children}
			</tbody>
		</table>
	);
};
