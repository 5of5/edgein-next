import { Library } from '@/types/common';

type ProfileRoute = {
  slug: string;
  selectedLibrary?: Library | 'tech';
};

const getLibraryPrefixUrl = (selectedLibrary?: Library | 'tech') =>
  selectedLibrary ? `/${selectedLibrary.toLowerCase()}` : '';

export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  SIGN_IN: '/sign-in',
  ONBOARDING: '/onboarding',
  HOME: '/home',
  COMPANIES: (selectedLibrary?: Library | 'tech') =>
    `${getLibraryPrefixUrl(selectedLibrary)}/companies`,
  COMPANY: ({ slug, selectedLibrary }: ProfileRoute) =>
    `${ROUTES.COMPANIES(selectedLibrary)}/${slug}`,
  INVESTORS: (selectedLibrary?: Library | 'tech') =>
    `${getLibraryPrefixUrl(selectedLibrary)}/investors`,
  INVESTOR: ({ slug, selectedLibrary }: ProfileRoute) =>
    `${ROUTES.INVESTORS(selectedLibrary)}/${slug}`,
  EVENTS: (selectedLibrary?: Library | 'tech') =>
    `${getLibraryPrefixUrl(selectedLibrary)}/events`,
  EVENT: ({ slug, selectedLibrary }: ProfileRoute) =>
    `${ROUTES.EVENTS(selectedLibrary)}/${slug}`,
  PEOPLE: (selectedLibrary?: Library | 'tech') =>
    `${getLibraryPrefixUrl(selectedLibrary)}/people`,
  PERSON: ({ slug, selectedLibrary }: ProfileRoute) =>
    `${ROUTES.PEOPLE(selectedLibrary)}/${slug}`,
  NEWS: (selectedLibrary?: Library | 'tech') =>
    `${getLibraryPrefixUrl(selectedLibrary)}/news`,
  LISTS: '/lists',
  GROUPS: '/groups',
  NOTES: '/notes',
  NOTIFICATIONS: '/notifications',
  INVITE_A_FRIEND: '/invite-a-friend',
  ACCOUNT: '/account',
  PROFILE: '/profile',
  SUPPORT: '/support',
  PRICING: '/pricing',
  CONTACT: '/contact',
  TEAM: '/team',
  BRAND_ASSETS: '/brand-assets',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '/404',
};
