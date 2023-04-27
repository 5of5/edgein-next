import { mutate , query} from "@/graphql/hasuraAdmin";
import {
  GetBillingOrgByCustomerIdDocument,
  GetBillingOrgByCustomerIdQuery,
  InsertBillingOrgDocument,
  InsertBillingOrgMutation,
  UpdateBillingOrgDocument,
  UpdateBillingOrgMutation,
} from "@/graphql/types";


async function insertBillingOrg(customer_id: string, status: string, plan: string) {
try {
  const data = await mutate<InsertBillingOrgMutation>({
    mutation: InsertBillingOrgDocument,
    variables: { customer_id, plan, status }
  });
  return data.data.insert_billing_org_one
  } catch (e) {
    throw e
  }
}

async function getBillingOrgByCustomerId(customerId: string) {
try {
  const data = await query<GetBillingOrgByCustomerIdQuery>({
    query: GetBillingOrgByCustomerIdDocument,
    variables: { customerId }
  });
  return data.data.billing_org[0]
  } catch (e) {
    throw e
  }
}

async function updateBillingOrg(id: number, status: string) {
try {
  const data = await mutate<UpdateBillingOrgMutation>({
    mutation: UpdateBillingOrgDocument,
    variables: { id, status }
  });
  return data.data.update_billing_org_by_pk
  } catch (e) {
    throw e
  }
}

const BillingService = { insertBillingOrg, updateBillingOrg, getBillingOrgByCustomerId }
export default BillingService
