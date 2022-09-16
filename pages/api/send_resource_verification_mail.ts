import { NextApiResponse, NextApiRequest } from "next";
import CookieService from '../../utils/cookie'
import nodemailer from 'nodemailer'
import { generateVerifyWorkplaceToken, saveToken } from "@/utils/tokens";
import { tokenTypes } from "@/utils/constants";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  if (req.method !== 'POST') return res.status(405).end()

  const token = CookieService.getAuthToken(req.cookies)
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end()

  const companyName = req.body.resource.companyName
  const resourceId = req.body.resource.resourceId
  const resourceType = req.body.resource.type
  const email = req.body.email

  const verifyWorkToken = await generateVerifyWorkplaceToken(resourceId, resourceType)

  const url = `http://localhost:3000/api/verify_workplace?token=${verifyWorkToken}`

  await saveToken(verifyWorkToken, tokenTypes.verifyWorkHereToken, user.id)

  await sendVerificationMail(url, companyName, email, user.display_name || '')

  res.send({ status: 200, message: 'success' })
}

const sendVerificationMail = async (url: string, companyName: string, email: string, userName?: string) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  } as SMTPTransport.Options)

  const html = `
    <b>Hi ${userName}</b>,
    <p>Please verify you work for <b>${companyName}</b> </p> <br/>

    <a href="${url}">${url}</a>
  `

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: `${email}`, // list of receivers
    subject: `Verify you work for ${companyName}`, // Subject line
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default handler