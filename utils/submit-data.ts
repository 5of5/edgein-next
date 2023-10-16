import { mutate, query } from '@/graphql/hasuraAdmin';
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
} from '@/graphql/types';
import { User } from '@/models/user';
import { HttpError } from 'react-admin';
import { getUpdatedDiff } from './helpers';
import * as util from 'util';
import {
  ActionType,
  ResourceTypes,
  NODE_NAME,
  isResourceType,
  RESOURCE_TYPES_CONTAIN_LIBRARY,
} from './constants';
import { USER_ROLES } from './users';
import CookieService from '@/utils/cookie';
import { CommonRequest, CommonResponse } from './api';

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
    const argumentList: Array<string> = [];
    const filterClauses: Array<string> = [];
    const variables: Record<string, any> = {};
    for (const item of resourceIdentifier) {
      if (!item.field || !item.value) continue;

      let identifierMethod = item.method;
      if (!identifierMethod) identifierMethod = '_eq';

      argumentList.push(
        `$${item.field}: ${typeof item.value === 'number' || item.field === 'id'
          ? 'Int!'
          : 'String!'
        }`,
      );
      filterClauses.push(
        `{${item.field}:{${identifierMethod}:$${item.field}}}`,
      );
      variables[item.field] = item.value;
    }

    if (argumentList.length == 0) return;

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

export const updateMainTable = async (
  resourceType: ResourceTypes,
  id: Number,
  setValues: Record<string, any>,
) => {
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

export const deleteMainTableRecord = async (
  resourceType: ResourceTypes,
  id: Number,
) => {
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

export const markDataRawAsInactive = async (
  resourceType: ResourceTypes,
  resourceId: Number,
) => {
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

export const onSubmitData = (
  type: string,
  transformInput: any,
  method: 'POST' | 'PUT' | 'DELETE',
) => {
  const resource =
    method === 'DELETE'
      ? transformInput.previousData
      : getUpdatedDiff(transformInput.previousData, transformInput.data);
  return fetch('/api/submit-data/', {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      partner_api_key: process.env.NEXT_PUBLIC_PARTNER_API_KEY,
      resource_type: type,
      resource_identifier: [{ field: 'id', value: transformInput.id }],
      resource,
      force_update: true,
    }),
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then(data => {
      const hasError = data.find((item: any) => item.error);
      if (hasError) {
        return Promise.reject(new HttpError(hasError.error[0]?.message, 400));
      }
      return { data: { ...transformInput.data, id: data[0]?.id } };
    });
};

export const insertResourceData = async (
  resourceType: ResourceTypes,
  properties: Record<string, any>,
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
  value === undefined ||
  value === '' ||
  value === null ||
  (value &&
    Object.getPrototypeOf(value) === Object.prototype &&
    Object.values(value).every(item => !item)) ||
  (value &&
    Object.keys(value).length === 0 &&
    Object.getPrototypeOf(value) === Object.prototype) ||
  (value && Array.isArray(value) && value.length === 0);

const mainTableLookup = async (
  resourceType: ResourceTypes,
  id: any,
  returnFields: Array<string>,
) => {
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
  } catch {
    return;
  }
};

const notFoundAction = async (
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
) => {
  let relatedType: ResourceTypes;
  let data: Record<string, any>;
  if (resourceType === 'news_person') {
    relatedType = 'news_related_person';
    data = {
      news_id: resourceObj.news_id,
      name: resourceObj['people:name'],
      type: 'subject',
    };
  } else if (resourceType === 'news_organizations') {
    relatedType = 'news_related_organizations';
    data = {
      news_id: resourceObj.news_id,
      name: resourceObj['companies:name'],
      type: 'subject',
    };
  } else {
    return;
  }

  await mutate({
    mutation: `
      mutation insert_${relatedType}($object: ${relatedType}_insert_input!) {
        insert_${relatedType}_one(object: $object) {
            id
        }
      }
    `,
    variables: {
      object: data,
    },
  });
};

type validateAndTransformFieldReturn = 
  { success: true, validData: Record<string, any>} |
  { success: false, invalidData: Record<string, any>}

export const validateAndTransformField = async (fieldPathLookup: string, field: string, isAdmin: boolean, resourceType: ResourceTypes, resourceObj: Record<string, any>, library: Library[], currentTime: Date, partnerId: number, userId: number | undefined, resourceId: number): Promise<validateAndTransformFieldReturn> => {
  let value = resourceObj[field];
  const dataField = await fieldLookup(`${fieldPathLookup}.${field}`);
  if (
    dataField === undefined ||
    (dataField?.restricted_admin && isAdmin)
  )
    return {
      success: false,
      invalidData: {
        resource: resourceType,
        field,
        message: 'Invalid Field',
      }
    };
  else {
    let transformedValue = value;
    if (dataField.regex_transform)
      transformedValue = util.format(
        dataField.regex_transform,
        transformedValue,
      );
    if (dataField.data_type)
      transformedValue = formatValue(transformedValue, dataField.data_type);
    if (
      !validateValue(
        resourceType,
        field,
        transformedValue,
        library,
      )
    ) {
      const dataObject = [
        {
          resource: resourceType,
          field,
          value: resourceObj[field],
          partner: partnerId,
          accuracy_weight: 1,
          resource_id: resourceId,
        },
      ];
      await insertDataDiscard(dataObject);
      return {
        success: false,
        invalidData: {}
      }
    }

    return {
      success: true,
      validData: {
        created_at: currentTime,
        partner: partnerId,
        user_id: userId,
        resource: resourceType,
        resource_id: resourceId,
        field,
        value: transformedValue === null ? '' : transformedValue,
        accuracy_weight: 1,
      }
    };
  }
}

type convertLookupFieldReturn = 
  { success: true, field: string, value: string} |
  { success: false, invalidData: Record<string, any>}

export const convertLookupField = async (resourceType: ResourceTypes, resourceId: number, resourceObj: Record<string, any>, field: string): Promise<convertLookupFieldReturn> => {
    // If field is lookup pattern <resource_type>:<field>
    // we convert the field to <resource_type>_id and lookup for its value
    let value = resourceObj[field];
    if (field.includes(':') && field.split(':').length == 2) {
      const [lookupResourceType, lookupField] = field.split(':');
      if (isResourceType(lookupResourceType)) {
        const lookupResource: string = NODE_NAME[lookupResourceType];
        if (await fieldLookup(`${lookupResource}.${lookupField}`)) {
          value = await resourceIdLookup(lookupResourceType, [
            { field: lookupField, value },
          ]);
          field =
            lookupResource === 'people' ? 'person_id' : `${lookupResource}_id`;
          if (!value && !resourceId) {
            // Insert new record but lookup value is not found
            await notFoundAction(resourceType, resourceObj);
            throw new Error(`Lookup value not found ${resourceType}`);
          }
          return { field, value, success: true };
        } else {
          return { success: false, invalidData: {
            resource: lookupResourceType,
            lookupField,
            message: 'Invalid Field',
          }};
        }
      } else {
        return { success: false, invalidData: {
          resource: lookupResourceType,
          lookupField,
          message: 'Invalid Resource Type',
        }};
      }
    }
    return { field, value, success: true };
}

export const mutateActionAndDataRaw = async (
  partnerId: number,
  user: User | null,
  fieldPathLookup: string,
  resourceId: number,
  resourceObj: Record<string, any>,
  resourceType: ResourceTypes,
  forceUpdate: Boolean,
) => {
  const currentTime = new Date();
  const validData: Array<Record<string, any>> = [];
  const invalidData: Array<Record<string, any>> = [];
  const setMainTableValues: Record<string, any> = {};
  const actions: number[] = [];

  let existedData;
  if (resourceId) {
    const returnFields = [...Object.keys(resourceObj)];
    if (RESOURCE_TYPES_CONTAIN_LIBRARY.includes(resourceType)) {
      returnFields.push('library');
    }
    existedData = await mainTableLookup(resourceType, resourceId, returnFields);
  }

  for (let field in resourceObj) {
    let value = resourceObj[field];
    const convert = await convertLookupField(resourceType, resourceId, resourceObj, field)
    if (!convert.success) {
      invalidData.push(convert.invalidData)
      continue;
    }
    field = convert.field;
    value = convert.value;

    if (notInsertValueType(value) && !resourceId) {
      continue;
    }

    const validateTransform = await validateAndTransformField(fieldPathLookup, field, user?.role === 'admin', resourceType, resourceObj, resourceObj.library || existedData.library , currentTime, partnerId, user?.id, resourceId)
    if (!validateTransform.success) {
      invalidData.push(validateTransform.invalidData)
      continue;
    }
    validData.push(validateTransform.validData)
  }

  for (let validDataIndex in validData) {
    const validDataValue = validData[validDataIndex];
    const actionResponse = await insertActionDataChange(
      resourceId ? 'Change Data' : 'Insert Data',
      resourceId,
      resourceType,
      { [validDataValue.field]: validDataValue.value },
      user?.id,
      partnerId,
    );
    actions.push(actionResponse?.id || 0);
    setMainTableValues[validDataValue.field] = validDataValue.value;
  }

  if (resourceId)
    await updateMainTable(resourceType, resourceId, setMainTableValues);
  else {
    const response = await insertResourceData(resourceType, setMainTableValues);
    resourceId = response?.id;
    validData.forEach(data => (data.resource_id = resourceId));
  }

  const insertResult = await insertDataRaw(validData);

  return {
    id: resourceId,
    actions,
    resources: invalidData.concat(insertResult || []),
  };
};

export const getCompanyByRoundId = async (round_id: number) => {
  const {
    data: { investment_rounds },
  } = await query<GetInvestmentRoundByRoundIdQuery>({
    query: GetInvestmentRoundByRoundIdDocument,
    variables: { round_id },
  });
  return investment_rounds[0];
};

export const validateRequest = async (req: CommonRequest, res: CommonResponse) => {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method as string)) {
    res.status(405).send({ message: 'Method is not allowed' });
    return;
  }
  let user: (User & { _iat?: number }) | null = null;
  try {
    const token = CookieService.getAuthToken(req.cookies);
    user = await CookieService.getUser(token);
  } catch (error) {
    user = null;
  }
  const apiKey: string = req.body.partner_api_key;
  const resourceType: ResourceTypes = req.body.resource_type;
  const resourceIdentifier:
    | Array<Array<Record<string, any>>>
    | Array<Record<string, any>> = req.body.resource_identifier;
  const resourceObj: Array<Record<string, any>> | Record<string, any> =
    req.body.resource;

  let partnerId = 0;

  if (
    apiKey === undefined ||
    resourceIdentifier === undefined ||
    resourceObj === undefined ||
    resourceType === undefined
  ) {
    res.status(400).send({ message: 'Bad Request' });
    return;
  }

  // Identify partner or admin
  const partner = await partnerLookUp(apiKey);
  if (partner?.id === undefined) {
    if (!(user?.role === 'admin')) {
      res.status(401).send({ message: 'Unauthorized Partner' });
      return;
    }
  } else {
    partnerId = partner.id;
  }

  return {
    partnerId,
    user
  }
}