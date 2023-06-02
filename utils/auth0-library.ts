export async function getUserInfoFromToken(accessToken: string) {
  const userInfoHeader = new Headers();
  userInfoHeader.append('Authorization', `Bearer ${accessToken}`);
  const userInfoFetchRequest = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/userinfo`,
    {
      method: 'GET',
      headers: userInfoHeader,
    },
  );
  return userInfoFetchRequest;
}

export async function linkTwoAccount(
  primaryId: string,
  secondayId: string,
  secondayProvider: string,
) {
  const data = JSON.stringify({
    client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: 'client_credentials',
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const managementTokenRequest = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
    {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    },
  );
  if (!managementTokenRequest.ok) {
    const managemetTokenErrResponse = JSON.parse(
      await managementTokenRequest.text(),
    );
    throw managemetTokenErrResponse.error_description;
  }
  const managementTokenData = JSON.parse(await managementTokenRequest.text());
  myHeaders.append(
    'Authorization',
    `Bearer ${managementTokenData.access_token}`,
  );
  const setPasswordObject = JSON.stringify({
    provider: secondayProvider,
    user_id: secondayId,
  });
  const linkUserAccountsRequest = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${primaryId}/identities`,
    {
      method: 'POST',
      headers: myHeaders,
      body: setPasswordObject,
    },
  );
  if (!linkUserAccountsRequest.ok) {
    const linkUserAccountsErrResponse = JSON.parse(
      await linkUserAccountsRequest.text(),
    );
    throw linkUserAccountsErrResponse.message;
  }
}
