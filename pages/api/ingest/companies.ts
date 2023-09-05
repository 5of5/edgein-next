import { mutate } from '@/graphql/hasuraAdmin';
import {
  InsertCompaniesDocument,
  InsertCompaniesMutation,
} from '@/graphql/types';
import { partnerLookUp } from '@/utils/submit-data';
import CookieService from '@/utils/cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { IngestCompaniesReqSchema } from '@/utils/schema';
import slugify from 'slugify';

export type IngestCompaniesReqBody = z.infer<typeof IngestCompaniesReqSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const parseResponse = IngestCompaniesReqSchema.safeParse(req.body);

  if (!parseResponse.success) {
    return res.status(400).json({
      error: parseResponse.error.errors,
      message: 'Invalid request body',
    });
  }

  const { apiKey, companies, enrichmentPriority } = parseResponse.data;

  if (!apiKey) {
    const token = CookieService.getAuthToken(req.cookies);
    const user = await CookieService.getUser(token);

    if (!user) {
      return res.status(401).json({
        message: 'Missing token and apiKey',
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

  const insertCompaniesData = companies.map(website => {
    try {
      const url =
        website.startsWith('http://') || website.startsWith('https://')
          ? website
          : `https://${website}`;

      const { hostname } = new URL(url);

      const slug = hostname.split('.').at(0);

      if (!slug) {
        throw Error('Error while parsing slug');
      }

      return {
        status: 'draft',
        website,
        slug: slugify(slug),
        enrichment_priority: enrichmentPriority,
      };
    } catch (error) {
      return res.status(400).json({
        error: error,
        message: `Invalid website url ${website}`,
      });
    }
  });

  try {
    const response = await mutate<InsertCompaniesMutation>({
      mutation: InsertCompaniesDocument,
      variables: {
        objects: insertCompaniesData,
      },
    });

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Error while inserting companies',
    });
  }
};

export default handler;
