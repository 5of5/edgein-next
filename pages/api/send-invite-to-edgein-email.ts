import { NextApiResponse, NextApiRequest } from 'next';
import AWS from 'aws-sdk';
import CookieService from '@/utils/cookie';

type MailParams = {
  email: string;
  senderName: string;
  signUpUrl?: string;
};

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SES_ACCESS_SECRET_KEY!,
  region: process.env.AWS_BUCKET_REGION!,
});
const SES_SOURCE = 'EdgeIn Support <support@edgein.io>';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const emails: string[] = req.body.emails;

  const inviteCode = user.person?.slug || user.reference_id;

  const response = await Promise.all(
    emails.map(async email => {
      const mailParams: MailParams = {
        email,
        senderName: user.display_name || '',
        signUpUrl: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${inviteCode}`,
      };

      const emailResponse = await sendInvitationMail(mailParams);
      return emailResponse;
    }),
  );

  res.send(response);
};

const sendInvitationMail = async (mailParams: MailParams) => {
  const { email, senderName, signUpUrl } = mailParams;
  const html = `
      <b>You received an invitation to join EdgeIn</b>,
      <p><b>${senderName}</b> invited you to use EdgeIn with them. </p> <br/>

      <a href="${signUpUrl}" style="background-color:#5E41FE;padding: 10px 24px;color: #ffffff;font-weight: 600;display: inline-block;border-radius: 4px;text-decoration: none;">JOIN NOW</a>
    `;

  try {
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
          Data: `${senderName} invited you to join EdgeIn`,
        },
      },
      Source: SES_SOURCE,
    };

    await new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
    return { status: 200, message: 'success' };
  } catch (err) {
    return {
      status: 500,
      message: `Failed to send verification email to ${email}. ${err}`,
    };
  }
};

export default handler;
