import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '../../utils/cookie';
import map from 'lodash/map';
import {
  updateResourceSentimentCount,
  upsertFollow,
  upsertList,
} from '@/utils/lists';
import { UpsertListMutation } from '@/graphql/types';
import { User } from '@/models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const sentimentType: string = req.body.sentiment;
  const companies: number[] = req.body.companies;
  const vcFirms: number[] = req.body.vcFirms;
  const people: number[] = req.body.people;

  // console.log('starting reaction for user', {token,user,companyId,sentimentType,pathname})
  // check if user has a list for sentiment
  const listname = `sentiment-${user.id}-${sentimentType}`;

  try {
    // upsertList
    const list = await upsertList(listname, user, token);

    const companyReactions = await upsertFollowToList(
      'companies',
      companies,
      list,
      user,
      token,
      sentimentType,
    );

    const vcFirmReactions = await upsertFollowToList(
      'vc_firms',
      vcFirms,
      list,
      user,
      token,
      sentimentType,
    );

    const peopleReactions = await upsertFollowToList(
      'people',
      people,
      list,
      user,
      token,
      sentimentType,
    );

    res.send({ companyReactions, vcFirmReactions, peopleReactions });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

const upsertFollowToList = async (
  resourceType: 'companies' | 'vc_firms' | 'people',
  resources: number[],
  list: UpsertListMutation['insert_lists_one'],
  user: User,
  token: string,
  sentimentType: string,
) => {
  const reactions = await Promise.all(
    map(resources, async resourceId => {
      // insert follow only if the follows don't exists
      const follow = await upsertFollow(
        list?.id || 0,
        resourceId,
        resourceType,
        user,
        token,
      );

      if (resourceType === 'companies' || resourceType === 'vc_firms') {
        const { sentiment } = await updateResourceSentimentCount(
          resourceType,
          resourceId,
          token,
          sentimentType,
          Boolean(follow),
          false,
        );
        return { resourceId, sentiment: { ...sentiment } };
      }

      return { resourceId };
    }),
  );

  return reactions;
};

export default handler;
