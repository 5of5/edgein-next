import { MouseEvent, useState } from 'react';
import { FilterOptionKeys } from '@/models/Filter';
import { getDefaultFilter } from '@/utils/filter';
import useFilterParams from './use-filter-params';

const useDashboardFilter = () => {
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

  return {
    selectedFilters,
    onChangeSelectedFilters: setSelectedFilters,
    onSelectFilterOption,
  };
};

export default useDashboardFilter;
