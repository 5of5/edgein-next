import React, { FC, useEffect, useState } from "react";
import { PlaceholderInvestorRecentInvestmentsCard } from "@/components/Placeholders";
import { ElemCarouselWrap } from "@/components/ElemCarouselWrap";
import { ElemCarouselCard } from "@/components/ElemCarouselCard";
import { ElemPhoto } from "@/components/ElemPhoto";
import { formatDate } from "@/utils";
import {
	Vc_Firms_Bool_Exp,
	useGetVcFirmsRecentInvestmentsQuery,
	Vc_Firms,
	Lists,
	Follows_Vc_Firms,
} from "@/graphql/types";
import { ElemReactions } from "../ElemReactions";
import { getName, getNewFollows, reactOnSentiment } from "@/utils/reaction";
import { useAuth } from "@/hooks/useAuth";
import { remove } from "lodash";

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type Props = {
	className?: string;
	heading?: string;
	itemsLimit?: number;
};

export const ElemRecentInvestments: FC<Props> = ({
	className = "",
	heading,
	itemsLimit,
}) => {
	const { user } = useAuth();
	const limit = itemsLimit ? itemsLimit : 33;
	const offset = null;

	const filters: DeepPartial<Vc_Firms_Bool_Exp> = {
		_and: [{ slug: { _neq: "" }, status: { _eq: "published" } }],
	};

	const {
		data: vcFirmsData,
		error,
		isLoading,
	} = useGetVcFirmsRecentInvestmentsQuery({
		offset,
		limit,
		where: filters as Vc_Firms_Bool_Exp,
		current_user: user?.id ?? 0,
	});

	const [vcFirms, setVcFirms] = useState(vcFirmsData?.vc_firms);

	useEffect(() => {
		setVcFirms(vcFirmsData?.vc_firms);
	}, [vcFirmsData?.vc_firms]);

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

			const newSentiment = await reactOnSentiment({
				vcfirm: vcFirm.id,
				sentiment,
				pathname: `/investors/${vcFirm.slug}`,
			});

			setVcFirms((prev) => {
				return [...(prev || ([] as Vc_Firms[]))].map((item) => {
					if (item.id === vcFirm.id) {
						const newFollows = getNewFollows(
							sentiment,
							"vcfirm"
						) as Follows_Vc_Firms;

						if (!alreadyReacted) item.follows.push(newFollows);
						else
							remove(item.follows, (list) => {
								return getName(list.list! as Lists) === sentiment;
							});

						return { ...item, sentiment: newSentiment };
					}
					return item;
				});
			});
		};


  return (
    <div className={`${className}`}>
      {heading && <h2 className="text-2xl font-bold p-4 pt-6">{heading}</h2>}
      {error ? (
        <h4>Error loading investors</h4>
      ) : isLoading ? (
        <>
          <div className="flex p-3 overflow-hidden bg-white rounded-lg">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="p-3 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <PlaceholderInvestorRecentInvestmentsCard />
              </div>
            ))}
          </div>
        </>
      ) : (
        vcFirms && (
          <ElemCarouselWrap className=" bg-white rounded-lg">
            {vcFirms.map((investor: any, index: number) => {
              return (
                <ElemCarouselCard
                  key={index}
                  className={`p-3 basis-full sm:basis-1/2 lg:basis-1/3`}
                >
                  <a
                    href={`/investors/${investor.slug}`}
                    className="z-0 flex flex-col w-full h-full p-5 transition-all bg-white border rounded-lg group border-dark-500/10 hover:scale-102 hover:shadow-lg"
                  >
                    <div className="flex">
                      <ElemPhoto
                        photo={investor.logo}
                        wrapClass="flex items-center justify-center aspect-square w-16 h-16 p-2 bg-white rounded-lg shadow-md"
                        imgClass="object-contain w-full h-full"
                        imgAlt={investor.name}
                      />
                      <div className="flex items-center justify-center pl-2 md:overflow-hidden">
                        <h3 className="inline min-w-0 text-2xl font-bold break-words align-middle line-clamp-2 text-dark-500 sm:text-lg md:text-xl xl:text-2xl group-hover:opacity-60">
                          {investor.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-start mt-4">
                      <div className="flex ">
                        <span className="text-gray-500 mr-1"><b>32</b>
                        <span className="text-slate-600 pl-1">Investments
                        </span>
                        </span>
                        
                      </div>
                      <div className="flex ml-4">
                        <span className="text-gray-500 mr-1"><b>2</b>
                        <span className="text-slate-600 pl-1">Exit</span>
                        </span>
                       
                      </div>
                    </div>
					{investor.overview && (
						<p className="mt-2 line-clamp-3 text-base text-slate-600">{investor.overview}</p>
					)}
                    {/* <div className="mt-3 text-xs font-bold text-gray-400">
                      {investor.latest_investments && (
                        <div>
                          Latest Investment
                          {formatDate(investor.latest_investments, {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </div>
                      )}
                    </div> */}

                    <div className={`flex grid-cols-5 md:grid mt-4`}>
                      <ElemReactions
                        data={investor}
                        handleReactionClick={handleReactionClick(investor)}
                      />
                    </div>
                  </a>
                </ElemCarouselCard>
              );
            })}
          </ElemCarouselWrap>
        )
      )}
    </div>
  );
};
