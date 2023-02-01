import { Data_Partners } from "@/graphql/types";
import { processNotification } from "@/utils/notifications";
import {
	partnerLookUp,
	resourceIdLookup,
	fieldLookup,
	insertResourceData,
	mutateActionAndDataRaw,
	ActionType,
	getCompanyByRoundId,
	ResourceTypes,
} from "@/utils/submitData";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../utils/cookie";

const NODE_NAME: Record<ResourceTypes, string> = {
  companies: "company",
  vc_firms: "vc_firm",
  people: "people",
  blockchains: "blockchain",
  coins: "coin",
  investment_rounds: "investment_round",
  investments: "investment",
  team_members: "team_member",
  investors: "investor",
	events: "event",
	event_person: "event_person",
	event_organization: "event_organization",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST")
		return res.status(405).send({ message: "Only POST requests allowed" });

	const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);

	const apiKey: string = req.body.partner_api_key;
	const resourceType: ResourceTypes = req.body.resource_type;
	const resourceIdentifier: string = req.body.resource_identifier;
	const identifierColumn: string = req.body.identifier_column;
	const resourceObj: Record<string, any> = req.body.resource;
	if (
		apiKey === undefined ||
		// resourceIdentifier === undefined ||
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

	if (identifierColumn !== "id") {
    const lookupField = await fieldLookup(
      `${NODE_NAME[resourceType]}.${identifierColumn}`
    );

    if (!lookupField?.is_valid_identifier) {
      return res.status(400).send({
        identifier: identifierColumn,
        message: "Invalid identifier",
      });
    }
  }

	const resourceId: number = await resourceIdLookup(
		resourceType,
		resourceIdentifier,
		identifierColumn
	);

	const partnerId: number = partner ? partner.id : 0
	let dataId = resourceId;
	let actionType: ActionType = "Change Data";

	if (resourceId === undefined) {
		// create a new one
		const response = await insertResourceData(resourceType, resourceObj);
		dataId = response?.id;
	}

	const insertResult = await mutateActionAndDataRaw(
		partnerId,
		user,
		NODE_NAME[resourceType],
		dataId,
		resourceObj,
		resourceType,
		actionType,
	);

	if (resourceId === undefined) {
		actionType = "Insert Data";

		if (resourceType === "investment_rounds" || resourceType === "team_members") {
			await processNotification(resourceObj?.company_id, "companies", resourceType, actionType, [insertResult?.action?.id]);
		}

		if (resourceType === "investors") {
			await processNotification(resourceObj?.vc_firm_id, "vc_firms", resourceType, actionType, [insertResult?.action?.id]);
		}

		if (resourceType === "investments") {
			if (resourceObj?.round_id) {
				const investmentRound = await getCompanyByRoundId(resourceObj.round_id);
				await processNotification(investmentRound?.company_id, "companies", resourceType, actionType, [insertResult?.action?.id]);
			}

			await processNotification(resourceObj?.vc_firm_id, "vc_firms", resourceType, actionType, [insertResult?.action?.id]);
		}
	} else {
		// updated exists one
		if (resourceType === "companies" || resourceType === "vc_firms") {
			/** Insert notification */
			await processNotification(resourceId, resourceType, resourceType, actionType, [insertResult?.action?.id]);
		}
	}

	res.send(insertResult);
};

export default handler;
