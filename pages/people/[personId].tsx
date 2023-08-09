import React, { MutableRefObject, useRef, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { flatten, union } from 'lodash';
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
  useGetUserByPersonIdQuery,
} from '@/graphql/types';
import { ElemJobsList } from '@/components/person/elem-jobs-list';
import { ElemInvestorsList } from '@/components/person/elem-investors-list';
import { onTrackView } from '@/utils/track';
import { useAuth } from '@/hooks/use-auth';
import { useIntercom } from 'react-use-intercom';
import { IconCheckBadgeSolid } from '@/components/icons';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemTags } from '@/components/elem-tags';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import ElemNewsList from '@/components/news/elem-news-list';

type Props = {
  person: People;
  sortByDateAscInvestments: Investment_Rounds[];
  sortNews: News[];
};

const Person: NextPage<Props> = props => {
  const router = useRouter();
  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const investmentRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { user } = useAuth();
  const { showNewMessages } = useIntercom();

  const person = props.person;
  const sortedInvestmentRounds = props.sortByDateAscInvestments;

  useEffect(() => {
    if (person) {
      onTrackView({
        resourceId: person?.id,
        resourceType: 'people',
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

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

  const { data: linkedUser, isLoading: isLoadingLinkedUser } =
    useGetUserByPersonIdQuery({ person_id: person?.id });

  const claimedProfile = linkedUser?.users && linkedUser.users.length > 0;
  const isCurrentUserProfile =
    claimedProfile && linkedUser?.users[0].id === user?.id;

  return (
    <div className="relative">
      <div className="w-full">
        <div className="bg-slate-600 border-b border-black/10">
          <div className="h-64 w-full bg-[url('https://source.unsplash.com/random/500×200/?shapes')] bg-cover bg-no-repeat bg-center"></div>
        </div>
        <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="-mt-12 lg:grid lg:grid-cols-11 lg:gap-7 lg:items-start">
            <div className="col-span-2 flex justify-center">
              <ElemPhoto
                photo={person.picture}
                wrapClass="flex items-center justify-center aspect-square shrink-0 p-1 bg-white overflow-hidden rounded-full shadow w-40 lg:w-full"
                imgClass="object-cover w-full h-full rounded-full overflow-hidden"
                imgAlt={person.name}
                placeholder="user"
                placeholderClass="text-slate-300"
              />
            </div>
            <div className="w-full col-span-9">
              <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:pt-14 lg:shrink-0">
                <div>
                  {person.type && (
                    <div className="whitespace-nowrap text-lg text-slate-600">
                      {removeSpecialCharacterFromString(person.type as string)}
                    </div>
                  )}
                  <div className="flex items-center justify-center space-x-2 lg:justify-start">
                    <h1 className="text-3xl font-bold lg:text-4xl">
                      {person.name}
                    </h1>

                    {claimedProfile && (
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

                  <div className="flex flex-wrap items-center mt-4 gap-x-5 gap-y-3 sm:gap-y-0">
                    {!isLoadingLinkedUser && !claimedProfile && (
                      <ElemButton
                        btn="primary"
                        onClick={() =>
                          showNewMessages(
                            `Hi EdgeIn, I'd like to claim this profile: ${profileUrl}`,
                          )
                        }
                      >
                        Claim profile
                      </ElemButton>
                    )}
                    <ElemSaveToList
                      resourceName={person.name}
                      resourceId={person.id}
                      resourceType="people"
                      slug={person.slug!}
                      follows={person.follows}
                    />

                    {isCurrentUserProfile && (
                      <ElemButton btn="slate" href="/profile/">
                        Edit profile
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
      </div>

      <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8">
        <div
          className="mt-7 lg:grid lg:grid-cols-11 lg:gap-7"
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
          <div className="col-span-8">
            {person.about && (
              <div className="w-full p-4 bg-white shadow rounded-lg mb-7">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">About</h2>
                </div>
                <p className="line-clamp-3 text-base text-slate-600">
                  {person.about}
                </p>
              </div>
            )}

            {person.team_members.length > 0 && (
              <ElemJobsList
                heading="Experience"
                team_members={person.team_members}
                className="mb-7"
              />
            )}
            {props.sortNews.length > 0 && (
              <div className="w-full mt-7 p-5 bg-white shadow rounded-lg">
                <ElemNewsList
                  resourceId={person.id}
                  resourceType="people"
                  news={props.sortNews}
                />
              </div>
            )}
            {!person.investors || person.investors.length === 0 ? null : (
              <ElemInvestorsList
                heading="Investment Firms"
                investors={person.investors}
                className="mb-7"
              />
            )}
          </div>
        </div>

        {/* {person.companies?.length > 0 && (
				<ElemCompaniesGrid
					className="mt-12"
					heading="Companies"
					companies={person.companies}
				/>
			)} */}

        {sortedInvestmentRounds.length > 0 && (
          <div
            ref={investmentRef}
            className="mt-7 p-5 rounded-lg bg-white shadow"
            id="investments"
          >
            <ElemInvestments
              heading="Investments"
              investments={sortedInvestmentRounds}
            />
          </div>
        )}
      </div>
    </div>
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
