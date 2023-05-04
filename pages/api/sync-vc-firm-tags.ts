import type { NextApiRequest, NextApiResponse } from "next";
import { query, mutate } from "@/graphql/hasuraAdmin";
import { sortBy } from "lodash";
import {
  GetVcFirmsInvestmentsDocument,
  GetVcFirmsInvestmentsQuery,
  UpdateVcFirmTagsByPkDocument,
  UpdateVcFirmTagsByPkMutation,
} from "@/graphql/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const vcfirmsList = await queryForVcFirmsList();
	// const vcIndex = 1;
	for (const vcIndex in vcfirmsList) {
		const vc = vcfirmsList[vcIndex];
		const tags: Record<string, number> = {};
		vc.investments.map((investment: any) => {
			const companyTags = investment?.investment_round?.company?.tags;
			if (companyTags) {
				companyTags.map((tag: string) => {
					if (!(tag in tags)) {
						tags[tag] = 0;
					}
					tags[tag] = tags[tag] + 1;
				});
			}
		});
		const tagHistogram = Object.entries(tags);
		const tagHistogramSorted = sortBy(tagHistogram, (a) => a[1]).reverse();
		const tagSorted = tagHistogramSorted.map((a) => a[0]);
		//console.log(vc.id, tagSorted.slice(0, 7))
		await mutateVcTags(vc.id, tagSorted.slice(0, 5));
	}
	res.send({ success: true });
};

// queries local user using graphql endpoint
const queryForVcFirmsList = async () => {
	try {
		const data = await query<GetVcFirmsInvestmentsQuery>({
			query: GetVcFirmsInvestmentsDocument,
			variables: {},
		});
		return data.data.vc_firms;
	} catch (ex) {
		throw ex;
	}
};
const mutateVcTags = async (id: number, tags: String[]) => {
	try {
		await mutate<UpdateVcFirmTagsByPkMutation>({
			mutation: UpdateVcFirmTagsByPkDocument,
			variables: { id, tags },
		});
	} catch (e) {
		throw e;
	}
};

export default handler;
