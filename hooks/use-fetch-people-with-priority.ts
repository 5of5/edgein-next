import { useState, useEffect } from 'react';
import {
  GetPeopleQuery,
  List_Members_Bool_Exp,
  Order_By,
  People_Bool_Exp,
  People_Order_By,
  useGetPeopleQuery,
} from '@/graphql/types';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { filter } from 'lodash';

type props = {
  prioritizedPersonId?: number;
  offset: number;
  limit: number;
  filters: DeepPartial<People_Bool_Exp>;
  selectedTab: DashboardCategory | null;
  initialLoad: boolean;
};

export const useFetchPeopleWithPriority = ({
  prioritizedPersonId,
  offset,
  limit,
  filters,
  selectedTab,
  initialLoad,
}: props) => {
  const [peopleData, setPeople] = useState<GetPeopleQuery['people']>([]);
  const [peopleDataCount, setPeopleDataCount] = useState(0);

  const shouldFetchPrioritizedPerson = !!prioritizedPersonId && offset === 0;

  const {
    data: prioritizedPersonData,
    isLoading: isLoadingPrioritized,
    error: errorPrioritized,
  } = useGetPeopleQuery(
    {
      offset: 0,
      limit: 1,
      where: {
        _and: [
          {
            id: {
              _eq: prioritizedPersonId,
            },
          },
        ],
      } as People_Bool_Exp,
      orderBy: { created_at: Order_By.Desc } as People_Order_By,
    },
    { enabled: shouldFetchPrioritizedPerson, refetchOnWindowFocus: false },
  );

  const effectiveFilters = shouldFetchPrioritizedPerson
    ? {
        ...filters,
        _and: [...(filters._and || []), { id: { _neq: prioritizedPersonId } }],
      }
    : filters;

  const adjustedLimit = shouldFetchPrioritizedPerson ? limit - 1 : limit;

  const {
    data: priorityPerson,
    isLoading: isLoadingPeople,
    error: errorPeople,
  } = useGetPeopleQuery(
    {
      offset: offset,
      limit: adjustedLimit,
      where: effectiveFilters as People_Bool_Exp,
      orderBy: [
        selectedTab?.value === 'new'
          ? ({ created_at: Order_By.Desc } as People_Order_By)
          : ({ updated_at: Order_By.DescNullsLast } as People_Order_By),
      ],
    },
    {
      refetchOnWindowFocus: false,
      enabled:
        (shouldFetchPrioritizedPerson &&
          !initialLoad &&
          !!prioritizedPersonData) ||
        (!shouldFetchPrioritizedPerson && !initialLoad),
    },
  );

  useEffect(() => {
    if (priorityPerson) {
      let combinedPeople = priorityPerson.people;
      let totalPeopleCount =
        priorityPerson.people_aggregate.aggregate?.count || 0;

      if (
        shouldFetchPrioritizedPerson &&
        prioritizedPersonData?.people?.length
      ) {
        combinedPeople = [...prioritizedPersonData.people, ...combinedPeople];
        totalPeopleCount += 1;
      }

      setPeople(combinedPeople);
      setPeopleDataCount(totalPeopleCount);
    }
  }, [
    prioritizedPersonData,
    priorityPerson,
    prioritizedPersonId,
    shouldFetchPrioritizedPerson,
  ]);

  return {
    peopleData,
    peopleDataCount,
    isLoading: isLoadingPrioritized || isLoadingPeople,
    error: errorPrioritized || errorPeople,
  };
};
