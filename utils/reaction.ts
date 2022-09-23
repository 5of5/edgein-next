import { Follows_Companies, Follows_Vc_Firms, Lists } from "@/graphql/types";
import { find, has } from "lodash";

type ReactionType = {
	company?: number;
	vcfirm?: number;
	sentiment: string;
	pathname: string;
};

type ResourceType = {
	company?: number;
	vcfirm?: number;
	pathname: string;
};

type MultipleListResourceType = {
	companies?: [ResourceType];
	vcfirms?: [ResourceType];
	sentiment: string;
};

export const reactOnSentiment = async ({
	company,
	vcfirm,
	sentiment,
	pathname,
}: ReactionType) => {
	const resp = await fetch("/api/reaction/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			company,
			vcfirm,
			sentiment,
			pathname,
		}),
	});

	if (resp.status !== 200) return { newSentiment: null, error: await resp.json() }

	return { newSentiment: await resp.json(), error: null,}
};

export const getNewFollows = (sentiment: string, type: string = "company") => {
	const follows =
		type === "company" ? ({} as Follows_Companies) : ({} as Follows_Vc_Firms);
	follows.list = {} as Lists;
	follows.list.name = `sentiment-${sentiment}`;

	return follows;
};

export const getName = (list: Lists) => {
	if (!list) return "";
	const fragments = list.name.split("-");
	return fragments[fragments.length - 1];
};

export const isFollowsExists = (
	follows: Follows_Companies[] | Follows_Vc_Firms[],
	sentiment: string
) => {
	return find(
		follows,
		(follow: Follows_Companies | Follows_Vc_Firms) =>
			getName(follow?.list!) === sentiment
	);
};

export const getNewTempSentiment = (
	sentiments: any,
	sentiment: string,
	alreadyReacted: boolean
) => {
	const newSentiment = { ...sentiments };

	const hasSentiment = has(newSentiment, sentiment);

	if (!hasSentiment && alreadyReacted) {
	} else if (!hasSentiment && !alreadyReacted) newSentiment[sentiment] = 1;
	else if (hasSentiment && !alreadyReacted) newSentiment[sentiment] += 1;
	else if (hasSentiment && alreadyReacted)
		newSentiment[sentiment] > 0
			? (newSentiment[sentiment] -= 1)
			: (newSentiment[sentiment] = 0);

	return newSentiment;
};

export const createListWithMultipleResources = async (
	payload: MultipleListResourceType
) => {
	const resp = await fetch("/api/multiple_resources_to_list/", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	return resp.json();
};
