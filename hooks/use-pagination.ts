import { useState } from 'react';

const usePagination = () => {
  const [page, setPage] = useState(0);

  const nextPage = () => setPage(page + 1);
  const previousPage = () => setPage(Math.max(0, page - 1));

  return {
    page,
    setPage,
    nextPage,
    previousPage,
  };
};

export default usePagination;
