
import { mutate, query } from "@/graphql/hasuraAdmin";
import { Data_Fields } from "@/graphql/types";
import { User } from "@/models/User";
import { HttpError } from "react-admin";
import { getUpdatedDiff } from "./helpers";
import * as util from 'util';
import { tags } from './constants';


export type ActionType = "Insert Data" | "Change Data" | "Delete Data";
export type ResourceTypes =
  | "companies"
  | "vc_firms"
  | "people"
  | "blockchains"
  | "coins"
  | "investment_rounds"
  | "investments"
  | "team_members"
  | "investors"
  | "events"
  | "event_person"
  | "event_organization"
  | "resource_links"
  | "news"
  | "news_organizations"
;

export const NODE_NAME: Record<ResourceTypes, string> = {
  companies: "company",
  vc_firms: "vc_firm",
  people: "people",
  blockchains: "blockchain",
  coins: "coin",
  investment_rounds: "investment_round",
  investments: "investment",
  team_members: "team_member",
  investors: "investor",
  events: "event",
  event_person: "event_person",
  event_organization: "event_organization",
  resource_links: "resource_link",
  news: "news",
  news_organizations: "news_organization"
};

const isResourceType = (resourceType: string): resourceType is ResourceTypes => {
  return [
    "companies",
    "vc_firms",
    "people",
    "blockchains",
    "coins",
    "investment_rounds",
    "investments",
    "team_members",
    "investors",
    "events",
    "event_person",
    "event_organization",
    "resource_links",
    "news"
  ].includes(resourceType);
}

export const partnerLookUp = async (apiKey: string) => {
  const {
    data: {
      data_partners: [data_partner],
    },
  } = await query({
    query: `
    query lookup_data_partner($apiKey: String!) {
      data_partners(where: {api_key: {_eq: $apiKey}}) {
        id
        name
        api_key
      }
    }`,
    variables: { apiKey },
  });
  return data_partner;
};

export const resourceIdLookup = async (
  resourceType: ResourceTypes,
  resourceIdentifier: Array<Record<string, any>>,
) => {
  if (!resourceIdentifier) {
    return undefined;
  }

  try {
    let argumentList: Array<string> = [];
    let filterClauses: Array<string> = [];
    let variables: Record<string, any> = {};
    for (const item of resourceIdentifier) {
      if (!item.field || ! item.value)
        continue;

      let identifierMethod = item.method;
      if (!identifierMethod)
        identifierMethod = '_eq';

      argumentList.push(`$${item.field}: ${typeof item.value === 'number' || item.field === 'id' ? 'Int!' : 'String!'}`);
      filterClauses.push(`{${item.field}:{${identifierMethod}:$${item.field}}}`);
      variables[item.field] = item.value;
    }

    if (argumentList.length == 0)
      return;

    const { data } = await query({
      query: `
      query lookup_resource(${argumentList.join(', ')}) {
        ${resourceType}(where: {_and: [${filterClauses.join(', ')}]}) {
          id
        }
      }`,
      variables,
    });

    return data[resourceType][0].id;
  } catch (e) {
    return;
  }
};

export const fieldLookup = async (path: string) => {
  const {
    data: {
      data_fields: [data_field],
    },
  } = await query({
    query: `
    query lookup_data_field($path: String!) {
      data_fields(where: {path: {_eq: $path}}) {
        name
        resource
        weight
        regex_transform
        description
        regex_test
        is_valid_identifier
        restricted_admin
        data_type
      }
    }
    `,
    variables: { path },
  });
  return data_field;
};

export const insertDataRaw = async (data: Array<Record<string, any>>) => {
  const {
    data: {
      insert_data_raw: { returning },
    },
  } = await mutate({
    mutation: `
    mutation submit_data_raw($input: [data_raw_insert_input!]!) {
      insert_data_raw(objects: $input) {
        returning {
          id
          created_at
          resource
          resource_id
          field
          value
          accuracy_weight
        }
      }
    }
    `,
    variables: { input: data },
  });
  return returning;
};

export const updateMainTable = async (resourceType: ResourceTypes, id: Number, setValues: Record<string, any>) => {
  await mutate({
    mutation: `
    mutation update_main_table($id: Int!, $setValues: ${resourceType}_set_input!) {
      update_${resourceType}(_set: $setValues, where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
    `,
    variables: { id, setValues },
  });
};

export const deleteMainTableRecord = async (resourceType: ResourceTypes, id: Number) => {
  await mutate({
    mutation: `
      mutation delete_main_table_record($id: Int!) {
        delete_${resourceType}(where: {id: {_eq: $id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
};

export const markDataRawAsInactive = async (resourceType: ResourceTypes, resourceId: Number) => {
  await mutate({
    mutation: `
      mutation mark_data_raw_as_inactive($resourceType: String!, $resourceId: Int!) {
        update_data_raw(
          _set: { is_active: false },
          where: {
            _and: [
              {resource: {_eq: $resourceType}},
              {resource_id: {_eq: $resourceId}}
            ]
          }
        ) {
          affected_rows
        }
      }
    `,
    variables: {
      resourceType,
      resourceId,
    },
  });
};

export const insertActionDataChange = async (
  actionType: ActionType,
  resourceId: Number,
  resourceType: ResourceTypes,
  properties: Record<string, any>,
  userId?: Number,
  partnerId?: Number,
) => {
  const { data } = await mutate({
    mutation: `
      mutation InsertAction($object: actions_insert_input!) {
        insert_actions_one(
          object: $object
        ) {
          id
        }
      }
    `,
    variables: {
      object: {
        action: actionType,
        page: `/admin/app/#/${resourceType}/${resourceId}`,
        properties,
        resource_id: resourceId,
        resource: resourceType,
        user: userId,
        partner: partnerId,
      },
    },
  });
  return data?.[`insert_actions_one`];
};

export const onSubmitData = (
  type: string,
  transformInput: any,
  method: "POST" | "PUT" | "DELETE",
) => {
  const resource =
    method === "DELETE"
      ? transformInput.previousData
      : getUpdatedDiff(transformInput.previousData, transformInput.data);
  return fetch("/api/submit_data/", {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      partner_api_key: process.env.NEXT_PUBLIC_PARTNER_API_KEY,
      resource_type: type,
      resource_identifier: [{ field: "id", value: transformInput.id }],
      resource,
      force_update: true
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then(({ id }) => {
      return { data: { ...transformInput.data, id } };
    })
    .catch((err) => {
      return err.json().then((body: any) => {
        return Promise.reject(new HttpError(body.message, err.status, body));
      });
    });
};

export const insertResourceData = async (
  resourceType: ResourceTypes,
  properties: Record<string, any>
) => {
  const { data } = await mutate({
    mutation: `
      mutation insert_${resourceType}($object: ${resourceType}_insert_input!) {
        insert_${resourceType}_one(object: $object) {
            id
        }
      }
    `,
    variables: {
      object: properties,
    },
  });
  return data?.[`insert_${resourceType}_one`];
};

const notInsertValueType = (value: any) =>
  value === undefined || value === "" ||
  value === null ||
  (value &&
    Object.keys(value).length === 0 &&
    Object.getPrototypeOf(value) === Object.prototype) ||
  (value && Array.isArray(value) && value.length === 0);

const mainTableLookup = async (resourceType: ResourceTypes, id: any, returnFields: Array<string>) => {
  const { data } = await query({
    query: `
    query lookup_${resourceType}($id: Int) {
      ${resourceType}(where: {id: {_eq: $id}}) {
        ${returnFields.join(' ')}
      }
    }
    `,
    variables: { id },
  });
  return data[resourceType][0];
};

const formatValue = (data: any, dataType: string) => {
  try {
    let retValue: any = data;
    switch (dataType) {
      case 'json':
        retValue = JSON.parse(data);
        break;
      case 'number':
        retValue = parseInt(data);
        break;
      case 'float':
        retValue = parseFloat(data);
        break;
      case 'string':
        retValue = JSON.stringify(data);
        break;
    }
    return retValue;
  } catch { return; }
};

const validateValue = (resourceType: ResourceTypes, field: string, value: any) => {
  let isValidated = true
  switch (resourceType) {
    case 'companies':
    case 'vc_firms':
      if (field === 'tags' && !value.every((tag: string) => tags.map(item => item.id).includes(tag)) )
        isValidated = false;
      break;
  }

  return isValidated;
};

export const mutateActionAndDataRaw = async (
  partnerId: number,
  user: User | null,
  fieldPathLookup: string,
  resourceId: number,
  resourceObj: Record<string, any>,
  resourceType: ResourceTypes,
  actionType: ActionType,
  forceUpdate: Boolean
) => {
  const currentTime = new Date();
  let validData: Array<Record<string, any>> = [];
  let invalidData: Array<Record<string, any>> = [];
  let setMainTableValues: Record<string, any> = {};
  let action;

  let existedData;
  if (actionType == 'Change Data') {
    existedData = await mainTableLookup(resourceType, resourceId, Object.keys(resourceObj));
  }

  for (let field in resourceObj) {
    let value = resourceObj[field];
    // If field is lookup pattern <resource_type>:<field>
    // we convert the field to <resource_type>_id and lookup for its value
    if (field.includes(':') && field.split(':').length == 2) {
      let [lookupResourceType, lookupField] = field.split(':');
      if (isResourceType(lookupResourceType)) {
        let lookupResource: string = NODE_NAME[lookupResourceType]
        if (await fieldLookup(`${lookupResource}.${lookupField}`)) {
          value = await resourceIdLookup(lookupResourceType, [{field: lookupField, value}]);
          field = lookupResource === 'people' ? 'person_id' : `${lookupResource}_id`;
        } else {
          invalidData.push({
            resource: lookupResourceType,
            lookupField,
            message: "Invalid Field",
          });
          continue;
        }
      } else {
        invalidData.push({
          resource: lookupResourceType,
          lookupField,
          message: "Invalid Resource Type",
        });
        continue;
      }
    }

    if ((actionType === "Insert Data" && !notInsertValueType(value)) || actionType === "Change Data") {
      let dataField: Data_Fields = await fieldLookup(`${fieldPathLookup}.${field}`);
      if (dataField === undefined || (dataField?.restricted_admin && user?.role !== "admin"))
        invalidData.push({
          resource: resourceType,
          field,
          message: "Invalid Field",
        });
      else {
        let transformedValue = value
        if (dataField.regex_transform)
          transformedValue = util.format(dataField.regex_transform, transformedValue);
        if (dataField.data_type)
          transformedValue = formatValue(transformedValue, dataField.data_type);
        if (!validateValue(resourceType, field, transformedValue))
          continue;

        if (!existedData || notInsertValueType(existedData[field]) || forceUpdate)
          setMainTableValues[field] = transformedValue;

        validData.push({
          created_at: currentTime,
          partner: partnerId,
          user_id: user?.id,
          resource: resourceType,
          resource_id: resourceId,
          field,
          value: transformedValue === null ? "" : transformedValue,
          accuracy_weight: 1,
        });

        action = await insertActionDataChange(
          actionType,
          resourceId,
          resourceType,
          { [field]: value },
          user?.id,
          partnerId
        );
      }
    }
  }

  if (actionType === "Change Data")
    await updateMainTable(resourceType, resourceId, setMainTableValues);
  else if (actionType === "Insert Data") {
      const response = await insertResourceData(resourceType, setMainTableValues);
      resourceId = response?.id
      validData.forEach(data => data.resource_id = resourceId);
  }

  const insertResult = await insertDataRaw(validData);

  return { id: resourceId, action, resources: invalidData.concat(insertResult) };
};


export const getCompanyByRoundId = async (round_id: number) => {
  const {
    data: { investment_rounds }
  } = await query({
    query: `
      query findCompanyByRoundId($round_id: Int!) {
        investment_rounds(where: {id: {_eq: $round_id}}) {
          id
          company_id
        }
      }
    `,
    variables: { round_id },
  });
  return investment_rounds[0];
}
