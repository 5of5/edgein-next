import { Maybe } from '@app/database/types';

export enum SocialMediumSource {
  Discord = 'Discord',
  Facebook = 'Facebook',
  GitHub = 'GitHub',
  GlassDoor = 'GlassDoor',
  Instagram = 'Instagram',
  LinkedIn = 'LinkedIn',
  Medium = 'Medium',
  Reddit = 'Reddit',
  Telegram = 'Telegram',
  Twitter = 'Twitter',
  YouTube = 'YouTube',
}

export const SocialMediumSourceHost: Record<SocialMediumSource, string[]> = {
  [SocialMediumSource.Discord]: ['discord.com', 'discord.gg'],
  [SocialMediumSource.Facebook]: ['facebook.com'],
  [SocialMediumSource.GitHub]: ['github.com'],
  [SocialMediumSource.GlassDoor]: ['glassdoor.com'],
  [SocialMediumSource.Instagram]: ['instagram.com'],
  [SocialMediumSource.LinkedIn]: ['linkedin.com'],
  [SocialMediumSource.Medium]: ['medium.com'],
  [SocialMediumSource.Reddit]: ['reddit.com'],
  [SocialMediumSource.Telegram]: ['t.me'],
  [SocialMediumSource.Twitter]: ['twitter.com'],
  [SocialMediumSource.YouTube]: ['youtube.com'],
};

export const SocialMediumPathPrefix: Record<
  SocialMediumSource,
  Maybe<string>
> = {
  [SocialMediumSource.Discord]: null,
  [SocialMediumSource.Facebook]: null,
  [SocialMediumSource.GitHub]: null,
  [SocialMediumSource.GlassDoor]: null,
  [SocialMediumSource.Instagram]: null,
  [SocialMediumSource.LinkedIn]: '/company',
  [SocialMediumSource.Medium]: null,
  [SocialMediumSource.Reddit]: null,
  [SocialMediumSource.Telegram]: null,
  [SocialMediumSource.Twitter]: null,
  [SocialMediumSource.YouTube]: null,
};

export const SocialMediumMigrationAttribute: Record<
  SocialMediumSource,
  string
> = {
  [SocialMediumSource.Discord]: 'discord',
  [SocialMediumSource.Facebook]: 'facebook',
  [SocialMediumSource.GitHub]: 'github',
  [SocialMediumSource.GlassDoor]: 'glassdoor',
  [SocialMediumSource.Instagram]: 'instagram',
  [SocialMediumSource.LinkedIn]: 'company_linkedin',
  [SocialMediumSource.Medium]: 'medium',
  [SocialMediumSource.Reddit]: 'reddit',
  [SocialMediumSource.Telegram]: 'telegram',
  [SocialMediumSource.Twitter]: 'twitter',
  [SocialMediumSource.YouTube]: 'youtube',
};
