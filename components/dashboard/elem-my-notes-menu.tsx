import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { IconChevronDownMini } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { Disclosure } from '@headlessui/react';
import useDisclosureState from '@/hooks/use-disclosure-state';
import { MY_NOTES_MENU_OPEN_KEY } from '@/utils/constants';

type Props = {
  className?: string;
};

const ElemMyNotesMenu: FC<Props> = ({ className = '' }) => {
  const router = useRouter();
  const { user } = useUser();

  const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
    MY_NOTES_MENU_OPEN_KEY,
  );

  const onRedirectToSignIn = () => {
    router.push('/sign-in');
  };

  const onClickHeader = () => {
    if (!user) {
      return onRedirectToSignIn();
    }

    return onDisclosureButtonClick;
  };

  return (
    <div className={className}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center grow space-x-2 p-2">
                <Disclosure.Button
                  className="focus:outline-none"
                  data-expanded={open}
                  ref={btnRef}
                  onClick={onClickHeader}
                >
                  {user && (
                    <IconChevronDownMini
                      className={`rounded-md hover:bg-gray-100 ${
                        open ? 'rotate-0' : '-rotate-90 '
                      } w-5 h-5 transform transition-all`}
                    />
                  )}
                </Disclosure.Button>
                {user ? (
                  <Link href="/notes">
                    <a className="font-medium text-sm">Notes</a>
                  </Link>
                ) : (
                  <p className="font-medium text-sm">Notes</p>
                )}
              </div>
              {/* ) : (
                <button
                  onClick={() => {
                    onRedirectToSignIn();
                  }}
                  className="flex items-center grow space-x-2 py-1.5 px-2 focus:outline-none">
                  <span className="font-medium text-sm">Notes</span>
                </button>
              )} */}

              {/* <button
                onClick={() => {}}
                className="flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <IconPlusSmall className="h-6 w-6" title="Create List" />
              </button> */}
            </div>

            {user && (
              <Disclosure.Panel as="ul" className="ml-2">
                <li role="button">
                  <Link href="/notes">
                    <a
                      className="flex items-center space-x-2 py-2 pl-7 pr-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100 hover:text-gray-900"
                      title="notes"
                    >
                      <span className="line-clamp-1 break-all">Notes</span>
                    </a>
                  </Link>
                </li>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default ElemMyNotesMenu;
