import { User } from '@/models/user';

export const getPersonalizedData = ({
  user,
}: {
  user: User | null;
}): { locationTags: string[]; industryTags: string[] } => {
  const locationTagsRaw =
    (user?.onboarding_information?.locationTags as Array<string>) ?? [];

  // This jargon is due to inconsistency of location values
  // in the onboarding_information jsonb column, the location is
  // saved like "Tel Aviv, TA ISR" so we parse it and return the first part
  // until ','
  const locationTags = locationTagsRaw.map(
    rawLocation => rawLocation.split(',')[0] ?? rawLocation,
  );

  return {
    locationTags,
    industryTags:
      (user?.onboarding_information?.industryTags as Array<string>) ?? [],
  };
};
