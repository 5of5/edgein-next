import { mutate } from '@/graphql/hasuraAdmin';
import {
  UpsertInvestmentRoundDocument,
  UpsertInvestmentRoundMutation,
  UpsertInvestmentsDocument,
  UpsertInvestmentsMutation,
} from '@/graphql/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();
  const investmentRoundPayload = req.body.investmentRound;
  try {
    const investmentRound = await upsertInvestmentRound(
      investmentRoundPayload,
      token,
    );
    res.send({ investmentRound });
  } catch (e: any) {
    res.status(400).send({ message: 'Bad request' });
  }
};

const upsertInvestmentRound = async (payload: any, token: string) => {
  const investments = payload.investments;
  delete payload.investments;

  const data = await mutate<UpsertInvestmentRoundMutation>({
    mutation: UpsertInvestmentRoundDocument,
    variables: {
      data: payload,
    },
  });

  const investmentsData = investments.map((investment: any) => ({
    ...investment,
    round_id: data.data.insert_investment_rounds_one?.id,
  }));

  const resultInvestments = await upsertInvestments(investmentsData, token);

  return {
    ...data.data.insert_investment_rounds_one,
    investments: resultInvestments,
  };
};

const upsertInvestments = async (payload: any, token: string) => {
  const result = await mutate<UpsertInvestmentsMutation>({
    mutation: UpsertInvestmentsDocument,
    variables: {
      data: payload,
    },
  });

  return result.data.insert_investments?.returning;
};

export default handler;
