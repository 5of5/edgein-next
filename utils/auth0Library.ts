
async function getUserInfoFromToken(accessToken: string) {
  const userInfoHeader = new Headers();
  userInfoHeader.append('Authorization', `Bearer ${accessToken}`);
  const userInfoFetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
    method: 'GET',
    headers: userInfoHeader
  });
  return userInfoFetchRequest;
}

export default { getUserInfoFromToken }