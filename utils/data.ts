import CookieService from './cookie';
import { USER_ROLES } from './users';

export const runGraphQl = async <QueryType>(
  query: string,
  variables?: Record<string, any>,
  cookies?: any,
): Promise<{ data?: QueryType; errors?: any }> => {
  let headers: Record<string, string> = {};
  const authToken = CookieService.getAuthToken(cookies || {});

  if (authToken) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
      'is-viewer': 'true',
      'x-hasura-admin-secret': `H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid`,
    };
  } else {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'is-viewer': 'true',
      'x-hasura-admin-secret': `H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid`,
    };
  }
  console.log('headers.......', process.env.GRAPHQL_ENDPOINT);
  if (authToken) {
    const user = await CookieService.getUser(authToken);
    headers['x-hasura-user-id'] = user?.id?.toString() ?? '';
    // Allow admin to access draft records
    // Set default showDraftData is true
    if (
      user?.role === USER_ROLES.ADMIN &&
      (user?.showDraftData === undefined || user?.showDraftData)
    )
      delete headers['x-hasura-role'];
  }

  return await fetch(process.env.GRAPHQL_ENDPOINT ?? '', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(async r => {
      if (r.status !== 200) {
        const json = await r.json();
        console.log('error with response 1', json, r);
        return json;
      }
      try {
        const json = await r.json();
        if (json.message && json.message === 'Not Authorized') {
          console.log('error with response 2', json);
        }
        if (json.errors) {
          console.log(
            'error with response 3',
            query,
            variables,
            json.errors[0],
            json.errors,
          );
        }
        return json;
      } catch (e) {
        console.log('error with response 4', r);
      }
    })
    .catch(e => {
      console.log('error with response 5', e);
    });
};
