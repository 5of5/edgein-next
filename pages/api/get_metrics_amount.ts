import { NextApiResponse, NextApiRequest } from "next";
import { getCoinInfo } from "@/utils/market-data";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST")
		res.status(405).json({ message: "Method not allowed" });

	// get the coinId from request
	const coinId = req.body.coinId;
	const ret = JSON.parse((await getCoinInfo(coinId)) as string);
	res.send({ success: true, ...ret });
};

export default handler;
