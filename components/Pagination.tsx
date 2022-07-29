import { PropsWithChildren } from "react";
import { ElemButton } from "./ElemButton";

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
		shownItems < itemsPerPage ? shownItems : (page + 1) * itemsPerPage;

	return (
		<nav
			className={`${className} py-3 flex items-center justify-between`}
			aria-label="Pagination"
		>
			<div className="hidden sm:block">
				{shownItems === 0 ? (
					<></>
				) : shownItems < itemsPerPage ? (
					<span>
						Results: {shownItemsEnd} of {totalItems}
					</span>
				) : (
					<span>
						Results: {shownItemsStart}
						{" - "}
						{shownItemsEnd} of {totalItems}
					</span>
				)}
			</div>
			<div className="flex-1 flex justify-between sm:justify-end">
				{page * itemsPerPage > 0 && (
					<ElemButton onClick={onClickPrev} btn="white" arrowLeft>
						Prev
					</ElemButton>
				)}

				{shownItemsEnd >= itemsPerPage && (
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
