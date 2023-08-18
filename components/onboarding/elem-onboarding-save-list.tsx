import { FC, useMemo, useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  useInstantSearch,
  SearchBox,
  Highlight,
  InfiniteHits,
  Index,
  Configure,
} from 'react-instantsearch-hooks-web';
import { Segment } from '@/types/onboarding';
import { ElemButton } from '../elem-button';
import { IconImage, IconSearch, IconUser } from '../icons';
import { ElemOnboardingResourceTable } from './elem-onboarding-resource-table';
import {
  HitCompaniesProps,
  HitInvestorsProps,
  HitPeopleProps,
} from '../search-modal';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
);

type Props = {
  segment?: Segment;
  companies: HitCompaniesProps['hit'][];
  investors: HitInvestorsProps['hit'][];
  people: HitPeopleProps['hit'][];
  onChangeCompanies: (companies: HitCompaniesProps['hit'][]) => void;
  onChangeInvestors: (vcFirms: HitInvestorsProps['hit'][]) => void;
  onChangePeople: (people: HitPeopleProps['hit'][]) => void;
  onNext: () => void;
};

export const ElemOnboardingSaveList: FC<Props> = ({
  segment,
  companies,
  investors,
  people,
  onChangeCompanies,
  onChangeInvestors,
  onChangePeople,
  onNext,
}) => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const heading = useMemo(() => {
    switch (segment) {
      case 'Executive':
        return 'Did you know you can make a list of your potential investors?';
      case 'Investor':
        return 'Did you know you can monitor your portfolio companies?';
      case 'Sales or Business Developer':
        return 'Did you know you can easily prospect your leads?';
      case 'Team Member':
        return 'Did you know you can monitor your competitors?';
      case 'Event Organizer':
        return 'Did you know you can make a list of potential event speakers?';
      case 'Creator or Publisher':
        return 'Did you know you can monitor trending companies?';
      default:
        return '';
    }
  }, [segment]);

  const HitCompanies = () =>
    function HitCompanies({ hit }: HitCompaniesProps) {
      return (
        <div
          className="flex items-center px-6 py-1 group text-sm cursor-pointer hover:bg-slate-100"
          onClick={() => {
            onChangeCompanies([...companies, hit]);
            setShowSearchResults(false);
          }}
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
            {hit.logo ? (
              <img
                className="object-contain max-w-full max-h-full"
                src={hit.logo}
                alt={hit.name}
              />
            ) : (
              <IconImage className="object-contain max-w-full max-h-full text-slate-200" />
            )}
          </div>
          <div className="flex grow">
            <h2 className="min-w-fit font-bold whitespace nowrap ml-2 text-slate-600 group-hover:text-primary-500">
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
            <p className="ml-2 text-sm text-slate-600 line-clamp-1">
              <Highlight
                attribute="overview"
                hit={hit}
                classNames={{
                  highlighted: 'bg-primary-100',
                }}
              />
            </p>
          </div>
        </div>
      );
    };

  const HitInvestors = () =>
    function HitInvestors({ hit }: HitInvestorsProps) {
      return (
        <div
          className="flex items-center px-6 py-1 group text-sm cursor-pointer hover:bg-slate-100"
          onClick={() => {
            onChangeInvestors([...investors, hit]);
            setShowSearchResults(false);
          }}
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
            {hit.logo ? (
              <img
                className="object-contain max-w-full max-h-full"
                src={hit.logo}
                alt={hit.name}
              />
            ) : (
              <IconImage className="object-contain max-w-full max-h-full text-slate-200" />
            )}
          </div>
          <h2 className="min-w-fit grow font-bold whitespace nowrap ml-2 text-slate-600">
            <Highlight
              attribute="name"
              hit={hit}
              classNames={{
                highlighted:
                  'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
              }}
            />
          </h2>
        </div>
      );
    };

  const HitPeople = () =>
    function HitPeople({ hit }: HitPeopleProps) {
      return (
        <div
          className="flex items-center px-6 py-1 group text-sm cursor-pointer hover:bg-slate-100"
          onClick={() => {
            onChangePeople([...people, hit]);
            setShowSearchResults(false);
          }}
        >
          <div className="flex items-center justify-center shrink-0 w-12 h-12 p-1 bg-white rounded border border-slate-200">
            {hit.picture ? (
              <img
                className="object-contain max-w-full max-h-full"
                src={hit.picture}
                alt={hit.name}
              />
            ) : (
              <IconUser className="object-contain max-w-full max-h-full text-slate-200" />
            )}
          </div>
          <h2 className="min-w-fit grow font-bold whitespace nowrap ml-2 text-slate-600">
            <Highlight
              attribute="name"
              hit={hit}
              classNames={{
                highlighted:
                  'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
              }}
            />
          </h2>
        </div>
      );
    };

  return (
    <>
      <h1 className="max-w-xl mt-4 text-2xl text-center font-medium lg:text-3xl">
        {heading}
      </h1>

      <div className="max-w-sm">
        <p className="mt-5 text-xs text-center text-slate-500 font-normal">
          You can save companies, investors and people to lists and get updates
          on them. Start by adding a few profiles to your first, private list.
        </p>

        <div className="relative">
          <InstantSearch searchClient={searchClient} indexName="companies">
            <header className="relative flex items-center z-10 mt-8">
              <IconSearch className="w-4 h-4 absolute top-1/2 left-3 z-20 -translate-y-1/2 text-slate-400" />
              <SearchBox
                className="w-full text-sm border-0"
                placeholder="Try “Coinbase”"
                autoFocus={true}
                queryHook={(query, search) => {
                  setShowSearchResults(query.length > 0);
                  search(query);
                }}
                classNames={{
                  submitIcon: 'hidden',
                  resetIcon: 'hidden',
                  loadingIndicator: 'hidden',
                  form: 'flex',
                  input:
                    'w-full py-2 pl-10 m-0 text-sm placeholder:text-slate-400 relative bg-white rounded-full border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500',
                }}
              />
            </header>

            {showSearchResults && (
              <div className="border border-gray-200 rounded-lg shadow-sm w-full absolute top-10 z-20 bg-white">
                <Index indexName="companies">
                  <Configure hitsPerPage={4} />
                  <h3 className="font-semibold text-sm mt-5 mx-6">Companies</h3>
                  <EmptyQueryBoundary>
                    <InfiniteHits
                      hitComponent={HitCompanies()}
                      showPrevious={false}
                      classNames={{
                        list: 'my-2 border-y border-slate-100 divide-y divide-slate-100',
                        loadMore:
                          'w-[calc(100%-3rem)] text-sm font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                        disabledLoadMore: 'hidden',
                      }}
                    />
                  </EmptyQueryBoundary>
                </Index>

                <Index indexName="vc_firms">
                  <Configure hitsPerPage={4} />
                  <h3 className="font-semibold text-sm mt-5 mx-6">Investors</h3>
                  <EmptyQueryBoundary>
                    <InfiniteHits
                      hitComponent={HitInvestors()}
                      showPrevious={false}
                      classNames={{
                        list: 'my-2 border-y border-slate-100 divide-y divide-slate-100',
                        loadMore:
                          'w-[calc(100%-3rem)] text-sm font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                        disabledLoadMore: 'hidden',
                      }}
                    />
                  </EmptyQueryBoundary>
                </Index>

                <Index indexName="people">
                  <Configure hitsPerPage={4} />
                  <h3 className="font-semibold text-sm mt-5 mx-6">People</h3>
                  <EmptyQueryBoundary>
                    <InfiniteHits
                      hitComponent={HitPeople()}
                      showPrevious={false}
                      classNames={{
                        list: 'my-2 border-y border-slate-100 divide-y divide-slate-100',
                        loadMore:
                          'w-[calc(100%-3rem)] text-sm font-bold h-9 mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-500',
                        disabledLoadMore: 'hidden',
                      }}
                    />
                  </EmptyQueryBoundary>
                </Index>
              </div>
            )}
          </InstantSearch>
        </div>
      </div>

      {companies.length > 0 && (
        <div className="mt-4 max-w-3xl w-full">
          <ElemOnboardingResourceTable
            resourceType="company"
            data={companies}
            onRemove={slug => {
              onChangeCompanies([
                ...companies.filter(item => item.slug !== slug),
              ]);
            }}
          />
        </div>
      )}

      {investors.length > 0 && (
        <div className="mt-4 max-w-3xl w-full">
          <ElemOnboardingResourceTable
            resourceType="investor"
            data={investors}
            onRemove={slug => {
              onChangeInvestors([
                ...investors.filter(item => item.slug !== slug),
              ]);
            }}
          />
        </div>
      )}

      {people.length > 0 && (
        <div className="mt-4 max-w-3xl w-full">
          <ElemOnboardingResourceTable
            resourceType="people"
            data={people}
            onRemove={slug => {
              onChangePeople([...people.filter(item => item.slug !== slug)]);
            }}
          />
        </div>
      )}

      <ElemButton
        btn="primary"
        size="md"
        className="max-w-sm w-full mt-16"
        disabled={
          companies.length === 0 &&
          investors.length === 0 &&
          people.length === 0
        }
        onClick={onNext}
      >
        Save my list
      </ElemButton>

      <p className="text-gray-500 text-xs mt-4">
        You can always create more lists later.
      </p>
    </>
  );
};

function EmptyQueryBoundary({ children }: { children: JSX.Element }) {
  const { results } = useInstantSearch();

  if (results?.nbHits === 0) {
    return (
      <div className="w-full px-6 py-1">
        <p>No results for “{results.query}“. </p>
      </div>
    );
  }
  return children;
}
