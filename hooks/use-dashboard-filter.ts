import { MouseEvent, useState } from 'react';
import { FilterOptionKeys } from '@/models/Filter';
import { getDefaultFilter } from '@/utils/filter';
import useFilterParams from './use-filter-params';
import { Filters } from '@/models/Filter';

type Props = {
  resetPage?: () => void;
};

const useDashboardFilter = ({ resetPage }: Props) => {
  const { selectedFilters, setSelectedFilters } = useFilterParams();

  const onSelectFilterOption = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setSelectedFilters({
      ...selectedFilters,
      [name]: {
        ...getDefaultFilter(name as FilterOptionKeys),
        open: true,
      },
    });
  };

  const onChangeSelectedFilters = (filters: Filters | null) => {
    setSelectedFilters(filters);
    resetPage?.();
  };

  return {
    selectedFilters,
    onChangeSelectedFilters,
    onSelectFilterOption,
  };
};

export default useDashboardFilter;
