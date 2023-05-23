import { mutate, query } from "../../../graphql/hasuraAdmin";
import {
  InsertActionMutation,
  InsertActionDocument,
  GetDataPartnerByApiKeyQuery,
  GetDataFieldByPathDocument,
  GetDataPartnerByApiKeyDocument,
  GetDataFieldByPathQuery,
  InsertDataRawMutation,
  InsertDataRawDocument,
  MarkDataRawAsInactiveMutation,
  MarkDataRawAsInactiveDocument,
  GetInvestmentRoundByRoundIdQuery,
  GetInvestmentRoundByRoundIdDocument,
  InsertDataDiscardMutation,
  InsertDataDiscardDocument,
} from "../../../graphql/types";
// import { HttpError } from "react-admin";
// import { getUpdatedDiff } from "./helpers";
import * as util from 'util';
import {
  ActionType,
  ResourceTypes,
  NODE_NAME,
  isResourceType,
  tags
} from '../../../utils/constants';


export const partnerLookUp = async (apiKey: string) => {
  const {
    data: {
      data_partners: [data_partner],
    },
  } = await query<GetDataPartnerByApiKeyQuery>({
    query: GetDataPartnerByApiKeyDocument,
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
  } = await query<GetDataFieldByPathQuery>({
    query: GetDataFieldByPathDocument,
    variables: { path },
  });
  return data_field;
};

export const insertDataRaw = async (data: Array<Record<string, any>>) => {
  const response = await mutate<InsertDataRawMutation>({
    mutation: InsertDataRawDocument,
    variables: { input: data },
  });
  return response.data.insert_data_raw?.returning;
};

export const insertDataDiscard = async (data: Array<Record<string, any>>) => {
  const response = await mutate<InsertDataDiscardMutation>({
    mutation: InsertDataDiscardDocument,
    variables: { input: data },
  });
  return response.data.insert_data_discard?.returning;
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
  await mutate<MarkDataRawAsInactiveMutation>({
    mutation: MarkDataRawAsInactiveDocument,
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
  const { data } = await mutate<InsertActionMutation>({
    mutation: InsertActionDocument,
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
  return data.insert_actions_one;
};

// export const onSubmitData = (
//   type: string,
//   transformInput: any,
//   method: "POST" | "PUT" | "DELETE",
// ) => {
//   const resource =
//     method === "DELETE"
//       ? transformInput.previousData
//       : getUpdatedDiff(transformInput.previousData, transformInput.data);
//   return fetch("/api/submit-data/", {
//     method,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       partner_api_key: process.env.NEXT_PUBLIC_PARTNER_API_KEY,
//       resource_type: type,
//       resource_identifier: [{ field: "id", value: transformInput.id }],
//       resource,
//       force_update: true
//     }),
//   })
//     .then((res) => {
//       if (!res.ok) {
//         return Promise.reject(res);
//       }
//       return res.json();
//     })
//     .then(({ id }) => {
//       return { data: { ...transformInput.data, id } };
//     })
//     .catch((err) => {
//       return err.json().then((body: any) => {
//         return Promise.reject(new HttpError(body.message, err.status, body));
//       });
//     });
// };

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
    Object.getPrototypeOf(value) === Object.prototype &&
    Object.values(value).every(item => !item)) ||
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
  const actions: number[] = [];

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
      let dataField = await fieldLookup(`${fieldPathLookup}.${field}`);
      if (dataField === undefined || (dataField?.restricted_admin))
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
        if (!validateValue(resourceType, field, transformedValue)){
          const dataObject = [
            {
              resource: resourceType,
              field,
              value: resourceObj[field],
              partner: partnerId,
              accuracy_weight: 1,
              resource_id: resourceId,
            }
          ];
          const data = await insertDataDiscard(dataObject);
          continue;
        }

        if ((!existedData || notInsertValueType(existedData[field]) && !notInsertValueType(value)) 
            || forceUpdate)
          setMainTableValues[field] = transformedValue;

        validData.push({
          created_at: currentTime,
          partner: partnerId,
          resource: resourceType,
          resource_id: resourceId,
          field,
          value: transformedValue === null ? "" : transformedValue,
          accuracy_weight: 1,
        });

        const actionResponse = await insertActionDataChange(
          actionType,
          resourceId,
          resourceType,
          { [field]: value },
          partnerId
        );
        actions.push(actionResponse?.id || 0);
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

  return { id: resourceId, actions, resources: invalidData.concat(insertResult || []) };
};


export const getCompanyByRoundId = async (round_id: number) => {
  const {
    data: { investment_rounds }
  } = await query<GetInvestmentRoundByRoundIdQuery>({
    query: GetInvestmentRoundByRoundIdDocument,
    variables: { round_id },
  });
  return investment_rounds[0];
}
