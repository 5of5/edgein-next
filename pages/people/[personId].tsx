import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { flatten, union, orderBy } from 'lodash';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemInvestments } from '@/components/investor/elem-investments';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemButton } from '@/components/elem-button';
import { ElemFlag } from '@/components/elem-flag';
import { ElemModal } from '@/components/elem-modal';
import { runGraphQl, removeSpecialCharacterFromString } from '@/utils';
import { USER_ROLES } from '@/utils/users';
import { PERSON_PROFILE_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
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
// import { useIntercom } from 'react-use-intercom';
import { IconCheckBadgeSolid } from '@/components/icons';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemTags } from '@/components/elem-tags';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import ElemNewsList from '@/components/news/elem-news-list';
import { ElemSocialShare } from '@/components/elem-social-share';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';

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
  // const { showNewMessages } = useIntercom();

  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = (message: String) => {
    console.log(message);
    setShow(true);
  };

  const { personId } = router.query;
  const [person, setPerson] = useState<People>(props.person);
  const [showContributeModal, setShowContributeModal] = useState(false);

  const {
    data: personData,
    error,
    isLoading,
  } = useGetPersonQuery({
    slug: personId as string,
  });

  useEffect(() => {
    if (personData) setPerson(personData?.people?.[0] as People);
  }, [personData]);

  const sortedInvestmentRounds = props.sortByDateAscInvestments || [];

  useEffect(() => {
    if (person) {
      onTrackView({
        resourceId: person?.id,
        resourceType: 'people',
        pathname: router.asPath,
      });
    }
  }, [person, router.asPath]);

  const vcFirmJobs = (person.investors || []) as Investors[];
  const companyJobs = (person.team_members || []) as Team_Members[];

  const processedVcFirmJobs = vcFirmJobs.map(job => ({
    ...job,
    type: 'vc_firm',
  }));

  const processedCompanyJobs = companyJobs.map(job => ({
    ...job,
    type: 'company',
  }));

  const mergedJobs = [...processedVcFirmJobs, ...processedCompanyJobs].filter(
    Boolean,
  );

  const personJobs = orderBy(mergedJobs, [item => item?.end_date], ['desc']);

  const vcFirmTags = flatten(
    (person.investors || []).map(item => item?.vc_firm?.tags || []),
  );
  const companyTags = flatten(
    (person.team_members || []).map(item => item?.company?.tags || []),
  );
  const personTags = union(vcFirmTags, companyTags).filter(Boolean);

  const personEmails = [
    ...(person.work_email ? [person.work_email] : []),
    ...(person.personal_email ? [person.personal_email] : []),
  ];

  const tabBarItems = [
    { name: 'Overview', ref: overviewRef },
    ...(props.sortNews?.length > 0
      ? [
          {
            name: 'News',
            ref: newsRef,
          },
        ]
      : []),
    ...(sortedInvestmentRounds?.length > 0
      ? [
          {
            name: 'Investments',
            ref: investmentRef,
          },
        ]
      : []),
  ];

  const profileUrl = `https://edgein.io${router.asPath}`;
  const profileIsClaimed = !!person.user?.id;
  const profileIsLoggedInUser = !!user && person.user?.id === user?.id;

  const personLibraries =
    person.library?.length > 0 ? person.library.join(', ') : '';

  const handleClaimProfile = async () => {
    if (user?.linkedin && user?.linkedin === person.linkedin) {
      console.log('profile matches');
    } else {
      console.warn('Profile does not match');
      return;
    }
    const response = await fetch('/api/check-claimed-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personId: person.id, // Ensure person.id is correctly set
        linkedin: person.linkedin || '', // Pass linkedin if available
      }),
    });

    if (response.ok) {
      // Handle successful claim
      console.log('Profile claimed successfully');
    } else {
      const errorData = await response.json();
      console.error('Error claiming profile:', errorData.error);
    }
  };

  console.log('The person of this data is which is amazing:', person.id);
  console.log('The person data is:', personData);
  console.log('the data of the current user is', user);
  console.log('user profile id is:', person.user?.id);

  return (
    <>
      {show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}

      {showContributeModal && (
        <ElemModal
          showCloseIcon={true}
          isOpen={showContributeModal}
          onClose={() => setShowContributeModal(false)}
          placement="center"
          panelClass="w-full max-w-3xl shadow-2xl bg-black rounded-lg my-4">
          {/* Content of the modal goes here */}
          <div className="p-4">
            <h2 className="text-lg font-medium flex justify-center">
              Contribute Data
            </h2>
            <p className="text-gray-500 mt-10 flex justify-center">
              Coming Soon
            </p>
          </div>

          {/* Add further modal content as needed */}
        </ElemModal>
      )}
      <NextSeo
        title={
          person.name
            ? `${person.name} ${personLibraries} professional profile, contact information, work experience, and skills`
            : ''
        }
        description={
          person.name
            ? `View ${person.name}’s profile on Mentibus, the world’s leading AI & Web3 data intelligence platform. ${person.name} has ${personJobs.length} jobs listed on their profile. See the complete profile on Mentibus and discover ${person.name}’s connections and jobs at similar companies.`
            : 'View profile on Mentibus, the world’s leading AI & Web3 data intelligence platform. See the complete profile on Mentibus and discover connections and jobs at similar companies.'
        }
        openGraph={{
          images: [
            {
              url: person.picture?.url,
              alt: person.name || 'Person',
            },
            {
              url: 'https://edgein.io/social.png',
              width: 800,
              height: 600,
              alt: 'person',
            },
          ],
        }}
        canonical={`https://mentibus.xyz/people/${person.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: person.name,
            url: `https://mentibus.xyz/people/${person.slug}`,
            image: person.picture?.url,
            sameAs: [person.linkedin, person.github, person.twitter_url].filter(
              Boolean,
            ),
            worksFor: person.team_members?.[0]?.company?.name,
          }),
        }}
      />
      <DashboardLayout>
        <div className="relative">
          <div className={`p-8 person-${person.id}`}>
            <div className="lg:grid lg:grid-cols-11 lg:gap-7 lg:items-start">
              <div className="flex justify-center col-span-2">
                <ElemPhoto
                  photo={person.picture}
                  wrapClass="flex items-center justify-center aspect-square shrink-0 bg-black overflow-hidden rounded-full border  border-neutral-700 w-40 lg:w-full"
                  imgClass="object-cover w-full h-full rounded-full overflow-hidden"
                  imgAlt={person.name || 'Person'}
                  placeholder="user"
                  placeholderClass="text-gray-300"
                />
              </div>
              <div className="w-full col-span-5">
                <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left lg:shrink-0">
                  <div>
                    {person.type && (
                      <div className="text-sm text-gray-500 whitespace-nowrap">
                        {removeSpecialCharacterFromString(
                          person.type as string,
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between w-full mt-4">
                      <div className="flex items-center space-x-2">
                        <h1 className="self-end inline-block text-4xl font-medium">
                          {person.name || ''}
                        </h1>

                        {profileIsClaimed && (
                          <ElemTooltip content="Claimed profile">
                            <div className="cursor-pointer">
                              <IconCheckBadgeSolid
                                className="w-8 h-8 text-primary-500"
                                title="Claimed profile"
                              />
                            </div>
                          </ElemTooltip>
                        )}
                      </div>
                    </div>

                    <div className="ml-auto flex absolute justify-end space-x-2 right-12">
                      <ElemFlag />
                    </div>

                    {personTags?.length > 0 && (
                      <ElemTags
                        className="mt-4"
                        limit={PERSON_PROFILE_DEFAULT_TAGS_LIMIT}
                        resourceType={
                          person.team_members?.length > 0
                            ? 'companies'
                            : 'investors'
                        }
                        tags={personTags}
                      />
                    )}

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <ElemSaveToList
                        resourceName={person.name}
                        resourceId={person.id}
                        resourceType="people"
                        slug={person.slug!}
                        follows={person.follows}
                      />

                      <ElemSocialShare
                        resourceName={person.name || ''}
                        resourceTwitterUrl={null}
                      />

                      {!profileIsClaimed && (
                        <ElemButton
                          btn="default"
                          onClick={() => {
                            showNewMessages(
                              `Hi Mentibus, I'd like to claim this profile: ${profileUrl}`,
                            );
                            handleClaimProfile();
                          }}>
                          Claim profile
                        </ElemButton>
                      )}

                      {profileIsLoggedInUser && (
                        <ElemButton btn="default" href={ROUTES.PROFILE}>
                          Profile settings
                        </ElemButton>
                      )}

                      {user?.role === USER_ROLES.ADMIN && (
                        <ElemButton
                          href={`${ROUTES.ADMIN_PEOPLE}/${person.id}`}
                          target="_blank"
                          btn="default">
                          Edit (admin)
                        </ElemButton>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0"></div>
                </div>

                {person.about && (
                  <p className="mt-4 text-base line-clamp-3 text-slate-600">
                    {person.about}
                  </p>
                )}
              </div>
            </div>

            <ElemInviteBanner className="mt-7" />
          </div>

          <ElemTabBar
            className="px-8 py-2"
            tabs={tabBarItems}
            resourceName={person.name || ''}
            resourceUrl={`https://edgein.io${router.asPath}`}
          />

          <div className="px-8 mt-4">
            <div
              className="lg:grid lg:grid-cols-11 lg:gap-7"
              ref={overviewRef}
              id="overview">
              <div className="col-span-3">
                <ElemKeyInfo
                  className="sticky top-28 mb-7 lg:mb-0 border-gray-700"
                  heading="Key Info"
                  roles={removeSpecialCharacterFromString(person.type || '')}
                  linkedIn={person.linkedin}
                  investmentsLength={person.investments?.length || 0}
                  web3Address={person.web3_address}
                  emails={personEmails}
                  github={person.github}
                  telegram={person.telegram}
                  discord={person.discord}
                  locationJson={
                    person.location_json ||
                    person.people_computed_data?.location_json
                  }
                  website={person.website_url}
                />
              </div>

              <div className="grid col-span-8 gap-y-7">
                {person.about && (
                  <section className="border !border-gray-700 rounded-lg">
                    <h2 className="px-4 pt-2 text-lg font-medium">About</h2>
                    <p className="px-4 pb-4 text-sm text-gray-500">
                      {person.about}
                    </p>
                  </section>
                )}

                <ElemJobsList
                  heading="VC Firm Experience"
                  jobs={processedVcFirmJobs}
                  resourceUrl={profileUrl}
                  personId={person?.id?.toString()}
                  className="border !border-gray-700"
                  onRequestContribute={() => setShowContributeModal(true)} // New prop
                />
                <ElemJobsList
                  heading="Company Experience"
                  jobs={processedCompanyJobs}
                  resourceUrl={profileUrl}
                  personId={person?.id?.toString()}
                  className="border !border-gray-700"
                  onRequestContribute={() => setShowContributeModal(true)}
                />

                {props.sortNews?.length > 0 && (
                  <div ref={newsRef}>
                    <ElemNewsList
                      resourceId={person.id}
                      resourceType="people"
                      news={props.sortNews || []}
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
    </>
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

  const person = people.people[0];

  const getInvestments = person.investments
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
    person.news_links
      ?.slice()
      ?.map(item => ({ ...item.news }))
      ?.filter(item => item.status === 'published')
      .sort((a, b) => {
        return (
          new Date(a?.date ?? '').getTime() - new Date(b?.date ?? '').getTime()
        );
      })
      .reverse() || [];

  return {
    props: {
      person,
      sortByDateAscInvestments,
      sortNews,
    },
  };
};

export default Person;
