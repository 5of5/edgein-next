import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  GetUserByPkDocument,
  GetUserByPkQuery,
  InsertEditAccessDocument,
  InsertEditAccessMutation,
  InsertInvestorDocument,
  InsertInvestorMutation,
  InsertTeamMemberDocument,
  InsertTeamMemberMutation,
  UpdateUserAdditionalEmailsByPkDocument,
  UpdateUserAdditionalEmailsByPkMutation,
} from '@/graphql/types';
import { tokenTypes } from '@/utils/constants';
import { deleteToken, findToken } from '@/utils/tokens';
import { jwtVerify } from 'jose';
import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const verificationToken = req.query.vtoken as string;

  if (!verificationToken)
    return res.status(400).send({ message: 'Bad request' });

  const verified = await jwtVerify(
    verificationToken,
    new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
  );

  const payload: any = verified.payload;

  if (!payload)
    return res.status(400).send({ message: 'Bad request or token expired' });

  try {
    const existsToken = await findToken(
      verificationToken,
      tokenTypes.verifyWorkHereToken,
      token,
    );

    if (!existsToken)
      return res
        .status(400)
        .send({ message: 'Verification link already used' });

    await addOrganizationEditAccess(payload, token);

    if (payload.resourceDetails.personId) await addTeamMember(payload, token);

    await updateUserEmails(
      payload.resourceDetails.userId,
      payload.resourceDetails.email,
      token,
    );

    await deleteToken(existsToken.id, token);
  } catch (e: any) {
    return res.status(500).send({
      message: 'Some error occurred, please contact edgein.io',
      error: e.message,
    });
  }

  res.send({ message: 'success' });
};

const addOrganizationEditAccess = async (payload: any, accessToken: string) => {
  const resourceType = payload.resourceDetails.resourceType;
  const resourceId = payload.resourceDetails.resourceId;
  const userId = payload.resourceDetails.userId;

  return await mutate<InsertEditAccessMutation>(
    {
      mutation: InsertEditAccessDocument,
      variables: {
        resourceType,
        resourceId,
        userId,
      },
    },
    accessToken,
  );
};

const addTeamMember = async (payload: any, accessToken: string) => {
  const resourceType = payload.resourceDetails.resourceType;
  if (resourceType === 'companies') {
    await mutate<InsertTeamMemberMutation>(
      {
        mutation: InsertTeamMemberDocument,
        variables: {
          personId: payload.resourceDetails.personId,
          companyId: payload.resourceDetails.resourceId,
        },
      },
      accessToken,
    );
  }
  if (resourceType === 'vc_firms') {
    await mutate<InsertInvestorMutation>(
      {
        mutation: InsertInvestorDocument,
        variables: {
          personId: payload.resourceDetails.personId,
          vcFirmId: payload.resourceDetails.resourceId,
        },
      },
      accessToken,
    );
  }
};

export const updateUserEmails = async (
  userId: number,
  email: string,
  accessToken: string,
) => {
  const result = await query<GetUserByPkQuery>(
    {
      query: GetUserByPkDocument,
      variables: {
        userId,
      },
    },
    accessToken,
  );
  if (!result.data.users_by_pk) return;

  const emails = result.data.users_by_pk?.additional_emails || [];

  if (result.data.users_by_pk?.email === email) return;

  if (!emails.includes(email)) emails.push(email);
  else return;

  await mutate<UpdateUserAdditionalEmailsByPkMutation>(
    {
      mutation: UpdateUserAdditionalEmailsByPkDocument,
      variables: {
        userId,
        emails,
      },
    },
    accessToken,
  );
};

export default handler;
