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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { ElemButton } from './elem-button';
import { useGetPeopleByIdQuery } from '@/graphql/types';
import { functionChoicesTM, seniorityChoicesTM } from '@/utils/constants';

const INSERT_TEAM_MEMBER = `mutation InsertTeamMember(
  $person_id: Int!,
  $company_id: Int!,
  $function: String,
  $seniority: String,
  $title: String,
  $start_date: date,
  $end_date: date,
  $founder: Boolean
) {
  insert_team_members_one(
    object: { 
      person_id: $person_id, 
      company_id: $company_id, 
      function: $function,
      seniority: $seniority,
      title: $title, 
      start_date: $start_date, 
      end_date: $end_date,
      founder: $founder
    },
    on_conflict: {
      constraint: team_members_company_id_person_id_key,
      update_columns: []
    }
  ) {
    id
    person_id
    company_id
    function
    seniority
    title
    start_date
    end_date
    founder
  }
}`;

export const fetchGraphQL = async (
  query: string,
  variables: Record<string, any> = {},
) => {
  const response = await fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

const HitPeople = (onSelect: (personId: string) => void) =>
  function HitPeople({ hit }: HitPeopleProps) {
    return (
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => {
          onSelect(hit.objectID);
        }}
        className="flex items-center px-6 py-1 group hover:bg-neutral-900">
        <div className="flex items-center justify-center w-12 h-12 p-1 bg-black border border-neutral-700 rounded shrink-0">
          {hit.picture ? (
            <img
              className="object-contain max-w-full max-h-full"
              src={hit.picture}
              alt={hit.name}
            />
          ) : (
            <IconImage className="object-contain max-w-full max-h-full text-gray-200" />
          )}
        </div>
        <h2 className="ml-2 font-medium text-gray-500 min-w-fit grow whitespace-nowrap">
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

export default function AddPeopleModal(props: {
  show: boolean;
  onClose: () => void;
  companyId?: number;
}) {
  const [personData, setPersonData] = useState<any>({
    name: '',
    work_email: '',
    personal_email: '',
    picture: '',
    function: '',
    seniority: '',
    title: '',
    start_date: null,
    end_date: null,
    currently_working: false,
    founder: false,
  });

  const [personSelected, setPersonSelected] = useState<boolean>(false);
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  const { data: personDetails } = useGetPeopleByIdQuery(
    { id: personData.person_id },
    { enabled: Boolean(personData.person_id) },
  );

  useEffect(() => {
    if (personDetails?.people?.[0]) {
      const person = personDetails.people[0];
      setPersonData({
        ...personData,
        name: person.name || '',
        work_email: person.work_email || '',
        personal_email: person.personal_email || '',
        picture: person.picture?.url || '',
      });
    }
  }, [personDetails]); /* eslint-disable-line react-hooks/exhaustive-deps */

  useEffect(() => {
    setTabSelectedIndex(0);
  }, []);

  const handleChange = (target: string, value: any) => {
    setPersonData({ ...personData, [target]: value });
  };

  const onClose = () => {
    props.onClose();
    setPersonSelected(false);
    setPersonData({
      name: '',
      work_email: '',
      personal_email: '',
      picture: '',
    });
  };

  const onSelect = (personId: string) => {
    setPersonData({ ...personData, person_id: parseInt(personId, 10) });
    setPersonSelected(true);
  };

  const MasterEmptyQueryBoundary: FC<{ children: ReactElement }> = ({
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
          <div className="mt-3 text-xl font-medium">Search for People</div>
          <div style={{ display: 'none' }}>{children}</div>
        </div>
      );
    } else if (allEmpty) {
      return (
        <div className="w-full px-6 py-1 mt-5">
          <h3 className="font-medium">
            No results for &ldquo;{results.query}&rdquo;
          </h3>
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

  const handleCreateTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!props.companyId) {
      console.error('Company ID is required');
      return;
    }
    try {
      const result = await fetchGraphQL(INSERT_TEAM_MEMBER, {
        person_id: personData.person_id,
        company_id: props.companyId,
        function: personData.function || null,
        seniority: personData.seniority || null,
        title: personData.title || null,
        start_date: personData.start_date || null,
        end_date: personData.currently_working
          ? null
          : personData.end_date || null,
        founder: personData.founder || false,
      });
      console.log('Team member created:', result);
      onClose();
    } catch (error) {
      console.error('Error creating team member:', error);
    }
  };

  return (
    <>
      <ElemModal
        isOpen={props.show}
        onClose={onClose}
        showCloseIcon={false}
        placement="top"
        panelClass="w-full max-w-3xl shadow-2xl bg-black rounded-lg my-4 mx-4 sm:mx-auto">
        <InstantSearch
          searchClient={searchClient}
          indexName="people"
          future={{
            preserveSharedStateOnUnmount: true,
          }}>
          {!personSelected && (
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
                  <Tab.List className="flex gap-2 px-4 sm:px-6 py-1 my-2 overflow-x-scroll font-medium transition-all bg-black whitespace-nowrap">
                    <Tab
                      className={({ selected }) =>
                        `${
                          selected ? 'border-2 border-white' : 'border-0'
                        } inline-flex items-center font-medium focus:outline-none focus:ring-0 transition ease-in-out duration-150 group text-gray-300 bg-neutral-900 px-2.5 py-2 text-sm justify-center rounded-lg`
                      }>
                      People
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel unmount={false}>
                      <Index indexName="people">
                        <Configure hitsPerPage={10} />
                        <InfiniteHits
                          hitComponent={HitPeople(onSelect)}
                          showPrevious={false}
                          classNames={{
                            list: 'mb-2',
                            loadMore:
                              'w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] font-medium h-9 mx-4 sm:mx-6 mb-4 px-3 text-primary-500 bg-transparent border border-primary-500 rounded-full hover:bg-primary-100 focus:ring-primary-50',
                            disabledLoadMore: 'hidden',
                          }}
                        />
                      </Index>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </MasterEmptyQueryBoundary>
            </>
          )}
          {personSelected && (
            <>
              <form
                className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6"
                onSubmit={handleCreateTeamMember}>
                <header className="relative z-10 flex justify-between items-center p-0 py-2 border-b border-gray-100">
                  <label className="text-white-700 text-lg sm:text-[22px]">
                    Person Information
                  </label>
                  <button
                    onClick={onClose}
                    type="reset"
                    arial-label="cancel"
                    className="appearance-none w-8 justify-items-end p-1 bg-black border border-gray-100 rounded-md text-gray-500 font-medium text-[9px] hover:shadow-sm">
                    ESC
                  </button>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Name
                    </label>
                    <MuiTextField
                      placeholder="Name"
                      value={personData.name}
                      onChange={e => handleChange('name', e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Function
                    </label>
                    <Select
                      value={personData.function}
                      onChange={e => handleChange('function', e.target.value)}
                      variant="outlined"
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                      }}>
                      {functionChoicesTM.map(choice => (
                        <MenuItem key={choice.id} value={choice.id}>
                          {choice.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Seniority
                    </label>
                    <Select
                      value={personData.seniority}
                      onChange={e => handleChange('seniority', e.target.value)}
                      variant="outlined"
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'gray',
                        },
                      }}>
                      {seniorityChoicesTM.map(choice => (
                        <MenuItem key={choice.id} value={choice.id}>
                          {choice.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Title
                    </label>
                    <MuiTextField
                      placeholder="Title"
                      value={personData.title}
                      onChange={e => handleChange('title', e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Start Date
                    </label>
                    <MuiTextField
                      type="date"
                      value={personData.start_date || ''}
                      onChange={e => handleChange('start_date', e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      End Date
                    </label>
                    <MuiTextField
                      type="date"
                      value={personData.end_date || ''}
                      onChange={e => handleChange('end_date', e.target.value)}
                      disabled={personData.currently_working}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: personData.currently_working
                            ? '#f3f4f6'
                            : 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Work Email
                    </label>
                    <MuiTextField
                      placeholder="Work Email"
                      value={personData.work_email}
                      onChange={e => handleChange('work_email', e.target.value)}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <label className="text-white-700 font-medium p-0 pb-2 sm:pb-3 text-base sm:text-[18px]">
                      Personal Email
                    </label>
                    <MuiTextField
                      placeholder="Personal Email"
                      value={personData.personal_email}
                      onChange={e =>
                        handleChange('personal_email', e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          '& fieldset': {
                            borderColor: 'gray',
                          },
                          '&:hover fieldset': {
                            borderColor: 'gray',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'gray',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'black',
                        },
                      }}
                    />
                  </FormControl>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-2">
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={personData.currently_working}
                        onChange={e =>
                          handleChange('currently_working', e.target.checked)
                        }
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label className="text-white-700 font-medium text-base sm:text-[18px]">
                        Currently Working
                      </label>
                    </div>
                  </FormControl>
                  <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={personData.founder}
                        onChange={e =>
                          handleChange('founder', e.target.checked)
                        }
                        className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label className="text-white-700 font-medium text-base sm:text-[18px]">
                        Founder
                      </label>
                    </div>
                  </FormControl>
                  <div className="flex justify-end">
                    <ElemButton
                      btn="primary"
                      size="sm"
                      className="w-full sm:w-[120px]"
                      onClick={handleCreateTeamMember}>
                      Save
                    </ElemButton>
                  </div>
                </div>
              </form>
            </>
          )}
        </InstantSearch>
      </ElemModal>
    </>
  );
}
