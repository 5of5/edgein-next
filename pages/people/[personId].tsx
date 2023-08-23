import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { flatten, union, orderBy } from 'lodash';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemInvestments } from '@/components/investor/elem-investments';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemButton } from '@/components/elem-button';
import { runGraphQl, removeSpecialCharacterFromString } from '@/utils';
import {
  GetPersonDocument,
  GetPersonQuery,
  Investment_Rounds,
  News,
  People,
  useGetPersonQuery,
  Team_Members,
  Investors,
} from '@/graphql/types';
import { ElemJobsList } from '@/components/person/elem-jobs-list';
import { onTrackView } from '@/utils/track';
import { useAuth } from '@/hooks/use-auth';
import { useIntercom } from 'react-use-intercom';
import { IconCheckBadgeSolid } from '@/components/icons';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemTags } from '@/components/elem-tags';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import ElemNewsList from '@/components/news/elem-news-list';
import { ElemSocialShare } from '@/components/elem-social-share';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';

type Props = {
  person: People;
  sortByDateAscInvestments: Investment_Rounds[];
  sortNews: News[];
};

const Person: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;
  const newsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { user } = useAuth();
  const { showNewMessages } = useIntercom();

  const { personId } = router.query;
  const [person, setPerson] = useState<People>(props.person);

  const {
    data: personData,
    error,
    isLoading,
  } = useGetPersonQuery({
    slug: personId as string,
  });

  useEffect(() => {
    if (personData) setPerson(personData?.people[0] as People);
  }, [personData]);

  const sortedInvestmentRounds = props.sortByDateAscInvestments;

  useEffect(() => {
    if (person) {
      onTrackView({
        resourceId: person?.id,
        resourceType: 'people',
        pathname: router.asPath,
      });
    }
  }, [person, router.asPath]);

  const getVcFirmJobs = person.investors as Investors[];
  const getCompanyJobs = person.team_members as Team_Members[];
  const mergedJobs = union(getVcFirmJobs, getCompanyJobs as any).filter(
    item => item,
  );
  const personJobs = orderBy(mergedJobs, [item => item.end_date], ['desc']);

  const vcFirmTags = flatten(person.investors.map(item => item?.vc_firm?.tags));
  const companyTags = flatten(
    person.team_members.map(item => item?.company?.tags),
  );
  const personTags = union(vcFirmTags, companyTags).filter(item => item);

  const personEmails = [
    ...(person.work_email ? [person.work_email] : []),
    ...(person.personal_email ? [person.personal_email] : []),
  ];

  const tabBarItems = [
    { name: 'Overview', ref: overviewRef },
    ...(props.sortNews.length > 0
      ? [
          {
            name: 'News',
            ref: newsRef,
          },
        ]
      : []),
    ...(sortedInvestmentRounds.length > 0
      ? [
          {
            name: 'Investments',
            ref: investmentRef,
          },
        ]
      : []),
  ];

  const profileUrl = `https://edgein.io${router.asPath}`;
  const profileIsClaimed = person.user?.id ? true : false;
  const profileIsLoggedInUser =
    user && person.user?.id === user?.id ? true : false;

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="p-8">
          <div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-center">
            <div className="col-span-2 flex justify-center">
              <ElemPhoto
                photo={person.picture}
                wrapClass="flex items-center justify-center aspect-square shrink-0 bg-white overflow-hidden rounded-full border border-gray-200 w-40 lg:w-full"
                imgClass="object-cover w-full h-full rounded-full overflow-hidden"
                imgAlt={person.name}
                placeholder="user"
                placeholderClass="text-gray-300"
              />
            </div>
            <div className="w-full col-span-5">
              <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:shrink-0">
                <div>
                  {person.type && (
                    <div className="whitespace-nowrap text-sm text-gray-500">
                      {removeSpecialCharacterFromString(person.type as string)}
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2 lg:justify-start">
                    <h1 className="self-end inline-block text-4xl font-medium">
                      {person.name}
                    </h1>

                    {profileIsClaimed && (
                      <ElemTooltip content="Claimed profile">
                        <div className="cursor-pointer">
                          <IconCheckBadgeSolid
                            className="h-8 w-8 text-primary-500"
                            title="Claimed profile"
                          />
                        </div>
                      </ElemTooltip>
                    )}
                  </div>

                  {personTags?.length > 0 && (
                    <ElemTags
                      className="my-4"
                      resourceType={
                        person.team_members.length > 0
                          ? 'companies'
                          : 'investors'
                      }
                      tags={personTags}
                    />
                  )}

                  <div className="flex flex-wrap items-center mt-4 gap-3">
                    <ElemSaveToList
                      resourceName={person.name}
                      resourceId={person.id}
                      resourceType="people"
                      slug={person.slug!}
                      follows={person.follows}
                    />

                    <ElemSocialShare
                      resourceName={person.name}
                      resourceTwitterUrl={null}
                    />

                    {!profileIsClaimed && (
                      <ElemButton
                        btn="default"
                        onClick={() =>
                          showNewMessages(
                            `Hi EdgeIn, I'd like to claim this profile: ${profileUrl}`,
                          )
                        }
                      >
                        Claim profile
                      </ElemButton>
                    )}

                    {profileIsLoggedInUser && (
                      <ElemButton btn="default" href="/profile/">
                        Profile settings
                      </ElemButton>
                    )}
                  </div>
                </div>
                <div className="mt-6 lg:mt-0"></div>
              </div>

              {person.about && (
                <p className="mt-4 line-clamp-3 text-base text-slate-600">
                  {person.about}
                </p>
              )}
            </div>
          </div>
          <ElemTabBar
            className="mt-7"
            tabs={tabBarItems}
            resourceName={person.name}
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
                className="sticky top-16 mb-7 lg:mb-0"
                heading="Key Info"
                roles={removeSpecialCharacterFromString(person.type as string)}
                linkedIn={person.linkedin}
                investmentsLength={person.investments?.length}
                emails={personEmails}
                github={person.github}
                twitter={person.twitter_url}
                location={person.city}
                website={person.website_url}
              />
            </div>
            <div className="col-span-8 grid gap-y-7">
              {person.about && (
                <section className="border border-gray-300 rounded-lg">
                  <h2 className="text-lg font-medium px-4 pt-2">About</h2>
                  <p className="text-sm text-gray-500 px-4 pb-4">
                    {person.about}
                  </p>
                </section>
              )}

              <ElemJobsList
                heading="Experience"
                jobs={personJobs}
                resourceUrl={profileUrl}
              />

              {props.sortNews.length > 0 && (
                <div ref={newsRef}>
                  <ElemNewsList
                    resourceId={person.id}
                    resourceType="people"
                    news={props.sortNews}
                  />
                </div>
              )}
            </div>
          </div>

          {sortedInvestmentRounds.length > 0 && (
            <div ref={investmentRef} id="investments">
              <ElemInvestments
                heading="Investments"
                investments={sortedInvestmentRounds}
                className="mt-7"
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: people } = await runGraphQl<GetPersonQuery>(
    GetPersonDocument,
    {
      slug: context.params?.personId,
    },
    context.req.cookies,
  );

  if (!people?.people?.[0]) {
    return {
      notFound: true,
    };
  }

  const getInvestments = people.people[0].investments
    .filter(
      item =>
        typeof item.investment_round === 'object' &&
        item.investment_round !== null,
    )
    .map(item => item.investment_round);

  const sortByDateAscInvestments = getInvestments
    .slice()
    .sort((a, b) => {
      const distantFuture = new Date(8640000000000000);

      const dateA = a?.round_date ? new Date(a.round_date) : distantFuture;
      const dateB = b?.round_date ? new Date(b.round_date) : distantFuture;
      return dateA.getTime() - dateB.getTime();
    })
    .reverse();

  const sortNews =
    people.people[0].news_links
      ?.slice()
      ?.map(item => ({ ...item.news }))
      ?.filter(item => item.status === 'published')
      .sort((a, b) => {
        return (
          new Date(a?.date ?? '').getTime() - new Date(b?.date ?? '').getTime()
        );
      })
      .reverse() || [];

  let metaTitle = null;
  if (people.people[0].name) {
    metaTitle = people.people[0].name + ' Profile - EdgeIn.io';
  }

  return {
    props: {
      metaTitle,
      person: people.people[0],
      sortByDateAscInvestments,
      sortNews,
    },
  };
};

export default Person;
