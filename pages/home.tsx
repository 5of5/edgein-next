import React, { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { ElemFilterSection } from '@/components/elem-filter-section';

const ITEMS_PER_PAGE = 4;
const GLOBAL_TAG = 'Global';

const Home: NextPage = () => {
  const { user } = useUser();
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

  const isSelectedTagLocation = locationTags.includes(
    selectedStatusTag?.title || '',
  );
  const { show } = useIntercom();

  return (
    <DashboardLayout>
      <div className="relative">
        {/* hero */}
        <div className="mx-8 mt-8">
          <div className="flex flex-col gap-4 gap-x-8">
            <span className="text-4xl font-medium">{`Hello, ${
              user?.display_name?.split(' ')[0] || ''
            }`}</span>
            <span className="text-sm font-normal text-gray-500 mb-3">
              Your personalized overview of the most relevant data, updated
              daily.&nbsp;
              <span className="underline cursor-pointer" onClick={show}>
                We&rsquo;d love your feedback
              </span>
            </span>
          </div>
        </div>

        <ElemInviteBanner className="mx-8 mt-3" />

        <div
          className="mt-8 px-8 pt-0.5 pb-3 flex flex-wrap gap-3 items-center justify-between lg:items-center"
          role="tablist"
        >
          <ElemCategories
            categories={categories.map((category, i) => ({
              title: category,
              value: category.toLowerCase(),
            }))}
            selectedCategory={selectedStatusTag}
            onChangeCategory={setSelectedStatusTag}
          />

          <div className="flex flex-wrap gap-2">
            {isDisplaySelectLibrary && <ElemLibrarySelector />}
          </div>
        </div>

        {/* Location and Tags */}
        {selectedStatusTag && selectedStatusTag.title !== GLOBAL_TAG && (
          <div className="mx-8">
            <div className="flex flex-col gap-4 gap-x-8">
              <div className="mt-9">
                <h2 className="text-2xl font-medium">Trending 🔥</h2>
                <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                  <CompaniesByFilterInSection
                    cardType="compact"
                    headingText="Companies"
                    tagOnClick={null}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={false}
                    orderBy={{
                      num_of_views: Order_By.Desc,
                    }}
                    filters={{
                      _and: [
                        ...defaultFilters,
                        { num_of_views: { _is_null: false } },
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
                    cardType="compact"
                    headingText="Investors"
                    tagOnClick={null}
                    itemsPerPage={ITEMS_PER_PAGE}
                    isTableView={false}
                    orderBy={{
                      num_of_views: Order_By.Desc,
                    }}
                    filters={{
                      _and: [
                        ...vcFirmsDefaultFilters,
                        { num_of_views: { _is_null: false } },
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
                    <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                      <CompaniesByFilterInSection
                        cardType="compact"
                        headingText=""
                        tagOnClick={null}
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
                    <h2 className="text-2xl font-medium">Upcoming events 🗓️</h2>
                    <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                      <EventsByFilterInSection
                        cardType="compact"
                        headingText=""
                        tagOnClick={null}
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
                          ],
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-16">
                    <h2 className="text-2xl font-medium">
                      Recently updated 🔄
                    </h2>
                    <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                      <CompaniesByFilterInSection
                        cardType="compact"
                        headingText={`Companies`}
                        tagOnClick={null}
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
                        cardType="compact"
                        headingText={`Investors`}
                        tagOnClick={null}
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
                        cardType="compact"
                        headingText="Events"
                        tagOnClick={null}
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
                <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                  <CompaniesByFilterInSection
                    cardType="compact"
                    headingText="Recently funded"
                    tagOnClick={null}
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
                    cardType="compact"
                    headingText="Recently founded"
                    tagOnClick={null}
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
                <div className="border rounded-2xl border-gray-200 mt-5 px-6">
                  <InvestorsByFilterInSection
                    cardType="compact"
                    headingText="Recently active investors"
                    tagOnClick={null}
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
                    cardType="compact"
                    headingText="Exits"
                    tagOnClick={null}
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
      </div>
    </DashboardLayout>
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
    props: {
      metaTitle: 'Home - EdgeIn.io',
      metaDescription:
        'Early-stage companies in this Web3 market renaissance require actionable intelligence and hyper-speed. Consider this your greatest asset.',
    },
  };
};

export default Home;
