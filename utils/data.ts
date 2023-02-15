export const runGraphQl = async <QueryType>(query: string, variables?: Record<string, any>, opt?: {isAdmin?: boolean}):Promise<{ data?: QueryType, errors?: any }> => {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		Accept: "application/json",
		'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? ""
	}
	if (opt.isAdmin === false) {
		headers['x-hasura-role'] = process.env.HASURA_VIEWER ?? "";
	}
	return await fetch(
		process.env.GRAPHQL_ENDPOINT ?? "",
		{
			method: "POST",
			headers: headers,
			body: JSON.stringify({
				query,
				variables
			}),
		}
	)
		.then(async (r) => {
			if (r.status !== 200) {
				const json = await r.json();
				console.log("error with response 1", json, r);
				return json
			}
			try {
				const json = await r.json();
				if (json.message && json.message === "Not Authorized") {
					console.log("error with response 2", json);
				}
				if (json.errors) {
					console.log("error with response 3", query, variables, json.errors[0], json.errors);
				}
				return json;
			} catch (e) {
				console.log("error with response 4", r);
			}
		})
		.catch((e) => {
			console.log("error with response 5", e);
		});
};
