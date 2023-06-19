import { NextApiResponse, NextApiRequest } from 'next';
import AWS from 'aws-sdk';
import { render } from '@react-email/render';
import CookieService from '@/utils/cookie';
import InviteGroupMemberEmail from '@/react-email-starter/emails/invite-group-member';

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
        const groupUrl = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/groups/${groupId}`;
        mailParams.groupUrl = groupUrl;
        mailParams.recipientName = resource.recipientName;
      } else {
        const inviteCode = user.reference_id;
        const signUpUrl = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${inviteCode}`;
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

  const emailHtml = render(InviteGroupMemberEmail({
    isExistedUser,
    senderName,
    recipientName,
    groupName,
    groupUrl,
    signUpUrl,
  }));

  try {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailHtml,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${senderName} has invited you to join group ${groupName} in EdgeIn`,
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
