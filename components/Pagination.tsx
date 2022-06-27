import { PropsWithChildren } from "react";
import { ElemButton } from "./ElemButton";

type Props = {
	className?: string;
	page: number;
	rowsPerPage: number;
	count: number;
	onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<PropsWithChildren<Props>> = ({
	className,
	page,
	rowsPerPage,
	count,
	onPageChange,
}) => {
	return (
		<nav
			className={`${className} py-3 flex items-center justify-between`}
			aria-label="Pagination"
		>
			<div className="hidden sm:block">
				<p className="">
					Showing <span className="font-medium">{page * rowsPerPage}</span> to{" "}
					<span className="font-medium">{(page + 1) * rowsPerPage}</span> of{" "}
					<span className="font-medium">{count}</span> results
				</p>
			</div>
			<div className="flex-1 flex justify-between sm:justify-end">
				{page * rowsPerPage > 0 && (
					<ElemButton
						onClick={() => onPageChange((prev) => prev - 1)}
						arrowLeft
					>
						Prev
					</ElemButton>
				)}
				<ElemButton
					onClick={() => onPageChange((prev) => prev + 1)}
					className="ml-3"
					arrow
				>
					Next
				</ElemButton>
			</div>
		</nav>
	);
};
