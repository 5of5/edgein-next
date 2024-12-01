import { FC, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { ElemButton } from '../elem-button';
import { useUser } from '@/context/user-context';
import { IconCurrencyDollar, IconGift, IconX, IconProps } from '../icons';
import { numberWithCommas } from '@/utils';
import useLocalStorageState from '@/hooks/use-local-storage-state';
import { LOCAL_STORAGE_SIDEBAR_BANNER_KEY } from '@/utils/constants';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { REFERRAL_CREDITS_AMOUNT } from '@/utils/userTransactions';

type Props = {
  className?: string;
};

type DashboardBanner = {
  title: string;
  content?: string;
  icon?: FC<IconProps>;
};

export const DashboardBanner: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const { value: showBanner, onChange: onChangeShowBanner } =
    useLocalStorageState(LOCAL_STORAGE_SIDEBAR_BANNER_KEY);

  const [isHidden, setIsHidden] = useState(true);

  const isFreeUser = user && !user?.entitlements.viewEmails;

  const isPaidUser = user?.entitlements.viewEmails;

  const userHasCredits = user && user.credits > 0;

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 2000);
  }, []);

  const onHideBanner = () => {
    onChangeShowBanner('false');
  };
  let banner: DashboardBanner = {
    title: '',
  };

  if (isPaidUser && userHasCredits) {
    banner = {
      title: `${numberWithCommas(user.credits)} points available`,
      content: `You can use your points to get ${numberWithCommas(
        Math.floor(user.credits / REFERRAL_CREDITS_AMOUNT),
      )} months of EdgeIn Contributor.`,
      icon: IconCurrencyDollar,
    };
  } else if (isPaidUser) {
    banner = {
      title: 'Get EdgeIn for Free',
      content: `Invite a friend and get ${numberWithCommas(
        REFERRAL_CREDITS_AMOUNT,
      )} points for 1 month of EdgeIn Contributor for free.`,
      icon: IconGift,
    };
  } else if (isFreeUser) {
    banner = {
      title: `Get ${numberWithCommas(REFERRAL_CREDITS_AMOUNT)} points`,
      content:
        'Share EdgeIn with your friend for 1 month of EdgeIn Contributor for free.',
      icon: IconCurrencyDollar,
    };
  } else {
    // Visitor
    banner = {
      title: 'Get more from EdgeIn',
      content:
        'Get unlimited browsing, personalized results, custom tools, and much more.',
    };
  }

  return (
    <div className={`${className}`}>
      <Transition
        show={!isHidden && showBanner !== 'false'}
        as="div"
        enter="transform ease-out duration-300"
        enterFrom="translate-y-10 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="relative">
        {user && (
          <div className="absolute z-10 top-2 right-2">
            <button
              onClick={onHideBanner}
              type="button"
              className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Close</span>
              <IconX className="w-4 h-4" title="close" />
            </button>
          </div>
        )}

        <ElemLink
          href={user ? ROUTES.REFERRALS_AND_POINTS : ROUTES.SIGN_IN}
          className="block p-4 bg-dark-100 border rounded-lg shadow-lg border-primary-500">
          <div className="flex items-center">
            {banner.icon && (
              <div className="pr-1">
                <banner.icon className="w-5 h-5 text-primary-500" />
              </div>
            )}

            <h3 className="font-medium text-gray-300">{banner.title}</h3>
          </div>

          <p className="mt-1 text-sm text-gray-500">{banner.content}</p>

          {!user && (
            <ElemButton btn="primary" className="mt-2 whitespace-nowrap">
              Sign in for free
            </ElemButton>
          )}
        </ElemLink>
      </Transition>
    </div>
  );
};
