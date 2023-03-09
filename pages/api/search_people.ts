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
  query query_people($query: String, $searchText: jsonb) {
    users(where: {_or: [
      {email: {_ilike: $query}}, 
      {additional_emails: {_contains: $searchText}}, 
      {person: {
        _or: [
          {name: {_ilike: $query}}, 
          {work_email: {_ilike: $query}},
          {personal_email: {_ilike: $query}},
        ]
      }}
    ]}, 
      limit: 50) {
        id
        display_name
        email
        person {
          id
          name
          picture
          slug
        }
    }
  }
  `;
  try {
    const {
      data: { users },
    } = await query({
      query: fetchQuery,
      variables: { query: `%${searchText}%`, searchText },
    });
    return res.send(users);
  } catch (ex) {
    res.status(500).send(ex);
  }
};

export default handler;
