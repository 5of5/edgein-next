import { FC } from "react";
import { useRouter } from "next/router";
import { ElemButton } from "@/components/ElemButton";
import { IconTwitter } from "@/components/Icons";

type Props = {
	name: string | null;
	tags: Array<string>;
	resourceType: "companies" | "vc_firms";
};

export const ShareTwitter: FC<Props> = ({ name, tags, resourceType }) => {
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

	const theTweet = `${name}: ${theContent} https://edgein.io${router.asPath} via @edgeinio ${hashtagsFromTags}`;

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
