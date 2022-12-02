import { mutate, query } from "@/graphql/hasuraAdmin";
import { getUpdatedDiff } from "./helpers";

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
	try {
		const { data } = await query({
			query: `
      query lookup_resource($resourceIdentifier: Int!) {
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

export const insertActionDataChange = async (
  resourceId: Number,
  resourceType: string,
  userId: Number,
  properties: Record<string, any>
) => {
  await mutate({
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
        action: "Change_Data",
        page: `/admin/app/#/${resourceType}/${resourceId}`,
        properties,
        resource_id: resourceId,
        resource: resourceType,
        user: userId,
      },
    },
  });
};

export const onSubmitData = (type: string, transformInput: any) => {
  const resource = getUpdatedDiff(
    transformInput.previousData,
    transformInput.data
  );
  return fetch("/api/submit_data/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      partner_api_key: process.env.NEXT_PUBLIC_PARTNER_API_KEY,
      resource_type: type,
      resource_identifier: transformInput.data.id,
      identifier_column: "id",
      resource,
    }),
  }).then(() => {
    return { data: transformInput.data };
  });
};
