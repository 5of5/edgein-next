import React, { FC } from 'react';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import UserService from '@/utils/users';
import { ROUTES } from '@/routes';
import { IconUserCircleSolid, IconBars3 } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemDropdown } from '@/components/elem-dropdown';

type Props = {
  className?: string;
};

export const UserMenu: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();
  const router = useRouter();

  const quickLinks = [
    ...(user
      ? [
          {
            id: 10,
            label: 'My lists',
            value: 'lists',
            onClick: () => router.push(ROUTES.LISTS + '?tab=my-lists'),
          },
          {
            id: 11,
            label: 'My groups',
            value: 'groups',
            onClick: () => router.push(ROUTES.GROUPS + '?tab=my-groups'),
          },
          {
            id: 12,
            label: 'My notes',
            value: 'notes',
            onClick: () => router.push(ROUTES.NOTES),
            divider: true,
          },
          {
            id: 13,
            label: 'Referrals and points',
            value: 'invite',
            onClick: () => router.push(ROUTES.REFERRALS_AND_POINTS),
            className: 'text-primary-500',
          },
          {
            id: 14,
            label: 'Profile settings',
            value: 'profileSettings',
            onClick: () => router.push(ROUTES.PROFILE),
          },
          {
            id: 15,
            label: 'Account settings',
            value: 'accountSettings',
            onClick: () => router.push(ROUTES.ACCOUNT),
            divider: true,
          },
        ]
      : [
          {
            id: 10,
            label: 'Sign in free',
            value: 'signup',
            onClick: () => router.push(ROUTES.SIGN_IN),
            className: 'text-primary-500',
            divider: true,
          },
        ]),
    {
      id: 0,
      label: 'Pricing',
      value: 'pricing',
      onClick: () => router.push(ROUTES.PRICING),
    },
    {
      id: 1,
      label: 'FAQs',
      value: 'faqs',
      onClick: () => router.push(ROUTES.FAQ),
    },
    {
      id: 2,
      label: 'Support',
      value: 'support',
      onClick: () => router.push(ROUTES.SUPPORT),
    },
    {
      id: 3,
      label: 'Blog',
      value: 'blog',
      onClick: () => window.open('https://medium.com/@edgeinio', '_blank'),
    },
    {
      id: 4,
      label: 'Contact',
      value: 'contact',
      onClick: () => router.push(ROUTES.CONTACT),
      ...(user && { divider: true }),
    },
    // {
    //   id:5,
    //   label: 'Press',
    //   value: 'press',
    //   onClick: () => (window.location.href = 'mailto:press@edgein.io'),
    //   ...(user && { divider: true }),
    // },
    ...(user
      ? [
          {
            id: 16,
            label: 'Sign out',
            value: 'signOut',
            onClick: UserService.logout,
          },
        ]
      : []),
  ];

  return (
    <ElemDropdown
      customButton={
        user?.person?.picture ? (
          <ElemButton
            btn="default"
            className="flex items-center justify-center space-x-2 !px-1 !py-0.5">
            <IconBars3 className="w-5 h-5 ml-1" />
            <ElemPhoto
              photo={user?.person?.picture}
              wrapClass="flex items-center justify-center w-8 h-8 bg-dark-100 rounded-full shrink-0"
              imgClass="object-cover max-w-full max-h-full rounded-full"
              imgAlt={`Signed in as ${user.display_name} | ${user.email}`}
              placeholder="user"
              placeholderClass="text-slate-400 hover:text-slate-400"
            />
          </ElemButton>
        ) : (
          <ElemButton
            btn="default"
            className="flex items-center justify-center space-x-2 !px-1 !py-0">
            <IconBars3 className="w-5 h-5 ml-1" />
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0">
              <IconUserCircleSolid
                className="object-cover w-full h-full text-gray-500 rounded-full"
                title={
                  user?.display_name
                    ? `Signed in as ${user.display_name} | ${user.email}`
                    : ' '
                }
              />
            </div>
          </ElemButton>
        )
      }
      defaultItem={null}
      items={quickLinks}
      itemsShowIcons={false}
      className={className}
    />
  );
};
