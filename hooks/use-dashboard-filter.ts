import { MouseEvent } from 'react';
import { DateCondition, FilterOptionKeys } from '@/models/Filter';
import { getDefaultFilter } from '@/components/filters/processor';
import useFilterParams from './use-filter-params';
import { Filters } from '@/models/Filter';

type Props = {
  dateCondition?: DateCondition;
  resetPage?: () => void;
};

const useDashboardFilter = ({ dateCondition = 'past', resetPage }: Props) => {
  const { selectedFilters, setSelectedFilters } = useFilterParams();

  const onSelectFilterOption = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    setSelectedFilters({
      ...selectedFilters,
      [name]: {
        ...getDefaultFilter(name as FilterOptionKeys, dateCondition),
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
