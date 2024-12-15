import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import {
  DateCondition,
  FilterOptionKeys,
  FilterOptionMetadata,
  Filters,
} from '@/models/Filter';
import {
  Companies_Bool_Exp,
  Companies_Order_By,
  Events_Bool_Exp,
  Events_Order_By,
  Lists_Bool_Exp,
  Order_By,
  People_Bool_Exp,
  People_Order_By,
  User_Groups_Bool_Exp,
  Vc_Firms_Bool_Exp,
  Vc_Firms_Order_By,
} from '@/graphql/types';
import {
  DeepPartial,
  GroupsTabType,
  Library,
  ListsTabType,
} from '@/types/common';
import {
  aiTags,
  eventTypeChoices,
  ISO_DATE_FORMAT,
  roundChoices,
} from '@/utils/constants';
import { convertToInternationalCurrencySystem } from '@/utils';
import { getSelectableWeb3Tags } from '@/utils/helpers';

export const getDefaultFilter = (
  name: FilterOptionKeys,
  dateCondition: DateCondition = 'past',
) => {
  switch (name) {
    case 'country':
    case 'state':
    case 'city':
    case 'fundingInvestors':
    case 'fundedCompanies':
      return {
        condition: 'any',
        tags: [],
      };
    case 'address':
      return {
        distance: 20,
      };
    case 'keywords':
      return {
        tags: [],
      };
    case 'industry':
    case 'fundingType':
    case 'investmentType':
    case 'eventType':
      return [];
    case 'fundingAmount':
    case 'investmentAmountTotal':
      return {
        minVal: 1000000,
        maxVal: 25000000,
        formattedMinVal: convertToInternationalCurrencySystem(1000000),
        formattedMaxVal: convertToInternationalCurrencySystem(25000000),
      };
    case 'lastFundingDate':
    case 'lastInvestmentDate':
      return {
        condition: '30-days',
        fromDate: moment().subtract(30, 'days').toISOString(),
      };
    case 'eventDate':
      return {
        condition: '30-days',
        fromDate:
          dateCondition === 'past'
            ? moment().subtract(30, 'days').toISOString()
            : moment().toISOString(),
        toDate:
          dateCondition === 'past'
            ? moment().toISOString()
            : moment().add(30, 'days').toISOString(),
      };
    case 'teamSize':
      return {
        minVal: 10,
        maxVal: 50,
      };
    case 'numOfInvestments':
      return {
        minVal: 10,
        maxVal: 50,
      };
    case 'numOfExits':
      return {
        minVal: 1,
        maxVal: 3,
      };
    case 'eventPrice':
      return {
        minVal: 0,
        maxVal: 100,
        formattedMinVal: convertToInternationalCurrencySystem(0),
        formattedMaxVal: convertToInternationalCurrencySystem(100),
      };
    case 'role':
      return {
        tags: [],
      };
    case 'name':
      return {
        tags: [],
      };

    default:
      return null;
  }
};

export const getFilterOptionMetadata = (
  option: FilterOptionKeys,
  dateCondition: DateCondition = 'past',
  selectedLibrary: Library,
): FilterOptionMetadata => {
  switch (option) {
    case 'country':
      return {
        title: 'Country',
        heading: 'Country',
        placeholder: 'Try “United States”',
      };

    case 'state':
      return {
        title: 'State',
        heading: 'State',
        placeholder: 'Try “California”',
      };

    case 'city':
      return {
        title: 'City',
        heading: 'City',
        placeholder: 'Try “San Francisco”',
      };

    case 'address':
      return {
        title: 'Address',
        heading: 'Address',
      };

    case 'keywords':
      return {
        title: 'Keywords',
        heading: 'Keywords',
        placeholder: 'Add a keyword, press enter ⏎',
        subtext: 'E.g., AI, platform, blockchain, wallet, nft…',
      };
    case 'role':
      return {
        title: 'Role',
        heading: 'Role(s)',
        placeholder: 'Add a role, press enter ⏎',
        subtext: 'E.g., Co-founder, Software Engineer…',
      };

    case 'name':
      return {
        title: 'Name',
        heading: 'Name',
        placeholder: 'Add a name, press enter ⏎',
        subtext: 'E.g., Smith, Erik…',
      };

    case 'industry':
      return {
        title: 'Tags',
        heading: 'Tags',
        choices: selectedLibrary === 'AI' ? aiTags : getSelectableWeb3Tags(),
      };

    case 'fundingType':
      return {
        title: 'Funding type',
        heading: 'Funding type',
        choices: roundChoices,
      };

    case 'fundingAmount':
      return {
        title: 'Total funding',
        heading: 'Total funding',
        min: 0,
        max: 50000000,
        step: 500,
      };

    case 'lastFundingDate':
      return {
        title: 'Last funding date',
        heading: 'Last funding date',
      };

    case 'fundingInvestors':
      return {
        title: 'Investors',
        heading: 'Investors',
        placeholder: 'Add investor name, press enter ⏎',
      };

    case 'teamSize':
      return {
        title: 'Team size',
        heading: 'Team size',
        min: 0,
        max: 200,
        step: 5,
      };

    case 'investmentType':
      return {
        title: 'Investment type',
        heading: 'Investment type',
        choices: roundChoices,
      };

    case 'investmentAmountTotal':
      return {
        title: 'Total investment',
        heading: 'Total investment',
        min: 0,
        max: 50000000,
        step: 500,
      };

    case 'numOfInvestments':
      return {
        title: 'Number of investments',
        heading: 'Number of investments',
        min: 0,
        max: 200,
        step: 1,
      };

    case 'numOfExits':
      return {
        title: 'Number of exits',
        heading: 'Number of exits',
        min: 0,
        max: 200,
        step: 1,
      };

    case 'lastInvestmentDate':
      return {
        title: 'Last investment date',
        heading: 'Last investment date',
      };

    case 'fundedCompanies':
      return {
        title: 'Funded companies',
        heading: 'Funded companies',
        placeholder: 'Add company name, press enter ⏎',
      };

    case 'eventType':
      return {
        title: 'Event type',
        heading: 'Event type',
        choices: eventTypeChoices,
      };

    case 'eventDate':
      return {
        title: 'Date',
        heading: 'Date',
        minDate:
          dateCondition === 'past'
            ? undefined
            : moment().toISOString().split('T')[0],
        maxDate:
          dateCondition === 'past'
            ? moment().subtract(1, 'days').toISOString().split('T')[0]
            : undefined,
      };

    case 'eventPrice':
      return {
        title: 'Price',
        heading: 'Price',
        min: 0,
        max: 10000,
        step: 1,
      };

    case 'eventSize':
      return {
        title: 'Size',
        heading: 'Size',
        min: 0,
        max: 10000,
        step: 1,
      };

    default:
      return {};
  }
};

export const processCompaniesFilters = (
  filters: DeepPartial<Companies_Bool_Exp>,
  selectedFilters: Filters | null,
  defaultFilters: DeepPartial<Companies_Bool_Exp[]>,
) => {
  if (!selectedFilters || isEmpty(selectedFilters)) {
    filters._and = defaultFilters;
  }
  if (selectedFilters?.country?.tags?.length) {
    if (selectedFilters?.country?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.country.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"country": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.country?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.country.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"country": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.state?.tags?.length) {
    if (selectedFilters?.state?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.state.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"state": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.state?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.state.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"state": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.city?.tags?.length) {
    if (selectedFilters?.city?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.city.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"city": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.city?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.city.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"city": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.address?.value) {
    filters._and?.push({
      geopoint: {
        _st_d_within: {
          distance: (selectedFilters.address.distance || 20) * 1609.344, // miles to meters
          from: selectedFilters.address.value?.geometry,
        },
      },
    });
  }

  if (selectedFilters?.keywords?.tags?.length) {
    filters._and?.push({
      _or: selectedFilters.keywords.tags.map(item => ({
        overview: { _ilike: `%${item}%` },
      })),
    });
  }

  if (selectedFilters?.industry?.tags?.length) {
    filters._and?.push({
      _or: selectedFilters.industry.tags.map(item => ({
        tags: { _contains: item },
      })),
    });
  }

  if (selectedFilters?.fundingType?.tags?.length) {
    filters._and?.push({
      investment_rounds: {
        _or: selectedFilters.fundingType.tags.map(item => ({
          round: { _eq: item },
        })),
      },
    });
  }

  if (selectedFilters?.fundingAmount?.maxVal) {
    filters._and?.push({
      _and: [
        {
          investor_amount: { _gt: selectedFilters.fundingAmount?.minVal ?? 0 },
        },
        { investor_amount: { _lte: selectedFilters?.fundingAmount?.maxVal } },
      ],
    });
  }

  if (
    selectedFilters?.lastFundingDate?.condition &&
    selectedFilters?.lastFundingDate?.fromDate
  ) {
    if (selectedFilters?.lastFundingDate?.condition !== 'custom') {
      filters._and?.push({
        investment_rounds: {
          round_date: { _gte: selectedFilters.lastFundingDate.fromDate },
        },
      });
    }
    if (
      selectedFilters?.lastFundingDate?.condition === 'custom' &&
      selectedFilters.lastFundingDate.toDate
    ) {
      filters._and?.push({
        investment_rounds: {
          _and: [
            { round_date: { _gte: selectedFilters.lastFundingDate.fromDate } },
            { round_date: { _lte: selectedFilters.lastFundingDate.toDate } },
          ],
        },
      });
    }
  }

  if (selectedFilters?.fundingInvestors?.tags?.length) {
    if (selectedFilters.fundingInvestors.condition === 'any') {
      filters._and?.push({
        investment_rounds: {
          _or: selectedFilters.fundingInvestors.tags.map(item => ({
            investments: {
              _or: [
                {
                  vc_firm: {
                    _or: [{ name: { _ilike: `%${item}%` } }],
                  },
                },
              ],
            },
          })),
        },
      });
    }

    if (selectedFilters.fundingInvestors.condition === 'none') {
      filters._and?.push({
        _not: {
          investment_rounds: {
            _or: selectedFilters.fundingInvestors.tags.map(item => ({
              investments: {
                _or: [
                  {
                    vc_firm: {
                      _or: [{ name: { _ilike: `%${item}%` } }],
                    },
                  },
                ],
              },
            })),
          },
        },
      });
    }
  }

  if (selectedFilters?.teamSize?.maxVal) {
    filters._and?.push({
      _and: [
        { total_employees: { _gt: selectedFilters?.teamSize?.minVal ?? 0 } },
        { total_employees: { _lte: selectedFilters?.teamSize?.maxVal } },
      ],
    });
  }
};

export const processInvestorsFilters = (
  filters: DeepPartial<Vc_Firms_Bool_Exp>,
  selectedFilters: Filters | null,
  defaultFilters: DeepPartial<Vc_Firms_Bool_Exp[]>,
) => {
  if (!selectedFilters || isEmpty(selectedFilters)) {
    filters._and = defaultFilters;
  }
  if (selectedFilters?.country?.tags?.length) {
    if (selectedFilters?.country?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.country.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"country": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.country?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.country.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"country": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.state?.tags?.length) {
    if (selectedFilters?.state?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.state.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"state": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.state?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.state.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"state": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.city?.tags?.length) {
    if (selectedFilters?.city?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.city.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"city": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.city?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.city.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"city": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.address?.value) {
    filters._and?.push({
      geopoint: {
        _st_d_within: {
          distance: (selectedFilters.address.distance || 20) * 1609.344, // miles to meters
          from: selectedFilters.address.value?.geometry,
        },
      },
    });
  }

  if (selectedFilters?.keywords?.tags?.length) {
    filters._and?.push({
      _or: selectedFilters.keywords.tags.map(item => ({
        overview: { _ilike: `%${item}%` },
      })),
    });
  }

  if (selectedFilters?.industry?.tags?.length) {
    filters._and?.push({
      _and: selectedFilters.industry.tags.map(item => ({
        tags: { _contains: item },
      })),
    });
  }

  if (selectedFilters?.investmentType?.tags?.length) {
    filters._and?.push({
      investments: {
        investment_round: {
          _or: selectedFilters.investmentType.tags.map(item => ({
            round: { _eq: item },
          })),
        },
      },
    });
  }

  if (selectedFilters?.investmentAmountTotal?.maxVal) {
    filters._and?.push({
      _and: [
        {
          investment_amount_total: {
            _gt: selectedFilters?.investmentAmountTotal?.minVal ?? 0,
          },
        },
        {
          investment_amount_total: {
            _lte: selectedFilters?.investmentAmountTotal?.maxVal,
          },
        },
      ],
    });
  }

  if (selectedFilters?.numOfInvestments?.maxVal) {
    filters._and?.push({
      _and: [
        {
          num_of_investments: {
            _gt: selectedFilters?.numOfInvestments?.minVal ?? 0,
          },
        },
        {
          num_of_investments: {
            _lte: selectedFilters?.numOfInvestments?.maxVal,
          },
        },
      ],
    });
  }

  if (selectedFilters?.numOfExits?.maxVal) {
    filters._and?.push({
      _and: [
        { num_of_exits: { _gt: selectedFilters?.numOfExits?.minVal ?? 0 } },
        { num_of_exits: { _lte: selectedFilters?.numOfExits?.maxVal } },
      ],
    });
  }

  if (
    selectedFilters?.lastInvestmentDate?.condition &&
    selectedFilters?.lastInvestmentDate?.fromDate
  ) {
    if (selectedFilters?.lastInvestmentDate?.condition !== 'custom') {
      filters._and?.push({
        investments: {
          investment_round: {
            round_date: { _gte: selectedFilters.lastInvestmentDate.fromDate },
          },
        },
      });
    }
    if (
      selectedFilters?.lastInvestmentDate?.condition === 'custom' &&
      selectedFilters.lastInvestmentDate.toDate
    ) {
      filters._and?.push({
        investments: {
          investment_round: {
            _and: [
              {
                round_date: {
                  _gte: selectedFilters.lastInvestmentDate.fromDate,
                },
              },
              {
                round_date: { _lte: selectedFilters.lastInvestmentDate.toDate },
              },
            ],
          },
        },
      });
    }
  }

  if (selectedFilters?.fundedCompanies?.tags?.length) {
    if (selectedFilters.fundedCompanies.condition === 'any') {
      filters._and?.push({
        investments: {
          investment_round: {
            _or: selectedFilters.fundedCompanies.tags.map(item => ({
              company: {
                _or: [{ name: { _ilike: `%${item}%` } }],
              },
            })),
          },
        },
      });
    }

    if (selectedFilters.fundedCompanies.condition === 'none') {
      filters._and?.push({
        _not: {
          investments: {
            investment_round: {
              _or: selectedFilters.fundedCompanies.tags.map(item => ({
                company: {
                  _or: [{ name: { _ilike: `%${item}%` } }],
                },
              })),
            },
          },
        },
      });
    }
  }

  if (selectedFilters?.teamSize?.maxVal) {
    filters._and?.push({
      _and: [
        { team_size: { _gt: selectedFilters?.teamSize?.minVal ?? 0 } },
        { team_size: { _lte: selectedFilters?.teamSize?.maxVal } },
      ],
    });
  }
};

export const processEventsFilters = (
  filters: DeepPartial<Events_Bool_Exp>,
  selectedFilters: Filters | null,
  defaultFilters: DeepPartial<Vc_Firms_Bool_Exp[]>,
  dateCondition: DateCondition = 'past',
) => {
  if (!selectedFilters || isEmpty(selectedFilters)) {
    filters._and = defaultFilters;
  }
  if (selectedFilters?.country?.tags?.length) {
    if (selectedFilters?.country?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.country.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"country": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.country?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.country.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"country": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.state?.tags?.length) {
    if (selectedFilters?.state?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.state.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"state": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.state?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.state.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"state": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.city?.tags?.length) {
    if (selectedFilters?.city?.condition === 'any') {
      filters._and?.push({
        _or: selectedFilters.city.tags.map(item => ({
          location_json: {
            _cast: {
              String: { _ilike: `%"city": "${item}"%` },
            },
          },
        })),
      });
    }

    if (selectedFilters?.city?.condition === 'none') {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.city.tags.map(item => ({
                location_json: {
                  _cast: {
                    String: { _ilike: `%"city": "${item}"%` },
                  },
                },
              })),
            },
          },
          {
            location_json: { _is_null: true },
          },
        ],
      });
    }
  }

  if (selectedFilters?.address?.value) {
    filters._and?.push({
      geopoint: {
        _st_d_within: {
          distance: (selectedFilters.address.distance || 20) * 1609.344, // miles to meters
          from: selectedFilters.address.value?.geometry,
        },
      },
    });
  }

  if (selectedFilters?.keywords?.tags?.length) {
    filters._and?.push({
      _or: selectedFilters.keywords.tags.map(item => ({
        overview: { _ilike: `%${item}%` },
      })),
    });
  }

  if (selectedFilters?.eventType?.tags?.length) {
    filters._and?.push({
      _or: selectedFilters.eventType.tags.map(item => ({
        types: { _contains: item },
      })),
    });
  }

  if (selectedFilters?.eventPrice?.maxVal) {
    filters._and?.push({
      _and: [
        { price: { _gt: selectedFilters?.eventPrice?.minVal ?? 0 } },
        { price: { _lte: selectedFilters?.eventPrice?.maxVal } },
      ],
    });
  }

  if (selectedFilters?.eventSize?.value?.title) {
    filters._and?.push({
      size: { _eq: selectedFilters.eventSize.value.title },
    });
  }

  if (
    selectedFilters?.eventDate?.condition &&
    selectedFilters?.eventDate?.fromDate &&
    selectedFilters?.eventDate?.toDate
  ) {
    filters._and?.push({
      _and: [
        {
          start_date: {
            _gte: selectedFilters.eventDate.fromDate,
          },
        },
        {
          end_date: { _lte: selectedFilters.eventDate.toDate },
        },
      ],
    });
  }
};

const createFilterForPeopleLocation = (
  selectedFilters: Filters,
  type: 'country' | 'state' | 'city',
) => {
  const { condition, tags } = selectedFilters?.[type] || {};
  if (!tags?.length) {
    return;
  }

  const filterObject = tags.map((item: string) => ({
    people_computed_data: {
      location_json: {
        _cast: {
          String: { _ilike: `%"${type}": "${item}"%` },
        },
      },
    },
  }));

  if (condition === 'any') {
    return {
      _or: filterObject,
    };
  }
  if (condition === 'none') {
    return {
      _or: [
        {
          _not: {
            _or: filterObject,
          },
        },
        {
          people_computed_data: {
            location_json: { _is_null: true },
          },
        },
      ],
    };
  }
};

export const processPeopleFilter = (
  filters: DeepPartial<People_Bool_Exp>,
  selectedFilters: Filters | null,
  defaultFilters: DeepPartial<People_Bool_Exp[]>,
) => {
  if (!selectedFilters || isEmpty(selectedFilters)) {
    filters._and = defaultFilters;
    return;
  }

  const locationFilters = ['country', 'state', 'city'] as const;
  locationFilters.forEach(value => {
    const filter = createFilterForPeopleLocation(selectedFilters, value);
    if (filter) {
      filters._and?.push(filter);
    }
  });

  if (selectedFilters?.address?.value) {
    filters._and?.push({
      people_computed_data: {
        geopoint: {
          _st_d_within: {
            distance: (selectedFilters.address.distance || 20) * 1609.344, // miles to meters
            from: selectedFilters.address.value?.geometry,
          },
        },
      },
    });
  }
  if (selectedFilters?.industry?.tags?.length) {
    filters._and?.push({
      _and: selectedFilters.industry.tags.map(item => ({
        people_computed_data: {
          tags: { _contains: item },
        },
      })),
    });
  }

  if (selectedFilters?.role?.tags?.length) {
    filters._and?.push({
      // There is role if user selects multiple roles
      _or: selectedFilters.role.tags.map(item => ({
        people_computed_data: {
          title: { _ilike: `%${item}%` },
        },
      })),
    });
  }

  if (selectedFilters?.name?.tags?.length) {
    filters._and?.push({
      // There is role if user selects multiple roles
      _or: selectedFilters.name.tags.map(item => ({
        name: { _ilike: `%${item}%` },
      })),
    });
  }
};

export const getGroupsFilters = (
  selectedTab: GroupsTabType,
  userId: number,
) => {
  let filters: DeepPartial<User_Groups_Bool_Exp> = {
    created_by_user_id: { _eq: userId },
  };

  if (selectedTab === 'discover') {
    filters = {
      _and: [
        { public: { _eq: true } },
        {
          _not: {
            user_group_members: {
              user: {
                id: { _eq: userId },
              },
            },
          },
        },
      ],
    };
    return filters;
  }

  if (selectedTab === 'joined') {
    filters = {
      user_group_members: {
        user: {
          id: { _eq: userId },
        },
      },
      created_by_user_id: { _neq: userId },
    };
    return filters;
  }

  return filters;
};

export const getListsFilters = (selectedTab: ListsTabType, userId: number) => {
  let filters: DeepPartial<Lists_Bool_Exp> = {
    created_by_id: { _eq: userId },
  };

  if (selectedTab === 'discover') {
    filters = {
      _and: [
        { public: { _eq: true } },
        {
          _not: {
            list_members: {
              user_id: { _eq: userId },
            },
          },
        },
      ],
    };
    return filters;
  }

  if (selectedTab === 'following') {
    filters = {
      list_members: {
        user_id: { _eq: userId },
      },
      created_by_id: { _neq: userId },
    };
    return filters;
  }

  return filters;
};

export const getHomepageEncodedURI = (
  filters:
    | DeepPartial<Vc_Firms_Bool_Exp>
    | DeepPartial<Companies_Bool_Exp>
    | DeepPartial<Events_Bool_Exp>
    | DeepPartial<People_Bool_Exp>,
  orderBy?:
    | DeepPartial<Vc_Firms_Order_By>
    | DeepPartial<Companies_Order_By>
    | DeepPartial<Events_Order_By>
    | DeepPartial<People_Order_By>,
) => {
  let encodedFilters = '';
  let encodedStatusTag = '';
  let encodedSortBy = '';
  let isPremiumFilter = false;

  filters._and?.forEach(filterObj => {
    if (filterObj) {
      if ('tags' in filterObj && filterObj?.tags?._contains) {
        encodedFilters += `{"industry":{"tags":["${filterObj?.tags._contains}"]}}`;
      }

      if (
        'location_json' in filterObj &&
        filterObj?.location_json?._contains.city
      ) {
        encodedFilters += `{"city":{"condition":"any","tags":["${filterObj?.location_json?._contains.city}"]}}`;
      }

      // Recently funded, premium feature
      if (
        'investment_rounds' in filterObj &&
        filterObj?.investment_rounds?.round_date?._gte
      ) {
        encodedFilters += `{"lastFundingDate":{"condition":"custom","fromDate": "${
          filterObj?.investment_rounds?.round_date?._gte
        }" ,"toDate": "${moment().format(ISO_DATE_FORMAT)}"}}`;

        isPremiumFilter = true;
      }

      // Recently active investors, premium feature
      if (
        'investments' in filterObj &&
        filterObj?.investments?.investment_round?.round_date?._gte
      ) {
        encodedFilters += `{"lastInvestmentDate":{"condition":"custom","fromDate": "${
          filterObj?.investments?.investment_round?.round_date?._gte
        }" ,"toDate": "${moment().format(ISO_DATE_FORMAT)}"}}`;

        isPremiumFilter = true;
      }
    }
  });

  if (
    orderBy &&
    'num_of_views' in orderBy &&
    orderBy?.num_of_views &&
    orderBy?.num_of_views === Order_By.Desc
  ) {
    encodedStatusTag += 'Trending';
  }

  if (orderBy?.updated_at && orderBy?.updated_at === Order_By.Desc) {
    encodedSortBy += 'lastUpdate';
  }

  encodedFilters = encodeURIComponent(encodedFilters);
  encodedStatusTag = encodeURIComponent(encodedStatusTag);
  encodedSortBy = encodeURIComponent(encodedSortBy);

  return {
    encodedFilters,
    encodedStatusTag,
    encodedSortBy,
    isPremiumFilter,
  };
};
