import { PropsWithChildren } from "react";
import { ElemButton } from "./ElemButton";

type Props = {
	className?: string;
	page: number;
	rowsPerPage: number;
	count: number;
	onClickPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onClickNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Pagination: React.FC<PropsWithChildren<Props>> = ({
	className,
	page,
	rowsPerPage,
	count,
	onClickPrev,
	onClickNext,
}) => {
	return (
		<nav
			className={`${className} py-3 flex items-center justify-between`}
			aria-label="Pagination"
		>
			<div className="hidden sm:block">
				Results: {page === 0 ? 1 : page * rowsPerPage}
				{" - "}
				{(page + 1) * rowsPerPage} of {count}
			</div>
			<div className="flex-1 flex justify-between sm:justify-end">
				{page * rowsPerPage > 0 && (
					<ElemButton onClick={onClickPrev} btn="white" arrowLeft>
						Prev
					</ElemButton>
				)}
				<ElemButton onClick={onClickNext} className="sm:ml-3" btn="white" arrow>
					Next
				</ElemButton>
			</div>
		</nav>
	);
};
