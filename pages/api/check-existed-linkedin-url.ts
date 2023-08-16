import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '@/utils/users';
import { onFindPeopleByLinkedin } from './add-onboarding-information';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') return res.status(405).end();

  const linkedinUrl = req.query.linkedinUrl as string;

  if (!linkedinUrl) {
    return res.status(400).send({ error: 'Linkedin URL is required.' });
  }

  try {
    const personByLinkedin = await onFindPeopleByLinkedin(linkedinUrl);
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

    return res.status(200).send({
      success: true,
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

export default handler;
