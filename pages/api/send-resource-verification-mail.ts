import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '../../utils/cookie';
import { generateVerifyWorkplaceToken, saveToken } from '@/utils/tokens';
import { tokenTypes } from '@/utils/constants';
import { makeEmailService } from '@/services/email.service';
import { env } from '@/services/config.service';
import { AuthService } from '@/services/auth.service';

const emailService = makeEmailService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const companyName = req.body.resource.companyName;
  const resourceId = req.body.resource.resourceId;
  const resourceType = req.body.resource.type;
  const email = req.body.email;
  const personId = req.body.personId;

  const verifyWorkToken = await generateVerifyWorkplaceToken(
    resourceId,
    resourceType,
    user.id,
    email,
    personId,
  );

  const url = AuthService.verifyWorkplaceUrl(verifyWorkToken);
  await saveToken(
    verifyWorkToken,
    tokenTypes.verifyWorkHereToken,
    user.id,
    token,
  );

  const ret = await sendVerificationMail(
    url,
    companyName,
    email,
    user.display_name || '',
  );

  res.send(ret);
};

const sendVerificationMail = async (
  url: string,
  companyName: string,
  email: string,
  userName?: string,
) => {
  try {
    const html = `
      <b>Hi ${userName}</b>,
      <p>Please verify you work for <b>${companyName}</b> </p> <br/>

      <a href="${url}">${url}</a>
    `;

    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Verify you work for ${companyName}`,
        },
      },
      Source: env.SES_SOURCE,
    };

    await emailService.sendEmail(params);
    return { status: 200, message: 'success' };
  } catch (err) {
    return {
      status: 500,
      message: `Failed to send verification email to ${email}. ${err}`,
    };
  }
};

export default handler;
