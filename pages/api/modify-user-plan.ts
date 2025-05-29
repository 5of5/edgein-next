import type { NextApiRequest, NextApiResponse } from 'next';
import UserService from '../../utils/users';
import BillingService from '../../utils/billing-org';
import { runGraphQl } from '@/utils';

// Type definition for GraphQL response
interface UserDetailsResponse {
  data?: {
    users_by_pk?: {
      id: number;
      email: string;
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

// Interface for the user data we need
interface UserData {
  id: number;
  billing_org_id?: number | string;
}

// This API route allows admins to modify a user's plan status
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get parameters from request body
  const { userId, status, plan } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Get user from database
    const user = await UserService.findOneUserById(Number(userId));

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user doesn't have a billing org, create one
    if (!user.billing_org_id) {
      // Create a mock customer ID if none exists
      const mockCustomerId = `manual_${user.id}_${Date.now()}`;

      // Create a new billing org
      const billingOrg = await BillingService.insertBillingOrg(
        mockCustomerId,
        status || 'active',
        plan || 'contributor',
      );

      // Link the billing org to the user
      if (billingOrg) {
        await UserService.updateBillingOrg(Number(userId), billingOrg.id);
      }
    } else {
      // Get existing billing org
      const billingOrg = await BillingService.getBillingOrgById(
        Number(user.billing_org_id),
      );

      if (billingOrg) {
        // Update existing billing org with both status and plan
        await BillingService.updateBillingOrgWithPlan(
          billingOrg.id,
          status || 'active',
          plan || 'contributor',
        );
      }
    }

    // Get updated user data
    const updatedUser = await UserService.findOneUserById(Number(userId));

    // Get additional user data
    let userDetails: UserDetailsResponse = {};
    try {
      const GET_USER_DETAILS = `
        query GetUserDetails($id: Int!) {
          users_by_pk(id: $id) {
            id
            email
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
        { id: updatedUser.id },
        { 'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET },
      );

      userDetails = result as UserDetailsResponse;
    } catch (graphqlError) {
      console.error('Error fetching updated user details:', graphqlError);
      // Continue without the detailed data
    }

    // Safely access the billing_org property with proper type checking
    const billingOrg = userDetails?.data?.users_by_pk?.billing_org || null;

    return res.status(200).json({
      success: true,
      message: `User plan has been updated to ${plan || 'contributor'} (${
        status || 'active'
      })`,
      user: updatedUser,
      billingDetails: billingOrg,
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
