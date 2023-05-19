import { FC, Fragment, useState } from "react";
import { Popover } from "@headlessui/react";
import { IconColumns } from "../Icons";

type Props = {
	className?: string;
	columns: any;
};

export const TableColumnsFilter: FC<Props> = ({ className, columns }) => {
	return (
		<>
			<Popover className="relative">
				<Popover.Button className="relative inline-flex items-center font-normal text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-slate-200 hover:text-primary-500 hover:bg-slate-200 focus:outline-none focus:ring-1">
					<IconColumns className="w-5 h-5 mr-1" />
					<div>Edit columns</div>
				</Popover.Button>
				<Popover.Panel className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg min-w-content">
					<ul className="overflow-y-auto no-scrollbar divide-y divide-slate-100">
						{columns?.map((column: any) => {
							return (
								<li
									key={column.id}
									className="flex items-center w-full min-w-max text-sm text-left font-medium hover:text-primary-500 hover:bg-slate-100"
								>
									<label className="relative flex items-center gap-2 cursor-pointer w-full px-3 py-2 hover:bg-slate-100">
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
				</Popover.Panel>
			</Popover>
		</>
	);
};
