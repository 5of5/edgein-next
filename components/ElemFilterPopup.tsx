import React, { FC, PropsWithChildren, useEffect, useRef } from "react";
import { ElemButton } from "./ElemButton";
import { FilterOptionKeys } from "./ElemFilter";

type Props = {
	open: boolean;
	name: FilterOptionKeys;
	title: string;
	onOpen: (name: FilterOptionKeys) => void;
	onClose: (name: FilterOptionKeys) => void;
	onClear: (name: FilterOptionKeys) => void;
	onApply: (name: FilterOptionKeys) => void;
	popupClass?: string;
};

export const ElemFilterPopup: FC<PropsWithChildren<Props>> = ({
	open,
	name,
	title,
	onOpen,
	onClose,
	onClear,
	onApply,
	children,
	popupClass,
}) => {
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
			onCloseFilterOption();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	const onOpenFilterOption = () => {
		onOpen(name);
	};

	const onCloseFilterOption = () => {
		onClose(name);
	};

	const onClearFilterOption = () => {
		onClear(name);
	};

	const onApplyFilter = () => {
		onApply(name);
	};

	return (
		<div className="snap-start shrink-0">
			<div
				className="relative flex items-center font-bold text-sm rounded-md px-2 py-1.5 transition ease-in-out duration-150 group bg-slate-200 cursor-pointer ring-inset ring-1 ring-slate-100 hover:bg-slate-300 focus:outline-none focus:ring-1"
				onClick={onOpenFilterOption}
			>
				{title}
			</div>
			{open && (
				<div
					ref={wrapperRef}
					className={`absolute z-10 bg-white shadow-lg border border-black/5 rounded-lg w-[calc(100vw-50px)] max-w-sm p-5 ${popupClass}`}
				>
					{children}
					<div className="flex items-center justify-between gap-x-4 mt-2 pt-2 border-t border-black/5">
						<ElemButton btn="primary" size="sm" onClick={onApplyFilter}>
							Apply
						</ElemButton>
						<button
							onClick={onClearFilterOption}
							name={name}
							className="text-primary-500"
						>
							Clear filter
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
