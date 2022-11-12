import { PropsWithChildren } from "react";
import { ElemButton } from "@/components/ElemButton";
import { numberWithCommas } from "@/utils";

type Props = {
	className?: string;
	page: number;
	itemsPerPage: number;
	shownItems?: number;
	totalItems: number;
	onClickPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onClickNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Pagination: React.FC<PropsWithChildren<Props>> = ({
	className,
	page,
	itemsPerPage,
	shownItems = 0,
	totalItems,
	onClickPrev,
	onClickNext,
}) => {
	const shownItemsStart = page === 0 ? 1 : page * itemsPerPage;
	const shownItemsEnd =
		shownItems < itemsPerPage ? totalItems : (page + 1) * itemsPerPage;

	const hide = totalItems < itemsPerPage ? true : false;

	if (hide) {
		return <></>;
	}

	return (
		<nav
			className={`${className} py-3 space-y-3 md:space-y-0 md:flex items-center justify-between`}
			aria-label="Pagination"
		>
			<div className="flex-1">
				{shownItems === 0 ? (
					<></>
				) : shownItems == totalItems ? (
					<span>
						Results: {shownItemsStart}
						{" - "} {shownItemsEnd} of {totalItems}
					</span>
				) : (
					<span>
						Results: {shownItemsStart}
						{" - "}
						{shownItemsEnd} of {numberWithCommas(totalItems)}
					</span>
				)}
			</div>
			<div className="flex-1 flex justify-between sm:justify-end">
				{page * itemsPerPage > 0 && (
					<ElemButton onClick={onClickPrev} btn="white" arrowLeft>
						Prev
					</ElemButton>
				)}

				{totalItems > shownItemsEnd && (
					<ElemButton
						onClick={onClickNext}
						className="sm:ml-3"
						btn="white"
						arrow
					>
						Next
					</ElemButton>
				)}
			</div>
		</nav>
	);
};
