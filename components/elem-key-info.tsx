import React, { ReactElement, useState } from 'react';
import { values, isEmpty } from 'lodash';
import { IconProps } from '@/components/icons';
import { LucideIconWrapper } from '@/components/icons-wrapper';

// Import Lucide icons
import {
  Globe,
  DollarSign,
  FileDown,
  Users,
  Flag,
  Activity,
  Linkedin,
  Github,
  Briefcase,
  UserCheck,
  MapPin,
  Twitter,
  Instagram,
  MessagesSquare, // for Telegram
  Facebook,
  MessageCircle, // for Discord
  Newspaper, // for Glassdoor
  Home,
  Ticket,
  FileText,
  FileCode, // for Contract
  LockIcon, // for IconLockClosed
  Copy, // for IconCopy
  Mail, // for IconEmail
} from 'lucide-react';

import { getTwitterHandle, removeDomainName } from '@/utils/text';
import {
  convertToInternationalCurrencySystem,
  numberWithCommas,
} from '@/utils/numbers';
import { getFullAddress } from '@/utils/helpers';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { useUser } from '@/context/user-context';
import toast, { Toaster } from 'react-hot-toast';
import { ElemTooltip } from './elem-tooltip';
import { useGetBillingOrgByIdQuery } from '@/graphql/types';

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
  status_tags?: string[] | null;
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
  web3Address?: { address: string; network: string }[] | null;
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

// Wrap Lucide icons to match our IconProps interface
const WrappedGlobe = LucideIconWrapper(Globe);
const WrappedDollarSign = LucideIconWrapper(DollarSign);
const WrappedFileDown = LucideIconWrapper(FileDown);
const WrappedUsers = LucideIconWrapper(Users);
const WrappedFlag = LucideIconWrapper(Flag);
const WrappedActivity = LucideIconWrapper(Activity);
const WrappedLinkedin = LucideIconWrapper(Linkedin);
const WrappedGithub = LucideIconWrapper(Github);
const WrappedBriefcase = LucideIconWrapper(Briefcase);
const WrappedUserCheck = LucideIconWrapper(UserCheck);
const WrappedMapPin = LucideIconWrapper(MapPin);
const WrappedTwitter = LucideIconWrapper(Twitter);
const WrappedInstagram = LucideIconWrapper(Instagram);
const WrappedMessagesSquare = LucideIconWrapper(MessagesSquare);
const WrappedFacebook = LucideIconWrapper(Facebook);
const WrappedMessageCircle = LucideIconWrapper(MessageCircle);
const WrappedNewspaper = LucideIconWrapper(Newspaper);
const WrappedHome = LucideIconWrapper(Home);
const WrappedTicket = LucideIconWrapper(Ticket);
const WrappedFileText = LucideIconWrapper(FileText);
const WrappedFileCode = LucideIconWrapper(FileCode);
const WrappedLock = LucideIconWrapper(LockIcon);
const WrappedCopy = LucideIconWrapper(Copy);
const WrappedMail = LucideIconWrapper(Mail);

export const ElemKeyInfo: React.FC<Props> = ({
  className,
  heading,
  website,
  eventLink,
  totalFundingRaised,
  status_tags,
  whitePaper,
  totalEmployees,
  yearFounded,
  roles,
  investmentsLength = 0,
  emails = [],
  linkedIn,
  web3Address,
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
  const { user } = useUser();

  const isEmptyLocationJson = values(locationJson).every(isEmpty);
  let locationText = '';
  if (!isEmptyLocationJson) {
    locationText = getFullAddress(locationJson);
  } else if (location) {
    locationText = location;
  }

  const { data } = useGetBillingOrgByIdQuery({
    id: Number(user?.billing_org_id),
  });

  // const isPaidUser = (data?.billing_org[0]?.status === 'active') || user?.entitlements.viewEmails
  // ? user?.entitlements.viewEmails
  // : false;

  const isPaidUser = data?.billing_org[0]?.status === 'active';

  const infoItems: {
    icon?: React.FC<IconProps>;
    link?: string;
    text: string;
    target?: string;
    tooltip?: string;
    isPremium?: boolean;
  }[] = [];

  if (website) {
    const cleanUrl = website
      .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
      .replace(/\/$/, '');

    infoItems.push({
      icon: WrappedGlobe,
      text: cleanUrl,
      link: website,
      tooltip: 'Website',
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
      icon: WrappedGlobe,
      text: cleanUrl,
      link: eventLink,
    });
  }

  if (yearFounded) {
    infoItems.push({
      icon: WrappedFlag,
      text: yearFounded + ' Founded',
      tooltip: 'Date the organization was founded',
    });
  }

  if (status_tags && status_tags?.length > 0) {
    infoItems.push({
      icon: WrappedActivity,
      text: status_tags
        ?.map((tag: string) => tag)
        .join(', ')
        .replace(/, ([^,]*)$/, ' and $1'),
      tooltip: 'Status of organization', //e.g. Trending, Raising, Dead, etc.
    });
  }

  if (totalFundingRaised) {
    infoItems.push({
      icon: WrappedDollarSign,
      text:
        convertToInternationalCurrencySystem(Number(totalFundingRaised)) +
        ' Total Funding Raised',
      tooltip: 'Total amount raised across all funding rounds',
    });
  }

  if (price != null) {
    infoItems.push({
      icon: WrappedTicket,
      text: price === 0 ? 'Free' : 'Starts at $' + numberWithCommas(price),
    });
  }
  if (attendees) {
    infoItems.push({
      icon: WrappedUsers,
      text: attendees,
    });
  }
  if (venue) {
    infoItems.push({
      icon: WrappedHome,
      text: venue,
    });
  }
  if (locationText) {
    infoItems.push({
      icon: WrappedMapPin,
      text: locationText,
      tooltip: 'Location',
    });
  }
  if (totalEmployees) {
    infoItems.push({
      icon: WrappedUsers,
      text: numberWithCommas(totalEmployees) + ' Employees',
      tooltip: 'Number of employees',
    });
  }
  if (whitePaper) {
    infoItems.push({
      icon: WrappedFileDown,
      text: 'Whitepaper',
      link: whitePaper,
      tooltip: 'View Whitepaper',
    });
  }
  if (careerPage) {
    infoItems.push({
      icon: WrappedBriefcase,
      text: 'Careers',
      link: careerPage,
      tooltip: 'View Careers',
    });
  }
  if (roles && roles.length > 0) {
    infoItems.push({
      icon: WrappedUserCheck,
      text: roles,
    });
  }
  if (investmentsLength && investmentsLength > 0) {
    infoItems.push({
      icon: WrappedDollarSign,
      text:
        investmentsLength === 1
          ? investmentsLength + ' Investment'
          : investmentsLength + ' Investments',
      link: '#investments',
      target: '_self',
    });
  }

  // if (web3Address?.length) {
  //   infoItems.push({
  //     icon: IconContract,
  //     text: Array.isArray(web3Address)
  //       ? /* to not break previous version */
  //         // TODO add information about network later (web3Address[0].network and web3Address[0].address)
  //         web3Address
  //           ?.map((element: { address?: string } | string) =>
  //             typeof element === 'string' ? element : element?.address,
  //           )
  //           .join(' ')
  //       : web3Address,
  //     isPremium: !userProfile || MentibusContributorButtonEnabled,
  //   });
  // }

  if (linkedIn) {
    infoItems.push({
      icon: WrappedLinkedin,
      text: removeDomainName(linkedIn),
      link: linkedIn,
      tooltip: 'View on LinkedIn',
      isPremium: true,
    });
  }
  if (github) {
    infoItems.push({
      icon: WrappedGithub,
      text: removeDomainName(github),
      link: github,
      tooltip: 'View on Github',
      isPremium: true,
    });
  }
  if (telegram) {
    infoItems.push({
      icon: WrappedMessagesSquare,
      text: 'Telegram',
      link: telegram,
      tooltip: 'View on Telegram',
      isPremium: true,
    });
  }
  if (facebook) {
    infoItems.push({
      icon: WrappedFacebook,
      text: 'Facebook',
      tooltip: 'View on Facebook',
      link: facebook,
    });
  }

  if (twitter) {
    infoItems.push({
      icon: WrappedTwitter,
      text: getTwitterHandle(twitter),
      link: twitter,
      tooltip: 'View on X',
    });
  }
  if (instagram) {
    infoItems.push({
      icon: WrappedInstagram,
      text: 'Instagram',
      link: instagram,
      tooltip: 'View on Instagram',
    });
  }
  if (discord) {
    infoItems.push({
      icon: WrappedMessageCircle,
      text: 'Discord',
      link: discord,
      tooltip: 'View on Discord',
    });
  }
  if (glassdoor) {
    infoItems.push({
      icon: WrappedNewspaper,
      text: 'Glassdoor',
      link: glassdoor,
      tooltip: 'View on Glassdoor',
    });
  }

  if (attachments && attachments.length > 0) {
    attachments.forEach(item => {
      infoItems.push({
        icon: WrappedFileText,
        text: item.label,
        link: item.url,
      });
    });
  }

  const baseClasses = 'flex space-x-2 text-gray-300';

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [showInfo, setShowInfo] = useState<Record<string, boolean>>({});

  const onInfoClick = (info: string) => () => {
    if (isPaidUser) {
      setShowInfo({
        ...showInfo,
        [info]: true,
      });
      // TODO add action
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onCopy = async (item: string) => {
    navigator.clipboard.writeText(item);
    toast.custom(
      t => (
        <div
          className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
          &ldquo;{item}&rdquo; copied to clipboard
        </div>
      ),
      {
        duration: 3000,
        position: 'top-center',
      },
    );
  };

  return (
    <>
      <section className={`border border-gray-700 rounded-lg ${className}`}>
        {heading && (
          <h2 className="px-4 pt-2 text-lg font-medium text-white">
            {heading}
          </h2>
        )}

        <ul className="flex flex-col p-4 space-y-4 text-sm">
          {infoItems.map((item, index: number) => {
            let itemInner: ReactElement = (
              <>
                {item.icon && (
                  <item.icon
                    title={item.text}
                    className={`${
                      item.link?.length ? 'text-neutral-300' : ''
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
                  className={`${baseClasses} flex-1 transition-all text-neutral-300 hover:text-white underline hover:no-underline`}
                  href={item.link}
                  target={item.target ? item.target : '_blank'}
                  rel="noopener noreferrer"
                  title={item.text}>
                  {itemInner}
                </a>
              );
            }

            if (item.tooltip?.length) {
              itemInner = (
                <ElemTooltip
                  size="md"
                  mode="dark"
                  direction="top-start"
                  content={item.tooltip}>
                  <div className={baseClasses}>{itemInner}</div>
                </ElemTooltip>
              );
            }

            itemInner = (
              <li
                key={index}
                className={!item.link && !item.tooltip ? baseClasses : ''}>
                {itemInner}
              </li>
            );

            if (item.isPremium) {
              return (
                <li
                  key={index}
                  onClick={onInfoClick(item.text)}
                  className={`${baseClasses} `}>
                  <ElemTooltip
                    content={showInfo[item.text] ? item.tooltip : 'Show'}
                    direction="top"
                    mode="dark">
                    <div className="flex items-center justify-between flex-1 transition-all cursor-pointer">
                      <div className="flex items-center">
                        {item.icon && (
                          <item.icon
                            title={showInfo[item.text] ? item.text : ''}
                            className={`${
                              showInfo[item.text]
                                ? 'text-neutral-300'
                                : 'text-gray-400'
                            } h-5 w-5 mr-2 shrink-0`}
                          />
                        )}
                        {showInfo[item.text] && item.link ? (
                          <a
                            className="underline text-neutral-300 hover:text-white break-all transition-all hover:no-underline"
                            href={item.link}
                            target={item.target ? item.target : '_blank'}
                            rel="noopener noreferrer"
                            title={item.text}>
                            {item.text}
                          </a>
                        ) : showInfo[item.text] ? (
                          <span className="min-w-0 text-neutral-300 break-all">
                            {item.text}
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                          </span>
                        )}
                      </div>
                      {!showInfo[item.text] && (
                        <WrappedLock
                          className="w-4 h-4 text-gray-400 shrink-0"
                          strokeWidth={2}
                        />
                      )}
                    </div>
                  </ElemTooltip>
                </li>
              );
            } else {
              return itemInner;
            }
          })}

          {web3Address && web3Address.length > 0 && (
            <li
              className={`${baseClasses} flex-1 items-start justify-between cursor-pointer`}>
              <WrappedFileCode
                className={`${
                  showInfo['web3address'] ? 'text-neutral-300' : 'text-gray-400'
                } h-5 w-5 shrink-0`}
                title="Web3 Address"
              />
              <ul className="flex-1 space-y-4">
                {web3Address?.map((item, i: number) => [
                  <li key={i}>
                    <ElemTooltip
                      content={`${
                        showInfo['web3address'] ? 'Copy' : 'View'
                      } Web3 Address`}
                      direction="top"
                      mode="dark">
                      <button
                        className="flex items-start w-full"
                        onClick={
                          showInfo['web3address']
                            ? () => onCopy(item.address)
                            : onInfoClick('web3address')
                        }>
                        <div className="text-left break-all">
                          {showInfo['web3address'] ? (
                            <div className="inline">
                              {item.network && (
                                <div className="inline mr-1 font-medium text-neutral-300">
                                  {item.network}:
                                </div>
                              )}

                              {item.address && (
                                <div className="inline underline text-neutral-300 hover:text-white line-clamp-1 hover:no-underline">
                                  {item.address.slice(0, 7)}&#8230;
                                  {item.address?.slice(-7)}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                            </span>
                          )}
                        </div>

                        <div className="ml-auto">
                          {!showInfo['web3address'] ? (
                            <WrappedLock
                              className="w-4 h-4 text-gray-400 shrink-0"
                              strokeWidth={2}
                            />
                          ) : (
                            <WrappedCopy className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </div>
                      </button>
                    </ElemTooltip>
                  </li>,
                ])}
              </ul>
            </li>
          )}

          {emails.map((email, i: number) => [
            <li
              key={i}
              className={`${baseClasses} flex-1 items-center justify-between cursor-pointer`}>
              <ElemTooltip
                content={`${showInfo['email'] ? 'Copy' : 'View'} email`}
                direction="top"
                mode="dark">
                <button
                  className="flex items-center w-full"
                  onClick={
                    showInfo['email']
                      ? () => onCopy(email)
                      : onInfoClick('email')
                  }>
                  <WrappedMail
                    className={`${
                      showInfo['email'] ? 'text-neutral-300' : 'text-gray-400'
                    } h-5 w-5 mr-2 shrink-0`}
                  />
                  <div className="break-all">
                    {showInfo['email'] ? (
                      <span
                        // href={`mailto:${email}`}
                        className="underline text-neutral-300 hover:text-white break-all transition-all hover:no-underline">
                        {email}
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
                      </span>
                    )}
                  </div>

                  <div className="ml-auto">
                    {!showInfo['email'] ? (
                      <WrappedLock
                        className="w-4 h-4 text-gray-400 shrink-0"
                        strokeWidth={2}
                      />
                    ) : (
                      <WrappedCopy className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </div>
                </button>
              </ElemTooltip>
            </li>,
          ])}
        </ul>
        <ElemUpgradeDialog
          isOpen={isOpenUpgradeDialog}
          onClose={onCloseUpgradeDialog}
        />
      </section>
      <Toaster />
    </>
  );
};
