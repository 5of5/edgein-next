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
import { COMPLICATED_RELATIONS, SIMPLE_RELATIONS } from '@/utils/merge/companies';

export type MergeCompaniesReqBody = z.infer<typeof MergeCompaniesReqSchema>;

const RELATION_MUTATIONS = { ...SIMPLE_RELATIONS, ...COMPLICATED_RELATIONS };

// Removes all null or undefined fields
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
