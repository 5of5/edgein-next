import { FC } from "react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/elem-button";
import { IconTwitter } from "@/components/Icons";

type Props = {
	twitterUrl: string | null;
	name: string | null;
	tags: Array<string>;
	resourceType: "companies" | "vc_firms";
	sentimentHot: number | null;
	sentimentLike: number | null;
	sentimentCrap: number | null;
};

export const ShareTwitter: FC<Props> = ({
	twitterUrl,
	name,
	tags,
	resourceType,
	sentimentHot,
	sentimentLike,
	sentimentCrap,
}) => {
	const router = useRouter();

	let theTags: string[] = [];
	if (tags) {
		tags.map((tag: string, i: number) => [
			theTags.push("#" + tag.replace(/\s+/g, "")),
		]);
	}

	const hashtagsFromTags = theTags.join(" ");

	const theContent =
		resourceType === "companies"
			? "Credibility, Activity, Team & Investors"
			: "Activity, Team & Investments";

	let companyName: string | null = "";
	if (twitterUrl) {
		companyName =
			"@" +
			twitterUrl
				.replace(/^.*\/\/[^\/]+/, "") //Remove twitter domain
				.replace("/", ""); //Remove slashes
	} else {
		companyName = name;
	}

	let sentiments: string | null = "";
	if (sentimentHot || sentimentLike || sentimentCrap) {
		const hotCount = sentimentHot ? sentimentHot : 0;
		const likeCount = sentimentLike ? sentimentLike : 0;
		const crapCount = sentimentCrap ? sentimentCrap : 0;

		sentiments = `Current reactions: 🔥${hotCount} 👍${likeCount} 💩${crapCount}`;
	} else {
		sentiments = "";
	}

	const theTweet = `${companyName}: ${theContent} https://edgein.io${router.asPath} via @edgeinio ${hashtagsFromTags} ${sentiments}`;

	const shareUrl =
		"https://twitter.com/intent/tweet?text=" +
		encodeURIComponent(theTweet.trim());

	return (
		<>
			<ElemButton
				href={shareUrl}
				btn="white"
				roundedFull={true}
				className="px-2.5 text-[#1DA1F2] hover:ring-[#1DA1F2] hover:text-white hover:bg-[#1DA1F2]"
				target="_blank"
			>
				<IconTwitter className="w-5 h-5 mr-1" />
				Share
			</ElemButton>
		</>
	);
};
