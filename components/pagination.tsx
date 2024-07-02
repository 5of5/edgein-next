import { PropsWithChildren } from 'react';
import { ElemButton } from '@/components/elem-button';
import { numberWithCommas } from '@/utils';

type Props = {
  className?: string;
  page: number;
  itemsPerPage: number;
  shownItems?: number;
  totalItems: number;
  numeric?: boolean;
  onChangePageSize?: React.ChangeEventHandler<HTMLSelectElement>;
  onClickPrev?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickNext?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickToPage?: (selectedPage: number) => void;
};

export const Pagination: React.FC<PropsWithChildren<Props>> = ({
  className = '',
  page,
  itemsPerPage,
  shownItems = 0,
  totalItems,
  numeric,
  onChangePageSize,
  onClickPrev,
  onClickNext,
  onClickToPage,
}) => {
  const shownItemsStart = page === 0 ? 1 : page * itemsPerPage;
  const shownItemsEnd =
    shownItems < itemsPerPage ? totalItems : (page + 1) * itemsPerPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageSizes = [10, 20, 30, 40, 50].map(item => {
    return totalItems >= item - 9 && item;
  });

  const firstPageSize = pageSizes[0] ? pageSizes[0] : 0;
  const showItemsPerPageSelector = totalItems < firstPageSize ? false : true;

  const handleClickToPage = (selectedPage: number) => {
    if (onClickToPage) {
      onClickToPage(selectedPage);
    }
  };

  return (
    <nav
      className={`flex flex-col items-center justify-between py-3 space-y-3 md:flex-row md:space-y-0 ${className}`}
      aria-label="Pagination">
      <div className="flex flex-wrap items-center space-x-6">
        <div className="flex-1 text-sm text-gray-500">
          {shownItems === 0 ? (
            <></>
          ) : shownItems == totalItems ? (
            <span>
              Showing {shownItemsStart}
              {'–'}
              {shownItemsEnd} of {totalItems} results
            </span>
          ) : (
            <span>
              Showing {numberWithCommas(shownItemsStart)}
              {'–'}
              {numberWithCommas(shownItemsEnd)} of{' '}
              {numberWithCommas(totalItems)} results
            </span>
          )}
        </div>

        {showItemsPerPageSelector && onChangePageSize && (
          <select
            value={itemsPerPage}
            onChange={onChangePageSize}
            className="inline-flex justify-center text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 active:border-primary-500 focus:ring-0 pl-2.5 pr-8 py-1.5">
            {pageSizes.map(itemsPerPage => {
              if (itemsPerPage) {
                return (
                  <option key={itemsPerPage} value={itemsPerPage}>
                    Show {itemsPerPage}
                  </option>
                );
              }
            })}
          </select>
        )}
      </div>

      <div className="flex items-center justify-between flex-1 space-x-2 sm:justify-end">
        <ElemButton
          onClick={onClickPrev}
          btn="default"
          disabled={page * itemsPerPage <= 0 ? true : false}>
          Previous
        </ElemButton>

        {numeric && (
          <ul className="flex mx-1 sm:mx-2">
            {page > 1 && (
              <>
                <li
                  className="hidden cursor-pointer font-bold px-3 py-1.5 text-slate-400 hover:text-primary-500 sm:block"
                  onClick={() => handleClickToPage(0)}>
                  1
                </li>
                <li className="hidden font-bold px-3 py-1.5 text-slate-400 sm:block">
                  ...
                </li>
              </>
            )}

            {page > 0 && (
              <li
                className="cursor-pointer font-bold px-3 py-1.5 text-slate-400 hover:text-primary-500"
                onClick={() => handleClickToPage(page - 1)}>
                {page}
              </li>
            )}

            <li className="cursor-pointer font-bold px-3 py-1.5 text-primary-500">
              {page + 1}
            </li>

            {totalItems > shownItemsEnd && (
              <li
                className="cursor-pointer font-bold px-3 py-1.5 text-slate-400 hover:text-primary-500"
                onClick={() => handleClickToPage(page + 1)}>
                {page + 2}
              </li>
            )}

            {page < totalPages - 2 && (
              <>
                <li className="hidden font-bold px-3 py-1.5 text-slate-400 sm:block">
                  ...
                </li>
                <li
                  className="hidden cursor-pointer font-bold px-3 py-1.5 text-slate-400 hover:text-primary-500 sm:block"
                  onClick={() => handleClickToPage(totalPages - 1)}>
                  {totalPages}
                </li>
              </>
            )}
          </ul>
        )}

        <ElemButton
          onClick={onClickNext}
          className={numeric ? '' : 'sm:ml-3'}
          btn="default"
          disabled={totalItems <= shownItemsEnd ? true : false}>
          Next
        </ElemButton>
      </div>
    </nav>
  );
};
