import { mutate } from "@/graphql/hasuraAdmin";


async function insertBillingOrg(customer_id: string, plan: string) {
  const insertBillingOrg = `
  mutation InsertBillingOrg($customer_id: String, $plan: String) {
    insert_billing_org_one(object: {customer_id: $customer_id, plan: $plan, user_limit: 1}) {
      id
    }
  }  
  `
try {
  const data = await mutate({
    mutation: insertBillingOrg,
    variables: { customer_id, plan }
  });
  return data.data.insert_billing_org_one
  } catch (e) {
    throw e
  }
}

const BillingService = { insertBillingOrg }
export default BillingService
