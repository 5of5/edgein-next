import { NextApiResponse, NextApiRequest } from 'next';
import CookieService from '@/utils/cookie';
import { makeEmailService } from '@/services/email.service';
import { env } from '@/services/config.service';
import { AuthService } from '@/services/auth.service';

const emailService = makeEmailService();

export type EmailResources = {
  isExistedUser: boolean;
  email: string;
  recipientName: string;
}[];

type MailParams = {
  email: string;
  senderName: string;
  recipientName?: string;
  groupName: string;
  groupUrl?: string;
  signUpUrl?: string;
  isExistedUser?: boolean;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const emailResources: EmailResources = req.body.emailResources;
  const groupName = req.body.groupName;
  const groupId = req.body.groupId;

  const response = await Promise.all(
    emailResources.map(async resource => {
      const mailParams: any = {
        email: resource.email,
        senderName: user.display_name || '',
        groupName,
        isExistedUser: resource.isExistedUser,
      };

      if (resource.isExistedUser) {
        const groupUrl = AuthService.groupUrl(groupId);
        mailParams.groupUrl = groupUrl;
        mailParams.recipientName = resource.recipientName;
      } else {
        const inviteCode = user.reference_id;
        const signUpUrl = AuthService.signUpUrl(inviteCode);
        mailParams.signUpUrl = signUpUrl;
      }

      const emailResponse = await sendInvitationMail(mailParams);
      return emailResponse;
    }),
  );
  res.send(response);
};

const sendInvitationMail = async (mailParams: MailParams) => {
  const {
    isExistedUser,
    email,
    senderName,
    recipientName,
    groupName,
    groupUrl,
    signUpUrl,
  } = mailParams;
  const html = isExistedUser
    ? `
      <b>Hi ${recipientName}</b>,
      <p><b>${senderName}</b> has invited you to join group <b>${groupName}</b>. </p> <br/>

      <a href="${groupUrl}" style="background-color:#5E41FE;padding: 10px 24px;color: #ffffff;font-weight: 600;display: inline-block;border-radius: 4px;text-decoration: none;">VIEW GROUP</a>
    `
    : `
      <b>Join your group on EdgeIn</b>,
      <p><b>${senderName}</b> has invited you to use EdgeIn with them, in a group called <b>${groupName}</b>. </p> <br/>

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
          Data: `${senderName} has invited you to join group ${groupName} in EdgeIn`,
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
