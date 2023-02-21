import isArray from "lodash/isArray";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import { Filters } from "@/components/Companies/ElemCompaniesFilter";
import {
  Companies_Bool_Exp,
} from "@/graphql/types";
import { DeepPartial } from "@/pages/companies";

const makeObjectWithoutPrototype = () => Object.create(null);

export const getUpdatedDiff = (original: any, target: any) => {
  if (original === target) return {};

  if (!original && !target) return {};

  if (!isObject(original) || !isObject(target)) return target;

  if (isArray(original) && isArray(target) && !isEqual(original, target))
    return target;

  return Object.keys(target).reduce((acc, key) => {
    if (original.hasOwnProperty(key)) {
      const difference = getUpdatedDiff(
        original[key as keyof {}],
        target[key as keyof {}]
      );

      if (key === "geopoint" && !isEmpty(difference)) {
        acc[key] = target[key as keyof {}];
        return acc;
      }
     
      if (!isArray(difference) && isObject(difference) && isEmpty(difference))
        return acc;

      acc[key] = difference;
      return acc;
    }

    if (target[key as keyof {}]) {
      acc[key] = target[key as keyof {}];
    }

    return acc;
  }, makeObjectWithoutPrototype());
};

export const getFullAddress = (locationJson: any) => {
  const address = locationJson?.address || '';
  const city = locationJson?.city || '';
  const state = locationJson?.state || '';
  const country = locationJson?.country || '';
  return [address, city, state, country]
    .filter((item) => !isEmpty(item))
    .join(", ");
}

export const processCompaniesFilters = (
  filters: DeepPartial<Companies_Bool_Exp>,
  selectedFilters: Filters | null,
) => {
  if (!selectedFilters) {
		filters._and = [{ slug: { _neq: "" } }];
	}
  if (
    selectedFilters?.country?.tags &&
    selectedFilters.country.tags.length > 0
  ) {
    if (selectedFilters?.country?.condition === "any") {
      filters._and?.push({
        _or: selectedFilters.country.tags.map((item) => ({
          location_json: { _contains: { country: item } },
        })),
      });
    }

    if (selectedFilters?.country?.condition === "none") {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.country.tags.map((item) => ({
                location_json: { _contains: { country: item } },
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

  if (selectedFilters?.state?.tags && selectedFilters.state.tags.length > 0) {
		if (selectedFilters?.state?.condition === "any") {
      filters._and?.push({
        _or: selectedFilters.state.tags.map((item) => ({
          location_json: { _contains: { state: item } },
        })),
      });
    }

    if (selectedFilters?.state?.condition === "none") {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.state.tags.map((item) => ({
                location_json: { _contains: { state: item } },
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

  if (selectedFilters?.city?.tags && selectedFilters.city.tags.length > 0) {
		if (selectedFilters?.city?.condition === "any") {
      filters._and?.push({
        _or: selectedFilters.city.tags.map((item) => ({
          location_json: { _contains: { city: item } },
        })),
      });
    }

    if (selectedFilters?.city?.condition === "none") {
      filters._and?.push({
        _or: [
          {
            _not: {
              _or: selectedFilters.city.tags.map((item) => ({
                location_json: { _contains: { city: item } },
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

  if (
    selectedFilters?.keywords?.tags &&
    selectedFilters.keywords.tags.length > 0
  ) {
    filters._and?.push({
      _or: selectedFilters.keywords.tags.map((item) => ({
        overview: { _ilike: `%${item}%` },
      })),
    });
  }

  if (selectedFilters?.industry && selectedFilters.industry.length > 0) {
    filters._and?.push({
      _and: selectedFilters.industry.map((item) => ({
        tags: { _contains: item },
      })),
    });
  }

  if (selectedFilters?.fundingType && selectedFilters.fundingType.length > 0) {
    filters._and?.push({
      investment_rounds: {
        _and: selectedFilters.fundingType.map((item) => ({
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
    if (selectedFilters?.lastFundingDate?.condition !== "custom") {
      filters._and?.push({
        investment_rounds: {
          round_date: { _gte: selectedFilters.lastFundingDate.fromDate },
        },
      });
    }
    if (
      selectedFilters?.lastFundingDate?.condition === "custom" &&
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

  if (
    selectedFilters?.fundingInvestors &&
    selectedFilters?.fundingInvestors?.tags &&
    selectedFilters.fundingInvestors.tags.length > 0
  ) {
    if (selectedFilters.fundingInvestors.condition === "any") {
      filters._and?.push({
        investment_rounds: {
          _or: selectedFilters.fundingInvestors.tags.map((item) => ({
            investments: {
              _or: [
                {
                  vc_firm: {
                    _or: [{ name: { _eq: item } }],
                  },
                },
              ],
            },
          })),
        },
      });
    }

    if (selectedFilters.fundingInvestors.condition === "none") {
      filters._and?.push({
        _not: {
          investment_rounds: {
            _or: selectedFilters.fundingInvestors.tags.map((item) => ({
              investments: {
                _or: [
                  {
                    vc_firm: {
                      _or: [{ name: { _eq: item } }],
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
  			{ total_employees: { _lte:selectedFilters?.teamSize?.maxVal } },
  		],
  	});
  }
}
