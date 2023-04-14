import { PlanTypes } from '@/utils/constants';
import type { NextApiRequest, NextApiResponse } from 'next'
import CookieService from '../../utils/cookie'
import UserService from '../../utils/users'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const token = CookieService.getAuthToken(req.cookies)
      const user = await CookieService.getUser(token);
      const plan: PlanTypes = req.body.plan;

      if (!user) return res.status(403).end()
    
      const dbuser = await UserService.findOneUserById(user.id);
      if (dbuser.billing_org?.customer_id
          && dbuser.billing_org?.plan === plan // TODO remove it using beta version to upgrade plan
          && dbuser.billing_org?.status === "active"
      ) {
        // check if user already has a subscription
        // Authenticate your user.
        const session = await stripe.billingPortal.sessions.create({
          customer: dbuser.billing_org?.customer_id,
          //flow_data: { type: "subscription_update" },
          return_url: `${req.headers.origin}/account`,
        });
        res.send({ success: true, redirect: session.url })
      } else {
        // Create Checkout Sessions from body params.
        const metadata = {
          userId: user.id,
          plan,
        };

        var price = process.env.STRIPE_PRICING_KEY;
        if (plan === 'community')
          price = process.env.STRIPE_COMMUNITY_PRICING_KEY;

        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price,
              quantity: 1,
            },
          ],
          metadata,
          mode: 'subscription',
          subscription_data: {
            trial_period_days: 7
          },
          allow_promotion_codes: true,
          consent_collection: {
            terms_of_service: "required",
          },
          success_url: `${req.headers.origin}/api/refresh_user/?redirect=/account/?success=true`,
          cancel_url: `${req.headers.origin}/account/?canceled=true`,
        });
        res.send({ success: true, redirect: session.url })
      }
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

export default handler