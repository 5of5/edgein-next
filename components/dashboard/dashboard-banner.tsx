import { FC, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { ElemButton } from '../elem-button';
import { useUser } from '@/context/user-context';
import { IconCurrencyDollar, IconGift, IconX } from '../icons';
import { numberWithCommas } from '@/utils';
import useLocalStorageState from '@/hooks/use-local-storage-state';
import { LOCAL_STORAGE_SIDEBAR_BANNER_KEY } from '@/utils/constants';
import { INVITE_A_FRIEND, SIGN_IN } from '@/routes';

type Props = {
  className?: string;
};

export const DashboardBanner: FC<Props> = ({ className = '' }) => {
  const { user } = useUser();

  const { value: showBanner, onChange: onChangeShowBanner } =
    useLocalStorageState(LOCAL_STORAGE_SIDEBAR_BANNER_KEY);

  const [isHidden, setIsHidden] = useState(true);

  const isVisitor = !user;

  const isFreeUser = user && !user?.entitlements.viewEmails;

  const isPaidUser = user?.entitlements.viewEmails;

  const userHasCredits = user?.credits && user?.credits > 0;

  useEffect(() => {
    setTimeout(() => {
      setIsHidden(false);
    }, 2000);
  }, []);

  const onHideBanner = () => {
    onChangeShowBanner('false');
  };

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
        className="relative"
      >
        {!isVisitor && (
          <div className="absolute z-10 top-3 right-3">
            <button
              onClick={onHideBanner}
              type="button"
              className="text-gray-400 hover:text-gray-900"
            >
              <span className="sr-only">Close</span>
              <IconX className="h-4 w-4" title="close" />
            </button>
          </div>
        )}

        <Link href={user ? INVITE_A_FRIEND : SIGN_IN} passHref>
          <a
            className={`flex p-3 border border-primary-500 bg-white rounded-xl ${
              isVisitor ? '' : 'gap-2'
            }`}
          >
            {!isVisitor && (
              <div className="pt-0.5">
                {isPaidUser && userHasCredits ? (
                  <IconCurrencyDollar className="w-5 h-5 text-primary-500" />
                ) : isPaidUser ? (
                  <IconGift className="w-5 h-5 text-primary-500" />
                ) : isFreeUser ? (
                  <IconCurrencyDollar className="w-5 h-5 text-primary-500" />
                ) : null}
              </div>
            )}

            <div>
              <h3 className="font-medium text-gray-900">
                {isPaidUser && userHasCredits
                  ? `${numberWithCommas(user?.credits)} credits available`
                  : isPaidUser
                  ? 'Get EdgeIn for Free'
                  : isFreeUser
                  ? 'Get 1,500 credits'
                  : // Visitor
                    'Get more from EdgeIn'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {isPaidUser && userHasCredits
                  ? `You can use your credits to get ${
                      user?.credits / 1500
                    } months of EdgeIn Contributor.`
                  : isPaidUser
                  ? 'Invite a friend and get 1,500 credits for 1 month of EdgeIn Contributor for free.'
                  : isFreeUser
                  ? 'Share EdgeIn with your friend for 1 month of EdgeIn Contributor for free.'
                  : // Visitor
                    'Get unlimited browsing, personalized results, custom tools, and much more.'}
              </p>

              {isVisitor && (
                <ElemButton btn="purple" className="mt-2 whitespace-nowrap">
                  Sign in for free
                </ElemButton>
              )}
            </div>
          </a>
        </Link>
      </Transition>
    </div>
  );
};
