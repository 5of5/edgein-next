import { NextApiResponse, NextApiRequest } from "next";
import { query } from "@/graphql/hasuraAdmin";
import CookieService from "../../utils/cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params:
  const searchText = req.query.searchText;

  // query people
  const fetchQuery = `
  query query_people($text: String) {
    people(where: {_or: [
      {name: {_ilike: $text}}, 
      {work_email: {_ilike: $text}}
    ]}, 
      limit: 100) {
      id
      name
      picture
      work_email
    }
  }
  `;
  try {
    const {
      data: { people },
    } = await query({
      query: fetchQuery,
      variables: { text: `%${searchText}%` },
    });
    return res.send(people);
  } catch (ex) {
    res.status(500).send(ex);
  }
};

export default handler;
