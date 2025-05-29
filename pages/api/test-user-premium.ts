import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../utils/users';
import { runGraphQl } from '@/utils';

// Type definition for GraphQL response
interface UserDetailsResponse {
  data?: {
    users_by_pk?: {
      id: number;
      email: string;
      active?: boolean;
      role?: string;
      billing_org_id?: number;
      billing_org?: {
        id: number;
        customer_id: string;
        status: string;
        plan: string;
      } | null;
    } | null;
  } | null;
}

// Interface for our application's Entitlements structure
interface Entitlements {
  viewEmails?: boolean;
  listsCount?: number;
  groupsCount?: number;
}

// This is a test API route to check if a user is premium and display their complete user data
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST requests with an email parameter
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get email from request body
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Get user from database
    const dbUser = await UserService.findOneUserByEmailForToken(email);

    // If user not found
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Safely get billing org information
    let userDetail = null;
    let userDetailsResponse: UserDetailsResponse = {};

    try {
      // Get additional user data from Hasura - use minimal fields we know exist
      const GET_USER_DETAILS = `
        query GetUserDetails($id: Int!) {
          users_by_pk(id: $id) {
            id
            email
            active
            role
            billing_org_id
            billing_org {
              id
              customer_id
              status
              plan
            }
          }
        }
      `;

      const result = await runGraphQl(
        GET_USER_DETAILS,
        { id: dbUser.id },
        { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET },
      );

      userDetailsResponse = result as UserDetailsResponse;
      userDetail = userDetailsResponse?.data?.users_by_pk || null;
    } catch (graphqlError) {
      console.error('Error fetching detailed user data:', graphqlError);
      // Continue with just the dbUser data
    }

    // Access the entitlements object safely
    const entitlements = ((dbUser as any).entitlements as Entitlements) || {
      viewEmails: false,
    };

    // Determine premium status based on multiple factors
    const hasViewEmails = entitlements?.viewEmails === true;
    const hasActiveSubscription = userDetail?.billing_org?.status === 'active';
    const hasCredits = ((dbUser as any).credits || 0) > 0;
    const hasHigherLimits =
      (entitlements?.listsCount || 0) > 10 ||
      (entitlements?.groupsCount || 0) > 3;

    // Get plan information
    const planType = userDetail?.billing_org?.plan || 'none';
    const planStatus = userDetail?.billing_org?.status || 'inactive';
    const billingOrgId =
      userDetail?.billing_org_id || (dbUser as any).billing_org_id || null;

    // Primary premium indicator is viewEmails
    const isPremium = hasViewEmails;

    // Return complete user data with premium status details
    return res.status(200).json({
      isPremium,
      userId: dbUser.id,
      premiumDetails: {
        hasViewEmails,
        hasActiveSubscription,
        hasCredits,
        hasHigherLimits,
        entitlements: entitlements || null,
        subscriptionStatus: planStatus,
        planType: planType,
        billingOrgId: billingOrgId,
        credits: (dbUser as any).credits || 0,
        lastTransactionExpiration:
          (dbUser as any).last_transaction_expiration || null,
      },
      user: dbUser,
      userDetails: userDetail,
      _styling: {
        colorClass: isPremium ? 'admin-test-success' : 'admin-test-error',
        statusText: isPremium ? 'PREMIUM USER' : 'NON-PREMIUM USER',
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
