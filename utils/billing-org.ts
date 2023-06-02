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

const BillingService = {
  insertBillingOrg,
  updateBillingOrg,
  updateBillingOrgCustomerId,
  getBillingOrgByCustomerId,
  getBillingOrgById,
};
export default BillingService;
