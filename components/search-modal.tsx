import { Dialog, Tab, Transition } from '@headlessui/react';
import { FC, ReactElement, Fragment, useState, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import { every } from 'lodash';
import {
  InstantSearch,
  useInstantSearch,
  SearchBox,
  Highlight,
  InfiniteHits,
  Index,
  Configure,
} from 'react-instantsearch-hooks-web';
import { FigureSearch } from '@/components/figures';
import {
  IconSearch,
  IconChevronRight,
  IconUserPlaceholder,
  IconImage,
  IconExternalLink,
} from '@/components/icons';
import Link from 'next/link';
import { getEventBanner, randomImageOfCity } from '@/utils/helpers';
import { formatDate } from '@/utils/numbers';
import useLibrary from '@/hooks/use-library';
import { parseIndexName } from '@/utils/algolia';
import { COMPANIES, CONTACT, EVENTS, INVESTORS, PEOPLE } from '@/routes';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
);

export type HitCompaniesProps = {
  hit: AlgoliaHit<{
    name: string;
    overview: string;
    coinTicker: string;
    logo: string;
    slug: string;
    empty: boolean;
  }>;
};

export type HitInvestorsProps = {
  hit: AlgoliaHit<{
    name: string;
    logo: string;
    slug: string;
    empty: boolean;
  }>;
};

export type HitPeopleProps = {
  hit: AlgoliaHit<{
    name: string;
    work_email: string;
    personal_email: string;
    picture: string;
    slug: string;
    empty: boolean;
  }>;
};

type HitEventsProps = {
  hit: AlgoliaHit<{
    name: string;
    slug: string;
    overview: string;
    banner: string;
    location_json: Record<string, string>;
    start_date: string;
    end_date: string;
    timezone: string;
    empty: boolean;
  }>;
};

type HitNewsProps = {
  hit: AlgoliaHit<{
    text: string;
    link: string;
    date: string;
    poweredBy: string;
    empty: boolean;
  }>;
};

type MasterEmptyQueryBoundaryProps = {
  children: ReactElement;
};

type EmptyQueryBoundaryProps = {
  children: ReactElement;
  emptyText?: string;
};

const HitCompanies = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
  function HitCompanies({ hit }: HitCompaniesProps) {
    return (
      <Link
        href={
          isAdmin
            ? `/admin/app/#/companies/${hit.objectID}`
            : `${COMPANIES}/${hit.slug}`
        }
        passHref
      >
        <a
          onClick={() => {
            onClose();
            if (isAdmin && redirect) {
              redirect(`${COMPANIES}/${hit.objectID}`);
            }
          }}
          className="flex items-center px-6 py-1 group hover:bg-gray-100"
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-gray-200">
            {hit.logo ? (
              <img
                className="object-contain max-w-full max-h-full"
                src={hit.logo}
                alt={hit.name}
              />
            ) : (
              <IconImage className="object-contain max-w-full max-h-full text-gray-200" />
            )}
          </div>
          <div className="flex grow">
            <h2 className="min-w-fit font-medium whitespace nowrap ml-2 text-gray-500 group-hover:text-primary-500">
              <Highlight
                attribute="name"
                hit={hit}
                classNames={{
                  highlighted:
                    'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
                }}
              />
            </h2>
            {hit.coinTicker && (
              <div className="ml-2 uppercase">
                <Highlight
                  attribute="coinTicker"
                  hit={hit}
                  classNames={{
                    highlighted:
                      'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100',
                  }}
                />
              </div>
            )}
            <p className="ml-2 text-sm text-gray-500 line-clamp-1">
              <Highlight
                attribute="overview"
                hit={hit}
                classNames={{
                  highlighted: 'bg-primary-100',
                }}
              />
            </p>
          </div>
          <IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
        </a>
      </Link>
    );
  };

const HitInvestors = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
  function HitInvestors({ hit }: HitInvestorsProps) {
    return (
      <Link
        href={
          isAdmin
            ? `/admin/app/#/vc_firms/${hit.objectID}`
            : `${INVESTORS}/${hit.slug}`
        }
        passHref
      >
        <a
          className="flex items-center px-6 py-1 group hover:bg-gray-100"
          onClick={() => {
            onClose();
            if (isAdmin && redirect) {
              redirect(`/vc_firms/${hit.objectID}`);
            }
          }}
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-gray-200">
            {hit.logo ? (
              <img
                className="object-contain max-w-full max-h-full"
                src={hit.logo}
                alt={hit.name}
              />
            ) : (
              <IconImage className="object-contain max-w-full max-h-full text-gray-200" />
            )}
          </div>
          <h2 className="min-w-fit grow font-medium whitespace nowrap ml-2 text-gray-500">
            <Highlight
              attribute="name"
              hit={hit}
              classNames={{
                highlighted:
                  'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
              }}
            />
          </h2>
          <IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
        </a>
      </Link>
    );
  };

const HitPeople = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
  function HitPeople({ hit }: HitPeopleProps) {
    return (
      <Link
        href={
          isAdmin
            ? `/admin/app/#/people/${hit.objectID}`
            : `${PEOPLE}/${hit.slug}`
        }
        passHref
      >
        <a
          className="flex items-center px-6 py-1 group hover:bg-gray-100"
          onClick={() => {
            onClose();
            if (isAdmin && redirect) {
              redirect(`/people/${hit.objectID}`);
            }
          }}
        >
          <div className="flex items-center justify-center shrink-0 w-12 aspect-square rounded-full bg-white overflow-hidden border border-gray-200">
            {hit.picture ? (
              <img
                className="object-fit max-w-full max-h-full"
                src={hit.picture}
                alt={hit.name}
              />
            ) : (
              <IconUserPlaceholder className="object-fit max-w-full max-h-full text-gray-400" />
            )}
          </div>
          <h2 className="min-w-fit grow font-medium whitespace nowrap ml-2 text-gray-500">
            <Highlight
              attribute="name"
              hit={hit}
              classNames={{
                highlighted:
                  'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
              }}
            />
          </h2>
          <IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
        </a>
      </Link>
    );
  };

const HitEvents = (onClose: () => void, isAdmin?: boolean, redirect?: any) =>
  function HitEvents({ hit }: HitEventsProps) {
    return (
      <Link
        href={
          isAdmin
            ? `/admin/app/#/events/${hit.objectID}`
            : `${EVENTS}/${hit.slug}`
        }
        passHref
      >
        <a
          onClick={() => {
            onClose();
            if (isAdmin && redirect) {
              redirect(`/events/${hit.objectID}`);
            }
          }}
          className="flex items-center px-6 py-1 group hover:bg-gray-100"
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-gray-200">
            <img
              className="object-contain max-w-full max-h-full"
              src={hit.banner || getEventBanner(hit.location_json?.city)}
              alt={hit.name}
              onError={e => {
                (e.target as HTMLImageElement).src = randomImageOfCity(
                  hit.location_json?.city,
                );
                (e.target as HTMLImageElement).onerror = null; // prevents looping
              }}
            />
          </div>

          <div className="flex grow">
            <h2 className="min-w-fit font-medium whitespace nowrap ml-2 text-gray-500 group-hover:text-primary-500">
              <Highlight
                attribute="name"
                hit={hit}
                classNames={{
                  highlighted:
                    'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
                }}
              />
            </h2>

            {hit.start_date && (
              <p className="ml-2 text-sm text-gray-500 line-clamp-1">
                {formatDate(hit.start_date, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  timeZone: hit.timezone || undefined,
                })}
                {/* <Highlight
								attribute="start_date"
								hit={hit}
								classNames={{
									highlighted:
										"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100",
								}}
							/> */}

                {hit.end_date && (
                  <>
                    &nbsp;&ndash;&nbsp;
                    {formatDate(hit.end_date, {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                      timeZone: hit.timezone || undefined,
                    })}
                    {/* <Highlight
										attribute="end_date"
										hit={hit}
										classNames={{
											highlighted:
												"text-primary-500 border-b-2 border-primary-500 opacity-100 bg-primary-100",
										}}
									/> */}
                  </>
                )}
              </p>
            )}
          </div>

          <IconChevronRight className="h-4 w-4 ml-3 shrink-0 group-hover:text-primary-500" />
        </a>
      </Link>
    );
  };

const HitNews = () =>
  function HitNews({ hit }: HitNewsProps) {
    return (
      <div className="px-6 py-2 group hover:bg-gray-100">
        <div className="inline text-base font-medium text-gray-500">
          {hit.link ? (
            <>
              <Link href={hit.link}>
                <a className="underline hover:no-underline" target="_blank">
                  <Highlight
                    attribute="text"
                    hit={hit}
                    classNames={{
                      highlighted:
                        'text-primary-500 opacity-100 bg-transparent',
                    }}
                  />
                  <IconExternalLink className="inline-block w-5 h-5 ml-1 text-primary-500" />
                </a>
              </Link>
            </>
          ) : (
            <Highlight
              attribute="text"
              hit={hit}
              classNames={{
                highlighted:
                  'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
              }}
            />
          )}
          <div className="flex items-center gap-x-2">
            <p className="text-sm font-normal">
              {formatDate(hit.date as string, {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
              <span>{` • powered by ${hit.poweredBy}`}</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

export default function SearchModal(props: any) {
  const emptyView = useRef(true);

  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  const { selectedLibrary } = useLibrary();

  const onClose = () => {
    props.onClose();
  };

  const MasterEmptyQueryBoundary: FC<MasterEmptyQueryBoundaryProps> = ({
    children,
  }) => {
    const { scopedResults, results } = useInstantSearch();

    const allEmpty = every(
      scopedResults,
      result => result.results?.nbHits === 0,
    );

    if (!results._state.query) {
      return (
        <div className="px-6 py-1 mt-5 text-center">
          <FigureSearch className="mx-auto h-36 lg:h-40" />
          <div className="mt-3 text-xl font-medium">
            Search for Companies, Investors, People, Events &amp; News
          </div>
          <div style={{ display: 'none' }}>{children}</div>
        </div>
      );
    } else if (allEmpty) {
      return (
        <div className="w-full mt-5 px-6 py-1">
          <h3 className="font-medium">No results for “{results.query}“</h3>
          <p>
            <Link href={CONTACT} passHref>
              <a onClick={onClose} className="text-primary-500">
                Tell us about missing data.
              </a>
            </Link>
          </p>
        </div>
      );
    }

    return children;
  };

  const EmptyQueryBoundary: FC<EmptyQueryBoundaryProps> = ({
    children,
    emptyText = '',
  }) => {
    const { results } = useInstantSearch();

    if (results._state.query === '') {
      return <div className="px-6 py-1 text-gray-500">{emptyText}</div>;
    } else if (results?.nbHits === 0) {
      return (
        <div className="w-full px-6 py-1">
          <p>
            No results for “{results.query}“.{' '}
            <Link href={CONTACT} passHref>
              <a onClick={onClose} className="text-primary-500">
                {`Tell us about missing ${parseIndexName(
                  results._state.index,
                )}.`}
              </a>
            </Link>
          </p>
        </div>
      );
    }
    return children;
  };

  const ResultTabList = () => {
    const { scopedResults } = useInstantSearch();

    const getNumOfRecords = (indexes: string[]) => {
      const scopedIndex = scopedResults.find(resultItem =>
        indexes.includes(resultItem.indexId),
      );
      if (!scopedIndex) {
        return undefined;
      }

      return scopedIndex?.results?.nbHits;
    };

    const getTabTitle = (
      resourceType: 'companies' | 'vc_firms' | 'people' | 'events' | 'news',
    ) => {
      switch (resourceType) {
        case 'companies':
          return `Companies${
            getNumOfRecords(['companies', 'ai_companies']) === undefined
              ? ''
              : ` (${getNumOfRecords(['companies', 'ai_companies'])})`
          }`;

        case 'vc_firms':
          return `Investors${
            getNumOfRecords(['vc_firms', 'ai_vc_firms']) === undefined
              ? ''
              : ` (${getNumOfRecords(['vc_firms', 'ai_vc_firms'])})`
          }`;

        case 'people':
          return `People${
            getNumOfRecords(['people', 'ai_people']) === undefined
              ? ''
              : ` (${getNumOfRecords(['people', 'ai_people'])})`
          }`;

        case 'events':
          return `Events${
            getNumOfRecords(['events', 'ai_events']) === undefined
              ? ''
              : ` (${getNumOfRecords(['events', 'ai_events'])})`
          }`;

        case 'news':
          return `News${
            getNumOfRecords(['news', 'ai_news']) === undefined
              ? ''
              : ` (${getNumOfRecords(['news', 'ai_news'])})`
          }`;

        default:
          return '';
      }
    };

    return (
      <Tab.List className="whitespace-nowrap flex gap-2 my-2 px-6 py-1 font-medium bg-white transition-all overflow-x-scroll">
        <Tab
          className={({ selected }) =>
            `${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500 px-2.5 py-2 text-sm justify-center rounded-lg`
          }
        >
          {getTabTitle('companies')}
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500 px-2.5 py-2 text-sm justify-center rounded-lg`
          }
        >
          {getTabTitle('vc_firms')}
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500 px-2.5 py-2 text-sm justify-center rounded-lg`
          }
        >
          {getTabTitle('people')}
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500 px-2.5 py-2 text-sm justify-center rounded-lg`
          }
        >
          {getTabTitle('events')}
        </Tab>
        <Tab
          className={({ selected }) =>
            `${
              selected
                ? 'border-primary-500 hover:border-primary-500 hover:bg-gray-200'
                : ''
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-900 bg-gray-100 border border-gray-100 hover:border-gray-300 active:border-primary-500 px-2.5 py-2 text-sm justify-center rounded-lg`
          }
        >
          {getTabTitle('news')}
        </Tab>
      </Tab.List>
    );
  };

  return (
    <>
      <Transition appear show={props.show} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl pb-5 transform rounded-lg shadow-2xl bg-white overflow-y-auto overflow-x-hidden text-left align-middle transition-all">
                  <InstantSearch
                    searchClient={searchClient}
                    indexName="companies"
                  >
                    <header className="relative flex items-center z-10 p-0 px-4 border-b border-gray-100">
                      <IconSearch className="h-6 w-6 text-gray-500" />
                      <SearchBox
                        className="w-full"
                        placeholder="Quick Search..."
                        autoFocus={true}
                        classNames={{
                          submitIcon: 'hidden',
                          resetIcon: 'hidden',
                          loadingIndicator: 'hidden',
                          form: 'flex',
                          input:
                            'appearance-none bg-transparent ml-3 mr-4 flex-1 h-14 min-w-0 border-none placeholder:text-gray-500 focus:bg-transparent focus:border-none focus:ring-0',
                        }}
                      />
                      <button
                        onClick={onClose}
                        type="reset"
                        arial-label="cancel"
                        className="appearance-none w-8 justify-items-end p-1 bg-white border border-gray-100 rounded-md text-gray-500 font-medium text-[9px] hover:shadow-sm"
                      >
                        ESC
                      </button>
                    </header>

                    <MasterEmptyQueryBoundary>
                      <Tab.Group
                        selectedIndex={tabSelectedIndex}
                        onChange={setTabSelectedIndex}
                      >
                        <ResultTabList />
                        <Tab.Panels>
                          <Tab.Panel unmount={false}>
                            <Index
                              indexName={
                                selectedLibrary === 'Web3'
                                  ? 'companies'
                                  : 'ai_companies'
                              }
                            >
                              <Configure hitsPerPage={10} />
                              <EmptyQueryBoundary>
                                <InfiniteHits
                                  hitComponent={HitCompanies(
                                    onClose,
                                    props.isAdmin,
                                    props.redirect,
                                  )}
                                  showPrevious={false}
                                  classNames={{
                                    list: 'mb-2 border-y border-gray-200 divide-y divide-gray-200',
                                    loadMore:
                                      'w-[calc(100%-3rem)] font-medium h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                                    disabledLoadMore: 'hidden',
                                  }}
                                />
                              </EmptyQueryBoundary>
                            </Index>
                          </Tab.Panel>
                          <Tab.Panel unmount={false}>
                            <Index
                              indexName={
                                selectedLibrary === 'Web3'
                                  ? 'vc_firms'
                                  : 'ai_vc_firms'
                              }
                            >
                              <Configure hitsPerPage={10} />
                              <EmptyQueryBoundary>
                                <InfiniteHits
                                  hitComponent={HitInvestors(
                                    onClose,
                                    props.isAdmin,
                                    props.redirect,
                                  )}
                                  showPrevious={false}
                                  classNames={{
                                    list: 'mb-2 border-y border-gray-200 divide-y divide-gray-200',
                                    loadMore:
                                      'w-[calc(100%-3rem)] font-medium h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                                    disabledLoadMore: 'hidden',
                                  }}
                                />
                              </EmptyQueryBoundary>
                            </Index>
                          </Tab.Panel>
                          <Tab.Panel unmount={false}>
                            <Index
                              indexName={
                                selectedLibrary === 'Web3'
                                  ? 'people'
                                  : 'ai_people'
                              }
                            >
                              <Configure hitsPerPage={10} />
                              <EmptyQueryBoundary>
                                <InfiniteHits
                                  hitComponent={HitPeople(
                                    onClose,
                                    props.isAdmin,
                                    props.redirect,
                                  )}
                                  showPrevious={false}
                                  classNames={{
                                    list: 'mb-2 border-y border-gray-200 divide-y divide-gray-200',
                                    loadMore:
                                      'w-[calc(100%-3rem)] font-medium h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-500',
                                    disabledLoadMore: 'hidden',
                                  }}
                                />
                              </EmptyQueryBoundary>
                            </Index>
                          </Tab.Panel>
                          <Tab.Panel unmount={false}>
                            <Index
                              indexName={
                                selectedLibrary === 'Web3'
                                  ? 'events'
                                  : 'ai_events'
                              }
                            >
                              <Configure hitsPerPage={10} />
                              <EmptyQueryBoundary>
                                <InfiniteHits
                                  hitComponent={HitEvents(
                                    onClose,
                                    props.isAdmin,
                                    props.redirect,
                                  )}
                                  showPrevious={false}
                                  classNames={{
                                    list: 'mb-2 border-y border-gray-200 divide-y divide-gray-200',
                                    loadMore:
                                      'w-[calc(100%-3rem)] font-medium h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                                    disabledLoadMore: 'hidden',
                                  }}
                                />
                              </EmptyQueryBoundary>
                            </Index>
                          </Tab.Panel>
                          <Tab.Panel unmount={false}>
                            <Index
                              indexName={
                                selectedLibrary === 'Web3' ? 'news' : 'ai_news'
                              }
                            >
                              <Configure hitsPerPage={10} />
                              <EmptyQueryBoundary>
                                <InfiniteHits
                                  hitComponent={HitNews()}
                                  showPrevious={false}
                                  classNames={{
                                    list: 'my-2 border-y border-gray-100 divide-y divide-gray-100',
                                    loadMore:
                                      'w-[calc(100%-3rem)] font-medium h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                                    disabledLoadMore: 'hidden',
                                  }}
                                />
                              </EmptyQueryBoundary>
                            </Index>
                          </Tab.Panel>
                        </Tab.Panels>
                      </Tab.Group>
                    </MasterEmptyQueryBoundary>
                  </InstantSearch>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
