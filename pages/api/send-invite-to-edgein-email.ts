import { NextApiResponse, NextApiRequest } from 'next';
import AWS from 'aws-sdk';
import { render } from '@react-email/render';
import CookieService from '@/utils/cookie';
import {
  InviteToEdgeInMailParams,
  InviteToEdgeInPayload,
  InviteToEdgeInResponse,
} from '@/types/api';
import InviteUserEmail from '@/react-email-starter/emails/invite-user';
import { mutate } from '@/graphql/hasuraAdmin';
import {
  InsertInvitedPeopleDocument,
  InsertInvitedPeopleMutation,
} from '@/graphql/types';
import { makeEmailService } from '@/services/email.service';
import { env } from '@/services/config.service';
import { inviteToEdgeInPayloadSchema } from '@/utils/schema';

const emailService = makeEmailService();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const payload: InviteToEdgeInPayload[] = req.body.payload;

  const params = inviteToEdgeInPayloadSchema.parse(payload);

  const inviteCode = user.reference_id;

  const response = await Promise.all(
    params.map(async ({ email, personId }) => {
      const mailParams: InviteToEdgeInMailParams = {
        email,
        senderName: user.display_name || '',
        senderEmail: user.email || '',
        signUpUrl: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${inviteCode}`,
      };

      const emailResponse = await sendInvitationMail(mailParams);

      if (personId) {
        await insertInvitedPeople(personId, user.id);
      }

      return emailResponse;
    }),
  );

  res.send(response);
};

const sendInvitationMail = async (mailParams: InviteToEdgeInMailParams) => {
  const { email, senderName, senderEmail, signUpUrl } = mailParams;

  const emailHtml = render(
    InviteUserEmail({
      senderName,
      senderEmail,
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
          Data: `${senderName} (${senderEmail}) invited you to EdgeIn`,
        },
      },
      Source: env.SES_SOURCE,
    };

    await emailService.sendEmail(params);
    const res: InviteToEdgeInResponse = {
      status: 200,
      message: 'success',
      email,
    };
    return res;
  } catch (err) {
    const res: InviteToEdgeInResponse = {
      status: 500,
      message: `Failed to send invitation email to ${email}. ${err}`,
      email,
    };
    return res;
  }
};

const insertInvitedPeople = async (personId: number, userId: number) => {
  const {
    data: { insert_invited_people_one },
  } = await mutate<InsertInvitedPeopleMutation>({
    mutation: InsertInvitedPeopleDocument,
    variables: {
      personId,
      userId,
    },
  });
  return insert_invited_people_one;
};

export default handler;