import { FC } from "react";
import { Popover } from "@headlessui/react";
import { IconColumns } from "../icons";

type Props = {
	className?: string;
	columns: Array<Object>;
	resetColumns?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const TableColumnsFilter: FC<Props> = ({
	className,
	columns,
	resetColumns,
}) => {
	return (
		<>
			<Popover className="relative">
				<Popover.Button className="relative inline-flex items-center text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
					<IconColumns className="w-5 h-5 mr-1" />
					<div>Edit columns</div>
				</Popover.Button>
				<Popover.Panel className="absolute z-10 bg-white shadow-lg p-5 border border-black/5 rounded-lg w-screen max-w-sm">
					<div className="font-bold text-sm mb-1">Edit columns</div>
					<ul className="grid grid-cols-2 gap-x-5 overflow-y-auto scrollbar-hide">
						{columns?.map((column: any) => {
							return column.disableHiding ? (
								""
							) : (
								<li
									key={column.id}
									className="flex items-center w-full min-w-max text-sm text-left font-medium"
								>
									<label className="relative flex items-center gap-2 cursor-pointer w-full px-2 py-1.5 rounded-md overflow-hidden hover:text-primary-500 hover:bg-slate-100">
										<input
											type="checkbox"
											{...column.getToggleHiddenProps()}
											className="appearance-none w-4 h-4 border rounded border-slate-300 hover:border-slate-400 checked:bg-primary-500 checked:border-primary-500 checked:hover:bg-primary-500 focus:ring-0 focus:ring-offset-0 focus:checked:bg-primary-500"
										/>
										<div>{column.render("Header")}</div>
									</label>
								</li>
							);
						})}
					</ul>
					<div className="flex items-center justify-between gap-x-4 mt-2 pt-2 border-t border-black/5">
						<button onClick={resetColumns} className="text-primary-500">
							Reset columns
						</button>
					</div>
				</Popover.Panel>
			</Popover>
		</>
	);
};
