import React, { useEffect, useState, useRef, MutableRefObject } from "react";
import { NextPage, GetServerSideProps } from "next";
import { ElemPhoto } from "@/components/elem-photo";
import { ElemKeyInfo } from "@/components/elem-key-info";
import { ElemTags } from "@/components/elem-tags";
import { ElemTeamGrid } from "@/components/company/elem-team-grid";
import { ElemTabBar } from "@/components/elem-tab-bar";
import { ElemButton } from "@/components/elem-button";
import {
  GetNewsOrganizationDocument,
  GetNewsOrganizationQuery,
  Team_Members,
  News,
  GetNewsArticlesQuery,
  GetNewsArticlesDocument,
  Order_By,
} from "@/graphql/types";
import parse from "html-react-parser";
import { newLineToP } from "@/utils/text";
import { runGraphQl } from "@/utils";
import ElemNewsArticles from "@/components/news/elem-news-articles";
import ElemSimilarNewsOrganizations from "@/components/news/elem-similar-news-organizations";

type Props = {
  newsOrganization: GetNewsOrganizationQuery["companies"][0];
  newsArticles: News[];
};

const NewsOrganizationProfile: NextPage<Props> = ({
  newsOrganization,
  newsArticles,
}) => {
  const [overviewMore, setOverviewMore] = useState(false);
  const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [overviewDivHeight, setOverviewDivHeight] = useState(0);

  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const journalistsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const journalists = newsOrganization?.teamMembers?.filter(
    (mem) => mem?.function === "Journalist"
  ) as Team_Members[];

  const tabBarItems = [{ name: "Overview", ref: overviewRef }];
  if (journalists.length > 0) {
    tabBarItems.push({ name: "Journalists", ref: journalistsRef });
  }

  const firstTag = newsOrganization.tags ? newsOrganization.tags[0] : "";
  const secondTag = newsOrganization.tags ? newsOrganization.tags[1] : "";

  useEffect(() => {
    if (newsOrganization?.overview) {
      setOverviewDivHeight(overviewDiv.current.scrollHeight);
    }
  }, [newsOrganization?.overview]);

  return (
    <>
      <div className="w-full bg-gradient-to-b from-transparent to-white shadow pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-11 lg:gap-7">
            <div className="col-span-3">
              <ElemPhoto
                photo={newsOrganization?.logo}
                wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg border border-black/10"
                imgClass="object-contain w-full h-full"
                imgAlt={newsOrganization?.name}
                placeholderClass="text-slate-300"
              />
            </div>
            <div className="w-full col-span-5 mt-7 lg:mt-4">
              <div className="shrink-0">
                <h1 className="self-end inline-block text-4xl font-bold md:text-5xl">
                  {newsOrganization?.name}
                </h1>
              </div>
              {newsOrganization?.tags?.length > 0 && (
                <ElemTags
                  className="mt-4"
                  resourceType={"companies"}
                  tags={newsOrganization?.tags}
                />
              )}
              {newsOrganization?.overview && (
                <>
                  <div
                    ref={overviewDiv}
                    className={`mt-4 text-base text-slate-600 prose ${
                      overviewMore ? "" : "line-clamp-3"
                    }`}
                  >
                    {parse(newLineToP(newsOrganization.overview))}
                  </div>
                  {overviewDivHeight > 84 && (
                    <ElemButton
                      onClick={() => setOverviewMore(!overviewMore)}
                      btn="transparent"
                      className="px-0 py-0 inline font-normal"
                    >
                      show {overviewMore ? "less" : "more"}
                    </ElemButton>
                  )}
                </>
              )}
            </div>
          </div>
          <ElemTabBar
            className="mt-7 border-b-0"
            tabs={tabBarItems}
            resourceName={newsOrganization?.name}
          />
        </div>
      </div>

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div
          className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
          ref={overviewRef}
          id="overview"
        >
          <div className="col-span-3">
            <ElemKeyInfo
              className="sticky top-11"
              heading="Key Info"
              website={newsOrganization?.website}
              totalEmployees={newsOrganization?.total_employees}
              careerPage={newsOrganization?.careers_page}
              yearFounded={newsOrganization?.year_founded}
              linkedIn={newsOrganization?.company_linkedin}
              twitter={newsOrganization?.twitter}
              location={newsOrganization?.location}
              locationJson={newsOrganization?.location_json}
              discord={newsOrganization?.discord}
              glassdoor={newsOrganization?.glassdoor}
            />
          </div>
          <div className="col-span-8">
            <div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
              <ElemNewsArticles heading="News articles" news={newsArticles} />
            </div>
          </div>
        </div>

        {journalists.length > 0 && (
          <div
            ref={journalistsRef}
            className="mt-7 p-5 rounded-lg bg-white shadow"
            id="team"
          >
            <ElemTeamGrid
              showEdit={false}
              heading="Journalists"
              people={journalists}
              showTags={false}
              allowToSaveTeam={false}
            />
          </div>
        )}

        {newsOrganization.tags && (
          <ElemSimilarNewsOrganizations
            className="mt-7"
            heading="Similar news organizations"
            currentSlug={newsOrganization.slug}
            tag1={firstTag}
            tag2={secondTag}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: newsOrganizations } =
    await runGraphQl<GetNewsOrganizationQuery>(
      GetNewsOrganizationDocument,
      { slug: context.params?.slug },
      context.req.cookies
    );

  if (!newsOrganizations?.companies[0]) {
    return {
      notFound: true,
    };
  }

  const newsOrganization = newsOrganizations?.companies[0];

  const sourceQuery =
    context.params?.slug === "techcrunch"
      ? {
          source: {
            _cast: {
              String: { _ilike: `%"poweredby": "techcrunch"%` },
            },
          },
        }
      : {
          _or: [
            {
              source: {
                _is_null: true,
              },
            },
            {
              source: {
                _cast: {
                  String: { _nilike: `%"poweredby"%` },
                },
              },
            },
          ],
        };

  const { data: newsArticles, errors } = await runGraphQl<GetNewsArticlesQuery>(
    GetNewsArticlesDocument,
    {
      order: Order_By.Desc,
      where: {
        _and: [{ status: { _eq: "published" } }, { ...sourceQuery }],
      },
    },
    context.req.cookies
  );
console.log('@newsArticles', newsArticles, errors)
  let metaTitle = null;
  if (newsOrganization.name) {
    metaTitle =
      newsOrganization.name +
      " News Organization Profile: Credibility, Velocity & Investors - EdgeIn.io";
  }
  let metaDescription = null;
  if (newsOrganization.overview) {
    metaDescription = newsOrganization.overview;
  }

  return {
    props: {
      newsOrganization,
      metaTitle,
      metaDescription,
      newsArticles: newsArticles?.news,
    },
  };
};

export default NewsOrganizationProfile;
