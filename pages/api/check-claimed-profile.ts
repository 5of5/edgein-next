import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '@/utils/cookie';
import UserService from '@/utils/users';
import { onFindPeopleByLinkedin } from './add-onboarding-information';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  // params
  const personId: number = req.body.personId;
  const linkedin: string = req.body.linkedin;

  try {
    if (personId) {
      const isClaimedPerson = await UserService.findOneUserByPersonId(personId);
      if (isClaimedPerson) {
        return res.status(400).send({
          error: 'The profile you chose was claimed from another user.',
        });
      }
    }

    if (linkedin) {
      const personByLinkedin = await onFindPeopleByLinkedin(linkedin);
      if (personByLinkedin?.id) {
        const isClaimedPerson = await UserService.findOneUserByPersonId(
          personByLinkedin.id,
        );
        if (isClaimedPerson) {
          return res.status(400).send({
            error:
              'A user with this LinkedIn profile already exists. Try a different one.',
          });
        }
      }
    }

    return res.status(200).send({ success: true });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
