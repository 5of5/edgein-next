import { mutate } from '@/graphql/hasuraAdmin';
import {
  CreateLeadsReqSchemaType,
  CreateLeadsSegmentationReqSchemaType,
} from './schema';
import { camelCaseToSnakeCaseRecursively } from '@/utils/helpers';
import {
  InsertLeadsDocument,
  InsertLeadsSegmentationDocument,
} from '@/graphql/types';

type InsertMutationReturnType<T extends string> = {
  [key in `insert_${T}`]: {
    id: number;
  };
};

export const createLeads = async (variables: CreateLeadsReqSchemaType) => {
  const result = await mutate<InsertMutationReturnType<'leads'>>({
    mutation: InsertLeadsDocument,
    variables: { object: camelCaseToSnakeCaseRecursively(variables) },
  });

  if (!result.data.insert_leads.id) {
    throw new Error('Failed to create leads');
  }
};

export const createLeadsSegmentation = async (
  variables: CreateLeadsSegmentationReqSchemaType,
) => {
  const result = await mutate<InsertMutationReturnType<'leads_segmentation'>>({
    mutation: InsertLeadsSegmentationDocument,
    variables: { object: camelCaseToSnakeCaseRecursively(variables) },
  });

  if (!result.data.insert_leads_segmentation.id) {
    throw new Error('Failed to create leads segmentation');
  }
};
