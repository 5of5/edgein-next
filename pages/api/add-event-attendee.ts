import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';
import EventService from '@/utils/events';
import UserService from '@/utils/users';
import { Users } from '@/graphql/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  const userProfile: Users = await UserService.findUserByPk(user.id);

  if (userProfile.person?.id) {
    const eventId: number = req.body.eventId;
    const existsAttendee = await EventService.findEventAttendee(
      eventId,
      userProfile.person.id,
    );

    if (existsAttendee) {
      return res
        .status(400)
        .json({ message: 'You have already joined this event' });
    }
    const addAttendeeResponse = await EventService.addEventAttendee(
      eventId,
      userProfile.person.id,
    );
    return res.send(addAttendeeResponse);
  }

  return res
    .status(400)
    .json({ message: 'Your account has not been linked to any person' });
};

export default handler;
