export const runGraphQl = async (graphql: string) => {
	return await fetch(
		"https://api.baseql.com/airtable/graphql/appGMS1MPd9iiHrMt",
		//'http://localhost:3001/airtable/graphql/appGMS1MPd9iiHrMt',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${process.env.BASEQL_KEY}`,
			},
			body: JSON.stringify({
				query: graphql,
			}),
		}
	)
		.then(async (r) => {
			if (r.status !== 200) {
				console.log("error with response 1", r);
			}
			try {
				const json = await r.json();
				// console.log('response', json)
				if (json.message && json.message === "Not Authorized") {
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
