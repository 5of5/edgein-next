import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const webhookUrl =
    "https://hooks.slack.com/services/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";

  // params:
  const message: string = req.body.message;

  try {
    const payload = {
      attachments: [
        {
          color: "#2EB886",
          title: "You have a new submission",
          fields: [
            {
              title: "Username",
              value: user.display_name,
            },
            {
              title: "Email",
              value: user.email,
            },
            {
              title: "Where did you hear about us?",
              value: message,
            },
          ],
        },
      ],
    };

    let response = await axios.post(webhookUrl, JSON.stringify(payload), {
      withCredentials: false,
      transformRequest: [
        (data, headers) => {
          delete headers?.["Content-Type"];
          return data;
        },
      ],
    });

    if (response.status === 200) {
      return res.status(200).send({ success: true });
    } else {
      return res
        .status(500)
        .send("There was an error.  Please try again later.");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export default handler;
