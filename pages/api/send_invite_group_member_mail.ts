import { NextApiResponse, NextApiRequest } from "next";
import AWS from "aws-sdk";
import CookieService from "@/utils/cookie";

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SES_ACCESS_SECRET_KEY!,
  region: process.env.AWS_BUCKET_REGION!,
});
const SES_SOURCE = "support@edgein.io";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const recipientName = req.body.resource.recipientName;
  const groupName = req.body.resource.groupName;
  const groupId = req.body.resource.groupId;
  const email = req.body.email;

  const groupUrl = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/groups/${groupId}`;

  const emailResponse = await sendInvitationMail(
    email,
    recipientName,
    user.display_name || "",
    groupName,
    groupUrl
  );

  res.send(emailResponse);
};

const sendInvitationMail = async (
  email: string,
  recipientName: string,
  senderName: string,
  groupName: string,
  groupUrl: string
) => {
  try {
    const html = `
      <b>Hi ${recipientName}</b>,
      <p><b>${senderName}</b> has invited you to join group <b>${groupName}</b>. </p> <br/>

      <a href="${groupUrl}" style="background-color:#5E41FE;padding: 10px 24px;color: #ffffff;font-weight: 600;display: inline-block;border-radius: 4px;text-decoration: none;">View group</a>
    `;

    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: html,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: `You are invited to join group ${groupName}`,
        },
      },
      Source: SES_SOURCE,
    };

    await new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
    return { status: 200, message: "success" };
  } catch (err) {
    return {
      status: 500,
      message: `Failed to send verification email to ${email}. ${err}`,
    };
  }
};

export default handler;
