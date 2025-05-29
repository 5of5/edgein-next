import { mutate, query } from '@/graphql/hasuraAdmin';
import {
  GetBillingOrgByCustomerIdDocument,
  GetBillingOrgByCustomerIdQuery,
  InsertBillingOrgDocument,
  InsertBillingOrgMutation,
  UpdateBillingOrgDocument,
  UpdateBillingOrgMutation,
  UpdateBillingOrgCustomerIdMutation,
  UpdateBillingOrgCustomerIdDocument,
  GetBillingOrgByIdDocument,
  GetBillingOrgByIdQuery,
} from '@/graphql/types';

async function insertBillingOrg(
  customer_id: string,
  status: string,
  plan: string,
) {
  const data = await mutate<InsertBillingOrgMutation>({
    mutation: InsertBillingOrgDocument,
    variables: { customer_id, plan, status },
  });
  return data.data.insert_billing_org_one;
}

async function getBillingOrgByCustomerId(customerId: string) {
  const data = await query<GetBillingOrgByCustomerIdQuery>({
    query: GetBillingOrgByCustomerIdDocument,
    variables: { customerId },
  });
  return data.data.billing_org[0];
}

async function getBillingOrgById(id: number) {
  const data = await query<GetBillingOrgByIdQuery>({
    query: GetBillingOrgByIdDocument,
    variables: { id },
  });
  return data.data.billing_org[0];
}

async function updateBillingOrg(id: number, status: string) {
  const data = await mutate<UpdateBillingOrgMutation>({
    mutation: UpdateBillingOrgDocument,
    variables: { id, status },
  });
  return data.data.update_billing_org_by_pk;
}

async function updateBillingOrgCustomerId(
  id: number,
  customerId: string,
  status: string,
) {
  const data = await mutate<UpdateBillingOrgCustomerIdMutation>({
    mutation: UpdateBillingOrgCustomerIdDocument,
    variables: { id, customerId, status },
  });
  return data.data.update_billing_org_by_pk;
}

// New function to update both status and plan
async function updateBillingOrgWithPlan(
  id: number,
  status: string,
  plan: string,
) {
  try {
    // Direct GraphQL mutation since we don't have a generated type for this
    const data = await mutate({
      mutation: `
        mutation UpdateBillingOrgWithPlan($id: Int!, $status: String!, $plan: String!) {
          update_billing_org_by_pk(
            pk_columns: { id: $id },
            _set: { status: $status, plan: $plan }
          ) {
            id
            status
            plan
            customer_id
          }
        }
      `,
      variables: { id, status, plan },
    });
    return data.data.update_billing_org_by_pk;
  } catch (error) {
    console.error('Error updating billing org with plan:', error);
    throw error;
  }
}

const BillingService = {
  insertBillingOrg,
  updateBillingOrg,
  updateBillingOrgCustomerId,
  updateBillingOrgWithPlan,
  getBillingOrgByCustomerId,
  getBillingOrgById,
};
export default BillingService;
