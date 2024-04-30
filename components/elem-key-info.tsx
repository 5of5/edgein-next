import React, { ReactElement, useState } from 'react';
import { values, isEmpty } from 'lodash';
import {
  IconProps,
  IconGlobe,
  IconCash,
  IconDocumentDownload,
  IconUsers,
  IconFlag,
  IconLinkedIn,
  IconGithub,
  IconBriefcase,
  IconRole,
  IconEmail,
  IconLocation,
  IconTwitter,
  IconInstagram,
  IconTelegram,
  IconFacebook,
  IconDiscord,
  IconGlassdoor,
  IconHome,
  IconTicket,
  IconDocument,
  IconContract,
  IconLockClosed,
} from '@/components/icons';
import {
  getTwitterHandle,
  removeDomainName,
  convertToInternationalCurrencySystem,
  numberWithCommas,
} from '@/utils';
import { getFullAddress } from '@/utils/helpers';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { useGetUserProfileQuery } from '@/graphql/types';
import { CREDITS_PER_MONTH } from '@/utils/userTransactions';

type Attachments = Array<{
  label: string;
  url: string;
}>;

type Props = {
  className?: string;
  heading?: string;
  website?: string | null;
  eventLink?: any | null;
  totalFundingRaised?: string | null;
  whitePaper?: string | null;
  totalEmployees?: number;
  yearFounded?: string | null;
  location?: string | null;
  locationJson?: any;
  price?: number | null;
  attendees?: string | null;
  roles?: string | null;
  investmentsLength?: number;
  emails?: string[];
  linkedIn?: string | null;
  smartContract?: string | null;
  github?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  telegram?: string | null;
  discord?: string | null;
  glassdoor?: string | null;
  careerPage?: string | null;
  venue?: string | null;
  attachments?: Attachments;
};

export const ElemKeyInfo: React.FC<Props> = ({
  className,
  heading,
  website,
  eventLink,
  totalFundingRaised,
  whitePaper,
  totalEmployees,
  yearFounded,
  roles,
  investmentsLength = 0,
  emails = [],
  linkedIn,
  smartContract,
  github,
  careerPage,
  location,
  locationJson,
  price,
  attendees,
  twitter,
  instagram,
  facebook,
  telegram,
  discord,
  glassdoor,
  venue,
  attachments,
}) => {
  const router = useRouter();

  const { user } = useAuth();

  const { data: userProfile } = useGetUserProfileQuery(
    {
      id: user?.id || 0,
    },
    {
      enabled: !!user,
    },
  );

  const isEmptyLocationJson = values(locationJson).every(isEmpty);
  let locationText = '';
  if (!isEmptyLocationJson) {
    locationText = getFullAddress(locationJson);
  } else if (location) {
    locationText = location;
  }

  const edgeInContributorButtonEnabled =
    userProfile?.users_by_pk?.use_credits_system ||
    (!userProfile?.users_by_pk?.use_credits_system &&
      userProfile?.users_by_pk?.credits >= CREDITS_PER_MONTH);

  const infoItems: {
    icon?: React.FC<IconProps>;
    link?: string;
    text: string;
    target?: string;
    showHide?: boolean;
  }[] = [];

  if (website) {
    const cleanUrl = website
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .replace(/\/$/, '');

    infoItems.push({
      icon: IconGlobe,
      text: cleanUrl,
      link: website,
    });
  }

  if (eventLink) {
    let getLink = eventLink;

    if (getLink.includes('?q=')) {
      const getUrl = getLink.split('?q=');
      getLink = getUrl[1];
    }

    if (getLink.includes('&')) {
      const getUrl = getLink.split('&');
      getLink = getUrl[0];
    }

    const cleanUrl = getLink
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '') // removes https://www;
      .replace(/utm_[^&]+&?/g, '') // removes utm_xxx parameters;
      .replace(/\?.*/g, "$'") // removes anything after ? character
      .replace(/\/$/, ''); //removes last forward slash

    infoItems.push({
      icon: IconGlobe,
      text: cleanUrl,
      link: eventLink,
    });
  }

  if (yearFounded) {
    infoItems.push({
      icon: IconFlag,
      text: yearFounded + ' Founded',
    });
  }
  if (totalFundingRaised) {
    infoItems.push({
      icon: IconCash,
      text:
        convertToInternationalCurrencySystem(Number(totalFundingRaised)) +
        ' Total Funding Raised',
    });
  }

  if (price != null) {
    infoItems.push({
      icon: IconTicket,
      text: price === 0 ? 'Free' : 'Starts at $' + numberWithCommas(price),
    });
  }
  if (attendees) {
    infoItems.push({
      icon: IconUsers,
      text: attendees,
    });
  }
  if (venue) {
    infoItems.push({
      icon: IconHome,
      text: venue,
    });
  }
  if (locationText) {
    infoItems.push({
      icon: IconLocation,
      text: locationText,
    });
  }
  if (totalEmployees) {
    infoItems.push({
      icon: IconUsers,
      text: numberWithCommas(totalEmployees) + ' Employees',
    });
  }
  if (whitePaper) {
    infoItems.push({
      icon: IconDocumentDownload,
      text: 'White Paper',
      link: whitePaper,
    });
  }
  if (careerPage) {
    infoItems.push({
      icon: IconBriefcase,
      text: 'Careers',
      link: careerPage,
    });
  }
  if (roles && roles.length > 0) {
    infoItems.push({
      icon: IconRole,
      text: roles,
    });
  }
  if (investmentsLength && investmentsLength > 0) {
    infoItems.push({
      icon: IconCash,
      text:
        investmentsLength === 1
          ? investmentsLength + ' Investment'
          : investmentsLength + ' Investments',
      link: '#investments',
      target: '_self',
    });
  }
  if (linkedIn) {
    infoItems.push({
      icon: IconLinkedIn,
      text: removeDomainName(linkedIn),
      link: linkedIn,
      showHide: true,
    });
  }
  if (github) {
    infoItems.push({
      icon: IconGithub,
      text: 'Github',
      link: github,
    });
  }
  if (smartContract) {
    infoItems.push({
      icon: IconContract,
      text: removeDomainName(smartContract),
      showHide: !userProfile || edgeInContributorButtonEnabled,
    });
  }
  if (facebook) {
    infoItems.push({
      icon: IconFacebook,
      text: 'Facebook',
      link: facebook,
    });
  }

  if (twitter) {
    infoItems.push({
      icon: IconTwitter,
      text: getTwitterHandle(twitter),
      link: twitter,
    });
  }
  if (instagram) {
    infoItems.push({
      icon: IconInstagram,
      text: 'Instagram',
      link: instagram,
    });
  }
  if (telegram) {
    infoItems.push({
      icon: IconTelegram,
      text: 'Telegram',
      link: telegram,
    });
  }
  if (discord) {
    infoItems.push({
      icon: IconDiscord,
      text: 'Discord',
      link: discord,
    });
  }
  if (glassdoor) {
    infoItems.push({
      icon: IconGlassdoor,
      text: 'Glassdoor',
      link: glassdoor,
    });
  }

  if (attachments && attachments.length > 0) {
    attachments.forEach(item => {
      infoItems.push({
        icon: IconDocument,
        text: item.label,
        link: item.url,
      });
    });
  }

  const baseClasses = 'flex space-x-2 text-gray-600';

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [showInfo, setShowInfo] = useState<Record<string, boolean>>({});

  const onInfoClick = (info: string) => () => {
    if (user?.entitlements?.viewEmails) {
      setShowInfo({ ...showInfo, [info]: !showInfo[info] });
      // TODO add action
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  return (
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      {heading && <h2 className="px-4 pt-2 text-lg font-medium">{heading}</h2>}

      <ul className="flex flex-col p-4 space-y-4 text-sm">
        {infoItems.map((item, index: number) => {
          let itemInner: ReactElement = (
            <>
              {item.icon && (
                <item.icon
                  title={item.text}
                  className={`${
                    item.link?.length ? 'text-primary-500' : ''
                  } h-5 w-5 shrink-0`}
                />
              )}
              <span className="min-w-0 break-words">{item.text}</span>
            </>
          );

          if (item.link?.length) {
            itemInner = (
              <a
                key={index}
                className={`${baseClasses} flex-1 transition-all underline hover:no-underline`}
                href={item.link}
                target={item.target ? item.target : '_blank'}
                rel="noopener noreferrer"
                title={item.text}
              >
                {itemInner}
              </a>
            );
          }

          itemInner = (
            <li key={index} className={!item.link ? baseClasses : ''}>
              {itemInner}
            </li>
          );

          if (item.showHide) {
            return (
              <li
                key={index}
                onClick={onInfoClick(item.text)}
                className={`${baseClasses} flex-1 items-center justify-between transition-all cursor-pointer`}
              >
                <div className="flex items-center">
                  {item.icon && (
                    <item.icon
                      title={showInfo[item.text] ? item.text : ''}
                      className={`${
                        showInfo[item.text]
                          ? 'text-primary-500'
                          : 'text-gray-400'
                      } h-5 w-5 mr-2 shrink-0`}
                    />
                  )}
                  {showInfo[item.text] ? (
                    <a
                      className="underline break-all transition-all hover:no-underline"
                      href={item.link}
                      target={item.target ? item.target : '_blank'}
                      rel="noopener noreferrer"
                      title={item.text}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400">
                      &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                    </span>
                  )}
                </div>
                {!showInfo[item.text] && (
                  <IconLockClosed
                    className="w-4 h-4 text-gray-400 shrink-0"
                    strokeWidth={2}
                  />
                )}
              </li>
            );
          } else {
            return itemInner;
          }
        })}

        {emails.map((email, i: number) => [
          <li
            key={i}
            onClick={onInfoClick('email')}
            className={`${baseClasses} flex-1 items-center justify-between cursor-pointer`}
          >
            <div className="flex items-center">
              <IconEmail
                className={`${
                  showInfo['email'] ? 'text-primary-500' : 'text-gray-400'
                } h-5 w-5 mr-2 shrink-0`}
              />
              <div className="break-all">
                {showInfo['email'] ? (
                  <a
                    href={`mailto:${email}`}
                    className="underline hover:no-underline"
                  >
                    {email}
                  </a>
                ) : (
                  <span className="text-gray-400">
                    &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center text-primary-500">
              {!showInfo['email'] && (
                <IconLockClosed
                  className="w-4 h-4 text-gray-400 shrink-0"
                  strokeWidth={2}
                />
              )}
            </div>
          </li>,
        ])}
      </ul>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </section>
  );
};
