import { mutate, query } from "@/graphql/hasuraAdmin";

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

const TABLE_NAME: Record<string, string> = {
	company: "companies",
	vc_firm: "vc_firms",
	person: "people",
};

export const resourceIdLookup = async (
	resourceType: string,
	resourceIdentifier: string,
	identifierColumn: string
) => {
	const tableName = TABLE_NAME[resourceType];
	if (tableName === undefined) return;

	try {
		const { data } = await query({
			query: `
      query lookup_resource($resourceIdentifier: String!) {
        ${tableName}(where: {${identifierColumn}: {_eq: $resourceIdentifier}}) {
          id
        }
      }`,
			variables: { resourceIdentifier },
		});
		return data[tableName][0].id;
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
	const tableName = TABLE_NAME[resourceType];
	if (tableName === undefined) return;
	await mutate({
		mutation: `
    mutation update_main_table($id: Int!, $setValues: ${tableName}_set_input!) {
      update_${tableName}(_set: $setValues, where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
    `,
		variables: { id, setValues },
	});
};
