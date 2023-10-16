import { mutate } from '@/graphql/hasuraAdmin';
import {
  CreateLeadsReqSchemaType,
  CreateLeadsSegmentationReqSchemaType,
} from './schema';
import { camelCaseToSnakeCaseRecursively } from '@/utils/helpers';
import {
  InsertLeadsDocument,
  InsertLeadsMutation,
  InsertLeadsSegmentationDocument,
  InsertLeadsSegmentationMutation,
} from '@/graphql/types';

export const createLeads = async (variables: CreateLeadsReqSchemaType) => {
  const result = await mutate<InsertLeadsMutation>({
    mutation: InsertLeadsDocument,
    variables: { object: camelCaseToSnakeCaseRecursively(variables) },
  });

  if (!result.data.insert_leads_one?.id) {
    throw new Error('Failed to create leads');
  }
};

export const createLeadsSegmentation = async (
  variables: CreateLeadsSegmentationReqSchemaType,
) => {
  const result = await mutate<InsertLeadsSegmentationMutation>({
    mutation: InsertLeadsSegmentationDocument,
    variables: { object: camelCaseToSnakeCaseRecursively(variables) },
  });

  if (!result.data.insert_leads_segmentation_one?.id) {
    throw new Error('Failed to create leads segmentation');
  }
};
