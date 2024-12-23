import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import UserService from '../../utils/users';
import BillingService from '../../utils/billing-org';
import { buffer } from 'micro';
import SlackServices from '@/utils/slack';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export const getCustomerId = (
  customer: string | Stripe.Customer | Stripe.DeletedCustomer,
) => {
  return typeof customer === 'string' ? customer : customer.id;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let event: Stripe.Event = req.body;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret && endpointSecret !== 'LEAVE-EMPTY-FOR-DEV') {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];
      const reqBuffer = await buffer(req);

      try {
        event = stripe.webhooks.constructEvent(
          reqBuffer,
          signature,
          endpointSecret,
        );
      } catch (err: any) {
        console.error(
          `⚠️  Webhook signature verification failed. ${err.message}`,
        );
        return res.status(400).send({
          error: `Webhook signature verification failed. ${err.message}`,
        });
      }
    } else if (process.env.NODE_ENV === 'production') {
      console.error(
        `⚠️  Webhook signature verification failed. Missing endpointSecret`,
      );
      return res.status(400).send({
        error: `Webhook signature verification failed. Missing endpointSecret`,
      });
    } else {
      try {
        // event = JSON.parse(event.toString());
      } catch (err: any) {
        console.error(`Webhook event parse failed. ${err.message}`);
        return res
          .status(400)
          .send({ error: `Webhook event parse failed. ${err.message}` });
      }
    }
    let customerId: string;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.updated': {
        // update customer plan
        const subscription = event.data.object as Stripe.Subscription;
        customerId = getCustomerId(subscription.customer);
        const billingOrg = await BillingService.getBillingOrgByCustomerId(
          customerId,
        );
        if (!billingOrg) {
          const customer = await stripe.customers.retrieve(customerId);
          const user = await UserService.findOneUserByEmail(customer.email);
          if (!user) {
            // slack
            await SlackServices.sendMessage(
              process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
              `1 Subscription update to customer ${customerId} ${customer.email}, no user or billing org found, help needed!`,
            );
            res.status(400).send({
              error: `Webhook no user for customer id ${customerId} ${customer.email}`,
            });
            return;
          }
          if (!user.billing_org_id) {
            // create billing org
            const billingOrg = await BillingService.insertBillingOrg(
              customerId,
              subscription.status === 'active'
                ? 'active'
                : subscription.status === 'canceled'
                ? 'canceled'
                : 'inactive',
              'basic',
            );
            // update user
            UserService.updateBillingOrg(user.id, billingOrg?.id || 0);
            // slack
            await SlackServices.sendMessage(
              process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
              `2 Subscription update to user ${user.id}, user has no billing org, no billing org found for stripe customer with email ${customer.email}, creating new billing org`,
            );
          } else {
            // slack
            const userBillingOrg = await BillingService.getBillingOrgById(
              user.billing_org_id,
            );
            let latestSubscription: Stripe.Subscription = subscription;
            if (subscription.status === 'canceled') {
              const subscriptions = await stripe.subscriptions.list({
                customer: userBillingOrg?.customer_id,
                limit: 1,
              });
              latestSubscription = subscriptions.data[0];
            }
            // update billing org
            await BillingService.updateBillingOrgCustomerId(
              user.billing_org_id,
              customerId,
              subscription.status === 'active' ? 'active' : 'inactive',
            );
            await SlackServices.sendMessage(
              process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
              `3 Subscription update to user ${user.id}, user has billing org (${user.billing_org_id}) attched to customer (${userBillingOrg.customer_id}), yet stripe customer does not ${customerId}, updating billing org to point to customer_id`,
            );
          }
          break;
        } else {
          await BillingService.updateBillingOrg(
            billingOrg.id,
            subscription.status === 'active' ? 'active' : 'inactive',
          );
        }
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata as any;
        customerId = getCustomerId(session.customer || '');
        console.log(customerId);
        const userId = metadata.userId || session.client_reference_id;
        if (!userId) {
          // slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `4 Checkout session completed with no user id for customer ${customerId}. Please help`,
          );
          res.status(400).send({ error: `Webhook no user id` });
        }
        // lookup user
        const user = await UserService.findOneUserById(userId);

        if (!user.billing_org_id) {
          // create billing org
          const billingOrg = await BillingService.insertBillingOrg(
            customerId,
            'active',
            'basic',
          );
          // update user
          UserService.updateBillingOrg(userId, billingOrg?.id || 0);
        } else {
          // slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `5 Checkout session completed with user ${user.id} use has a preexisting billing org, potentially double paying. Please help`,
          );
        }
        break;
      }
      default:
        // slack
        // Unexpected event type
        console.info(`Stripe Webhook: Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send({ success: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

export default handler;
