import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import UserService from '../../utils/users';
import BillingService from '../../utils/billing-org';
import { buffer } from 'micro';
import SlackServices from '@/utils/slack';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-08-01',
});

export const config = { api: { bodyParser: false } };

export const getCustomerId = (
  customer: string | Stripe.Customer | Stripe.DeletedCustomer,
) => {
  return typeof customer === 'string' ? customer : customer.id;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    let event: Stripe.Event;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      const signature = req.headers['stripe-signature'];
      const reqBuffer = await buffer(req);

      if (!endpointSecret || endpointSecret === 'LEAVE-EMPTY-FOR-DEV') {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('Missing webhook secret in production');
        }
        event = JSON.parse(reqBuffer.toString());
      } else {
        event = stripe.webhooks.constructEvent(
          reqBuffer,
          signature!,
          endpointSecret,
        );
      }

      let customerId: string;

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as Stripe.Checkout.Session;
          customerId = getCustomerId(session.customer || '');
          const userId =
            session.metadata?.userId || session.client_reference_id;

          if (!userId) {
            throw new Error(`No user ID found for customer ${customerId}`);
          }

          const user = await UserService.findOneUserById(Number(userId));
          if (!user) {
            throw new Error(`No user found for ID ${userId}`);
          }

          // Get subscription details
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );

          // Create or update billing org
          if (!user.billing_org_id) {
            const billingOrg = await BillingService.insertBillingOrg(
              customerId,
              subscription.status === 'active' ? 'active' : 'inactive',
              'contributor',
            );
            await UserService.updateBillingOrg(
              Number(userId),
              billingOrg?.id || 0,
            );
          } else {
            const billingOrg = await BillingService.getBillingOrgById(
              user.billing_org_id,
            );
            if (billingOrg) {
              await BillingService.updateBillingOrgCustomerId(
                billingOrg.id,
                customerId,
                subscription.status === 'active' ? 'active' : 'inactive',
              );
            }
          }

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `✅ New premium subscription created for user ${user.id} (${user.email})`,
          );
          break;
        }

        case 'customer.subscription.created': {
          const subscription = event.data.object as Stripe.Subscription;
          customerId = getCustomerId(subscription.customer);

          const billingOrg = await BillingService.getBillingOrgByCustomerId(
            customerId,
          );
          if (!billingOrg) {
            throw new Error(`No billing org found for customer ${customerId}`);
          }

          // Update billing org status based on subscription status
          const status =
            subscription.status === 'active' ? 'active' : 'inactive';
          await BillingService.updateBillingOrg(billingOrg.id, status);

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `🎉 New premium subscription created for customer ${customerId}, status: ${status}`,
          );
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          customerId = getCustomerId(subscription.customer);

          const billingOrg = await BillingService.getBillingOrgByCustomerId(
            customerId,
          );
          if (!billingOrg) {
            throw new Error(`No billing org found for customer ${customerId}`);
          }

          // Update billing org status based on subscription status
          const status =
            subscription.status === 'active' ? 'active' : 'inactive';
          await BillingService.updateBillingOrg(billingOrg.id, status);

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `🔄 Premium subscription updated for customer ${customerId}, status: ${status}`,
          );
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          customerId = getCustomerId(subscription.customer);

          const billingOrg = await BillingService.getBillingOrgByCustomerId(
            customerId,
          );
          if (!billingOrg) {
            throw new Error(`No billing org found for customer ${customerId}`);
          }

          // Set status to inactive when subscription is deleted
          await BillingService.updateBillingOrg(billingOrg.id, 'inactive');

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `❌ Premium subscription canceled for customer ${customerId}`,
          );
          break;
        }

        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as Stripe.Invoice;
          if (!invoice.customer) {
            throw new Error('No customer found for invoice');
          }
          customerId = getCustomerId(invoice.customer);

          const billingOrg = await BillingService.getBillingOrgByCustomerId(
            customerId,
          );
          if (!billingOrg) {
            throw new Error(`No billing org found for customer ${customerId}`);
          }

          // Update billing org status to active
          await BillingService.updateBillingOrg(billingOrg.id, 'active');

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `💰 Premium payment succeeded for customer ${customerId}, invoice ${invoice.id}`,
          );
          break;
        }

        case 'invoice.payment_failed': {
          const invoice = event.data.object as Stripe.Invoice;
          if (!invoice.customer) {
            throw new Error('No customer found for invoice');
          }
          customerId = getCustomerId(invoice.customer);

          const billingOrg = await BillingService.getBillingOrgByCustomerId(
            customerId,
          );
          if (!billingOrg) {
            throw new Error(`No billing org found for customer ${customerId}`);
          }

          // Update billing org status to inactive
          await BillingService.updateBillingOrg(billingOrg.id, 'inactive');

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `❌ Premium payment failed for customer ${customerId}, invoice ${invoice.id}`,
          );
          break;
        }

        case 'customer.subscription.trial_will_end': {
          const subscription = event.data.object as Stripe.Subscription;
          customerId = getCustomerId(subscription.customer);

          // Notify via Slack about trial ending
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `⚠️ Premium trial ending soon for customer ${customerId}, subscription ${subscription.id}`,
          );
          break;
        }

        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          if (!paymentIntent.customer) {
            throw new Error('No customer found for payment intent');
          }
          customerId = getCustomerId(paymentIntent.customer);

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `💳 Premium payment intent succeeded for customer ${customerId}, amount: ${paymentIntent.amount}`,
          );
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          if (!paymentIntent.customer) {
            throw new Error('No customer found for payment intent');
          }
          customerId = getCustomerId(paymentIntent.customer);

          // Notify via Slack
          await SlackServices.sendMessage(
            process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
            `❌ Premium payment intent failed for customer ${customerId}, amount: ${paymentIntent.amount}`,
          );
          break;
        }

        default:
          console.info(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);

      // Notify via Slack about the error
      await SlackServices.sendMessage(
        process.env.EDGEIN_STRIPE_ERROR_WEBHOOK_URL || '',
        `❌ Webhook Error: ${err.message}`,
      );

      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
