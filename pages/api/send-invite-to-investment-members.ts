import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '@/utils/cookie';
import { query, mutate } from '@/graphql/hasuraAdmin';
import {
  GetAdminInvestorMailingListDocument,
  GetAdminInvestorMailingListQuery,
  GetUserByIdDocument,
  GetUserByIdQuery,
  Investors,
  UpdateUserFeatureFlagsDocument,
  UpdateUserFeatureFlagsMutation,
} from '@/graphql/types';
import { DeepPartial } from '@/types/common';
import { chunk, compact, every, flatten, includes, map, uniqBy } from 'lodash';
import { sendInvitationMail } from './send-invite-to-edgein-email';

const EMAIL_BATCH = 50;

const getInvestorMailingListEmails = (investors: DeepPartial<Investors>[]) => {
  const teamMembers = investors.map(investor => {
    const innerCompanies = investor.vc_firm?.investments?.map(
      inv => inv?.investment_round?.company,
    );

    return uniqBy(
      flatten(innerCompanies?.map(company => company?.teamMembers)),
      'id',
    );
  });

  return compact(
    flatten(teamMembers).map(teamMember => teamMember?.email_address),
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  if (!user) return res.status(403).end();

  if (!user.person?.id) return res.status(403).end();

  if (!req.body?.companyId) return res.status(400).end();

  const getUserResponse = await query<GetUserByIdQuery>({
    query: GetUserByIdDocument,
    variables: {
      id: user.id,
    },
  });

  const existingFeatureFlags = getUserResponse.data.users.at(0)?.feature_flags;
  const existingNotifiedCompanies = Array.from(
    existingFeatureFlags.notifiedInvestorCompanies ?? [],
  );

  if (includes(existingNotifiedCompanies, req.body.companyId))
    return res.status(400).end();

  const response = await query<GetAdminInvestorMailingListQuery>({
    query: GetAdminInvestorMailingListDocument,
    variables: {
      companyId: req.body.companyId,
      personId: user.person.id,
    },
  });

  const emails = getInvestorMailingListEmails(response.data.investors);

  const batchedEmails = chunk(emails, EMAIL_BATCH);

  const responses = await Promise.all(
    map(batchedEmails, emails =>
      sendInvitationMail(
        {
          emails,
          senderName: user.display_name || '',
          senderEmail: user.email || '',
          signUpUrl: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${user.reference_id}`,
        },
        {
          useBcc: true,
        },
      ),
    ),
  );

  if (every(responses, response => response.status === 200)) {
    await mutate<UpdateUserFeatureFlagsMutation>({
      mutation: UpdateUserFeatureFlagsDocument,
      variables: {
        id: user.id,
        feature_flags: {
          ...existingFeatureFlags,
          notifiedInvestorCompanies: {
            ...existingNotifiedCompanies,
            [req.body.companyId]: {
              status: 'FINISHED',
            },
          },
        },
      },
    });
    res.status(200).end();
  } else {
    await mutate<UpdateUserFeatureFlagsMutation>({
      mutation: UpdateUserFeatureFlagsDocument,
      variables: {
        id: user.id,
        feature_flags: {
          ...existingFeatureFlags,
          notifiedInvestorCompanies: {
            ...existingNotifiedCompanies,
            [req.body.companyId]: {
              status: 'ERROR',
              errors: [responses],
            },
          },
        },
      },
    });
    res.status(400).end();
  }
};

export default handler;