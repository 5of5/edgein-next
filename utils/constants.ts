
import { email, required, minLength, number, minValue, maxValue, regex } from 'react-admin'

export const validateName = [required(), minLength(3)];
export const validateSlug = [required(), minLength(3)];
export const validateYearFounded = [number(), minValue(1900), maxValue(2099)];
//export const validateUrl = regex(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Must be a valid Url')
export const validateUrl = regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/s, 'Must be a valid Url')

export const validateEmail = email();

export const functionChoicesTM = [
  {
    id: "Operations",
    name: "Operations",
  },
  {
    id: "Engineering",
    name: "Engineering",
  },
  {
    id: "Marcomm",
    name: "Marcomm",
  },
  {
    id: "Design",
    name: "Design",
  },
  {
    id: "Product",
    name: "Product",
  },
  {
    id: "Business Development",
    name: "Business Development",
  },
  {
    id: "Technical",
    name: "Technical",
  },
  {
    id: "Finance",
    name: "Finance",
  },
  {
    id: "Legal",
    name: "Legal",
  },
  {
    id: "HR",
    name: "HR",
  },
  {
    id: "Sales",
    name: "Sales",
  },
  {
    id: "Training & Dev",
    name: "Training & Dev",
  },
  {
    id: "QA",
    name: "QA",
  }
]

export const seniorityChoicesTM = [
  {
    id: "Executive/ VP / C-Level",
    name: "Executive/ VP / C-Level",
  },
  {
    id: "Individual Contributor",
    name: "Individual Contributor",
  },
  {
    id: "Manager / Director",
    name: "Manager / Director",
  }
]

export const companyLayerChoices = [
  {
    id: "Layer 0",
    name: "Layer 0 - Native Code",
  },
  {
    id: "Layer 1",
    name: "Layer 1 - Programmable Blockchains / Networks",
  },
  {
    id: "Layer 2",
    name: "Layer 2 - Nodes / Node Providers / Data Platforms",
  },
  {
    id: "Layer 3",
    name: "Layer 3 - API's / API Providers / Systems",
  },
  {
    id: "Layer 4",
    name: "Layer 4 - Decentralized Platforms / Contract / Modeling",
  },
  {
    id: "Layer 5",
    name: "Layer 5 - Applications",
  },
  {
    id: "Layer 6",
    name: "Layer 6 - Interoperable Digital Assets / NFT's",
  },
]
export const roundChoices = [
  {
    id: "Pre-seed",
    name: "Pre-seed"
  },
  {
    id: "Seed",
    name: "Seed"
  },
  {
    id: "Pre-Series A",
    name: "Pre-Series A"
  },
  {
    id: "Series A",
    name: "Series A"
  },
  {
    id: "Series B",
    name: "Series B"
  },
  {
    id: "Series C",
    name: "Series C"
  },
  {
    id: "Series D",
    name: "Series D"
  },
  {
    id: "Series E",
    name: "Series E"
  },
  {
    id: "Series F",
    name: "Series F"
  },
  {
    id: "Series G",
    name: "Series G"
  },
  {
    id: "Series H",
    name: "Series H"
  },
  {
    id: "ICO",
    name: "ICO"
  },
  {
    id: "Venture Round",
    name: "Venture Round"
  },
  {
    id: "Acquisition",
    name: "Acquisition"
  }
]

export const currencyChoices = [
  {
    id: "USD",
    name: "USD",
  },
  {
    id: "CNY",
    name: "CNY",
  },
  {
    id: "EUR",
    name: "EUR",
  },
  {
    id: "INR",
    name: "INR",
  },
  {
    id: "CAD",
    name: "CAD",
  },
  {
    id: "SGD",
    name: "SGD",
  }
]

export const investorFunctionChoices = [
  {
    id: "Investment",
    name: "Investment",
  },
  {
    id: "Operations",
    name: "Operations",
  },
  {
    id: "Finances",
    name: "Finances",
  },
]

export const investorSeniorityChoices = [
  {
    id: "Managing Partner",
    name: "Managing Partner",
  },
  {
    id: "Partner",
    name: "Partner",
  },
  {
    id: "Principle",
    name: "Principle",
  },
  {
    id: "Associate",
    name: "Associate",
  },
  {
    id: "Back Office",
    name: "Back Office",
  },
]

export const status = [
  {
    id: "draft",
    name: "Draft"
  },
  {
    id: "published",
    name: "Published"
  }
]

export const tokenTypes = {
  verifyWorkHereToken: 'token-verifyworkhere'
}