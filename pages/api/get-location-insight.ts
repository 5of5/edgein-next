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
  GetVcFirmInsightByLocationDocument,
  GetVcFirmInsightByLocationQuery,
  Vc_Firms_Bool_Exp,
} from '@/graphql/types';
import { Segment } from '@/types/onboarding';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const segment = req.query.segment as Segment;
    const locations = req.query.locations as string;

    const filter: unknown = {
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

    if (segment === 'Executive') {
      // Get last 7 days investors in locations
      const last7days = await onGetVcFirmInsight(filter as Vc_Firms_Bool_Exp);
      const total = await onGetVcFirmInsight();

      return res.status(200).send({ last7days, total });
    }

    if (segment === 'Team Member' || segment === 'Event Organizer') {
      // Get last 7 days events in locations
      const last7days = await onGetEventInsight(filter as Events_Bool_Exp);
      const total = await onGetEventInsight();

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

async function onGetVcFirmInsight(filter?: Vc_Firms_Bool_Exp) {
  const {
    data: { vc_firms_aggregate },
  } = await query<GetVcFirmInsightByLocationQuery>({
    query: GetVcFirmInsightByLocationDocument,
    variables: {
      where: filter || {},
    },
  });

  return vc_firms_aggregate.aggregate?.count;
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

export default handler;
