import { Follows_Companies, Follows_Vc_Firms, Lists } from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { find, has } from 'lodash';
import { getNameFromListName } from './lists';

type ReactionType = SentimentReactionType | ListReactionType;

type SentimentReactionType = {
  resourceId: number;
  resourceType: 'companies' | 'vc_firms' | 'people';
  sentiment: 'hot' | 'like' | 'crap';
  listName?: undefined;
  pathname: string;
};

type ListReactionType = {
  resourceId: number;
  resourceType: 'companies' | 'vc_firms' | 'people';
  sentiment?: undefined;
  listName: string;
  pathname: string;
};

export const toggleFollowOnList = async ({
  resourceId,
  resourceType,
  listName,
  sentiment,
  pathname,
}: ReactionType) => {
  const resp = await fetch('/api/reaction/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resourceId,
      resourceType,
      listName,
      sentiment,
      pathname,
    }),
  });
  return resp.json();
};

export const getNewFollows = (sentiment: string, type = 'company') => {
  const follows =
    type === 'company' ? ({} as Follows_Companies) : ({} as Follows_Vc_Firms);
  follows.list = {} as Lists;
  follows.list.name = `sentiment-${sentiment}`;

  return follows;
};

export const getUserIdFromListCreator = (list: DeepPartial<Lists>) => {
  if (!list) return '';
  const listCreatorId = list?.created_by_id;
  return listCreatorId;
};

export const isOnList = (
  list: DeepPartial<Lists> | undefined,
  resourceId: number,
) => {
  const companyIsOnList = find(
    list?.follows_companies,
    follow => follow?.resource_id === resourceId,
  );
  const investorIsOnList = find(
    list?.follows_vcfirms,
    follow => follow?.resource_id === resourceId,
  );
  const personIsOnList = find(
    list?.follows_people,
    follow => follow?.resource_id === resourceId,
  );

  return companyIsOnList || investorIsOnList || personIsOnList ? true : false;
};

export const isFollowsExists = (
  follows: Follows_Companies[] | Follows_Vc_Firms[],
  sentiment: string,
) => {
  return find(
    follows,
    (follow: Follows_Companies | Follows_Vc_Firms) =>
      getNameFromListName(follow?.list!) === sentiment, // eslint-disable-line
  );
};

export const getNewTempSentiment = (
  sentiments: Array<number>,
  sentiment: number,
  alreadyReacted: boolean,
) => {
  const newSentiment = { ...sentiments };

  const hasSentiment = has(newSentiment, sentiment);

  if (!hasSentiment && !alreadyReacted) newSentiment[sentiment] = 1;
  else if (hasSentiment && !alreadyReacted) newSentiment[sentiment] += 1;
  else if (hasSentiment && alreadyReacted)
    newSentiment[sentiment] > 0
      ? (newSentiment[sentiment] -= 1)
      : (newSentiment[sentiment] = 0);

  return newSentiment;
};
