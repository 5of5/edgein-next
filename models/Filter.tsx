export type FilterOptionMetadata = {
  title?: string;
  heading?: string;
  placeholder?: string;
  subtext?: string;
  choices?: {
    id: string;
    name: string;
  }[];
  min?: number;
  max?: number;
  step?: number;
};

export type DateRangeOptions =
  | "30-days"
  | "60-days"
  | "90-days"
  | "year"
  | "custom"
  | undefined;

export type Filters = {
  country?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  state?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  city?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  address?: {
    distance?: number;
    value?: any;
    open?: boolean;
  };
  keywords?: {
    open?: boolean;
    tags: Array<string>;
  };
  industry?: {
    open?: boolean;
    tags: Array<string>;
  };
  fundingType?: {
    open?: boolean;
    tags: Array<string>;
  };
  fundingAmount?: {
    open?: boolean;
    minVal?: number;
    maxVal?: number;
    formattedMinVal?: string;
    formattedMaxVal?: string;
  };
  lastFundingDate?: {
    open?: boolean;
    condition?: DateRangeOptions;
    fromDate?: string;
    toDate?: string;
  };
  fundingInvestors?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
  teamSize?: {
    open?: boolean;
    minVal: number;
    maxVal: number;
  };
  investmentType?: {
    open?: boolean;
    tags: Array<string>;
  };
  investmentAmountTotal?: {
    open?: boolean;
    minVal?: number;
    maxVal?: number;
    formattedMinVal?: string;
    formattedMaxVal?: string;
  };
  numOfInvestments?: {
    open?: boolean;
    minVal: number;
    maxVal: number;
  };
  numOfExits?: {
    open?: boolean;
    minVal: number;
    maxVal: number;
  };
  lastInvestmentDate?: {
    open?: boolean;
    condition?: DateRangeOptions;
    fromDate?: string;
    toDate?: string;
  };
  fundedCompanies?: {
    open?: boolean;
    condition: "any" | "none";
    tags: Array<string>;
  };
};

export type FilterOptionKeys = keyof Filters;
