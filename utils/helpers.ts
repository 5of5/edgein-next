import { Place } from '@aws-sdk/client-location';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import { Library } from '@/types/common';
import {
  aiTags,
  eventBannerList,
  EXPLORE_MENU_OPEN_KEY,
  MY_EDGEIN_MENU_OPEN_KEY,
  NON_SELECTABLE_WEB_3_TAGS,
  web3Tags,
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
        ['geopoint', 'source', 'metadata', 'location_json'].includes(key) &&
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
      ![MY_EDGEIN_MENU_OPEN_KEY, EXPLORE_MENU_OPEN_KEY].includes(key)
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

export const getSelectableWeb3Tags = () => {
  return web3Tags.filter(
    ({ name }) => !NON_SELECTABLE_WEB_3_TAGS.includes(name),
  );
};

export const getTagChoicesByLibraries = (libraries: Library[]) => {
  if (!libraries || !Array.isArray(libraries)) {
    return web3Tags; // Default to web3Tags if libraries is undefined or not an array
  }

  if (libraries.includes('Web3') && libraries.includes('AI')) {
    return [...aiTags, ...web3Tags];
  }

  if (libraries.includes('AI')) {
    return aiTags;
  }

  if (libraries.includes('Web3')) {
    return web3Tags;
  }

  return [];
};

export const getAllTags = () => [...web3Tags, ...aiTags];

export const getGeometryPlace = (place: Place) => ({
  type: 'Point',
  coordinates: place.Geometry?.Point,
});

export const camelCaseToSnakeCaseRecursively = <
  T extends Record<string, any> | string,
>(
  input: T | string,
): T => {
  if (typeof input === 'object' && input instanceof Object) {
    const newObject: Record<string, any> = {};
    Object.keys(input).forEach(key => {
      newObject[camelCaseToSnakeCaseRecursively(key) as string] =
        typeof input[key] === 'object'
          ? camelCaseToSnakeCaseRecursively(input[key])
          : input[key];
    });
    return newObject as T;
  }
  return input.replace(
    /(?!^)([A-Z])/g,
    letter => `_${letter.toLowerCase()}`,
  ) as T;
};
