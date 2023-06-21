import { Library, LibraryTag, Tag } from '@/types/common';
import {
  email,
  required,
  minLength,
  number,
  minValue,
  maxValue,
  regex,
} from 'react-admin';
import { GroupsTabItem } from '@/types/common';

export const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d@:%_+.~#?&//=]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
  'i',
); // fragment locator

export const validateName = [required(), minLength(3)];
export const validateSlug = [required(), minLength(3)];
export const validateYearFounded = [number(), minValue(1900), maxValue(2099)];
//export const validateUrl = regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Must be a valid Url')
export const validateUrl = regex(
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/s,
  'Must be a valid Url',
);

export const validateEmail = email();

export const validateNameAndSlugAndEmailAndDomain = async (
  isEdit: boolean,
  values: any,
  data: any,
) => {
  const errors: any = {};
  if (!values?.name) {
    errors.name = 'The Name is required';
  }
  if (!values?.slug) {
    errors.slug = 'The Slug is required';
  } else if (values?.slug.length < 3) {
    errors.age = 'Must be over 3';
  }

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (data && data?.length > 0) {
    const filterSlug =
      values?.slug &&
      data?.filter((f: any) => f?.slug === values?.slug && f.id !== values?.id);
    const filterGithub =
      values?.github &&
      data?.filter(
        (f: any) => f?.github === values?.github && f.id !== values?.id,
      );
    const filterLinkedin =
      values?.linkedin &&
      data?.filter(
        (f: any) => f?.linkedin === values?.linkedin && f.id !== values?.id,
      );
    const filterWebsite =
      values?.website &&
      data?.filter(
        (f: any) => f?.website === values?.website && f.id !== values?.id,
      );
    const filterGlassdoor =
      values?.glassdoor &&
      data?.filter(
        (f: any) => f?.glassdoor === values?.glassdoor && f.id !== values?.id,
      );
    const filterdiscord =
      values?.discord &&
      data?.filter(
        (f: any) => f?.discord === values?.discord && f.id !== values?.id,
      );
    const filterCompanyLinkedin =
      values?.company_linkedin &&
      data?.filter(
        (f: any) =>
          f?.company_linkedin === values?.company_linkedin &&
          f.id !== values?.id,
      );
    const filterTwitter =
      values?.twitter &&
      data?.filter(
        (f: any) => f?.twitter === values?.twitter && f.id !== values?.id,
      );

    if (filterSlug && filterSlug?.length > 0) {
      errors.slug = 'Slug already used';
    }
    if (filterGithub && filterGithub?.length > 0 && values?.github) {
      errors.github = 'Github already used';
    }
    if (filterLinkedin && filterLinkedin?.length > 0 && values?.linkedin) {
      errors.linkedin = 'Linkedin already used';
    }
    if (filterWebsite && filterWebsite?.length > 0 && values?.website) {
      errors.website = 'Website already used';
    }
    if (filterGlassdoor && filterGlassdoor?.length > 0 && values?.glassdoor) {
      errors.glassdoor = 'Glassdoor already used';
    }
    if (filterdiscord && filterdiscord?.length > 0 && values?.discord) {
      errors.discord = 'Discord already used';
    }
    if (
      filterCompanyLinkedin &&
      filterCompanyLinkedin?.length > 0 &&
      values?.company_linkedin
    ) {
      errors.company_linkedin = 'Company Linkedin already used';
    }
    if (filterTwitter && filterTwitter?.length > 0 && values?.twitter) {
      errors.twitter = 'Twitter already used';
    }

    if (
      values.hasOwnProperty('website') &&
      values?.website &&
      !urlPattern.test(values?.website)
    ) {
      errors.website = 'Website URL is not valid';
    }
    if (
      values.hasOwnProperty('github') &&
      values?.github &&
      !urlPattern.test(values?.github)
    ) {
      errors.github = 'Github URL is not valid';
    }
    if (
      values.hasOwnProperty('twitter') &&
      values?.twitter &&
      !urlPattern.test(values?.twitter)
    ) {
      errors.twitter = 'Twitter URL is not valid';
    }
    if (
      values.hasOwnProperty('company_linkedin') &&
      values?.company_linkedin &&
      !urlPattern.test(values?.company_linkedin)
    ) {
      errors.company_linkedin = 'Linkedin URL is not valid';
    }
    if (
      values.hasOwnProperty('linkedin') &&
      values?.linkedin &&
      !urlPattern.test(values?.linkedin)
    ) {
      errors.linkedin = 'Linkedin URL is not valid';
    }
    if (
      values.hasOwnProperty('discord') &&
      values?.discord &&
      !urlPattern.test(values?.discord)
    ) {
      errors.discord = 'Discord URL is not valid';
    }
    if (
      values.hasOwnProperty('glassdoor') &&
      values?.glassdoor &&
      !urlPattern.test(values?.glassdoor)
    ) {
      errors.glassdoor = 'Glassdoor URL is not valid';
    }
    if (
      values.hasOwnProperty('work_email') &&
      values?.work_email &&
      !emailPattern.test(values?.work_email)
    ) {
      errors.work_email = 'Work Email is not valid';
    }
    if (
      values.hasOwnProperty('personal_email') &&
      values?.personal_email &&
      !emailPattern.test(values?.personal_email)
    ) {
      errors.personal_email = 'Personal Email is not valid';
    }
  }

  return errors;
};

export const validateFieldsForEdit = async (
  isEdit: boolean,
  values: any,
  data: any,
) => {
  const errors: any = {};
  if (!values?.logo) {
    errors.logo = 'The Image is required';
  }
  if (!values?.name) {
    errors.name = 'The Name is required';
  }
  if (!values?.slug) {
    errors.slug = 'The Slug is required';
  } else if (values?.slug.length < 3) {
    errors.age = 'Must be over 3';
  }
  if (!values?.overview) {
    errors.overview = 'The description is required';
  }
  if (!values?.layer) {
    errors.layer = 'Company type is required';
  }
  if (!values?.tags || values?.tags.length < 1) {
    errors.tags = 'Industry is required';
  }
  if (!values?.year_founded) {
    errors.year_founded = 'Founded Date is required';
  }
  if (!values?.website) {
    errors.website = 'Website URL is required';
  }

  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (
    values.hasOwnProperty('website') &&
    values?.website !== '' &&
    !urlPattern.test(values?.website)
  ) {
    errors.website = 'Website URL is not valid';
  }
  if (
    values.hasOwnProperty('github') &&
    values?.github !== '' &&
    !urlPattern.test(values?.github)
  ) {
    errors.github = 'Github URL is not valid';
  }
  if (
    values.hasOwnProperty('twitter') &&
    values?.twitter !== '' &&
    !urlPattern.test(values?.twitter)
  ) {
    errors.twitter = 'Twitter URL is not valid';
  }
  if (
    values.hasOwnProperty('company_linkedin') &&
    values?.company_linkedin !== '' &&
    !urlPattern.test(values?.company_linkedin)
  ) {
    errors.company_linkedin = 'Linkedin URL is not valid';
  }
  if (
    values.hasOwnProperty('linkedin') &&
    values?.linkedin !== '' &&
    !urlPattern.test(values?.linkedin)
  ) {
    errors.linkedin = 'Linkedin URL is not valid';
  }
  if (
    values.hasOwnProperty('discord') &&
    values?.discord !== '' &&
    !urlPattern.test(values?.discord)
  ) {
    errors.discord = 'Discord URL is not valid';
  }
  if (
    values.hasOwnProperty('glassdoor') &&
    values?.glassdoor !== '' &&
    !urlPattern.test(values?.glassdoor)
  ) {
    errors.glassdoor = 'Glassdoor URL is not valid';
  }
  if (
    values.hasOwnProperty('white_paper') &&
    values?.white_paper !== '' &&
    !urlPattern.test(values?.white_paper)
  ) {
    errors.white_paper = 'White paper URL is not valid';
  }
  if (
    values.hasOwnProperty('careers_page') &&
    values?.careers_page !== '' &&
    !urlPattern.test(values?.careers_page)
  ) {
    errors.careers_page = 'Careers page URL is not valid';
  }
  if (
    values.hasOwnProperty('work_email') &&
    values?.work_email !== '' &&
    !emailPattern.test(values?.work_email)
  ) {
    errors.work_email = 'Work Email is not valid';
  }
  if (
    values.hasOwnProperty('personal_email') &&
    values?.personal_email !== '' &&
    !emailPattern.test(values?.personal_email)
  ) {
    errors.personal_email = 'Personal Email is not valid';
  }

  return errors;
};

export const validateTeamMember = async (isEdit: boolean, values: any) => {
  const errors: any = {};
  if (!values?.person_id) {
    errors.person = 'Person is required';
  }
  if (!values?.function) {
    errors.function = 'Position is required';
  }
  return errors;
};

export const validateInvestmentRounds = async (
  isEdit: boolean,
  values: any,
) => {
  const errors: any = {};
  if (!values?.round) {
    errors.round = 'Round Type is required';
  }
  if (!values?.amount) {
    errors.amount = 'Money Raised is required';
  }
  return errors;
};

export const functionChoicesTM = [
  {
    id: 'Operations',
    name: 'Operations',
  },
  {
    id: 'Engineering',
    name: 'Engineering',
  },
  {
    id: 'Marcomm',
    name: 'Marcomm',
  },
  {
    id: 'Design',
    name: 'Design',
  },
  {
    id: 'Product',
    name: 'Product',
  },
  {
    id: 'Business Development',
    name: 'Business Development',
  },
  {
    id: 'Technical',
    name: 'Technical',
  },
  {
    id: 'Finance',
    name: 'Finance',
  },
  {
    id: 'Legal',
    name: 'Legal',
  },
  {
    id: 'HR',
    name: 'HR',
  },
  {
    id: 'Sales',
    name: 'Sales',
  },
  {
    id: 'Training & Dev',
    name: 'Training & Dev',
  },
  {
    id: 'QA',
    name: 'QA',
  },
  {
    id: 'Journalist',
    name: 'Journalist',
  },
];

export const seniorityChoicesTM = [
  {
    id: 'Executive/ VP / C-Level',
    name: 'Executive/ VP / C-Level',
  },
  {
    id: 'Individual Contributor',
    name: 'Individual Contributor',
  },
  {
    id: 'Manager / Director',
    name: 'Manager / Director',
  },
];

export const companyChoices = [
  {
    id: 'Trending',
    name: 'Trending',
  },
  {
    id: 'Following',
    name: 'Following (Upcoming)',
    disabled: true,
  },
  {
    id: 'Raising',
    name: 'Raising',
  },
  {
    id: 'Acquired',
    name: 'Acquired',
  },
  {
    id: 'Dead',
    name: 'Dead',
  },
];

export const companyLayerChoices = [
  {
    id: 'Layer 0',
    name: 'Layer 0 - Native Code',
  },
  {
    id: 'Layer 1',
    name: 'Layer 1 - Programmable Blockchains / Networks',
  },
  {
    id: 'Layer 2',
    name: 'Layer 2 - Nodes / Node Providers / Data Platforms',
  },
  {
    id: 'Layer 3',
    name: "Layer 3 - API's / API Providers / Systems",
  },
  {
    id: 'Layer 4',
    name: 'Layer 4 - Decentralized Platforms / Contract / Modeling',
  },
  {
    id: 'Layer 5',
    name: 'Layer 5 - Applications',
  },
  {
    id: 'Layer 6',
    name: "Layer 6 - Interoperable Digital Assets / NFT's",
  },
];
export const roundChoices = [
  {
    id: 'Pre-seed',
    name: 'Pre-seed',
  },
  {
    id: 'Seed',
    name: 'Seed',
  },
  {
    id: 'Pre-Series A',
    name: 'Pre-Series A',
  },
  {
    id: 'Series A',
    name: 'Series A',
  },
  {
    id: 'Series B',
    name: 'Series B',
  },
  {
    id: 'Series C',
    name: 'Series C',
  },
  {
    id: 'Series D',
    name: 'Series D',
  },
  {
    id: 'Series E',
    name: 'Series E',
  },
  {
    id: 'Series F',
    name: 'Series F',
  },
  {
    id: 'Series G',
    name: 'Series G',
  },
  {
    id: 'Series H',
    name: 'Series H',
  },
  {
    id: 'ICO',
    name: 'ICO',
  },
  {
    id: 'Venture Round',
    name: 'Venture Round',
  },
  {
    id: 'Acquisition',
    name: 'Acquisition',
  },
];

export const currencyChoices = [
  {
    id: 'USD',
    name: 'USD',
  },
  {
    id: 'CNY',
    name: 'CNY',
  },
  {
    id: 'EUR',
    name: 'EUR',
  },
  {
    id: 'INR',
    name: 'INR',
  },
  {
    id: 'CAD',
    name: 'CAD',
  },
  {
    id: 'SGD',
    name: 'SGD',
  },
];

export const investorChoices = [
  {
    id: 'Trending',
    name: 'Trending',
  },
  {
    id: 'Following',
    name: 'Following (Coming soon!)',
    disabled: true,
  },
  {
    id: 'Acquired',
    name: 'Acquired',
    disabled: true,
  },
  {
    id: 'Dead',
    name: 'Dead',
  },
];

export const investorFunctionChoices = [
  {
    id: 'Investment',
    name: 'Investment',
  },
  {
    id: 'Operations',
    name: 'Operations',
  },
  {
    id: 'Finances',
    name: 'Finances',
  },
];

export const investorSeniorityChoices = [
  {
    id: 'Managing Partner',
    name: 'Managing Partner',
  },
  {
    id: 'Partner',
    name: 'Partner',
  },
  {
    id: 'Principle',
    name: 'Principle',
  },
  {
    id: 'Associate',
    name: 'Associate',
  },
  {
    id: 'Back Office',
    name: 'Back Office',
  },
];

export const status = [
  {
    id: 'draft',
    name: 'Draft',
  },
  {
    id: 'published',
    name: 'Published',
  },
];

export const tokenTypes = {
  verifyWorkHereToken: 'token-verifyworkhere',
};

export const tokenInfoMetrics = [
  {
    id: 'currentPrice',
    name: 'Current Price',
  },
  {
    id: 'marketCap',
    name: 'Market Cap',
  },
  {
    id: 'marketCapRank',
    name: 'Market Cap Rank',
  },
  {
    id: 'highLow24H',
    name: '24-Hour High/Low',
  },
  {
    id: 'vol24H',
    name: '24-Hour Volume',
  },
];

export const web3Tags: Tag[] = [
  'Layer 0',
  'Layer 1',
  'Layer 2',
  'Layer 3',
  'Layer 4',
  'Layer 5',
  'Layer 6',
  'API',
  'Platform',
  'Dev Tools',
  'Chain Tools',
  'Analytics',
  'DApps',
  'Wallet',
  'Oracle',
  'Side Chain',
  'Database',
  'Messaging',
  'Asset',
  'Storage',
  'Marketplace',
  'Exchange',
  'Gaming',
  'DeFi',
  'Blockchain',
  'Crypto',
  'NFT',
  'Bitcoin',
  'Ethereum',
  'NEAR/OWC',
  'Cosmos',
  'Cardano',
  'OWC',
  'DAO',
  'Centralized',
  'AI',
  'SaaS',
  'Brand',
  'Stablecoin',
  'Media',
  'Event',
  'Cybersecurity',
  'Solana',
  'Polkadot',
  'Metaverse',
  'News',
].map(tag => ({ id: tag, name: tag }));

export const aiTags: Tag[] = [
  'API',
  'Open Source',
  'Model Creator',
  'Model Hub',
  'End 2 End',
  'Infrastructure Provider',
  'B2B',
  'B2C',
  'Image',
  'Text',
  'Code',
  'Video',
  'Audio',
  'Multi-modal',
].map(tag => ({ id: tag, name: tag }));

export const NON_SELECTABLE_WEB_3_TAGS = [
  'Layer 0',
  'Layer 1',
  'Layer 2',
  'Layer 3',
  'Layer 4',
  'Layer 5',
  'Layer 6',
];

export const ADMIN_REFERENCE_INPUT_PER_PAGE = 250;

export const eventSizeChoices = [
  'Less than 50 people',
  '50 - 100 people',
  '101 - 1,000 people',
  '1,001 - 5,000 people',
  '5,001 - 10,000 people',
  '10,001 - 25,000 people',
  '25,001 - 100,000 people',
  '100,000+ people',
].map(size => ({ id: size, name: size }));

export const eventPersonTypeChoices = [
  {
    id: 'speaker',
    name: 'Speaker',
  },
  {
    id: 'attendee',
    name: 'Attendee',
  },
  {
    id: 'organizer',
    name: 'Organizer',
  },
];

export const eventOrganizationTypeChoices = [
  {
    id: 'sponsor',
    name: 'Sponsor',
  },
  {
    id: 'organizer',
    name: 'Organizer',
  },
];

export type ActionType = 'Insert Data' | 'Change Data' | 'Delete Data';

const libraries: Library[] = ['Web3', 'AI'];

export const libraryChoices: LibraryTag[] = libraries.map(item => ({
  id: item,
  name: item,
}));

export type ResourceTypes =
  | 'companies'
  | 'vc_firms'
  | 'people'
  | 'blockchains'
  | 'coins'
  | 'investment_rounds'
  | 'investments'
  | 'team_members'
  | 'investors'
  | 'events'
  | 'event_person'
  | 'event_organization'
  | 'resource_links'
  | 'news'
  | 'news_organizations'
  | 'news_person'
  | 'news_related_person'
  | 'news_related_organizations'
  | 'leads';

export const NODE_NAME: Record<ResourceTypes, string> = {
  companies: 'company',
  vc_firms: 'vc_firm',
  people: 'people',
  blockchains: 'blockchain',
  coins: 'coin',
  investment_rounds: 'investment_round',
  investments: 'investment',
  team_members: 'team_member',
  investors: 'investor',
  events: 'event',
  event_person: 'event_person',
  event_organization: 'event_organization',
  resource_links: 'resource_link',
  news: 'news',
  news_organizations: 'news_organization',
  news_person: 'news_person',
  news_related_person: 'news_related_person',
  news_related_organizations: 'news_related_organizations',
  leads: 'leads',
};

export const isResourceType = (
  resourceType: string,
): resourceType is ResourceTypes => {
  return [
    'companies',
    'vc_firms',
    'people',
    'blockchains',
    'coins',
    'investment_rounds',
    'investments',
    'team_members',
    'investors',
    'events',
    'event_person',
    'event_organization',
    'resource_links',
    'news',
    'news_organizations',
    'news_person',
    'news_related_person',
    'news_related_organizations',
    'leads',
  ].includes(resourceType);
};

export const companiesFilterOptions = [
  {
    category: 'Location',
    items: [
      {
        label: 'Add country',
        value: 'country',
      },
      {
        label: 'Add state',
        value: 'state',
      },
      {
        label: 'Add city',
        value: 'city',
      },
      {
        label: 'Add address',
        value: 'address',
      },
    ],
  },
  {
    category: 'Description keywords',
    items: [
      {
        label: 'Add keywords',
        value: 'keywords',
      },
    ],
  },
  {
    category: 'Tags',
    items: [
      {
        label: 'Select tags',
        value: 'industry',
      },
    ],
  },
  {
    category: 'Financials',
    items: [
      {
        label: 'Funding type',
        value: 'fundingType',
        isPremium: true,
      },
      {
        label: 'Total funding amount',
        value: 'fundingAmount',
        isPremium: true,
      },
      {
        label: 'Last funding date',
        value: 'lastFundingDate',
        isPremium: true,
      },
      {
        label: 'Investors',
        value: 'fundingInvestors',
        isPremium: true,
      },
    ],
  },
  {
    category: 'Team',
    items: [
      {
        label: 'Team size',
        value: 'teamSize',
        isPremium: true,
      },
    ],
  },
];

export const investorsFilterOptions = [
  {
    category: 'Location',
    items: [
      {
        label: 'Add country',
        value: 'country',
      },
      {
        label: 'Add state',
        value: 'state',
      },
      {
        label: 'Add city',
        value: 'city',
      },
      {
        label: 'Add address',
        value: 'address',
      },
    ],
  },
  {
    category: 'Description keywords',
    items: [
      {
        label: 'Add keywords',
        value: 'keywords',
      },
    ],
  },
  {
    category: 'Tags',
    items: [
      {
        label: 'Select tags',
        value: 'industry',
      },
    ],
  },
  {
    category: 'Financials',
    items: [
      {
        label: 'Investment type',
        value: 'investmentType',
        isPremium: true,
      },
      {
        label: 'Investment amount total',
        value: 'investmentAmountTotal',
        isPremium: true,
      },
      {
        label: 'Number of investments',
        value: 'numOfInvestments',
        isPremium: true,
      },
      {
        label: 'Number of exits',
        value: 'numOfExits',
        isPremium: true,
      },
      {
        label: 'Last investment date',
        value: 'lastInvestmentDate',
        isPremium: true,
      },
      {
        label: 'Funded companies',
        value: 'fundedCompanies',
        isPremium: true,
      },
    ],
  },
  {
    category: 'Team',
    items: [
      {
        label: 'Team size',
        value: 'teamSize',
        isPremium: true,
      },
    ],
  },
];

export const eventsFilterOptions = [
  {
    category: 'Location',
    items: [
      {
        label: 'Add country',
        value: 'country',
      },
      {
        label: 'Add state',
        value: 'state',
      },
      {
        label: 'Add city',
        value: 'city',
      },
      {
        label: 'Add address',
        value: 'address',
      },
    ],
  },
  {
    category: 'Details',
    items: [
      {
        label: 'Select date',
        value: 'eventDate',
      },
      {
        label: 'Select price',
        value: 'eventPrice',
      },
      {
        label: 'Select size',
        value: 'eventSize',
      },
    ],
  },
  {
    category: 'Event types',
    items: [
      {
        label: 'Select type',
        value: 'eventType',
      },
    ],
  },
  {
    category: 'Description keywords',
    items: [
      {
        label: 'Add keywords',
        value: 'keywords',
      },
    ],
  },
];

export const MY_EDGEIN_MENU_OPEN_KEY = 'disclosure-my-edgein-menu-default-open';
export const MY_LISTS_MENU_OPEN_KEY = 'disclosure-my-lists-menu-default-open';
export const MY_NOTES_MENU_OPEN_KEY = 'disclosure-my-notes-menu-default-open';
export const MY_GROUPS_MENU_OPEN_KEY = 'disclosure-my-groups-menu-default-open';
export const EXPLORE_MENU_OPEN_KEY = 'disclosure-explore-menu-default-open';

export const eventTypeChoices = [
  'Hackathon',
  'Online',
  'Ethereum',
  'Festival',
  'Blockchain',
  'Conference',
  'Web3',
  'Crypto',
  'Awards',
].map(item => ({ id: item, name: item }));

export const timezoneChoices = [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Asmera',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Sao_Tome',
  'Africa/Timbuktu',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Araguaina',
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Catamarca',
  'America/Argentina/ComodRivadavia',
  'America/Argentina/Cordoba',
  'America/Argentina/Jujuy',
  'America/Argentina/La_Rioja',
  'America/Argentina/Mendoza',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Aruba',
  'America/Asuncion',
  'America/Atikokan',
  'America/Atka',
  'America/Bahia',
  'America/Bahia_Banderas',
  'America/Barbados',
  'America/Belem',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Boa_Vista',
  'America/Bogota',
  'America/Boise',
  'America/Buenos_Aires',
  'America/Cambridge_Bay',
  'America/Campo_Grande',
  'America/Cancun',
  'America/Caracas',
  'America/Catamarca',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Coral_Harbour',
  'America/Cordoba',
  'America/Costa_Rica',
  'America/Creston',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Dominica',
  'America/Edmonton',
  'America/Eirunepe',
  'America/El_Salvador',
  'America/Ensenada',
  'America/Fort_Nelson',
  'America/Fort_Wayne',
  'America/Fortaleza',
  'America/Glace_Bay',
  'America/Godthab',
  'America/Goose_Bay',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Indiana/Indianapolis',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Indianapolis',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Jamaica',
  'America/Jujuy',
  'America/Juneau',
  'America/Kentucky/Louisville',
  'America/Kentucky/Monticello',
  'America/Knox_IN',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Louisville',
  'America/Lower_Princes',
  'America/Maceio',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Mendoza',
  'America/Menominee',
  'America/Merida',
  'America/Metlakatla',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Moncton',
  'America/Monterrey',
  'America/Montevideo',
  'America/Montreal',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Nipigon',
  'America/Nome',
  'America/Noronha',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Ojinaga',
  'America/Panama',
  'America/Pangnirtung',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port-au-Prince',
  'America/Port_of_Spain',
  'America/Porto_Acre',
  'America/Porto_Velho',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Rainy_River',
  'America/Rankin_Inlet',
  'America/Recife',
  'America/Regina',
  'America/Resolute',
  'America/Rio_Branco',
  'America/Rosario',
  'America/Santa_Isabel',
  'America/Santarem',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/Shiprock',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Swift_Current',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Thunder_Bay',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Virgin',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'America/Yellowknife',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/McMurdo',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/South_Pole',
  'Antarctica/Syowa',
  'Antarctica/Troll',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Anadyr',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Ashkhabad',
  'Asia/Atyrau',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Barnaul',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Calcutta',
  'Asia/Chita',
  'Asia/Choibalsan',
  'Asia/Chongqing',
  'Asia/Chungking',
  'Asia/Colombo',
  'Asia/Dacca',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Famagusta',
  'Asia/Gaza',
  'Asia/Harbin',
  'Asia/Hebron',
  'Asia/Ho_Chi_Minh',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Istanbul',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kashgar',
  'Asia/Kathmandu',
  'Asia/Katmandu',
  'Asia/Khandyga',
  'Asia/Kolkata',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Kuwait',
  'Asia/Macao',
  'Asia/Macau',
  'Asia/Magadan',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novokuznetsk',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Oral',
  'Asia/Phnom_Penh',
  'Asia/Pontianak',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Qyzylorda',
  'Asia/Rangoon',
  'Asia/Riyadh',
  'Asia/Saigon',
  'Asia/Sakhalin',
  'Asia/Samarkand',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Srednekolymsk',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Tel_Aviv',
  'Asia/Thimbu',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Tomsk',
  'Asia/Ujung_Pandang',
  'Asia/Ulaanbaatar',
  'Asia/Ulan_Bator',
  'Asia/Urumqi',
  'Asia/Ust-Nera',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yangon',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faeroe',
  'Atlantic/Faroe',
  'Atlantic/Jan_Mayen',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/ACT',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Broken_Hill',
  'Australia/Canberra',
  'Australia/Currie',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/LHI',
  'Australia/Lindeman',
  'Australia/Lord_Howe',
  'Australia/Melbourne',
  'Australia/NSW',
  'Australia/North',
  'Australia/Perth',
  'Australia/Queensland',
  'Australia/South',
  'Australia/Sydney',
  'Australia/Tasmania',
  'Australia/Victoria',
  'Australia/West',
  'Australia/Yancowinna',
  'Brazil/Acre',
  'Brazil/DeNoronha',
  'Brazil/East',
  'Brazil/West',
  'CET',
  'CST6CDT',
  'Canada/Atlantic',
  'Canada/Central',
  'Canada/Eastern',
  'Canada/Mountain',
  'Canada/Newfoundland',
  'Canada/Pacific',
  'Canada/Saskatchewan',
  'Canada/Yukon',
  'Chile/Continental',
  'Chile/EasterIsland',
  'Cuba',
  'EET',
  'EST',
  'EST5EDT',
  'Egypt',
  'Eire',
  'Etc/GMT',
  'Etc/GMT+0',
  'Etc/GMT+1',
  'Etc/GMT+10',
  'Etc/GMT+11',
  'Etc/GMT+12',
  'Etc/GMT+2',
  'Etc/GMT+3',
  'Etc/GMT+4',
  'Etc/GMT+5',
  'Etc/GMT+6',
  'Etc/GMT+7',
  'Etc/GMT+8',
  'Etc/GMT+9',
  'Etc/GMT-0',
  'Etc/GMT-1',
  'Etc/GMT-10',
  'Etc/GMT-11',
  'Etc/GMT-12',
  'Etc/GMT-13',
  'Etc/GMT-14',
  'Etc/GMT-2',
  'Etc/GMT-3',
  'Etc/GMT-4',
  'Etc/GMT-5',
  'Etc/GMT-6',
  'Etc/GMT-7',
  'Etc/GMT-8',
  'Etc/GMT-9',
  'Etc/GMT0',
  'Etc/Greenwich',
  'Etc/UCT',
  'Etc/UTC',
  'Etc/Universal',
  'Etc/Zulu',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Astrakhan',
  'Europe/Athens',
  'Europe/Belfast',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Kirov',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Nicosia',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Saratov',
  'Europe/Simferopol',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Tiraspol',
  'Europe/Ulyanovsk',
  'Europe/Uzhgorod',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zaporozhye',
  'Europe/Zurich',
  'GB',
  'GB-Eire',
  'GMT',
  'GMT+0',
  'GMT-0',
  'GMT0',
  'Greenwich',
  'HST',
  'Hongkong',
  'Iceland',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Iran',
  'Israel',
  'Jamaica',
  'Japan',
  'Kwajalein',
  'Libya',
  'MET',
  'MST',
  'MST7MDT',
  'Mexico/BajaNorte',
  'Mexico/BajaSur',
  'Mexico/General',
  'NZ',
  'NZ-CHAT',
  'Navajo',
  'PRC',
  'PST8PDT',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Chuuk',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Johnston',
  'Pacific/Kiritimati',
  'Pacific/Kosrae',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Midway',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Pohnpei',
  'Pacific/Ponape',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Samoa',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Truk',
  'Pacific/Wake',
  'Pacific/Wallis',
  'Pacific/Yap',
  'Poland',
  'Portugal',
  'ROC',
  'ROK',
  'Singapore',
  'Turkey',
  'UCT',
  'US/Alaska',
  'US/Aleutian',
  'US/Arizona',
  'US/Central',
  'US/East-Indiana',
  'US/Eastern',
  'US/Hawaii',
  'US/Indiana-Starke',
  'US/Michigan',
  'US/Mountain',
  'US/Pacific',
  'US/Pacific-New',
  'US/Samoa',
  'UTC',
  'Universal',
  'W-SU',
  'WET',
  'Zulu',
].map((item: string) => ({
  id: item,
  name: item,
}));

export const eventBannerList = [
  {
    city: 'dubai',
    url: 'https://images.unsplash.com/photo-1619806840163-38e329be64bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZHViYWl8fHx8fHwxNjc5NjQxNjk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'paris',
    url: 'https://images.unsplash.com/photo-1471874708433-acd480424946?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGFyaXMsY2l0eXx8fHx8fDE2Nzk2NDE4ODU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'moritz',
    url: 'https://images.unsplash.com/photo-1655884893362-b1d2fe29bcb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3Rtb3JpdHp8fHx8fHwxNjc5NjQyMTE2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'park city and salt lake city',
    url: 'https://images.unsplash.com/photo-1462900157664-3ecc405a9341?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2FsdCBsYWtlIGNpdHl8fHx8fHwxNjc5NjQyMjE2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'miami',
    url: 'https://images.unsplash.com/photo-1509081258900-a15e84ae6953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWlhbWkgY2l0eXx8fHx8fDE2Nzk2NDIzNzM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'san francisco',
    url: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2FuZnJhbmNpc2NvfHx8fHx8MTY3OTY0MjQwMA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'istanbul',
    url: 'https://images.unsplash.com/photo-1623439845268-0f864b14e0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aXN0YW5idWx8fHx8fHwxNjc5NjQyNDQ2&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'tel aviv',
    url: 'https://images.unsplash.com/photo-1598087494985-12fce9b2603b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGVsIGF2aXZ8fHx8fHwxNjc5NjQyNTA4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'philadelphia',
    url: 'https://images.unsplash.com/photo-1544295699-624f04212074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGhpbGFkZWxwaGlhfHx8fHx8MTY3OTY0MjUzOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'fort lauderdale',
    url: 'https://images.unsplash.com/photo-1533280385001-c32ffcbd52a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Zm9ydCBsYXVkZXJkYWxlfHx8fHx8MTY3OTY0MjgyNQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'barcelona',
    url: 'https://images.unsplash.com/photo-1544918877-460635b6d13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmFyY2Vsb25hfHx8fHx8MTY3OTY0Mjg0MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'manama',
    url: 'https://images.unsplash.com/photo-1642122791899-07dd7541276b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWFuYW1hfHx8fHx8MTY3OTY0MjkwNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'singapore',
    url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c2luZ2Fwb3JlfHx8fHx8MTY3OTY0MjkzOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'lisbon',
    url: 'https://images.unsplash.com/photo-1558003813-d1074f0aa419?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGlzYm9ufHx8fHx8MTY3OTY0Mjk1Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'denver',
    url: 'https://images.unsplash.com/photo-1616042616042-f9d81bbc6ac9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGVudmVyfHx8fHx8MTY3OTY0MzEyMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'london',
    url: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bG9uZG9ufHx8fHx8MTY3OTY0MzIwMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'austin',
    url: 'https://images.unsplash.com/photo-1558527109-b6d363793627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXVzdGlufHx8fHx8MTY3OTY0MzIyMg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'hamburg',
    url: 'https://images.unsplash.com/photo-1553547274-0df401ae03c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aGFtYnVyZ3x8fHx8fDE2Nzk2NDMyNDY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'ho chi minh city',
    url: 'https://images.unsplash.com/photo-1635684228990-890fda1deb7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aG8gY2hpIG1pbmggY2l0eXx8fHx8fDE2Nzk2NDMzMTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'porto',
    url: 'https://images.unsplash.com/photo-1564644840889-ea4a344404df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cG9ydG98fHx8fHwxNjc5NjQzMzYz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'johannesburg',
    url: 'https://images.unsplash.com/photo-1552937075-967cf58b74a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8am9oYW5uZXNidXJnfHx8fHx8MTY3OTY0MzM5MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'atlanta',
    url: 'https://images.unsplash.com/photo-1473042904451-00171c69419d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YXRsYW50YXx8fHx8fDE2Nzk2NDM0MDk&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'tallin',
    url: 'https://images.unsplash.com/photo-1564951537954-29dd59397b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGFsbGlufHx8fHx8MTY3OTY0MzQ0MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'tokyo',
    url: 'https://images.unsplash.com/photo-1565356277201-8c2f9e5df911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dG9reW98fHx8fHwxNjc5NjQzNDU5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'taipei',
    url: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dGFpcGVpfHx8fHx8MTY3OTY0MzQ5MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'los angeles',
    url: 'https://images.unsplash.com/photo-1525876285538-4cc52d170c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bG9zIGFuZ2VsZXN8fHx8fHwxNjc5NjQzNjk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'washington',
    url: 'https://images.unsplash.com/photo-1591553161262-0eeddc1f5c23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FzaGluZ3RvbiBjaXR5fHx8fHx8MTY3OTY0Mzc2MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'hong kong',
    url: 'https://images.unsplash.com/photo-1620015092538-e33c665fc181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9uZyBrb25nfHx8fHx8MTY3OTY0Mzc5OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'nassau',
    url: 'https://images.unsplash.com/photo-1617170709172-d19ee6cd406c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmFzc2F1IGNpdHl8fHx8fHwxNjc5NjQzODcx&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'bucharest',
    url: 'https://images.unsplash.com/photo-1583916588652-b9477dcf9751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnVjaGFyZXN0IGNpdHkgYnVpbGRpbmd8fHx8fHwxNjc5NjQ0MDA5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'new delhi',
    url: 'https://images.unsplash.com/photo-1583608563020-9772ff491a8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8ZGVsaGkgY2l0eXx8fHx8fDE2Nzk2NDQxMzE&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'rio',
    url: 'https://images.unsplash.com/photo-1548963670-aaaa8f73a5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cmlvIGRlIGphbmVpcm98fHx8fHwxNjc5NjQ0MjUy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'new york',
    url: 'https://images.unsplash.com/photo-1582070915618-9140bdc5035e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bmV3IHlvcmt8fHx8fHwxNjc5NjQ4ODk4&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'prague',
    url: 'https://images.unsplash.com/photo-1559564612-7a85b6c940f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cHJhZ3VlfHx8fHx8MTY3OTY0NDQxMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'zurich',
    url: 'https://images.unsplash.com/photo-1560278652-d660200913e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8enVyaWNofHx8fHx8MTY3OTY0NDQ1Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'omaha',
    url: 'https://images.unsplash.com/photo-1540921128506-76448386fb51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8b21haGF8fHx8fHwxNjc5NjQ0NTk5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'brussels',
    url: 'https://images.unsplash.com/photo-1587854669512-c12cd86f28d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YnJ1c3NlbHN8fHx8fHwxNjc5NjQ0NjM0&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'toronto',
    url: 'https://images.unsplash.com/photo-1603466182843-75f713ba06b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dG9yb250b3x8fHx8fDE2Nzk2NDQ3NTU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'vienna',
    url: 'https://images.unsplash.com/photo-1558555574-2a1a6e347cf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dmllbm5hfHx8fHx8MTY3OTY0NDgxMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'manila',
    url: 'https://images.unsplash.com/photo-1597285952775-1382215fbff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWFuaWxhfHx8fHx8MTY3OTY0NDkyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'berlin',
    url: 'https://images.unsplash.com/photo-1551354099-068f333a4e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVybGlufHx8fHx8MTY3OTY0NDk5NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'warsaw',
    url: 'https://images.unsplash.com/photo-1573157268794-d13e94d325e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2Fyc2F3fHx8fHx8MTY3OTY0NTA0Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'liechtenstein',
    url: 'https://images.unsplash.com/photo-1661101494681-2149c3de889b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGllY2h0ZW5zdGVpbnx8fHx8fDE2Nzk2NDUxNTY&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'bayfront subzone',
    url: 'https://images.unsplash.com/photo-1665764067489-963b7a9cbd88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmF5ZnJvbnQgc3Viem9ufHx8fHx8MTY3OTY0NTUyOQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'bengaluru',
    url: 'https://images.unsplash.com/photo-1611318310857-eeef8b779857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVuZ2FsdXJ1fHx8fHx8MTY3OTY0NTU2OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'mumbai',
    url: 'https://images.unsplash.com/photo-1601961405399-801fb1f34581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bXVtYmFpfHx8fHx8MTY3OTY0NTcyOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'amsterdam',
    url: 'https://images.unsplash.com/photo-1622015524070-5ea7caac2643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YW1zdGVyZGFtfHx8fHx8MTY3OTY0NTc2NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'belgrade',
    url: 'https://images.unsplash.com/photo-1647249893918-e75e1c00ae59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVsZ3JhZGV8fHx8fHwxNjc5NjQ1ODQz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'valencia',
    url: 'https://images.unsplash.com/photo-1565969163749-9d6aa37f977e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dmFsZW5jaWF8fHx8fHwxNjc5NjQ1ODc1&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'golden sands',
    url: 'https://images.unsplash.com/photo-1615409822213-8e70aa8041a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z29sZGVuIHNhbmRzfHx8fHx8MTY3OTY0NTkyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'melbourne',
    url: 'https://images.unsplash.com/photo-1546868762-b61266729c8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVsYm91cm5lfHx8fHx8MTY3OTY0NjAzOA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'cambridge',
    url: 'https://images.unsplash.com/20/cambridge.JPG?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2FtYnJpZGdlfHx8fHx8MTY3OTY0NjA4Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'las vegas',
    url: 'https://images.unsplash.com/photo-1534219066561-ae20285bd59e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bGFzIHZlZ2FzfHx8fHx8MTY3OTY0NjExMQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'chicago',
    url: 'https://images.unsplash.com/photo-1606760517201-75f1569e5cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2hpY2Fnb3x8fHx8fDE2Nzk2NDYxNDM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
  {
    city: 'podgorica',
    url: 'https://images.unsplash.com/photo-1641899936619-b3cc3cfe2cbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cG9kZ29yaWNhfHx8fHx8MTY3OTY0NjE5NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
  },
];

export const listsSortOptions = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Sort by newest',
    value: 'newest',
  },
  {
    label: 'Sort by recently updated',
    value: 'recently',
  },
];

export const newsOrganizationTypes = [
  {
    id: 'publisher',
    name: 'Publisher',
  },
  {
    id: 'subject',
    name: 'Subject',
  },
];

export const newsPersonTypes = [
  {
    id: 'author',
    name: 'Author',
  },
  {
    id: 'subject',
    name: 'Subject',
  },
];

export const LOCAL_STORAGE_LIBRARY_KEY = 'library';

export const ONBOARDING_QUESTION = 'Where did you hear about us?';

export const GROUPS_TABS: GroupsTabItem[] = [
  { id: 'my-groups', name: 'My Groups' },
  { id: 'discover', name: 'Discover' },
  { id: 'joined', name: 'Joined' },
];

export const RESOURCE_TYPES_CONTAIN_LIBRARY = [
  'companies',
  'vc_firms',
  'people',
  'news',
];
