import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment, MouseEvent } from "react";
import {
	IconEllipsisHorizontal,
	IconEditPencil,
	IconTrash,
} from "@/components/Icons";

type Props = {
	onUpdateBtn: (event: MouseEvent<HTMLButtonElement>) => void;
	onDeleteBtn: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ElemListOptionMenu: FC<Props> = ({ onUpdateBtn, onDeleteBtn }) => {
	return (
		<Menu as="div" className="relative">
			<Menu.Button as={Fragment}>
				<div className="bg-slate-200 hover:bg-slate-300 hover:text-primary-500 rounded-full cursor-pointer">
					<IconEllipsisHorizontal className="h-6 w-6" />
				</div>
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items
					as="nav"
					className="absolute overflow-hidden  mt-2 w-56 origin-top divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<Menu.Item>
						{({ active }) => (
							<button
								onClick={onUpdateBtn}
								className={`${
									active ? "bg-gray-50" : ""
								} hover:text-primary-500 flex w-full items-center px-2 py-2`}
							>
								<IconEditPencil className="mr-2 h-5 w-5" aria-hidden="true" />
								Edit Name
							</button>
						)}
					</Menu.Item>

					<Menu.Item>
						{({ active }) => (
							<button
								onClick={onDeleteBtn}
								className={`${
									active ? "bg-gray-50" : ""
								} hover:text-primary-500 flex w-full items-center px-2 py-2`}
							>
								<IconTrash className="mr-2 h-5 w-5" aria-hidden="true" />
								Delete List
							</button>
						)}
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
