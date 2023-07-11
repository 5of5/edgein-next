import { NextApiResponse, NextApiRequest } from 'next';
import { render } from '@react-email/render';
import InviteGroupMemberEmail from '@/react-email-starter/emails/invite-group-member';
import {
  InviteGroupMemberMailParams,
  InviteGroupMemberPayloadEmailResource,
} from '@/types/api';
import CookieService from '@/utils/cookie';
import { makeEmailService } from '@/services/email.service';
import { env } from '@/services/config.service';

const emailService = makeEmailService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const emailResources: InviteGroupMemberPayloadEmailResource[] =
    req.body.emailResources;
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

const sendInvitationMail = async (mailParams: InviteGroupMemberMailParams) => {
  const {
    isExistedUser,
    email,
    senderName,
    recipientName,
    groupName,
    groupUrl,
    signUpUrl,
  } = mailParams;

  const invalidExistedUser = isExistedUser && (!recipientName || !groupUrl);
  const invalidSignUpUrl = !isExistedUser && !signUpUrl;
  const invalidParams = invalidExistedUser || invalidSignUpUrl;

  if (invalidParams) {
    return {
      status: 400,
      message: `Failed to send verification email to ${email}. Missing parameters`,
    };
  }

  const emailHtml = render(
    InviteGroupMemberEmail({
      isExistedUser,
      senderName,
      recipientName,
      groupName,
      groupUrl,
      signUpUrl,
    }),
  );

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
