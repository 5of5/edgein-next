import { mutate, query } from '@/graphql/hasuraAdmin';

type EntityName = keyof typeof SIMPLE_RELATIONS | 'resource_links';

type UpdateMutationReturnType<T extends EntityName> = {
  data: {
    [key in `update_${T}`]: {
      affected_rows: number;
      returning: {
        id: number;
      }[];
    };
  };
};

export const SIMPLE_RELATIONS = {
  // company_id
  coins: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('coins', oldId, newId),
  // company_id
  event_organization: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('event_organization', oldId, newId),
  // company_id
  investment_rounds: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('investment_rounds', oldId, newId),
  // company_id
  news_organizations: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('news_organizations', oldId, newId),
  // company_id
  team_members: (oldId: string, newId: string) =>
    BASIC_UPDATE_ID_MUTATION('team_members', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  actions: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('actions', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  data_discard: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('data_discard', oldId, newId),
  // resource == companies
  // rescource_id == company_id
  data_raw: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('data_raw', oldId, newId),
  // resource_type == companies
  // rescource_id == company_id
  follows: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('follows', oldId, newId, 'resource_type'),
  // resource_type == companies
  // rescource_id == company_id
  notes: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION('notes', oldId, newId, 'resource_type'),
  // notification_resource_type == companies
  // company_id == company_id
  notifications: (oldId: string, newId: string) =>
    ADVANCED_UPDATE_ID_MUTATION(
      'notifications',
      oldId,
      newId,
      'notification_resource_type',
      'company_id',
    ),
  // resource == companies
  // rescource_id == company_id
  resource_edit_access: async (oldId: string, newId: string) => {
    const result = await query({
      query: `
        query check_resource_edit_access($id: Int!) {
          resource_edit_access(
            where: {
              _and: {
                resource_id: { _eq: $id }
                resource_type: { _eq: "companies" }
              }
            },
          ) {
            id
          }
        }
      `,
      variables: {
        id: newId,
      },
    });

    if (result.data.resource_edit_access) {
      return undefined;
    }

    return ADVANCED_UPDATE_ID_MUTATION(
      'resource_edit_access',
      oldId,
      newId,
      'resource_type',
    );
  },
} as const;

export const COMPLICATED_RELATIONS = {
  // from_company_id == company_id
  resource_links_from: (oldId: string, newId: string) =>
    RESOURCE_LINKS_UPDATE_ID_MUTATION('from', oldId, newId),
  // to_company_id == company_id
  resource_links_to: (oldId: string, newId: string) =>
    RESOURCE_LINKS_UPDATE_ID_MUTATION('to', oldId, newId),
} as const;

// Updates company_id by a dynamically created mutation
const BASIC_UPDATE_ID_MUTATION = (
  entityName: EntityName,
  oldId: string,
  newId: string,
) =>
  mutate<UpdateMutationReturnType<typeof entityName>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_${entityName}(
          where: {
            company_id: { _eq: $oldId }
          },
          _set: {
            company_id: $newId
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });

const ADVANCED_UPDATE_ID_MUTATION = (
  entityName: EntityName,
  oldId: string,
  newId: string,
  resourceTypeFieldName = 'resource',
  resourceIdFieldName = 'resource_id',
) =>
  mutate<UpdateMutationReturnType<typeof entityName>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_${entityName}(
          where: {
            _and: {
              ${resourceIdFieldName}: { _eq: $oldId }
              ${resourceTypeFieldName}: { _eq: "companies" }
            }
          },
          _set: {
            ${resourceIdFieldName}: $newId
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });

const RESOURCE_LINKS_UPDATE_ID_MUTATION = (
  direction: 'from' | 'to',
  oldId: string,
  newId: string,
) =>
  mutate<UpdateMutationReturnType<'resource_links'>>({
    mutation: `
      mutation update_company_id($oldId: Int!, $newId: Int!) {
        update_resource_links(
          where: {
            ${direction}_company_id: { _eq: $oldId }
          },
          _set: {
            ${direction}_company_id: $newId
          }
        ) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    variables: {
      oldId,
      newId,
    },
  });
