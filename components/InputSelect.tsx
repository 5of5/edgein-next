import { Listbox, Transition } from "@headlessui/react";
import React, { PropsWithChildren, Fragment } from "react";
import {
	IconSelector,
	IconCheck,
	IconFollowing,
	IconDead,
	IconAcquired,
	IconTrending,
} from "../components/Icons";

type Props = {
	className?: string;
	buttonClasses?: string;
	dropdownClasses?: string;
	value?: any;
	placeholder?: any;
	onChange?: any;
	options: Record<string, any>[];
	disabled?: boolean;
	multiple?: boolean;
	by?: string;
};

export const InputSelect: React.FC<PropsWithChildren<Props>> = ({
	className = "",
	buttonClasses = "",
	dropdownClasses = "",
	value, //{title: "", description: ""}
	placeholder = "",
	options,
	disabled = false,
	multiple = false,
	by,
	onChange,
}) => {
	const displayIcon = (val: string | number, className: string) => {
		const basicInfo = "h-5 w-5 mr-1 shrink-0";
		switch (val) {
			case "Following":
				return <IconFollowing className={`${basicInfo} ${className}`} />;
			case "Dead":
				return <IconDead className={`${basicInfo} ${className}`} />;
			case "Acquired":
				return <IconAcquired className={`${basicInfo} ${className}`} />;
			case "Trending":
				return <IconTrending className={`${basicInfo} ${className}`} />;
			default:
				return "";
		}
	};

	return (
		<div className={className}>
			<Listbox
				value={value}
				onChange={onChange}
				disabled={disabled}
				multiple={multiple}
				by={by}
			>
				{({ open, disabled }) => (
					<>
						<div className="relative">
							<Listbox.Button
								className={`relative w-full appearance-none border-none text-dark-500 bg-white rounded-md pl-3 pr-10 py-1.5 text-left cursor-pointer ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${buttonClasses} ${
                  disabled ? "bg-slate-200 cursor-not-allowed" : ""
                }`}
							>
								{multiple ? (
									<div className={`${className} min-h-[24px] flex items-center flex-wrap gap-2`}>
										{value.map((item: any) => (
											<span
												key={item.id}
												className="bg-slate-100 rounded-md px-2 py-1"
											>
												{item.title}
											</span>
										))}
									</div>
								) : (
									<div className={` ${className} truncate`}>
										{value?.title ? value.title : placeholder}
										<span className="text-gray-400 text-sm ml-2">
											{value?.description && value.description}
										</span>
									</div>
								)}
								
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
								<Listbox.Options
									className={`absolute z-10 mt-1 w-full bg-white border border-dark-500/10 divide-y divide-gray-100 shadow-xl max-h-60 rounded-md overflow-auto focus:outline-none ${dropdownClasses}`}
								>
									{options.map((option: any, index: number) => (
										<Listbox.Option
											key={index}
											value={option}
											className={({ active }) =>
												`${
													active
														? "text-primary-500 bg-primary-100"
														: "text-dark-500"
												}  select-none relative py-2 pl-3 pr-4 ${
													option.disabled
														? "cursor-not-allowed opacity-50"
														: "cursor-default"
												}`
											}
											disabled={option.disabled ? option.disabled : false}
										>
											{({ selected }) => (
												<>
													<div
														className={`${
															selected ? "font-bold" : "font-normal"
														} truncate align-bottom flex`}
														title={`${
															option.title ? option.title : placeholder
														}${option.description ? option.description : ""}`}
													>
														{option.icon
															? displayIcon(
																	option.icon,
																	`${selected ? "font-bold" : "font-normal"}`
															  )
															: ""}
														{option.title ? option.title : placeholder}
													</div>
													<div className="text-gray-400 text-xs">
														{option.description ? option.description : ""}
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
		</div>
	);
};
