import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import {
  eventBannerList,
  EXPLORE_MENU_OPEN_KEY,
  MY_EDGEIN_MENU_OPEN_KEY,
  MY_GROUPS_MENU_OPEN_KEY,
  MY_LISTS_MENU_OPEN_KEY,
} from './constants';

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
        target[key as keyof {}],
      );

      if (
        ['geopoint', 'source', 'metadata'].includes(key) &&
        !isEmpty(difference)
      ) {
        acc[key] = target[key as keyof {}];
        return acc;
      }

      if (!isArray(difference) && isObject(difference) && isEmpty(difference)) {
        return acc;
      }

      if (
        !original[key as keyof {}] &&
        isObject(difference) &&
        (isEmpty(difference) || Object.values(difference).every(item => !item))
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
    .filter(item => !isEmpty(item.trim()))
    .join(', ');
};

export const randomImageOfCity = (city: string, size?: string) => {
  const getSize = size ? size : '600x200';

  const baseUrl = `https://source.unsplash.com/category/city/${getSize}?`;

  if (!city) {
    return baseUrl + `city`;
  }

  const cityUrl = baseUrl + city.replace(/[,.-\s]/g, '').toLowerCase();

  return cityUrl;
};

export const getEventBanner = (city: string, size?: string) => {
  if (!city) {
    return randomImageOfCity(city, size);
  }

  const banner = eventBannerList.find(item =>
    city.toLowerCase().includes(item.city),
  );
  if (banner) {
    return banner.url;
  }

  return randomImageOfCity(city, size);
};

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

export const isValidJsonString = (jsonString: string) => {
  try {
    const o = JSON.parse(jsonString);

    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {} // eslint-disable-line no-empty

  return false;
};

export const isFreeEmail = (email: string) => {
  const pattern = /@(gmail|yahoo|hotmail)/i;
  return pattern.test(email);
};
