import { User } from '@/models/user';
import { compact } from 'lodash';
import { z } from 'zod';
import { addOnboardingSchema } from './schema';

export type OnboardingInformation = z.infer<typeof addOnboardingSchema>;

export const getPersonalizedData = ({
  user,
}: {
  user: User | null;
}): { locationTags: string[]; industryTags: string[] } => {
  const onboardingInformation =
    user?.onboarding_information as OnboardingInformation;

  const locationDetails = onboardingInformation?.locationDetails ?? [];

  const locationTags = compact(
    locationDetails.map(locationDetail => locationDetail.city),
  );

  return {
    locationTags,
    industryTags: onboardingInformation?.industryTags ?? [],
  };
};
