import UserService from '../../utils/users'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = req.body.email;
  const reference_id = req.body.reference_id;
  const isEmailAllowed = await UserService.queryForAllowedEmailCheck(email)

  // when email does not exist in the allowed emails
  if (!isEmailAllowed) {
    // insert user in waitlist table
    await UserService.mutateForWaitlistEmail(email)
    return res.status(404).send(`Invalid Email`)
  }

  const data = JSON.stringify({
    client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    email,
    password: req.body.password,
    name: req.body.name,
    user_metadata: { role: "user" },
    connection: "Username-Password-Authentication"
  });

  let result;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  try {
    const fetchRequest = await fetch(`${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/dbconnections/signup`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    });
    if (!fetchRequest.ok) {
      const errorResponse = JSON.parse(await fetchRequest.text());
      return res.status(fetchRequest.status).send(errorResponse.description)
    }
    result = JSON.parse(await fetchRequest.text());

    let userData: any = await UserService.findOneUserByEmail(email);
    if (!userData) {
      let referenceUserId = null;
      // check user exist or not for the current reference
      if (reference_id) {
        const referenceUser = await UserService.findOneUserByReferenceId(reference_id)
        if (referenceUser) referenceUserId = referenceUser.id
      }

      const objectData = {
        email: result.email,
        name: result.name,
        _id: result._id, // get Id from sub
        auth0_user_pass_id: result._id,
        reference_user_id: referenceUserId
      }
      // upsert user info
      userData = await UserService.upsertUser(objectData);
    }
    // update the linkedIn id in user
    if (userData && !userData.auth0_user_pass_id) {
      await UserService.updateAuth0UserPassId(result.email, result._id);
    }
  } catch (ex: any) {
    return res.status(404).send(ex.message)
  }

  res.send({ success: true, result });
}

export default handler
