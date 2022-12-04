import { Data_Fields, Data_Partners } from "@/graphql/types";
import {
	partnerLookUp,
	resourceIdLookup,
	insertDataRaw,
	fieldLookup,
	updateMainTable,
	insertActionDataChange,
} from "@/utils/submitData";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const NODE_NAME: Record<string, string> = {
	companies: "company",
	vc_firms: "vc_firm",
	people: "people",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST")
		return res.status(405).send({ message: "Only POST requests allowed" });

	const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

	const apiKey: string = req.body.partner_api_key;
	const resourceType: string = req.body.resource_type;
	const resourceIdentifier: string = req.body.resource_identifier;
	const identifierColumn: string = req.body.identifier_column;
	const resourceObj: Record<string, any> = req.body.resource;
	if (
		apiKey === undefined ||
		resourceIdentifier === undefined ||
		identifierColumn === undefined ||
		resourceObj === undefined ||
		resourceType === undefined
	)
		return res.status(400).send({ message: "Bad Request" });

	const partner: Data_Partners = await partnerLookUp(apiKey);
	if (partner?.id === undefined) {
		if (!(user?.role === 'admin')) {
			return res.status(401).send({ message: "Unauthorized Partner" });
		}
	}

	const resourceId: number = await resourceIdLookup(
		resourceType,
		resourceIdentifier,
		identifierColumn
	);
	if (resourceId === undefined)
		return res.status(404).send({ message: "Resource Not Found" });

	const partnerId: number = partner ? partner.id : 0
	const userId: number = user ? user.id : 0
	const currentTime = new Date();
	let validData: Array<Record<string, any>> = [];
	let invalidData: Array<Record<string, any>> = [];
	let setMainTableValues: Record<string, any> = {};

	for (let field in resourceObj) {
		let value = resourceObj[field];
		let dataField: Data_Fields = await fieldLookup(`${NODE_NAME[resourceType]}.${field}`);
		if (dataField === undefined)
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
				user_id: userId,
				resource: resourceType,
				resource_id: resourceId,
				field,
				value,
				accuracy_weight: 1,
			});

			await insertActionDataChange(
        resourceId,
        resourceType,
        { [field]: value },
        user?.id,
      );
		}
	}

	const insertResult = await insertDataRaw(validData);
	await updateMainTable(resourceType, resourceId, setMainTableValues);
	res.send(invalidData.concat(insertResult));
};

export default handler;
