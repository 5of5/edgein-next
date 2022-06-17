export const runGraphQl = async <QueryType>(query: string, variables?: Record<string, any>):Promise<{ data?: QueryType, errors?: any }> => {
	return await fetch(
		process.env.GRAPHQL_ENDPOINT ?? "",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				'x-hasura-admin-secret': process.env.DEV_MODE ? process.env.HASURA_SECRET ?? "" : ""
			},
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
					console.log("error with response 1.5", json);
				}
				if (json.errors) {
					console.log("error with response 1.5", json);
				}
				return json;
			} catch (e) {
				console.log("error with response 2", r);
			}
		})
		.catch((e) => {
			console.log("error with response 3", e);
		});
};
