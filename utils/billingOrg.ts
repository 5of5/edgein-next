import { mutate , query} from "@/graphql/hasuraAdmin";


async function insertBillingOrg(customer_id: string, status: string, plan: string) {
  const insertBillingOrg = `
  mutation InsertBillingOrg($customer_id: String, $status: String, $plan: String) {
    insert_billing_org_one(object: {customer_id: $customer_id, status: $status, plan: $plan, user_limit: 1}) {
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

async function getBillingOrgByCustomerId(customerId: string) {
  const getBillingOrgByCustomerId = `
  query GetBillingOrgByCustomerId($customerId: String = "") {
    billing_org(where: {customer_id: {_eq: $customerId}}) {
      customer_id
      id
      plan
      status
      user_limit
    }
  }
  
  `
try {
  const data = await query({
    query: getBillingOrgByCustomerId,
    variables: { customerId }
  });
  return data.data.billing_org[0]
  } catch (e) {
    throw e
  }
}

async function updateBillingOrg(id: string, status: string) {
  const updateBillingOrg = `
  mutation UpdateBillingOrg($id: Int!, $status: String = "") {
    update_billing_org_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
      id
      status
    }
  }
  
  `
try {
  const data = await mutate({
    mutation: updateBillingOrg,
    variables: { id, status }
  });
  return data.data.update_billing_org_by_pk
  } catch (e) {
    throw e
  }
}

const BillingService = { insertBillingOrg, updateBillingOrg, getBillingOrgByCustomerId }
export default BillingService
