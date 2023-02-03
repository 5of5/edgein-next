
import { mutate, query } from "@/graphql/hasuraAdmin";
import { Data_Fields } from "@/graphql/types";
import { User } from "@/models/User";
import { getUpdatedDiff } from "./helpers";

export type ActionType = "Insert Data" | "Change Data" | "Delete Data";
export type ResourceTypes = "companies" | "vc_firms" | "people" | "blockchains" | "coins" | "investment_rounds" | "investments" | "team_members" | "investors"

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
	resourceType: string,
	resourceIdentifier: string,
	identifierColumn: string
) => {
	if (!resourceIdentifier) {
		return undefined;
	}

	try {
		const { data } = await query({
			query: `
      query lookup_resource($resourceIdentifier: ${identifierColumn === "id" ? "Int!" : "String!"}) {
				${resourceType}(where: {${identifierColumn}: {_eq: $resourceIdentifier}}) {
					id
        }
      }`,
			variables: { resourceIdentifier },
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

export const updateMainTable = async (resourceType: string, id: Number, setValues: Record<string, any>) => {
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

export const deleteMainTableRecord = async (resourceType: string, id: Number) => {
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

export const markDataRawAsInactive = async (resourceType: string, resourceId: Number) => {
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
  resourceType: string,
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
      resource_identifier: transformInput.id,
      identifier_column: "id",
      resource,
    }),
  })
    .then((res) => res.json())
    .then(({ id }) => {
      return { data: { ...transformInput.data, id } };
    });
};

export const insertResourceData = async (
  resourceType: string,
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
  value === "" ||
  value === null ||
  (value &&
    Object.keys(value).length === 0 &&
    Object.getPrototypeOf(value) === Object.prototype) ||
  (value && Array.isArray(value) && value.length === 0);

export const mutateActionAndDataRaw = async (
  partnerId: number,
  user: User | null,
  fieldPathLookup: string,
  resourceId: number,
  resourceObj: Record<string, any>,
  resourceType: string,
  actionType: ActionType
) => {
  const currentTime = new Date();
  let validData: Array<Record<string, any>> = [];
  let invalidData: Array<Record<string, any>> = [];
  let setMainTableValues: Record<string, any> = {};
  let action;

  for (let field in resourceObj) {
    let value = resourceObj[field];
    if (
      (actionType === "Insert Data" && !notInsertValueType(value)) ||
      actionType === "Change Data"
    ) {
      let dataField: Data_Fields = await fieldLookup(
        `${fieldPathLookup}.${field}`
      );
      if (dataField === undefined || (dataField?.restricted_admin && user?.role !== "admin"))
        invalidData.push({
          resource: resourceType,
          field,
          message: "Invalid Field",
        });
      else {
        setMainTableValues[field] = value;
        validData.push({
          created_at: currentTime,
          partner: partnerId,
          user_id: user?.id,
          resource: resourceType,
          resource_id: resourceId,
          field,
          value: value === null ? "" : value,
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

  const insertResult = await insertDataRaw(validData);
  if (actionType === "Change Data") {
    await updateMainTable(resourceType, resourceId, setMainTableValues);
  }

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
