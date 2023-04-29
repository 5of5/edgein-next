import { NextApiResponse, NextApiRequest } from "next";
import AWS from "aws-sdk";
import CookieService from "@/utils/cookie";

type MailParams = {
  email: string;
  username: string;
  verifyUrl: string;
};

//AWS config set
AWS.config.update({
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SES_ACCESS_SECRET_KEY!,
  region: process.env.AWS_BUCKET_REGION!,
});
const SES_SOURCE = "EdgeIn Support <support@edgein.io>";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const email: string = req.body.email;

  const mailParams: MailParams = {
    email,
    username: user.display_name || "",
    verifyUrl: `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/verify-additional-email/?email=${email}&uid=${user.id}`,
  };

  const emailResponse = await sendInvitationMail(mailParams);
  res.send(emailResponse);
};

const sendInvitationMail = async (mailParams: MailParams) => {
  const { email, username, verifyUrl } = mailParams;
  const html = `
  <b>Verify your email on EdgeIn</b>
  <p><b>${username}</b> has added you to additional emails on EdgeIn.</p> <br/>

  <a href="${verifyUrl}" style="background-color:#5E41FE;padding: 10px 24px;color: #ffffff;font-weight: 600;display: inline-block;border-radius: 4px;text-decoration: none;">VERIFY YOUR EMAIL</a>
`;

  try {
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
          Data: `Verify your email`,
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