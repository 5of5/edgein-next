import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	columns: Record<string, any>[];
	// data?: Record<string, any>[];
};

export const ElemTable: FC<PropsWithChildren<Props>> = ({
	className = "",
	columns,
	// data,
	children,
}) => {
	// const items = Object.entries(data);

	return (
		<table className={className}>
			<thead>
				<tr className="hidden sm:table-row">
					{columns.map((col: any, index: number, arr: Array<object>) => {
						let tableHeaderClasses;
						if (index === 0) {
							tableHeaderClasses = "rounded-tl-lg";
						} else if (index === arr.length - 1) {
							tableHeaderClasses = "rounded-tr-lg";
						}

						return (
							<th
								key={index}
								className={`${tableHeaderClasses} px-4 py-2 whitespace-nowrap font-bold text-left bg-white border-b-2 border-dark-100`}
							>
								{col.label}
							</th>
						);
					})}
				</tr>
			</thead>

			<tbody className="bg-white divide-y divide-dark-100 flex-1 sm:flex-none">
				{children}
			</tbody>
		</table>
	);
};
