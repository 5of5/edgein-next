import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end()

  const data = JSON.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    email: req.body.email,
    connection: "Username-Password-Authentication"
  });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let result;
  try {
    const fetchRequest = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`, {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    });
    if (!fetchRequest.ok) {
      return res.status(fetchRequest.status).send(fetchRequest.statusText)
    }
    result = await fetchRequest.text();
  } catch (ex: any) {
    return res.status(404).send(ex.message)
  }

  res.send({ success: true, result });
}

export default handler
