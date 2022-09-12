import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	columns: Record<string, any>[];
};

export const ElemTable: FC<PropsWithChildren<Props>> = ({
	className = "",
	columns,
	children,
}) => {
	return (
		<table
			className={`${className} flex flex-row flex-no-wrap md:table md:table-auto`}
			cellSpacing={0}
		>
			<thead>
				<tr className="hidden md:table-row">
					{columns.map((col, index: number) => {
						return (
							<th
								key={index}
								className="px-4 py-2 whitespace-nowrap font-bold text-sm text-left bg-white border-b-2 border-black/10 first:rounded-tl-lg last:rounded-tr-lg"
								colSpan={col.colSpan ? col.colSpan : 1}
							>
								{col.label}
							</th>
						);
					})}
				</tr>
			</thead>

			<tbody className="bg-white divide-y divide-dark-100 flex-1 md:flex-none mb-96">
				{children}
			</tbody>
		</table>
	);
};
