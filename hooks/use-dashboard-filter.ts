import { MouseEvent, useState } from 'react';
import { FilterOptionKeys } from '@/models/Filter';
import { getDefaultFilter } from '@/utils/filter';
import useFilterParams from './use-filter-params';

const useDashboardFilter = () => {
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const { selectedFilters, setSelectedFilters } = useFilterParams();

  const onOpenFilters = () => {
    setIsOpenFilters(true);
  };
  const onCloseFilters = () => {
    setIsOpenFilters(false);
  };

  const onSelectFilterOption = (event: MouseEvent<HTMLButtonElement>) => {
    onCloseFilters();
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
    isOpenFilters,
    selectedFilters,
    onOpenFilters,
    onCloseFilters,
    onChangeSelectedFilters: setSelectedFilters,
    onSelectFilterOption,
  };
};

export default useDashboardFilter;
