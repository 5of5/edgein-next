import { PropsWithChildren } from "react";
import { ElemButton } from "./ElemButton";

type Props = {
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>
};

export const Pagination: React.FC<PropsWithChildren<Props>> = ({
  page,
  rowsPerPage,
  count,
  onPageChange
}) => {
	return (
		<section className="relative">
      <ElemButton onClick={() => onPageChange(prev => prev - 1)}>Prev</ElemButton>
      {page * rowsPerPage} - {(page + 1) * rowsPerPage} / { count }
      <ElemButton onClick={() => onPageChange(prev => prev + 1)}>Next</ElemButton>
		</section>
	);
};
