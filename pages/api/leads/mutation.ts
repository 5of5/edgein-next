import { mutate } from '@/graphql/hasuraAdmin';
import {
  CreateLeadsReqSchemaType,
  CreateLeadsSegmentationReqSchemaType,
} from './schema';
import { camelCaseToSnakeCaseRecursively } from '@/utils/helpers';

const CREATE_LEADS_MUTATION = `mutation InsertLeads($converted_userid: Int, $campaign_id: String, $company_name: String, $email: String, $email_domain: String, $first_name: String, $instantly_id: String, $last_name: String, $linkedin_url: String, $phone: String, $source: String, $website: String) {
    insert_leads(objects: {converted_userid: $converted_userid, campaign_id: $campaign_id, company_name: $company_name, email: $email, email_domain: $email_domain, first_name: $first_name, instantly_id: $instantly_id, last_name: $last_name, linkedin_url: $linkedin_url, phone: $phone, source: $source, website: $website}) {
      affected_rows
    }
  }
`;

const CREATE_LEADS_SEGMENTATION_MUTATION = `mutation InsertLeadsSegmentation($name: String, $description: String, $sql: String, $campaign_id: String) {
  insert_leads_segmentation(objects: {name: $name, description: $description, sql: $sql, campaign_id: $campaign_id}) {
    affected_rows
  }
}
`;

type InsertMutationReturnType<T extends string> = {
  [key in `insert_${T}`]: {
    affected_rows: number;
  };
};

export const createLeads = async (variables: CreateLeadsReqSchemaType) => {
  const result = await mutate<InsertMutationReturnType<'leads'>>({
    mutation: CREATE_LEADS_MUTATION,
    variables: camelCaseToSnakeCaseRecursively(variables),
  });

  if (result.data.insert_leads.affected_rows == 0) {
    throw new Error('Failed to create leads');
  }
};

export const createLeadsSegmentation = async (
  variables: CreateLeadsSegmentationReqSchemaType,
) => {
  const result = await mutate<InsertMutationReturnType<'leads_segmentation'>>({
    mutation: CREATE_LEADS_SEGMENTATION_MUTATION,
    variables: camelCaseToSnakeCaseRecursively(variables),
  });

  if (result.data.insert_leads_segmentation.affected_rows == 0) {
    throw new Error('Failed to create leads segmentation');
  }
};
