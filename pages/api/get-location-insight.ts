import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment-timezone';
import { query } from '@/graphql/hasuraAdmin';
import CookieService from '@/utils/cookie';
import {
  Companies_Bool_Exp,
  Events_Bool_Exp,
  GetCompanyInsightByLocationDocument,
  GetCompanyInsightByLocationQuery,
  GetEventInsightByLocationDocument,
  GetEventInsightByLocationQuery,
  GetInvestmentInsightByLocationDocument,
  GetInvestmentInsightByLocationQuery,
  Investment_Rounds_Bool_Exp,
} from '@/graphql/types';
import { Segment } from '@/types/onboarding';
import { zodValidate } from '@/utils/validation';
import { getLocationInsightSchema } from '@/utils/schema';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const segment = req.query.segment as Segment;
    const locations = req.query.locations as string;

    const { errors } = zodValidate(
      { segment, locations },
      getLocationInsightSchema,
    );

    if (errors) {
      return res
        .status(400)
        .send({ error: errors['name']?.[0] || 'Invalid parameters' });
    }

    const filter: unknown =
      segment === 'Executive'
        ? {
            _and: [
              {
                round_date: {
                  _gte: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                },
              },
              {
                company: {
                  _or: [
                    ...locations.split('+').map(tag => ({
                      geopoint: {
                        _st_d_within: {
                          distance: 20 * 1609.344, // 20 miles to meters
                          from: tag,
                        },
                      },
                    })),
                  ],
                },
              },
            ],
          }
        : {
            _and: [
              {
                created_at: {
                  _gte: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                },
              },
              {
                _or: [
                  ...locations.split('+').map(tag => ({
                    geopoint: {
                      _st_d_within: {
                        distance: 20 * 1609.344, // 20 miles to meters
                        from: tag,
                      },
                    },
                  })),
                ],
              },
            ],
          };

    if (segment === 'Team Member' || segment === 'Event Organizer') {
      // Get last 7 days events in locations
      const last7days = await onGetEventInsight(filter as Events_Bool_Exp);
      const total = await onGetEventInsight();

      return res.status(200).send({ last7days, total });
    }

    if (segment === 'Executive') {
      const last7days = await onGetInvestmentInsight(
        filter as Investment_Rounds_Bool_Exp,
      );
      const total = await onGetInvestmentInsight();

      return res.status(200).send({ last7days, total });
    }

    // Get last 7 days companies in locations
    const last7days = await onGetCompanyInsight(filter as Companies_Bool_Exp);
    const total = await onGetCompanyInsight();

    return res.status(200).send({ last7days, total });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

async function onGetCompanyInsight(filter?: Companies_Bool_Exp) {
  const {
    data: { companies_aggregate },
  } = await query<GetCompanyInsightByLocationQuery>({
    query: GetCompanyInsightByLocationDocument,
    variables: {
      where: filter || {},
    },
  });

  return companies_aggregate.aggregate?.count;
}

async function onGetEventInsight(filter?: Events_Bool_Exp) {
  const {
    data: { events_aggregate },
  } = await query<GetEventInsightByLocationQuery>({
    query: GetEventInsightByLocationDocument,
    variables: {
      where: filter || {},
    },
  });

  return events_aggregate.aggregate?.count;
}

async function onGetInvestmentInsight(filter?: Investment_Rounds_Bool_Exp) {
  const {
    data: { investment_rounds_aggregate },
  } = await query<GetInvestmentInsightByLocationQuery>({
    query: GetInvestmentInsightByLocationDocument,
    variables: {
      where: filter || {},
    },
  });

  return investment_rounds_aggregate.aggregate?.count;
}

export default handler;
