import { Listbox, Transition } from "@headlessui/react";
import React, { PropsWithChildren, Fragment } from "react";

type Props = {
	value?: any;
	onChange?: any;
	options: Record<string, any>[];
};

export const InputSelect: React.FC<PropsWithChildren<Props>> = ({
	value,
	options,
	onChange,
}) => {
	return (
		<Listbox value={value} onChange={onChange}>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full text-dark-500 bg-white border border-transparent text-lg rounded-md pl-3 pr-10 py-1.5 text-left cursor-default focus:outline-none focus:border-primary-500 hover:ring hover:ring-primary-100 focus:ring focus:ring-primary-100">
							<div className="truncate">
								{value?.name ? value.name : "All Layers"}
								<span className="text-gray-400 text-sm">
									{value?.details && value.details}
								</span>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<IconSelector className="h-5 w-5 text-gray-400" />
							</div>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-xl max-h-60 rounded-md py-1 text-lg overflow-auto focus:outline-none">
								{options.map((option: any) => (
									<Listbox.Option
										key={option.id}
										value={option}
										className={({ active }) =>
											`${
												active
													? "text-primary-500 bg-primary-100"
													: "text-dark-500"
											} cursor-default select-none relative py-2 pl-3 pr-9`
										}
									>
										{({ selected }) => (
											<>
												<div
													className={`${
														selected ? "font-bold" : "font-normal"
													} truncate align-bottom`}
													title={`${option.name ? option.name : "All Layers"}${
														option.details ? option.details : ""
													}`}
												>
													{option.name ? option.name : "All Layers"}
													<span className="text-gray-400 text-sm">
														{option.details ? option.details : ""}
													</span>
												</div>

												{selected && (
													<div className="absolute z-50 inset-y-0 right-0 flex items-center pr-4 text-primary-500">
														<IconCheck className="h-5 w-5" />
													</div>
												)}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};

type IconProps = {
	className?: string;
	title?: string;
};

const IconSelector: React.FC<IconProps> = ({
	className,
	title = "Selector",
}) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8 9l4-4 4 4m0 6l-4 4-4-4"
			/>
		</svg>
	);
};

const IconCheck: React.FC<IconProps> = ({ className, title = "Check" }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
			stroke="currentColor"
			strokeWidth="2"
		>
			<title>{title}</title>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	);
};
