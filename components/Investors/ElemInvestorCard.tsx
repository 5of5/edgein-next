import { Follows_Vc_Firms, Vc_Firms } from "@/graphql/types";
import {
	getName,
	getNewFollows,
	getNewTempSentiment,
	isFollowsExists,
	reactOnSentiment,
} from "@/utils/reaction";
import { remove } from "lodash";
import { FC, useEffect, useState } from "react";
import { ElemPhoto } from "@/components/ElemPhoto";
import { ElemReactions } from "@/components/ElemReactions";
import { ElemSaveToList } from "@/components/ElemSaveToList";
import Link from "next/link";
// import { ElemCredibility } from "@/components/Company/ElemCredibility";
// import { ElemVelocity } from "@/components/Company/ElemVelocity";
//import { IconArrowUp, IconArrowDown } from "@/components/Icons";

type Props = {
	vcFirm: Vc_Firms;
};

export const ElemInvestorCard: FC<Props> = ({ vcFirm }) => {
	const [vcFirmData, setVcFirmData] = useState(vcFirm);

	useEffect(() => {
		setVcFirmData(vcFirm);
	}, [vcFirm]);

	const handleReactionClick =
		(vcFirm: Vc_Firms) =>
		(sentiment: string, alreadyReacted: boolean) =>
		async (
			event: React.MouseEvent<
				HTMLButtonElement | HTMLInputElement | HTMLElement
			>
		) => {
			event.stopPropagation();
			event.preventDefault();

			setTemporary(sentiment, alreadyReacted);

			const newSentiment = await reactOnSentiment({
				vcfirm: vcFirm?.id!,
				sentiment,
				pathname: `/investors/${vcFirm?.slug!}`,
			});

			setVcFirmData((prev) => {
						const newFollows = getNewFollows(sentiment, "vcfirm") as Follows_Vc_Firms;

						if (
							!alreadyReacted &&
							!isFollowsExists(prev.follows as Follows_Vc_Firms[], sentiment)
						) {
            prev.follows.push(newFollows);
            } else {
							remove(prev.follows, (list) => {
                return getName(list.list!) === sentiment;
							});
            }
						return { ...prev, sentiment: newSentiment };
  
				});
			}

	const setTemporary = (
		sentiment: string,
		alreadyReacted: boolean
	) => {
		setVcFirmData((prev) => {
				if (prev.id === vcFirm.id) {
					const newSentiment = getNewTempSentiment(
						{ ...prev.sentiment },
						sentiment,
						alreadyReacted
					);

					const newFollows = getNewFollows(
						sentiment,
						"vcfirm"
					) as Follows_Vc_Firms;

					if (!alreadyReacted) prev.follows.push(newFollows);
					else
						remove(prev.follows, (list) => {
							return getName(list.list!) === sentiment;
						});

					return { ...prev, sentiment: newSentiment };
				}
				return prev;
		});
	};

	return (
    <Link href={`/investors/${vcFirmData.slug}`} passHref>
            <a
        className="flex flex-col mx-auto w-full p-5 cursor-pointer rounded-lg border border-dark-500/10 transition-all hover:scale-102 hover:shadow md:h-full"
      >
        <div className="flex shrink-0 w-full">
          <ElemPhoto
            photo={vcFirmData.logo}
            wrapClass="flex items-center justify-center shrink-0 w-16 h-16 p-2 bg-white rounded-lg shadow"
            imgClass="object-fit max-w-full max-h-full"
            imgAlt={vcFirmData.name}
          />
          <div className="flex items-center justify-center pl-2 md:overflow-hidden">
            <h3
              className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 sm:text-lg md:text-xl xl:text-2xl"
              title={vcFirmData.name ?? ""}
            >
              {vcFirmData.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap space-x-6 text-slate-600 mt-4">
          {vcFirmData.num_of_investments !== null &&
            vcFirmData.num_of_investments > 0 && (
              <div>
                <span className="font-bold mr-1">
                  {vcFirmData.num_of_investments}
                </span>
                Investment
                {vcFirmData.num_of_investments > 1 && "s"}
              </div>
            )}

          {/* num_of_exits field needs to be added to DB */}
          {/* {vcfirm.num_of_exits !== null && vcfirm.num_of_exits > 0 && (
            <div>
              <span className="font-bold mr-1">
                {vcfirm.num_of_exits}
              </span>
              Exit
              {vcfirm.num_of_exits > 1 && "s"}
            </div>
          )} */}
        </div>

        {vcFirmData.overview && (
          <div className={`grow mt-4`}>
            <div className="text-gray-400 line-clamp-3">
              {vcFirmData.overview}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <ElemReactions
            data={vcFirmData}
            handleReactionClick={handleReactionClick(vcFirmData)}
          />
          <ElemSaveToList
            follows={vcFirmData?.follows}
            onCreateNew={handleReactionClick(vcFirmData)}
          />
        </div>
      </a>
    </Link>
	);
};
