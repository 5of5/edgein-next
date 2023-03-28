import CookieService from "../../utils/cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { mutate } from "@/graphql/hasuraAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  // payload
  const userId: number = req.body.userId;
  const auth0UserId: string = req.body.auth0UserId;
  const password: string = req.body.password;

  if (!userId || !password) return res.status(404).send("Invalid request");

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // only admin can reset the user's password
  if (!(user?.role === "admin")) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const data = JSON.stringify({
    client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
    client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
    audience: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/`,
    grant_type: "client_credentials",
  });

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let result;
  try {
    const managementTokenRequest = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`,
      {
        method: "POST",
        headers: myHeaders,
        body: data,
        redirect: "follow",
      }
    );
    if (!managementTokenRequest.ok) {
      const managemetTokenErrResponse = JSON.parse(
        await managementTokenRequest.text()
      );
      return res
        .status(managementTokenRequest.status)
        .send(managemetTokenErrResponse.error_description);
    }
    const managementTokenData = JSON.parse(await managementTokenRequest.text());

    // set user password
    myHeaders.append(
      "Authorization",
      `Bearer ${managementTokenData.access_token}`
    );
    const setPasswordObject = JSON.stringify({
      password,
      connection: "Username-Password-Authentication",
    });
    const setPasswordRequest = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/auth0|${auth0UserId}`,
      {
        method: "PATCH",
        headers: myHeaders,
        body: setPasswordObject,
      }
    );
    if (!setPasswordRequest.ok) {
      const setPasswordErrResponse = JSON.parse(
        await setPasswordRequest.text()
      );
      return res.status(setPasswordRequest.status).send(setPasswordErrResponse);
    }
    await mutate({
      mutation: `
        mutation insert_reset_password($object: reset_passwords_insert_input!) {
          insert_reset_passwords_one(
            object: $object
          ) {
            id
          user_id
          generated_password
            created_at
          }
        }
      `,
      variables: {
        object: {
          user_id: userId,
          generated_password: password,
          created_by_user_id: user.id,
        },
      },
    });
    result = JSON.parse(await setPasswordRequest.text());
  } catch (ex: any) {
    return res.status(404).send(ex.message);
  }

  res.send({ success: true, result });
};

export default handler;
