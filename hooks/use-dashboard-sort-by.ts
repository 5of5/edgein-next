import { Order_By } from '@/graphql/types';
import { Order_By_Option } from '@/types/common';
import { useMemo } from 'react';
import { useStateParams } from './use-state-params';

type DashboardSortByConfig = {
  defaultSortBy?: 'ascending' | 'descending' | 'newest' | 'oldest';
  ascendingSortKey?: string;
  descendingSortKey?: string;
  newestSortKey?: string;
  oldestSortKey?: string;
};

function useDashboardSortBy<T>(config?: DashboardSortByConfig) {
  const {
    defaultSortBy = 'ascending',
    ascendingSortKey = 'name',
    descendingSortKey = 'name',
    newestSortKey = 'updated_at',
    oldestSortKey = 'updated_at',
  } = config || {};

  const [orderByParam, setOrderByParam] = useStateParams<Order_By_Option>(
    defaultSortBy,
    'orderBy',
  );

  const sortChoices = useMemo(
    () => [
      {
        id: 0,
        label: 'Sort: Ascending',
        value: 'ascending',
        onClick: () => setOrderByParam('ascending'),
      },
      {
        id: 1,
        label: 'Sort: Descending',
        value: 'descending',
        onClick: () => setOrderByParam('descending'),
      },
      {
        id: 2,
        label: 'Sort: Newest First',
        value: 'newest',
        onClick: () => setOrderByParam('newest'),
      },
      {
        id: 3,
        label: 'Sort: Oldest First',
        value: 'oldest',
        onClick: () => setOrderByParam('oldest'),
      },
    ],
    [setOrderByParam],
  );

  const getOrderByQuery = () => {
    let orderBy = {};
    switch (orderByParam) {
      case 'descending':
        orderBy = { [descendingSortKey]: Order_By.Desc };
        break;

      case 'newest':
        orderBy = { [newestSortKey]: Order_By.Desc };
        break;

      case 'oldest':
        orderBy = { [oldestSortKey]: Order_By.Asc };
        break;

      default:
        orderBy = { [ascendingSortKey]: Order_By.Asc };
    }

    return orderBy as T;
  };

  const orderByQuery = getOrderByQuery();

  return { sortChoices, orderByParam, orderByQuery };
}

export default useDashboardSortBy;
