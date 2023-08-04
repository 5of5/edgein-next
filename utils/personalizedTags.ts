import { User } from "@/models/user";

export const getPersonalizedData = ({
  user,
}: {
  user: User | null;
}): { locationTags: string[]; industryTags: string[] } => ({
  locationTags:
    (user?.onboarding_information?.locationTags as Array<string>) ?? [],
  industryTags:
    (user?.onboarding_information?.industryTags as Array<string>) ?? [],
});
