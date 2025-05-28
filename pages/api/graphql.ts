import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';
import { USER_ROLES } from '@/utils/users';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await CookieService.getUser(
    CookieService.getAuthToken(req.cookies),
  );

  // If user is not authenticated, return unauthorized error
  if (!user) {
    return res.status(401).json({
      errors: [{ message: 'Unauthorized. Authentication required.' }],
    });
  }

  // Set default showDraftData is true
  const isAdminHideDraftData =
    user?.role === USER_ROLES.ADMIN && user?.showDraftData === false;

  let headers:
    | ({ 'x-hasura-role'?: string; 'x-hasura-user-id'?: string } & {
        Authorization: string;
      })
    //let headers: {'x-hasura-role'?: string} & { Authorization: string } |
    | { 'x-hasura-admin-secret': string };

  if (
    user.role === USER_ROLES.USER ||
    req.headers['is-viewer'] === 'true' ||
    isAdminHideDraftData
  ) {
    // Include admin secret for authenticated users to allow data contributions
    headers = {
      Authorization: `Bearer ${CookieService.getAuthToken(req.cookies)}`,
      'x-hasura-role': process.env.HASURA_VIEWER ?? '',
      'x-hasura-admin-secret':
        'H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid',
    };
  } else {
    headers = {
      'x-hasura-admin-secret':
        'H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid',
    };
  }

  const opts = {
    method: 'POST',
    body: typeof req.body === 'object' ? JSON.stringify(req.body) : req.body,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const proxyRes = await fetch(
    process.env.GRAPHQL_ENDPOINT ??
      'https://unique-crow-54.hasura.app/v1/graphql',
    opts,
  );

  const json = await proxyRes.json();
  res.send(json);
};

export default handler;
