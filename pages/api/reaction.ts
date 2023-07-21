import { mutate } from '@/graphql/hasuraAdmin';
import {
  InsertActionDocument,
  InsertActionMutation,
  Lists,
} from '@/graphql/types';
import {
  deleteFollowIfExists,
  updateResourceSentimentCount,
  upsertFollow,
  upsertList,
} from '@/utils/lists';
import { listSchema } from '@/utils/schema';
import { isFullList, zodValidate } from '@/utils/validation';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

interface Action {
  action: string;
  page: string;
  properties: {
    listId: number;
    sentiment?: string;
  };
  resource_id: number;
  resource: string;
  user: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  // params:
  const resourceId: number = req.body.resourceId;
  const resourceType: string = req.body.resourceType;
  const sentimentType: string = req.body.sentiment;
  const pathname: string = req.body.pathname;

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const { errors } = zodValidate(
    { ...req.body, name: req.body.listName },
    listSchema,
  );
  if (errors) {
    return res
      .status(400)
      .send({ error: errors['name']?.[0] || 'Invalid parameters' });
  }

  const listName: string = sentimentType
    ? `sentiment-${user.id}-${sentimentType}`
    : req.body.listName;

  if (!['companies', 'vc_firms', 'people'].includes(resourceType)) {
    return res
      .status(400)
      .send({ error: `Invalid resource type ${resourceType}` });
  }

  // console.log('starting reaction for user', {token,user,companyId,sentimentType,pathname})
  // check if user has a list for sentiment
  // upsertList
  const list = await upsertList(listName, user, token);

  if (isFullList(list as Lists)) {
    return res.status(400).send({ error: 'List is full' });
  }

  // This is to toggle
  // check if user already follows
  const existsFollows = await deleteFollowIfExists(
    list?.id || 0,
    resourceId,
    resourceType,
    user,
    token,
  );

  // insert follow only if the follows don't exists
  const follow =
    !existsFollows &&
    (await upsertFollow(list?.id || 0, resourceId, resourceType, user, token));

  let sentimentReturn: any;
  if (
    sentimentType &&
    (resourceType === 'companies' || resourceType === 'vc_firms')
  ) {
    const { sentiment } = await updateResourceSentimentCount(
      resourceType,
      resourceId,
      token,
      sentimentType,
      Boolean(follow),
      Boolean(existsFollows),
    );
    sentimentReturn = sentiment;
  }
  const action: Action = {
    action: `${existsFollows ? 'Remove' : 'Add'} ${
      sentimentType ? 'Sentiment' : `${existsFollows ? 'From' : 'To'} List`
    }`,
    page: pathname,
    properties: {
      listId: list?.id || 0,
    },
    resource_id: resourceId,
    resource: resourceType,
    user: user.id,
  };
  if (sentimentType) {
    action.properties.sentiment = sentimentType;
  }

  // create action
  await mutate<InsertActionMutation>({
    mutation: InsertActionDocument,
    variables: {
      object: action,
    },
  });

  return res.send({ ...sentimentReturn, ...list });
};

export default handler;
