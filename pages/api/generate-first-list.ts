import type { NextApiRequest, NextApiResponse } from 'next';
import compact from 'lodash/compact';
import take from 'lodash/take';
import uniqBy from 'lodash/uniqBy';
import { z } from 'zod';
import {
  GetCompaniesByTagsAndLocationQuery,
  GetPeopleByTagsAndLocationQuery,
  GetVcFirmsByTagsAndLocationQuery,
} from '@/graphql/types';
import CookieService from '@/utils/cookie';
import {
  getAutoGeneratedCompanies,
  getAutoGeneratedPeople,
  getAutoGeneratedVcFirms,
  upsertFollow,
  upsertList,
} from '@/utils/lists';
import { addOnboardingSchema } from '@/utils/schema';
import {
  AUTO_GENERATED_LIST_MAXIMUM_COMPANIES,
  AUTO_GENERATED_LIST_MAXIMUM_INVESTORS,
  AUTO_GENERATED_LIST_MAXIMUM_PEOPLE,
} from '@/utils/constants';

export type OnboardingInformation = z.infer<typeof addOnboardingSchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const token = CookieService.getAuthToken(req.cookies);
  const user = await CookieService.getUser(token);
  if (!user) return res.status(403).end();

  try {
    const onboardingInformation =
      user?.onboarding_information as OnboardingInformation;

    const locationDetails = onboardingInformation?.locationDetails ?? [];

    const locationTags = compact(
      locationDetails.map(locationDetail => locationDetail.city),
    );

    const industryTags = onboardingInformation?.industryTags ?? [];

    const companies = await generatedCompanies(industryTags, locationTags);

    const vcFirms = await generatedVcFirms(industryTags, locationTags);

    const people = await generatedPeople(industryTags, locationTags);

    if (companies.length > 0 || vcFirms.length > 0 || people.length > 0) {
      const displayName = user.display_name || '';
      const firstName =
        displayName.indexOf(' ') !== -1
          ? displayName.split(' ')[0]
          : displayName;
      const listName = `${firstName}'s first list`;

      const list = await upsertList(listName, user, token);

      await Promise.all([
        companies.map(async company => {
          await upsertFollow(
            list?.id || 0,
            company.id,
            'companies',
            user,
            token,
          );
        }),
        vcFirms.map(async vcFirm => {
          await upsertFollow(list?.id || 0, vcFirm.id, 'vc_firms', user, token);
        }),
        people.map(async person => {
          await upsertFollow(list?.id || 0, person.id, 'people', user, token);
        }),
      ]);
    }

    return res.status(200).send({ companies, vcFirms, people });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Something went wrong. Please try again later.' });
  }
};

const generatedCompanies = async (
  industryTags: string[],
  locationTags: string[],
) => {
  let companies: GetCompaniesByTagsAndLocationQuery['companies'] = [];

  while (
    companies.length < AUTO_GENERATED_LIST_MAXIMUM_COMPANIES &&
    industryTags.length > 1
  ) {
    const filteredCompanies = await getAutoGeneratedCompanies(
      AUTO_GENERATED_LIST_MAXIMUM_COMPANIES - companies.length,
      industryTags,
      locationTags,
    );
    companies = uniqBy(companies.concat(filteredCompanies), 'id');
    industryTags = take(industryTags, industryTags.length - 1);
  }

  return companies;
};

const generatedVcFirms = async (
  industryTags: string[],
  locationTags: string[],
) => {
  let vcFirms: GetVcFirmsByTagsAndLocationQuery['vc_firms'] = [];

  while (
    vcFirms.length < AUTO_GENERATED_LIST_MAXIMUM_INVESTORS &&
    industryTags.length > 1
  ) {
    const filteredVcFirms = await getAutoGeneratedVcFirms(
      AUTO_GENERATED_LIST_MAXIMUM_INVESTORS - vcFirms.length,
      industryTags,
      locationTags,
    );
    vcFirms = uniqBy(vcFirms.concat(filteredVcFirms), 'id');
    industryTags = take(industryTags, industryTags.length - 1);
  }

  return vcFirms;
};

const generatedPeople = async (
  industryTags: string[],
  locationTags: string[],
) => {
  let people: GetPeopleByTagsAndLocationQuery['people'] = [];

  while (
    people.length < AUTO_GENERATED_LIST_MAXIMUM_PEOPLE &&
    industryTags.length > 1
  ) {
    const filteredPeople = await getAutoGeneratedPeople(
      AUTO_GENERATED_LIST_MAXIMUM_PEOPLE - people.length,
      industryTags,
      locationTags,
    );
    people = uniqBy(people.concat(filteredPeople), 'id');
    industryTags = take(industryTags, industryTags.length - 1);
  }

  return people;
};

export default handler;
