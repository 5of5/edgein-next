import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemTags } from '@/components/elem-tags';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemTeamGrid } from '@/components/company/elem-team-grid';
import { ElemInvestorGrid } from '@/components/investor/elem-investor-grid';
import { ElemInvestments } from '@/components/investor/elem-investments';
import { ElemSocialShare } from '@/components/elem-social-share';
import { ElemOrganizationActivity } from '@/components/elem-organization-activity';
import parse from 'html-react-parser';
import { stripHtmlTags } from '@/utils/text';

import { runGraphQl } from '@/utils';
import {
  GetVcFirmDocument,
  GetVcFirmQuery,
  Investment_Rounds,
  News,
  useGetVcFirmQuery,
  Vc_Firms,
} from '@/graphql/types';

import { ElemButton } from '@/components/elem-button';
import { onTrackView } from '@/utils/track';
import { ElemSubOrganizations } from '@/components/elem-sub-organizations';
import ElemOrganizationNotes from '@/components/elem-organization-notes';
import { Popups } from '@/components/the-navbar';
import ElemNewsList from '@/components/news/elem-news-list';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

type Props = {
  vcfirm: Vc_Firms;
  sortByDateAscInvestments: Array<Investment_Rounds>;
  sortNews: Array<News>;
  getInvestments: Array<Investment_Rounds>;
};

const VCFirm: NextPage<Props> = props => {
  const router = useRouter();
  const { investorId } = router.query;

  const [vcfirm, setVcfirm] = useState(props.vcfirm);

  const [overviewMore, setOverviewMore] = useState(false);
  const overviewDiv = useRef() as MutableRefObject<HTMLDivElement>;
  const [overviewDivHeight, setOverviewDivHeight] = useState(0);
  const [overviewDivScrollHeight, setOverviewDivScrollHeight] = useState(0);

  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const newsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const teamRef = useRef() as MutableRefObject<HTMLDivElement>;
  const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { selectedLibrary } = useUser();

  const {
    data: vcFirmData,
    error,
    isLoading,
  } = useGetVcFirmQuery({
    slug: investorId as string,
  });

  useEffect(() => {
    if (selectedLibrary && !vcfirm.library?.includes(selectedLibrary)) {
      router.push('/investors');
    }
  }, [vcfirm, selectedLibrary, router]);

  useEffect(() => {
    if (vcfirm.overview) {
      setOverviewDivHeight(overviewDiv.current.clientHeight);
      setOverviewDivScrollHeight(overviewDiv.current.scrollHeight);
    }
  }, [vcfirm]);

  useEffect(() => {
    if (vcFirmData) {
      onTrackView({
        resourceId: vcFirmData?.vc_firms[0]?.id,
        resourceType: 'vc_firms',
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vcFirmData]);

  useEffect(() => {
    if (vcFirmData) setVcfirm(vcFirmData?.vc_firms[0] as Vc_Firms);
  }, [vcFirmData]);

  if (!vcfirm) {
    return <h1>Not Found</h1>;
  }

  const sortedInvestmentRounds = props.sortByDateAscInvestments;

  //TabBar
  const tabBarItems = [{ name: 'Overview', ref: overviewRef }];
  if (props.sortNews.length > 0) {
    tabBarItems.push({ name: 'News', ref: newsRef });
  }
  if (vcfirm.investors.length > 0) {
    tabBarItems.push({ name: 'Team', ref: teamRef });
  }
  if (sortedInvestmentRounds.length > 0) {
    tabBarItems.push({
      name: 'Investments',
      ref: investmentRef,
    });
  }

  const parentLinks = vcfirm?.to_links?.find(
    item => item.link_type === 'child',
  );
  const parentOrganization =
    parentLinks?.from_company || parentLinks?.from_vc_firm;
  const subOrganizations = vcfirm?.from_links?.filter(
    item => item.link_type === 'child',
  );

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
          <div className="col-span-3">
            <ElemPhoto
              photo={vcfirm.logo}
              wrapClass="flex items-center justify-center aspect-square shrink-0 p-5 bg-white rounded-lg border border-black/10"
              imgClass="object-contain w-full h-full"
              imgAlt={vcfirm.name}
              placeholderClass="text-slate-300"
            />
          </div>

          <div className="w-full col-span-5 mt-7 lg:mt-4">
            <h1 className="text-4xl font-medium">{vcfirm.name}</h1>
            {vcfirm.tags?.length > 0 && (
              <ElemTags
                className="mt-4"
                resourceType={'investors'}
                tags={vcfirm.tags}
              />
            )}

            {parentOrganization && (
              <div className="mt-4">
                <div className="font-bold text-sm">Sub-organization of:</div>
                <Link
                  href={`/${
                    parentLinks?.from_company ? 'companies' : 'investors'
                  }/${parentOrganization?.slug}`}
                  passHref
                >
                  <a className="flex items-center gap-2 mt-1 group">
                    <ElemPhoto
                      photo={parentOrganization?.logo}
                      wrapClass="flex items-center justify-center w-10 aspect-square shrink-0 p-1 bg-white rounded-lg shadow group-hover:opacity-60"
                      imgClass="object-contain w-full h-full"
                      imgAlt={parentOrganization?.name}
                      placeholderClass="text-slate-300"
                    />
                    <h2 className="inline leading-tight border-b border-primary-500 transition-all group-hover:border-b-2 group-hover:text-primary-500">
                      {parentOrganization?.name}
                    </h2>
                  </a>
                </Link>
              </div>
            )}

            {vcfirm.overview && (
              <>
                <div
                  ref={overviewDiv}
                  className={`mt-4 text-sm text-gray-500 prose ${
                    overviewMore ? '' : 'line-clamp-5'
                  }`}
                >
                  {parse(stripHtmlTags(vcfirm.overview))}
                </div>
                {overviewDivScrollHeight > overviewDivHeight && (
                  <ElemButton
                    onClick={() => setOverviewMore(!overviewMore)}
                    btn="transparent"
                    className="!px-0 !py-0 inline font-normal"
                  >
                    show {overviewMore ? 'less' : 'more'}
                  </ElemButton>
                )}
              </>
            )}
            <div className="flex flex-wrap items-center mt-4 gap-x-5 gap-y-3 sm:gap-y-0">
              <ElemReactions
                resource={vcfirm}
                resourceType={'vc_firms'}
                className="w-full sm:w-auto"
              />
              <ElemSaveToList
                resourceName={vcfirm.name}
                resourceId={vcfirm.id}
                resourceType={'vc_firms'}
                slug={vcfirm.slug!}
                follows={vcfirm.follows}
              />
              <ElemSocialShare
                resourceName={vcfirm.name}
                resourceTwitterUrl={vcfirm.twitter}
              />
            </div>
          </div>
        </div>

        <ElemTabBar
          className="mt-7 border-b-0"
          tabs={tabBarItems}
          resourceName={vcfirm.name}
        />
      </div>

      <div className="px-8">
        <div
          className="lg:grid lg:grid-cols-11 lg:gap-7"
          ref={overviewRef}
          id="overview"
        >
          <div className="col-span-3">
            <ElemKeyInfo
              className="sticky top-16"
              heading="Key Info"
              website={vcfirm.website}
              investmentsLength={sortedInvestmentRounds.length}
              yearFounded={vcfirm.year_founded}
              linkedIn={vcfirm.linkedin}
              location={vcfirm.location}
              locationJson={vcfirm.location_json}
              twitter={vcfirm.twitter}
            />
          </div>
          <div className="col-span-8">
            <div className="w-full mt-7 lg:mt-0">
              <ElemOrganizationNotes
                resourceId={vcfirm.id}
                resourceType="vc_firms"
                resourceName={vcfirm.name || ''}
              />
            </div>
            {props.sortNews.length > 0 && (
              <div ref={newsRef} className="w-full mt-7">
                <ElemNewsList
                  resourceType="vc_firms"
                  resourceId={vcfirm.id}
                  news={props.sortNews}
                />
              </div>
            )}
            <div className="w-full mt-7">
              <ElemOrganizationActivity
                resourceType="vc_firms"
                resourceInvestments={sortedInvestmentRounds}
              />
            </div>
          </div>
        </div>
        {vcfirm.investors.length > 0 && (
          <div ref={teamRef} className="mt-7" id="team">
            <ElemInvestorGrid
              // tags={vcfirm.investors.map((investor : Team_Members) => investor.function)}
              showEdit={false}
              heading="Team"
              people={vcfirm.investors}
            />
          </div>
        )}

        {sortedInvestmentRounds && sortedInvestmentRounds.length > 0 && (
          <section ref={investmentRef} className="mt-7" id="investments">
            <ElemInvestments
              heading="Investments"
              investments={sortedInvestmentRounds.filter(n => n)}
            />
          </section>
        )}

        {subOrganizations?.length > 0 && (
          <ElemSubOrganizations
            className="mt-7"
            heading={`${vcfirm?.name} Sub-Organizations (${subOrganizations.length})`}
            subOrganizations={subOrganizations}
          />
        )}

        {/* <div className="mt-7 rounded-lg bg-white shadow">
				{vcfirm && (
					<ElemRecentInvestments heading="Similar Investors" />
				)}
			</div> */}
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: vc_firms } = await runGraphQl<GetVcFirmQuery>(
    GetVcFirmDocument,
    { slug: context.params?.investorId },
    context.req.cookies,
  );

  if (!vc_firms?.vc_firms[0]) {
    return {
      notFound: true,
    };
  }

  const getInvestments = vc_firms.vc_firms[0].investments.map(round => {
    if (typeof round.investment_round === 'object' && round.investment_round) {
      return round.investment_round;
    } else {
      return null;
    }
  });

  const sortByDateAscInvestments = getInvestments
    .slice()
    .sort((a, b) => {
      const distantPast = new Date('April 2, 1900 00:00:00');
      const dateA = a?.round_date ? new Date(a.round_date) : distantPast;
      const dateB = b?.round_date ? new Date(b.round_date) : distantPast;
      return dateA.getTime() - dateB.getTime();
    })
    .reverse();

  const sortNews =
    vc_firms.vc_firms[0].news_links
      ?.slice()
      ?.map(item => ({ ...item.news, type: 'news' }))
      ?.filter(item => item.status === 'published')
      .sort((a, b) => {
        return (
          new Date(a?.date ?? '').getTime() - new Date(b?.date ?? '').getTime()
        );
      })
      .reverse() || [];

  let metaTitle = null;
  if (vc_firms.vc_firms[0].name) {
    metaTitle =
      vc_firms.vc_firms[0].name + ' Investor Profile & Funding - EdgeIn.io';
  }

  return {
    props: {
      metaTitle,
      vcfirm: vc_firms.vc_firms[0],
      getInvestments,
      sortByDateAscInvestments,
      sortNews,
    },
  };
};

export default VCFirm;
