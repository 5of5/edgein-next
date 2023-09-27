import { FC } from 'react';
import Link from 'next/link';
import { ElemButton } from '../elem-button';
import { useUser } from '@/context/user-context';

type Props = {
  className?: string;
};

export const DashboardBanner: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const isPaidUser = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  return (
    <div className={`${className}`}>
      <div className="p-4 border border-gray-300 bg-white rounded-xl shadow">
        <h3 className="font-medium text-gray-900">
          {user ? 'Invite a Friend' : 'Get more from EdgeIn'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {user
            ? 'Get 1 month free for every person you invite'
            : 'Sign in with a few clicks and get unlimited browsing, custom notes, lists, groups, and much more.'}
        </p>

        <Link href={user ? '/invite-a-friend' : '/sign-in'} passHref>
          <a className="block mt-2 w-auto">
            <ElemButton btn="purple" className="whitespace-nowrap">
              {user ? 'Invite a friend' : 'Sign in'}
            </ElemButton>
          </a>
        </Link>
      </div>
    </div>
  );
};
