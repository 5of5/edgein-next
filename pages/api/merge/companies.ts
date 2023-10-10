import { mutate, query } from '@/graphql/hasuraAdmin';
import { partnerLookUp } from '@/utils/submit-data';
import CookieService from '@/utils/cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { MergeCompaniesReqSchema } from '@/utils/schema';
import {
  GetFullCompanyByIdDocument,
  GetFullCompanyByIdQuery,
  UpdateCompanyByPkDocument,
  UpdateCompanyByPkMutation,
} from '@/graphql/types';
import { defaults, get, isNil, pickBy, toPairs } from 'lodash';
import async from 'async';

export type MergeCompaniesReqBody = z.infer<typeof MergeCompaniesReqSchema>;

type UpdateMutationReturnType<T extends EntityName> = {
  data: {
    [key in `update_${T}`]: {
      affected_rows: number;
    };
  };
};

type EntityName = keyof typeof SIMPLE_RELATIONS | 'resource_links';

// Updates company_id by a dynamically created mutation
const BASIC_UPDATE_ID_MUTATION = (
  entityName: EntityName,
  oldId: string,
  newId: string,
) =>
  mutate<UpdateMutationReturnType<typeof entityName>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_${entityName}(
          where: {
            company_id: { _eq: $oldId }
          },
          _set: {
            company_id: $newId
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });

const ADVANCED_UPDATE_ID_MUTATION = (
  entityName: EntityName,
  oldId: string,
  newId: string,
  resourceTypeFieldName = 'resource',
  resourceIdFieldName = 'resource_id',
) =>
  mutate<UpdateMutationReturnType<typeof entityName>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_${entityName}(
          where: {
            _and: {
              ${resourceIdFieldName}: { _eq: $oldId }
              ${resourceTypeFieldName}: { _eq: "companies" }
            }
          },
          _set: {
            ${resourceIdFieldName}: $newId
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });

const RESOURCE_LINKS_UPDATE_ID_MUTATION = (
  direction: 'from' | 'to',
  oldId: string,
  newId: string,
) =>
  mutate<UpdateMutationReturnType<'resource_links'>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_resource_links(
          where: {
            ${direction}_company_id: { _eq: $oldId }
          },
          _set: {
            ${direction}_company_id: $newId
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });

const SIMPLE_RELATIONS = {
  // company_id
  coins: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('coins', oldId, newId),
  // company_id
  event_organization: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('event_organization', oldId, newId),
  // company_id
  investment_rounds: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('investment_rounds', oldId, newId),
  // company_id
  news_organizations: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('news_organizations', oldId, newId),
  // company_id
  team_members: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('team_members', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  actions: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('actions', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  data_discard: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('data_discard', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  data_raw: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('data_raw', oldId, newId),
  // resource_type == companies
  // rescource_id == company_id
  follows: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('follows', oldId, newId, 'resource_type'),
  // resource_type == companies
  // rescource_id == company_id
  notes: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('notes', oldId, newId, 'resource_type'),
  // notification_resource_type == companies
  // company_id == company_id
  notifications: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION(
      'notifications',
      oldId,
      newId,
      'notification_resource_type',
      'company_id',
    ),
  // resource == companies
  // rescource_id == company_id
  resource_edit_access: async (oldId: string, newId: string) => {
    const result = await query({
      query: `
        query check_resource_edit_access($id: Int!) {
          resource_edit_access(
            where: {
              _and: {
                resource_id: { _eq: $id }
                resource_type: { _eq: "companies" }
              }
            },
          ) {
            id
          }
        }
      `,
      variables: {
        id: newId,
      },
    });

    if (result.data.resource_edit_access) {
      return undefined;
    }

    return ADVANCED_UPDATE_ID_MUTATION(
      'resource_edit_access',
      oldId,
      newId,
      'resource_type',
    );
  },
} as const;

const COMPLICATED_RELATIONS = {
  // from_company_id == company_id
  resource_links_from: (oldId: string, newId: string) =>
    RESOURCE_LINKS_UPDATE_ID_MUTATION('from', oldId, newId),
  // to_company_id == company_id
  resource_links_to: (oldId: string, newId: string) =>
    RESOURCE_LINKS_UPDATE_ID_MUTATION('to', oldId, newId),
} as const;

const RELATION_MUTATIONS = { ...SIMPLE_RELATIONS, ...COMPLICATED_RELATIONS };

// Removes all null or undefined fields
// also removes all RELATION_FIELDS
const cleanObject = (obj: any) => pickBy(obj, value => !isNil(value));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const parseResponse = MergeCompaniesReqSchema.safeParse(req.body);

  if (!parseResponse.success) {
    return res.status(400).json({
      error: parseResponse.error.errors,
      message: 'Invalid request body',
    });
  }

  const { apiKey, targetCompanyId, mergedCompanyId } = parseResponse.data;

  if (!apiKey) {
    const token = CookieService.getAuthToken(req.cookies);
    const user = await CookieService.getUser(token);

    if (!user) {
      return res.status(401).json({
        message: 'Missing user token and apiKey',
      });
    }
  } else {
    const partner = await partnerLookUp(apiKey);

    if (!partner) {
      return res.status(401).json({
        message: 'Invalid api key',
      });
    }
  }

  const { data: targetCompanyData } = await query<GetFullCompanyByIdQuery>({
    query: GetFullCompanyByIdDocument,
    variables: {
      id: targetCompanyId,
    },
  });

  const targetCompany = targetCompanyData.companies[0] ?? {};

  if (!targetCompany) {
    return res.status(404).json({
      message: `Could not find a company with id '${targetCompanyId}'`,
    });
  }

  const { data: mergedCompanyData } = await query<GetFullCompanyByIdQuery>({
    query: GetFullCompanyByIdDocument,
    variables: {
      id: mergedCompanyId,
    },
  });

  const mergedCompany = mergedCompanyData.companies[0] ?? {};

  if (!mergedCompany) {
    return res.status(404).json({
      message: `Could not find a company with id '${mergedCompanyId}'`,
    });
  }

  const resultCompany = defaults(
    cleanObject(targetCompany),
    cleanObject(mergedCompany),
  );

  // Update mergedCompany's slug
  try {
    await mutate<UpdateCompanyByPkMutation>({
      mutation: UpdateCompanyByPkDocument,
      variables: {
        companyId: mergedCompanyId,
        data: {
          slug: `${mergedCompany.slug}-merged`,
          status: 'merged',
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while updating mergedCompany's slug",
      error,
    });
  }

  // Update targetCompany
  try {
    await mutate<UpdateCompanyByPkMutation>({
      mutation: UpdateCompanyByPkDocument,
      variables: {
        companyId: targetCompanyId,
        data: resultCompany,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error occurred while updating targetCompany',
      error,
    });
  }

  const updatedRelations = await async.reduce(
    toPairs(RELATION_MUTATIONS),
    {},
    async (acc, [key, updateFn]) => {
      try {
        const result = await updateFn(mergedCompanyId, targetCompanyId);

        if (result) {
          // Custom relation which needs this ugly conditioning
          if (key === 'resource_links_to') {
            return {
              ...acc,
              resource_links_to: get(result.data, 'update_resource_links'),
            };
          }

          // Custom relation which needs this ugly conditioning
          if (key === 'resource_links_from') {
            return {
              ...acc,
              resource_links_from: get(result.data, 'update_resource_links'),
            };
          }

          return {
            ...acc,
            [key]: get(result.data, `update_${key}`),
          };
        }

        return acc;
      } catch (error) {
        return {
          ...acc,
          errors: error,
        };
      }
    },
  );

  return res.json({ ...resultCompany, updatedRelations });
};

export default handler;
