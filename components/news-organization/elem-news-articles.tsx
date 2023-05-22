import React, { useState } from "react";
import Link from "next/link";
import { useIntercom } from "react-use-intercom";
import { formatDate } from "@/utils";
import { IconExternalLink } from "@/components/icons";
import { ElemButton } from "../elem-button";
import { News } from "@/graphql/types";

type Props = {
  heading?: string;
  news: News[];
};

const ElemNewsArticles: React.FC<Props> = ({ heading, news }) => {
  const [newsLimit, setNewsLimit] = useState(10);
  const showMoreNews = () => {
    setNewsLimit(newsLimit + 10);
  };
  const { show } = useIntercom();

  return (
    <div>
      <div className="flex items-center justify-between mb-2 border-b border-black/10">
        <h2 className="text-xl font-bold">
          {heading ? heading : "Activity Timeline"}
        </h2>
      </div>

      <div className="py-4">
        {news && news.length > 0 ? (
          <>
            <ul className="flex flex-col">
              {news.slice(0, newsLimit).map((activity, index) => {
                return (
                  <li
                    key={index}
                    className="relative pl-6 overflow-hidden group last:-mb-4"
                  >
                    <span className="absolute h-full top-0 bottom-0 left-0">
                      <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
                      <span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
                    </span>

                    <div className="mb-4">
                      <div className="inline leading-7 text-slate-600">
                        {activity?.link ? (
                          <>
                            <div className="inline font-bold mr-1">News:</div>
                            <Link href={activity.link}>
                              <a className="" target="_blank">
                                <span className="border-b border-primary-500 transition-all hover:border-b-2 hover:text-primary-500">
                                  {activity.text}
                                </span>
                                <IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
                              </a>
                            </Link>
                          </>
                        ) : (
                          <div className="inline">{activity.text}</div>
                        )}
                        <div className="flex items-center gap-x-2">
                          <p className="text-sm">
                            {formatDate(activity.date as string, {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {newsLimit < news.length && (
              <div className="mt-6">
                <ElemButton
                  btn="ol-primary"
                  onClick={showMoreNews}
                  className="w-full"
                >
                  Show More News
                </ElemButton>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center lg:p-5">
            <div className="text-slate-600 lg:text-xl">
              There is no recent news for this organization.
            </div>
            <ElemButton onClick={show} btn="slate" className="mt-3">
              Request data or contribute
            </ElemButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElemNewsArticles;
