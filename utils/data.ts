import CookieService from './cookie';

const simpleRateLimit = async (redisClient: any, userID: number | undefined) => {
  if (!userID)
    return true;

  const lastResetTime = Number(await redisClient.get(`${userID}_last_reset_time`));
  const nowEpoch = Number(new Date());
	if (nowEpoch - lastResetTime >= Number(process.env.WINDOWMS)) {
		await redisClient.set(`${userID}_counter`, Number(process.env.RATE_LIMIT));
    await redisClient.set(`${userID}_last_reset_time`, nowEpoch);
	} else {
		const requestLeft = Number(await redisClient.get(`${userID}_counter`));
		if (requestLeft <= 0)
			return false;
	}

	await redisClient.decr(`${userID}_counter`);
	return true;
}

export const runGraphQl = async <QueryType>(query: string, variables?: Record<string, any>, cookies?: any, redisClient?: any):Promise<{ data?: QueryType, errors?: any }> => {
	let headers: Record<string, string> = {};
	if (cookies) {
		const authToken = CookieService.getAuthToken(cookies || {});
		headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${authToken}`,
		}
	} else {
		headers = {
			"Content-Type": "application/json",
			Accept: "application/json",
			'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
			'x-hasura-role':  process.env.HASURA_VIEWER ?? ""
		}
	}	
	// temporay until everyone gets a new cookie
	headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ?? "",
		'x-hasura-role': process.env.HASURA_VIEWER ?? "",
	}

	if (cookies && redisClient && variables) {
		const user = await CookieService.getUser(CookieService.getAuthToken(cookies));
		headers['x-hasura-user-id'] = user?.id?.toString() ?? '';
		// Allow admin to access draft records
		if (user?.role === 'admin')
			delete headers['x-hasura-role'];

		if (user?.role !== 'admin' && !(await simpleRateLimit(redisClient, user?.id))) {
			if (query.includes("GetCompany"))
				variables.slug = "01-exchange";
			else if (query.includes("GetVCFirm"))
				variables.slug = "alameda-research";
			else if (query.includes("GetPerson"))
				variables.slug = "sam-trabucco";
		}
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
