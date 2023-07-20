import { NextApiResponse, NextApiRequest } from 'next';
import { query } from '@/graphql/hasuraAdmin';
import CookieService from '../../utils/cookie';
import {
  GetTeamMemberByCompanyIdsDocument,
  GetTeamMemberByCompanyIdsQuery,
  GetTeamMemberByPersonIdDocument,
  GetTeamMemberByPersonIdQuery,
  GetUserByPersonIdsDocument,
  GetUserByPersonIdsQuery,
} from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    let teamMembers: GetTeamMemberByCompanyIdsQuery['team_members'] = [];

    if (user.person?.id) {
      const teamMemberByPerson = await getTeamMemberByPersonId(
        user.person?.id || 0,
      );

      if (teamMemberByPerson.length > 0) {
        const teamMemberByCompany = await getTeamMemberByCompanyIds(
          teamMemberByPerson.map(mem => mem?.company_id || 0),
        );

        // Filter out signed up people
        const userLinked = await getUserByPersonIds(
          teamMemberByCompany.map(mem => mem.person_id || 0),
        );
        const linkedPersonIds = userLinked.map(userItem => userItem.person_id);

        teamMembers =
          teamMemberByCompany?.filter(
            mem =>
              mem?.person_id !== user?.person?.id &&
              !linkedPersonIds.includes(mem?.person_id),
          ) || [];
      }
    }

    return res.send(teamMembers);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const getTeamMemberByPersonId = async (person_id: number) => {
  const {
    data: { team_members },
  } = await query<GetTeamMemberByPersonIdQuery>({
    query: GetTeamMemberByPersonIdDocument,
    variables: {
      person_id,
    },
  });
  return team_members;
};

const getTeamMemberByCompanyIds = async (company_ids: number[]) => {
  const {
    data: { team_members },
  } = await query<GetTeamMemberByCompanyIdsQuery>({
    query: GetTeamMemberByCompanyIdsDocument,
    variables: {
      company_ids,
    },
  });
  return team_members;
};

const getUserByPersonIds = async (person_ids: number[]) => {
  const {
    data: { users },
  } = await query<GetUserByPersonIdsQuery>({
    query: GetUserByPersonIdsDocument,
    variables: {
      person_ids,
    },
  });
  return users;
};

export default handler;
