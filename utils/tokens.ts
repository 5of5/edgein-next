import { mutate, query } from '@/graphql/hasuraAdmin';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';

export const saveToken = async (
  token: string,
  type: string,
  userId: number,
  accessToken: string,
) => {
  const mutation = `
    mutation SaveToken($token: String, $type: String, $userId: Int){
      insert_user_tokens_one(object: {token: $token, type: $type, user_id: $userId}) {
        id,
        token
      }
    }
  `;
  const result = await mutate(
    {
      mutation,
      variables: {
        token,
        type,
        userId,
      },
    },
    accessToken,
  );
  return result;
};

export const generateVerifyWorkplaceToken = async (
  resourceId: string,
  resourceType: string,
  userId: number,
  email: string,
  personId?: number,
) => {
  return await new SignJWT({
    resourceDetails: { resourceId, resourceType, userId, personId, email },
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(
      new TextEncoder().encode(`zfuIzxrblbNHX31YFfPNFco4xUWTqpGEWHxvbNFbfUo=`),
    );
};

export const findToken = async (
  token: string,
  type: string,
  accessToken: string,
) => {
  const getQuery = `
    query GetToken($token: String, $type: String) {
      user_tokens(where: {token: {_eq: $token}, type: {_eq: $type}}, limit: 1) {
        id
      }
    }
  `;
  const result = await query(
    {
      query: getQuery,
      variables: {
        token,
        type,
      },
    },
    accessToken,
  );

  return result.data.user_tokens.length ? result.data.user_tokens[0] : null;
};

export const deleteToken = async (id: number, accessToken: string) => {
  const mutation = `
    mutation DeleteToken($id: Int!) {
      delete_user_tokens_by_pk(id: $id) {
        id
      }
    }
  `;

  return await mutate(
    {
      mutation,
      variables: {
        id,
      },
    },
    accessToken,
  );
};
