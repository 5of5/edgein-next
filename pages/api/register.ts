import UserService from '../../utils/users'
import auth0Library from '../../utils/auth0Library'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  // check email exist in allowedEmail table or not
  const email = (req.body.email as string || '').toLowerCase();
  const reference_id = req.body.reference_id;
  // get the domain from the email
  const domain = email.split('@').pop() || '';
  // const isEmailAllowed = await UserService.queryForAllowedEmailCheck(email, domain)

  // when email does not exist in the allowed emails
  // if (!isEmailAllowed) {
  //   // insert user in waitlist table
  //   await UserService.mutateForWaitlistEmail(email)
  //   return res.status(404).send({ message: `Your email ${email} has been added to our waitlist.  We'll be in touch soon!` });
  // }

  let isUserPassPrimaryAccount = false;
  let isLinkedInPrimaryAccount = true;

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
      return res.status(fetchRequest.status).send({ message: errorResponse.description })
    }
    result = JSON.parse(await fetchRequest.text());

    let userData: any = await UserService.findOneUserByEmail(email);
    if (!userData) {
      isUserPassPrimaryAccount = true;
      isLinkedInPrimaryAccount = false;
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
        reference_user_id: referenceUserId,
        // person_id: isEmailAllowed.person_id
      }
      // upsert user info
      userData = await UserService.upsertUser(objectData);
    }
    // update the linkedIn id in user
    if (userData && !userData.auth0_user_pass_id) {
      isLinkedInPrimaryAccount = true;
      isUserPassPrimaryAccount = false;
      userData = await UserService.updateAuth0UserPassId(result.email, result._id);
    }

    if (userData && userData.auth0_linkedin_id && userData.auth0_user_pass_id) {
      let primaryId = '';
      let secondayProvider = '';
      let secondayId = '';
      if (isUserPassPrimaryAccount) {
        primaryId = `auth0|${userData.auth0_user_pass_id}`;
        secondayProvider = 'linkedin'
        secondayId = `linkedin|${userData.auth0_linkedin_id}`
      }
      if (isLinkedInPrimaryAccount) {
        primaryId = `linkedin|${userData.auth0_linkedin_id}`;
        secondayProvider = 'auth0'
        secondayId = `auth0|${userData.auth0_user_pass_id}`
      }
      if (primaryId !== '' && secondayId !== '') {
        await auth0Library.linkTwoAccount(primaryId, secondayId, secondayProvider);
      }
    }
  } catch (ex: any) {
    return res.status(404).send({ message: ex.message })
  }

  res.send({ success: true, result });
}

export default handler
