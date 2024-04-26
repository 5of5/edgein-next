import {
  Order_By,
  People_Bool_Exp,
  People_Order_By,
  useGetPeopleByIdQuery,
  useGetPeopleQuery,
} from '@/graphql/types';
import { DashboardCategory, DeepPartial } from '@/types/common';

type props = {
  prioritizedPersonId?: number;
  offset: number;
  limit: number;
  filters: DeepPartial<People_Bool_Exp>;
  selectedTab: DashboardCategory | null;
  enabled: boolean;
};

export const useFetchPeopleWithPriority = ({
  prioritizedPersonId,
  offset,
  limit,
  filters,
  selectedTab,
  enabled,
}: props) => {
  const shouldFetchPrioritizedPerson = !!prioritizedPersonId && offset === 0;

  const {
    data: prioritizedPersonData,
    isLoading: isLoadingPrioritized,
    error: errorPrioritized,
  } = useGetPeopleByIdQuery(
    {
      id: prioritizedPersonId!,
    },
    {
      enabled: enabled && shouldFetchPrioritizedPerson,
      refetchOnWindowFocus: false,
    },
  );

  const effectiveFilters = prioritizedPersonData?.people[0]
    ? {
        ...filters,
        _and: [...(filters._and || []), { id: { _neq: prioritizedPersonId } }],
      }
    : filters;

  const adjustedLimit = prioritizedPersonData?.people[0] ? limit - 1 : limit;

  const {
    data: people,
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
      enabled,
    },
  );

  const peopleData = [];
  let peopleDataCount = 0;

  if (shouldFetchPrioritizedPerson && prioritizedPersonData?.people?.length) {
    peopleData.push(...prioritizedPersonData.people);
    peopleDataCount += 1;
  }

  if (people?.people.length) {
    peopleData.push(...people.people);
    peopleDataCount += people.people_aggregate.aggregate?.count || 0;
  }

  return {
    peopleData,
    peopleDataCount,
    isLoading: isLoadingPrioritized || isLoadingPeople,
    error: errorPrioritized || errorPeople,
  };
};
