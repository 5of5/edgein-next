import isArray from "lodash/isArray";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import {
  EXPLORE_MENU_OPEN_KEY,
  MY_EDGEIN_MENU_OPEN_KEY,
  MY_GROUPS_MENU_OPEN_KEY,
  MY_LISTS_MENU_OPEN_KEY,
} from "./constants";

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

      if (!isArray(difference) && isObject(difference) && isEmpty(difference)) {
        return acc;
      }

      if (
        !original[key as keyof {}] &&
        isObject(difference) &&
        (isEmpty(difference) ||
          Object.values(difference).every((item) => !item))
      ) {
        return acc;
      }

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

export const clearLocalStorage = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (
      key &&
      ![
        MY_EDGEIN_MENU_OPEN_KEY,
        MY_LISTS_MENU_OPEN_KEY,
        MY_GROUPS_MENU_OPEN_KEY,
        EXPLORE_MENU_OPEN_KEY,
      ].includes(key)
    ) {
      localStorage.removeItem(key);
    }
  }
};
