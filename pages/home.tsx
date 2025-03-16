import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import {
  Order_By,
  Companies_Bool_Exp,
  Vc_Firms_Bool_Exp,
} from '@/graphql/types';
import { Toaster } from 'react-hot-toast';
import { useIntercom } from 'react-use-intercom';
import { DashboardCategory, DeepPartial } from '@/types/common';
import { useUser } from '@/context/user-context';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import ElemLibrarySelector from '@/components/elem-library-selector';

import { Banner } from '@hypelab/sdk-react';
import {
  ISO_DATE_FORMAT,
  SWITCH_LIBRARY_ALLOWED_DOMAINS,
  SWITCH_LIBRARY_ALLOWED_EMAILS,
} from '@/utils/constants';
import useLibrary from '@/hooks/use-library';
import { getPersonalizedData } from '@/utils/personalizedTags';
import { ElemCategories } from '@/components/dashboard/elem-categories';
import CookieService from '@/utils/cookie';
import moment from 'moment';
import { CompaniesByFilterInSection } from '@/components/companies/elem-companies-by-filter-insection';
import { InvestorsByFilterInSection } from '@/components/investors/elem-investors-by-filter-insection';
import { EventsByFilterInSection } from '@/components/events/elem-events-by-filter-insection';
import { onTrackView } from '@/utils/track';
import { useRouter } from 'next/router';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { NextSeo } from 'next-seo';
import { ElemFiltersWrap } from '@/components/filters/elem-filters-wrap';
import Image from 'next/image';
import { ElemButton } from '@/components/elem-button';
import { UserMenu } from '@/components/user-menu';
import { ROUTES } from '@/routes';
import { IconBell } from '@/components/icons';
import { ElemSearchBox } from '@/components/elem-search-box';
import { usePopup } from '@/context/popup-context';
import { useHotkeys } from 'react-hotkeys-hook';
import { TheMobileNav } from '@/components/the-mobile-nav';
import SearchModal from '@/components/search-modal';
import { UsageModal } from '@/components/usage-modal';
// import { NewsByFilter } from '@/components/news/elem-news-by-filter';
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";

const ITEMS_PER_PAGE = 4;
const GLOBAL_TAG = 'Global';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, unreadNotificationsCount } = useUser();
  const { showPopup, setShowPopup } = usePopup();
  const [show, setShow] = useState<boolean>(false);

  const showPersonalized = !!user;

  const { industryTags, locationTags } = getPersonalizedData({ user });

  const categories = [...locationTags, GLOBAL_TAG, ...industryTags];

  const isDisplaySelectLibrary =
    user?.email &&
    (SWITCH_LIBRARY_ALLOWED_EMAILS.includes(user.email) ||
      SWITCH_LIBRARY_ALLOWED_DOMAINS.some(domain =>
        user.email.endsWith(domain),
      ));

  const { selectedLibrary } = useLibrary();
  const defaultFilters: DeepPartial<Companies_Bool_Exp>[] = [
    { library: { _contains: selectedLibrary } },
  ];

  const vcFirmsDefaultFilters: DeepPartial<Vc_Firms_Bool_Exp>[] = [
    { library: { _contains: selectedLibrary } },
  ];

  const getFirstOrDefaultCategory = () => {
    return {
      title: categories[0],
      value: categories[0].toLowerCase(),
    };
  };

  const [selectedStatusTag, setSelectedStatusTag] =
    useState<DashboardCategory | null>(getFirstOrDefaultCategory());

  useEffect(() => {
    setSelectedStatusTag(getFirstOrDefaultCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] =
    useState<boolean>(false);

  const userCanUsePremiumFilter = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onReady = () => {
    console.log('Ad is ready');
  };

  const onError = () => {
    console.log('Ad failed to load');
  };

  useEffect(() => {
    onTrackView({
      pathname: router.pathname,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSelectedTagLocation = locationTags.includes(
    selectedStatusTag?.title || '',
  );
  // const { show } = useIntercom();
  function handleLiveChatEvent(event: EventHandlerPayload<"onNewEvent">) {
    console.log("LiveChatWidget.onNewEvent", event);
  }

  const showNewMessages = () => {
    setShow(true);
  }

  useEffect(() => {
    if (!showPopup && router.asPath.includes(ROUTES.SIGN_IN)) {
      setShowPopup(router.asPath.includes('?usage=true') ? 'usage' : false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useHotkeys('ctrl+k, command+k', function (event) {
    event.preventDefault();
    setShowPopup('search');
  });

  const onModalClose = useCallback(() => {
    setShowPopup(false);
  }, [setShowPopup]);

  return (
    <>
      {show && <LiveChatWidget
        license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
        visibility="maximized"
        onNewEvent={handleLiveChatEvent}
      />}
      <NextSeo
        title="Home"
        description="Early-stage companies in the AI and Web3 markets require actionable intelligence and hyper-speed. Consider this your greatest asset."
      />

      <DashboardLayout>
        <div className="relative justify-self-end mr-8 flex flex-row space-x-3 lg:space-x-3">
          {/* {user ? (
            <>
              <ElemButton
                href={ROUTES.NOTIFICATIONS}
                className="relative w-9 h-9 !p-0">
                {unreadNotificationsCount > 0 && (
                  <div className="absolute flex items-center justify-center -top-[2px] right-0 h-5 min-w-[20px] px-0.5 rounded-full bg-primary-500 border-2 border-white">
                    <div className="text-white font-bold text-[10px] text-center">
                      {unreadNotificationsCount > 99
                        ? '99+'
                        : unreadNotificationsCount}
                    </div>
                  </div>
                )}
                <div className="border-[0.5px]  border-gray-400 rounded-full p-1">
                  <IconBell
                    className={`w-6 h-6 shrink-0 ${
                      unreadNotificationsCount > 0 && 'mr-1'
                    }`}
                    strokeWidth={1.5}
                  />
                </div>
              </ElemButton>
            </>
          ) : (
            <ElemButton
              href={ROUTES.SIGN_IN}
              btn="primary"
              className="whitespace-nowrap">
              Sign in
            </ElemButton>
          )} */}
          {/* <UserMenu /> */}
        </div>

        <div className="relative">
          <div
            style={{
              position: 'relative',
              justifyContent: 'center',

              height: '100%',
              marginBottom: '5rem',
              marginTop:'2rem',
              justifySelf: 'center',
            }}
            className="pb-4 mt-5 justify-self-center w-full sm:w-[70%] sm:mx-auto sm:ml-8 flex justify-start sm:justify-center">
            <Image
              src="/images/homeHeader.png"
              alt="Beneath Div Image"
              layout="fill"
              objectFit="fill"
              className="rounded-xl"
            />

            <div className="mx-8 mt-8 relative z-10">
              <div className="flex flex-col gap-4 gap-x-8">
                {/* Correcting the flex container */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row', // Ensures content is in a row layout
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <span className="text-4xl font-mon_book">
                    {`Hello, ${user?.display_name?.split(' ')[0] || ''}`}
                  </span>

                  <ElemButton
                    btn="white"
                    size="sm"
                    disabled={true}
                    className="ml-4" // Adds spacing between the text and the button
                  >
                    Thanks ✓
                  </ElemButton>
                </div>

                <span className="mb-3 text-md font-mon_book text-gray-300">
                  Here’s your personalized overview of the data that is most
                  relevant to your business, updated daily. &nbsp;
                  <span className="underline cursor-pointer" onClick={showNewMessages}>
                    We&rsquo;d love your feedback
                  </span>
                </span>
              </div>
            </div>
          </div>

          <h1 className="font-mon_md ml-10 text-5xl mb-10">Explore</h1>

          {/* <ElemSearchBox
            onClick={() => {
              setShowPopup('search');
            }}
          /> */}
          {/* <div className="pb-2"></div> */}

          <ElemFiltersWrap>
            <ElemCategories
              categories={categories.map(category => ({
                title: category,
                value: category.toLowerCase(),
              }))}
              selectedCategory={selectedStatusTag}
              onChangeCategory={setSelectedStatusTag}
            />

            <div className="hidden lg:block lg:ml-auto"></div>

            <div>
              <h3 className="mb-1 font-medium lg:hidden">Library</h3>
              <ElemLibrarySelector />
            </div>
          </ElemFiltersWrap>
          <ElemInviteBanner className="mx-8 mt-3" />

          {/* Location and Tags */}
          {selectedStatusTag && selectedStatusTag.title !== GLOBAL_TAG && (
            <div className="mx-8">
              <div className="flex flex-col gap-4 gap-x-8">
                {/* 
                Personalized news are hidden until news data gets updated
                {showPersonalized &&
                  locationTags.map((location, index) => (
                    <NewsByFilter
                      key={`${location}-${index}`}
                      headingText={`Trending in ${location}`}
                      itemsPerPage={ITEMS_PER_PAGE}
                      orderBy={{
                        updated_at: Order_By.Desc,
                      }}
                      filters={{
                        _or: [
                          {
                            organizations: {
                              company: {
                                ...(isSelectedTagLocation
                                  ? {
                                      location_json: {
                                        _contains: {
                                          city: `${selectedStatusTag.title}`,
                                        },
                                      },
                                    }
                                  : {
                                      tags: {
                                        _contains: selectedStatusTag.title,
                                      },
                                    }),
                              },
                            },
                          },
                          {
                            organizations: {
                              vc_firm: {
                                ...(isSelectedTagLocation
                                  ? {
                                      location_json: {
                                        _contains: {
                                          city: `${selectedStatusTag.title}`,
                                        },
                                      },
                                    }
                                  : {
                                      tags: {
                                        _contains: selectedStatusTag.title,
                                      },
                                    }),
                              },
                            },
                          },
                        ],
                      }}
                    />
                  ))} */}

                <div className="mt-9">
                  <h2 className="text-2xl font-medium">Trending 🔥</h2>
                  <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl bg-black">
                    <CompaniesByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Companies"
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      orderBy={{
                        num_of_views: Order_By.Desc,
                      }}
                      filters={{
                        _and: [
                          ...defaultFilters,
                          { num_of_views: { _is_null: false } },
                          {
                            _not: {
                              status_tags: { _contains: 'Dead' },
                            },
                          },
                          isSelectedTagLocation
                            ? {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              }
                            : {
                                tags: {
                                  _contains: selectedStatusTag.title,
                                },
                              },
                        ],
                      }}
                    />

                    <InvestorsByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Investors"
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      orderBy={{
                        num_of_views: Order_By.Desc,
                      }}
                      filters={{
                        _and: [
                          ...vcFirmsDefaultFilters,
                          { num_of_views: { _is_null: false } },
                          {
                            _not: {
                              status_tags: { _contains: 'Dead' },
                            },
                          },
                          isSelectedTagLocation
                            ? {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              }
                            : {
                                tags: {
                                  _contains: selectedStatusTag.title,
                                },
                              },
                        ],
                      }}
                    />
                  </div>
                </div>

                {isSelectedTagLocation && (
                  <>
                    <div className="mt-16">
                      <h2 className="text-2xl font-medium">New companies ✨</h2>
                      <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl bg-black">
                        <CompaniesByFilterInSection
                          onOpenUpgradeDialog={onOpenUpgradeDialog}
                          userCanUsePremiumFilter={userCanUsePremiumFilter}
                          cardType="compact"
                          headingText=""
                          itemsPerPage={ITEMS_PER_PAGE}
                          isTableView={false}
                          isEnabledSeeAll={false}
                          orderBy={{
                            year_founded: Order_By.Desc,
                          }}
                          filters={{
                            _and: [
                              ...defaultFilters,
                              {
                                year_founded: {
                                  _gte: moment()
                                    .subtract(1, 'year')
                                    .year()
                                    .toString(),
                                },
                              },
                              {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              },
                            ],
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-16">
                      <h2 className="text-2xl font-medium">
                        Upcoming events 🗓️
                      </h2>
                      <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl">
                        <EventsByFilterInSection
                          onOpenUpgradeDialog={onOpenUpgradeDialog}
                          userCanUsePremiumFilter={userCanUsePremiumFilter}
                          cardType="compact"
                          headingText=""
                          itemsPerPage={ITEMS_PER_PAGE}
                          orderBy={{
                            start_date: Order_By.Asc,
                          }}
                          filters={{
                            _and: [
                              ...defaultFilters,
                              {
                                start_date: {
                                  _gte: moment().format(ISO_DATE_FORMAT),
                                },
                              },
                              {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              },
                              { parent_event_id: { _is_null: true } },
                            ],
                          }}
                        />
                      </div>
                    </div>
                    <Banner
                      placement="ec79613229"
                      onReady={onReady}
                      onError={onError}
                    />
                    <div className="mt-16">
                      <h2 className="text-2xl font-medium">
                        Recently updated 🔄
                      </h2>
                      <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl bg-black">
                        <CompaniesByFilterInSection
                          onOpenUpgradeDialog={onOpenUpgradeDialog}
                          userCanUsePremiumFilter={userCanUsePremiumFilter}
                          cardType="compact"
                          headingText={`Companies`}
                          itemsPerPage={ITEMS_PER_PAGE}
                          isTableView={false}
                          orderBy={{
                            updated_at: Order_By.Desc,
                          }}
                          filters={{
                            _and: [
                              ...defaultFilters,
                              {
                                updated_at: {
                                  _gte: moment()
                                    .subtract(28, 'days')
                                    .format(ISO_DATE_FORMAT),
                                },
                              },
                              {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              },
                            ],
                          }}
                        />
                        <InvestorsByFilterInSection
                          onOpenUpgradeDialog={onOpenUpgradeDialog}
                          userCanUsePremiumFilter={userCanUsePremiumFilter}
                          cardType="compact"
                          headingText={`Investors`}
                          itemsPerPage={ITEMS_PER_PAGE}
                          isTableView={false}
                          orderBy={{
                            updated_at: Order_By.Desc,
                          }}
                          filters={{
                            _and: [
                              { library: { _contains: selectedLibrary } },
                              {
                                updated_at: {
                                  _gte: moment()
                                    .subtract(28, 'days')
                                    .format(ISO_DATE_FORMAT),
                                },
                              },
                              {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              },
                            ],
                          }}
                        />
                        <EventsByFilterInSection
                          onOpenUpgradeDialog={onOpenUpgradeDialog}
                          userCanUsePremiumFilter={userCanUsePremiumFilter}
                          cardType="compact"
                          headingText="Events"
                          isEnabledSeeAll={false}
                          itemsPerPage={ITEMS_PER_PAGE}
                          orderBy={{
                            start_date: Order_By.Asc,
                          }}
                          filters={{
                            _and: [
                              ...defaultFilters,
                              {
                                location_json: {
                                  _contains: {
                                    city: `${selectedStatusTag.title}`,
                                  },
                                },
                              },
                              {
                                updated_at: {
                                  _gte: moment()
                                    .subtract(28, 'days')
                                    .format(ISO_DATE_FORMAT),
                                },
                              },
                            ],
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Global */}
          {selectedStatusTag && selectedStatusTag.title === GLOBAL_TAG && (
            <div className="mx-8">
              <div className="flex flex-col gap-4 gap-x-8">
                <div className="mt-9">
                  <h2 className="text-2xl font-medium">Companies 🏢</h2>
                  <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl">
                    <CompaniesByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Recently funded"
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      orderBy={{
                        investment_rounds_aggregate: {
                          sum: {
                            amount: Order_By.Desc,
                          },
                        },
                      }}
                      filters={{
                        _and: [
                          ...defaultFilters,
                          {
                            investment_rounds: {
                              round_date: {
                                _gte: moment()
                                  .subtract(28, 'days')
                                  .format(ISO_DATE_FORMAT),
                              },
                            },
                          },
                        ],
                      }}
                    />
                    <CompaniesByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Recently founded"
                      isEnabledSeeAll={false}
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      orderBy={{
                        year_founded: Order_By.Desc,
                      }}
                      filters={{
                        _and: [
                          ...defaultFilters,
                          {
                            year_founded: {
                              _gte: moment()
                                .subtract(1, 'year')
                                .year()
                                .toString(),
                            },
                          },
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className="mt-16">
                  <h2 className="text-2xl font-medium">Investors 💵</h2>
                  <div className="px-6 mt-5 border  border-neutral-700 rounded-2xl">
                    <InvestorsByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Recently active investors"
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      filters={{
                        _and: [
                          ...vcFirmsDefaultFilters,
                          {
                            investments: {
                              investment_round: {
                                round_date: {
                                  _gte: moment()
                                    .subtract(28, 'days')
                                    .format(ISO_DATE_FORMAT),
                                },
                              },
                            },
                          },
                        ],
                      }}
                    />
                    <InvestorsByFilterInSection
                      onOpenUpgradeDialog={onOpenUpgradeDialog}
                      userCanUsePremiumFilter={userCanUsePremiumFilter}
                      cardType="compact"
                      headingText="Exits"
                      isEnabledSeeAll={false}
                      itemsPerPage={ITEMS_PER_PAGE}
                      isTableView={false}
                      filters={{
                        _and: [
                          ...vcFirmsDefaultFilters,
                          {
                            num_of_exits: {
                              _gte: 0,
                            },
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <Toaster />

          <ElemUpgradeDialog
            isOpen={isOpenUpgradeDialog}
            onClose={onCloseUpgradeDialog}
          />
        </div>

        <TheMobileNav />

        <SearchModal show={showPopup === 'search'} onClose={onModalClose} />

        <UsageModal show={showPopup === 'usage'} onClose={onModalClose} />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const token = CookieService.getAuthToken(context.req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
};

export default Home;
