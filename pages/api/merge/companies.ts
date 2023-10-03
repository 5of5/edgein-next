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
import { defaults, isNil, omit, pickBy } from 'lodash';

export type MergeCompaniesReqBody = z.infer<typeof MergeCompaniesReqSchema>;

const RELATION_FIELDS = [
  'follows',
  'from_links',
  'to_links',
  'investment_rounds',
  'news_links',
  'teamMembers',
];

// Removes all null or undefined fields
// also removes all RELATION_FIELDS
const cleanObject = (obj: any) =>
  omit(
    pickBy(obj, value => !isNil(value)),
    RELATION_FIELDS,
  );

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

  const resultCompany = defaults(cleanObject(targetCompany), cleanObject(mergedCompany))

  // Update mergedCompany's slug
  await mutate<UpdateCompanyByPkMutation>({
    mutation: UpdateCompanyByPkDocument,
    variables: {
      companyId: mergedCompanyId,
      data: {
        slug: `${mergedCompany.slug}-old`,
        status: 'merged',
      },
    },
  });

  // Update targetCompany
  await mutate<UpdateCompanyByPkMutation>({
    mutation: UpdateCompanyByPkDocument,
    variables: {
      companyId: targetCompanyId,
      data: resultCompany,
    },
  });

  return res.json(resultCompany);
};

export default handler;
