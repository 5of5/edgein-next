import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '@/utils/cookie';
import { chunk, every, map } from 'lodash';
import { sendInvitationMail } from './send-invite-to-edgein-email';

const EMAIL_BATCH = 50;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

  if (!user) return res.status(403).end();

  if (!user.person?.id) return res.status(403).end();

  if (!req.body?.emails) return res.status(400).end();

  const batchedEmails = chunk<string>(req.body.emails, EMAIL_BATCH);

  const responses = await Promise.all(
    map(batchedEmails, emails =>
      sendInvitationMail(
        {
          emails,
          senderName: user.display_name || '',
          senderEmail: user.email || '',
          signUpUrl: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${user.reference_id}`,
        },
        {
          useBcc: true,
        },
      ),
    ),
  );

  if (every(responses, response => response.status === 200)) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
};

export default handler;
