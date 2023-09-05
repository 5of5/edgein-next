import { mutate } from '@/graphql/hasuraAdmin';
import { partnerLookUp } from '@/utils/submit-data';
import CookieService from '@/utils/cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { InsertPeopleDocument, InsertPeopleMutation } from '@/graphql/types';
import { IngestPeopleReqSchema } from '@/utils/schema';
import slugify from 'slugify';

export type IngestPeopleReqBody = z.infer<typeof IngestPeopleReqSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const parseResponse = IngestPeopleReqSchema.safeParse(req.body);

  if (!parseResponse.success) {
    return res.status(400).json({
      error: parseResponse.error.errors,
      message: 'Invalid request body',
    });
  }

  const { apiKey, people, enrichmentPriority } = parseResponse.data;

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

  const insertPeopleData = people.map(linkedInUrl => {
    try {
      const { pathname } = new URL(linkedInUrl);

      const slug = pathname.split('/').at(2);

      if (!slug) {
        throw Error('Error while parsing slug');
      }

      return {
        status: 'draft',
        linkedin: linkedInUrl,
        slug: slugify(slug),
        enrichment_priority: enrichmentPriority,
      };
    } catch (error) {
      return res.status(400).json({
        error: error,
        message: `Invalid linkedIn url ${linkedInUrl}`,
      });
    }
  });

  try {
    const response = await mutate<InsertPeopleMutation>({
      mutation: InsertPeopleDocument,
      variables: {
        objects: insertPeopleData,
      },
    });

    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Error while inserting people',
    });
  }
};

export default handler;
