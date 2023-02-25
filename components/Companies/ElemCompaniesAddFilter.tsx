import React, { FC, useEffect, useRef, useState } from "react";
import { IconPlus } from "@/components/Icons";
import { companiesFilterOptions } from "@/utils/constants";
import { ElemUpgradeDialog } from "../ElemUpgradeDialog";
import { useUser } from "@/context/userContext";
import { IconContributor } from "@/components/Icons";

type CategoryFilterOptionProps = {
	options: Array<{
		category: string;
		items: Array<{ label: string; value: string }>;
	}>;
	onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type Props = {
	open: boolean;
	onOpen: () => void;
	onClose: () => void;
	onSelectFilterOption: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ElemCompaniesAddFilter: FC<Props> = ({
	open,
	onOpen,
	onClose,
	onSelectFilterOption,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	return (
		<div className="snap-start shrink-0">
			<button
				className="relative flex items-center font-bold text-sm text-primary-500 rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-white ring-inset ring-1 ring-primary-500 hover:text-white hover:bg-primary-500 focus:outline-none focus:ring-1"
				onClick={onOpen}
			>
				<IconPlus className="w-5 h-5 mr-1" />
				Add Filter
			</button>
			{open && (
				<div
					ref={wrapperRef}
					className="absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-[calc(100vw-50px)] max-w-sm lg:max-w-md p-5"
				>
					<div className="grid lg:grid-cols-2 lg:gap-8">
						<div>
							<CategoryFilterOption
								options={companiesFilterOptions.slice(0, 3)}
								onSelectFilterOption={onSelectFilterOption}
							/>
						</div>
						<div className="mt-6 lg:mt-0">
							<CategoryFilterOption
								options={companiesFilterOptions.slice(3)}
								onSelectFilterOption={onSelectFilterOption}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const CategoryFilterOption: FC<CategoryFilterOptionProps> = ({
	options,
	onSelectFilterOption,
}) => {
	const { user } = useUser();

	const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

	const userCanUseFilter = user?.entitlements.viewEmails
		? user?.entitlements.viewEmails
		: false;

	const onOpenUpgradeDialog = () => {
		setIsOpenUpgradeDialog(true);
	};
	const onCloseUpgradeDialog = () => {
		setIsOpenUpgradeDialog(false);
	};

	return (
		<>
			<div className="flex flex-col gap-y-6">
				{options.map((option) => (
					<div key={option.category}>
						<h3 className="font-bold text-sm">{option.category}</h3>

						<ul className="list-none space-y-1 text-slate-600 leading-snug">
							{option.items.map((item) => (
								<li key={item.value}>
									{item.value === "fundingType" ||
									item.value === "fundingAmount" ||
									item.value === "lastFundingDate" ||
									item.value === "fundingInvestors" ||
									item.value === "teamSize" ? (
										<button
											onClick={
												userCanUseFilter
													? onSelectFilterOption
													: onOpenUpgradeDialog
											}
											name={item.value}
											className="inline-flex place-items-center space-x-1 text-left box-border transition-all p-0  hover:text-primary-500"
										>
											{!userCanUseFilter && (
												<IconContributor className="w-5 h-5 text-primary-500 shrink-0" />
											)}
											<span className="border-b border-primary-500 hover:border-b-2">
												{item.label}
											</span>
										</button>
									) : (
										<button
											onClick={onSelectFilterOption}
											name={item.value}
											className="text-left box-border border-b border-primary-500 transition-all p-0 hover:border-b-2 hover:text-primary-500"
										>
											{item.label}
										</button>
									)}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<ElemUpgradeDialog
				isOpen={isOpenUpgradeDialog}
				onClose={onCloseUpgradeDialog}
			/>
		</>
	);
};
