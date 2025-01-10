import { Tab } from '@headlessui/react';
import { FC, ReactElement, useState, useEffect } from 'react';
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
} from 'react-instantsearch';
import { FigureSearch } from '@/components/figures';
import { IconSearch, IconChevronRight, IconImage } from '@/components/icons';
import useLibrary from '@/hooks/use-library';
import { parseIndexName } from '@/utils/algolia';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';
import { ElemModal } from './elem-modal';
import { FormControl } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { ElemButton } from './elem-button';

const INSERT_INVESTOR = `mutation InsertInvestor(
  $person_id: Int!,
  $vc_firm_id: Int!,
  $title: String!,
  $start_date: date,
  $end_date: date
) {
  insert_investors_one(
    object: { person_id: $person_id, vc_firm_id: $vc_firm_id, title: $title, start_date: $start_date, end_date: $end_date },
    on_conflict: {
      constraint: investors_vc_firm_id_person_id_key,
      update_columns: [person_id, vc_firm_id, title, start_date, end_date]
    }
  ) {
    id
    person_id
    vc_firm_id
    title
    start_date
    end_date
  }
}

`;

export const fetchGraphQL = async (
  query: string,
  variables: Record<string, any> = {},
) => {
  console.log(variables, 'varsss');
  const response = await fetch('https://unique-crow-54.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret':
        'H2qMpIzxHTQYpxhhuVoOrDvMEW3coQFLE42kiShCEJ5sHATlv7Fk12NfQIoSCjid', // Replace with your authentication token
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors.map((e: any) => e.message).join(', '));
  }

  return data.data;
};

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

type MasterEmptyQueryBoundaryProps = {
  children: ReactElement;
};

type EmptyQueryBoundaryProps = {
  children: ReactElement;
  emptyText?: string;
};

const HitInvestors = (onSelect: (vcFirmId: string) => void) =>
  function HitInvestors({ hit }: HitInvestorsProps) {
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onSelect(hit.objectID);
        }}
        className="flex items-center px-6 py-1 group hover:bg-neutral-900">
        <div className="flex items-center justify-center w-12 h-12 p-1 bg-black border  border-neutral-700 rounded shrink-0">
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
        <h2 className="ml-2 font-medium text-gray-500 min-w-fit grow whitespace nowrap">
          <Highlight
            attribute="name"
            hit={hit}
            classNames={{
              highlighted:
                'text-primary-500 border-b-2 border-primary-500 opacity-100 bg-transparent',
            }}
          />
        </h2>
        <IconChevronRight className="w-4 h-4 ml-3 shrink-0 group-hover:text-primary-500" />
      </div>
    );
  };

export default function AddVcFirmModal(props: any) {
  const [vcFirmData, setVcFirmData] = useState<any>({
    person_id: parseInt(props?.personId, 10),
    vc_firm_id: '',
    start_date: null,
    end_date: null,
    title: '',
  });

  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
  const [companySelected, setCompanySelected] = useState<boolean>(false);

  useEffect(() => {
    setTabSelectedIndex(0);
  }, []);

  const handleChange = (target: number, value: any) => {
    if (target === 0) setVcFirmData({ ...vcFirmData, start_date: value });
    else if (target === 1) setVcFirmData({ ...vcFirmData, end_date: value });
    else if (target === 2) setVcFirmData({ ...vcFirmData, title: value });
  };

  const { selectedLibrary } = useLibrary();

  const onClose = () => {
    props.onClose();
    setCompanySelected(false);
    setVcFirmData({
      ...vcFirmData,
      vc_firm_id: '',
      start_date: null,
      end_date: null,
      title: '',
    });
  };

  const onSelect = (vcFirmId: string) => {
    setVcFirmData({ ...vcFirmData, vc_firm_id: parseInt(vcFirmId, 10) });
    setCompanySelected(true);
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
        <div className="px-6 py-5 mt-5 text-center">
          <FigureSearch className="mx-auto h-36 lg:h-40" />
          <div className="mt-3 text-xl font-medium">Search for VC Firms</div>
          <div style={{ display: 'none' }}>{children}</div>
        </div>
      );
    } else if (allEmpty) {
      return (
        <div className="w-full px-6 py-1 mt-5">
          <h3 className="font-medium">No results for “{results.query}“</h3>
          <p>
            <ElemLink
              href={ROUTES.CONTACT}
              onClick={onClose}
              className="text-primary-500">
              Tell us about missing data.
            </ElemLink>
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
            <ElemLink
              href={ROUTES.CONTACT}
              onClick={onClose}
              className="text-primary-500">
              {`Tell us about missing ${parseIndexName(results._state.index)}.`}
            </ElemLink>
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

    const getTabTitle = (resourceType: 'companies' | 'vc_firms') => {
      switch (resourceType) {
        case 'companies':
          return `Companies${
            getNumOfRecords(['companies', 'ai_companies']) === undefined
              ? ''
              : ` (${getNumOfRecords(['companies', 'ai_companies'])})`
          }`;

        case 'vc_firms':
          return `VC Firm${
            getNumOfRecords(['vc_firms', 'ai_vc_firms']) === undefined
              ? ''
              : ` (${getNumOfRecords(['vc_firms', 'ai_vc_firms'])})`
          }`;

        default:
          return '';
      }
    };

    return (
      <Tab.List className="flex gap-2 px-6 py-1 my-2 overflow-x-scroll font-medium transition-all bg-black whitespace-nowrap">
        <Tab
          className={({ selected }) =>
            `${
              selected ? 'border-2 border-white' : 'border-0'
            } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-300 bg-neutral-900 px-2.5 py-2 text-sm justify-center rounded-lg`
          }>
          {getTabTitle('vc_firms')}
        </Tab>
      </Tab.List>
    );
  };

  const handleCreateInvestor = async () => {
    try {
      // const response = await fetch('/api/insert-investor/', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     investor: vcFirmData,
      //   }),
      // });

      // if (response.status === 200) {
      //   console.log(response)
      // }
      console.log({ ...vcFirmData });

      const result = await fetchGraphQL(INSERT_INVESTOR, {
        person_id: vcFirmData.person_id,
        vc_firm_id: vcFirmData.vc_firm_id,
        start_date: vcFirmData.start_date,
        end_date: vcFirmData.end_date,
        title: vcFirmData.title,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ElemModal
        isOpen={props.show}
        onClose={onClose}
        showCloseIcon={false}
        placement="top"
        panelClass="w-full max-w-3xl shadow-2xl bg-black rounded-lg my-4">
        <InstantSearch
          searchClient={searchClient}
          indexName="companies"
          future={{
            preserveSharedStateOnUnmount: true,
          }}>
          {!companySelected && (
            <>
              <header className="relative z-10 flex items-center p-0 px-4 border-b border-gray-100">
                <IconSearch className="w-6 h-6 text-gray-500" />
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
                  className="appearance-none w-8 justify-items-end p-1 bg-black border border-gray-100 rounded-md text-gray-500 font-medium text-[9px] hover:shadow-sm">
                  ESC
                </button>
              </header>

              <MasterEmptyQueryBoundary>
                <Tab.Group
                  selectedIndex={tabSelectedIndex}
                  onChange={setTabSelectedIndex}>
                  <ResultTabList />
                  <Tab.Panels>
                    <Tab.Panel unmount={false}>
                      <Index
                        indexName={
                          selectedLibrary === 'Web3'
                            ? 'vc_firms'
                            : 'ai_vc_firms'
                        }>
                        <Configure hitsPerPage={10} />
                        <EmptyQueryBoundary>
                          <InfiniteHits
                            hitComponent={HitInvestors(onSelect)}
                            showPrevious={false}
                            classNames={{
                              list: 'mb-2',
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
            </>
          )}
          {companySelected && (
            <>
              <form
                style={{
                  margin: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
                onSubmit={handleCreateInvestor}>
                <header className="relative z-10 flex justify-between items-center p-0 py-2 border-b border-gray-100">
                  <label className="text-white-700 text-[22px]">
                    VC Firm Experience Form
                  </label>
                  <button
                    onClick={onClose}
                    type="reset"
                    arial-label="cancel"
                    className="appearance-none w-8 justify-items-end p-1 bg-black border border-gray-100 rounded-md text-gray-500 font-medium text-[9px] hover:shadow-sm">
                    ESC
                  </button>
                </header>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <label className="text-white-700 font-medium p-0 pb-3 text-[18px]">
                    Title
                  </label>
                  <MuiTextField
                    sx={{
                      '& .MuiInputBase-input': {
                        background: 'transparent',
                        borderRadius: '8px',
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '8px',
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(94,65,254)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                      },
                    }}
                    placeholder="Title"
                    value={vcFirmData?.title}
                    onChange={e => {
                      handleChange(2, e.target.value);
                    }}
                    variant="outlined"
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <label className="text-white-700 font-medium p-0 pb-3 text-[18px]">
                    Start Date
                  </label>
                  <MuiTextField
                    sx={{
                      '& .MuiInputBase-input': {
                        background: 'transparent',
                        borderRadius: '8px',
                        color: 'white',
                        '&::-webkit-calendar-picker-indicator': {
                          filter: 'invert(1)',
                          cursor: 'pointer',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '8px',
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(94,65,254)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                      },
                    }}
                    value={vcFirmData?.start_date}
                    InputProps={{ placeholder: 'Start date' }}
                    type="date"
                    onChange={e => handleChange(0, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                  <label className="text-white-700 font-medium p-0 pb-3 text-[18px]">
                    End Date
                  </label>
                  <MuiTextField
                    sx={{
                      '& .MuiInputBase-input': {
                        background: 'transparent',
                        borderRadius: '8px',
                        color: 'white',
                        '&::-webkit-calendar-picker-indicator': {
                          filter: 'invert(1)',
                          cursor: 'pointer',
                        },
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderRadius: '8px',
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(94,65,254)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                      },
                    }}
                    type="date"
                    InputProps={{ placeholder: 'End date' }}
                    placeholder="End date"
                    value={vcFirmData?.end_date}
                    onChange={e => handleChange(1, e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                  />
                </FormControl>
                <ElemButton btn="primary" size="sm" className="w-[120px]">
                  Save
                </ElemButton>
              </form>
            </>
          )}
        </InstantSearch>
      </ElemModal>
    </>
  );
}
