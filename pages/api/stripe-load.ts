import { ROUTES } from '@/utils/routes';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '../../utils/cookie';
import UserService from '../../utils/users';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const token = CookieService.getAuthToken(req.cookies);
      const user = await CookieService.getUser(token);
      if (!user) return res.status(403).end();

      const dbuser = await UserService.findOneUserById(user.id);

      if (dbuser.billing_org?.customer_id) {
        // check if user already has a subscription
        // Authenticate your user.
        const session = await stripe.billingPortal.sessions.create({
          customer: dbuser.billing_org?.customer_id,
          return_url: `${req.headers.origin}${ROUTES.ACCOUNT}`,
        });
        res.send({ success: true, redirect: session.url });
      } else {
        // Create Checkout Sessions from body params.
        const metadata = {
          userId: user.id,
        };
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: process.env.STRIPE_PRICING_KEY,
              quantity: 1,
            },
          ],
          metadata,
          mode: 'subscription',
          subscription_data: {
            trial_period_days: 7,
          },
          allow_promotion_codes: true,
          consent_collection: {
            terms_of_service: 'required',
          },
          client_reference_id: user.id,
          success_url: `${req.headers.origin}/api/refresh-user/?redirect=${ROUTES.ACCOUNT}/?success=true`,
          cancel_url: `${req.headers.origin}${ROUTES.ACCOUNT}/?canceled=true`,
        });
        res.send({ success: true, redirect: session.url });
      }
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
