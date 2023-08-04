import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { IconPlusSmall, IconChevronDownMini } from '@/components/icons';
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

  const getActiveClass = (path: string) => {
    return path === router.asPath ? 'text-primary-500 bg-slate-200' : '';
  };

  return (
    <div className={className}>
      <Disclosure defaultOpen={isDefaultOpen}>
        {({ open }) => (
          <>
            <div className="w-full flex items-center justify-between">
              <Disclosure.Button
                className="flex items-center grow space-x-2 py-1.5 px-2 focus:outline-none"
                data-expanded={open}
                ref={btnRef}
                onClick={onDisclosureButtonClick}
              >
                {user && (
                  <IconChevronDownMini
                    className={`${
                      open ? 'rotate-0' : '-rotate-90 '
                    } w-6 h-6 transform transition-all`}
                  />
                )}
                <span className="font-medium text-sm">Notes</span>
              </Disclosure.Button>

              {/* <button
                onClick={() => {}}
                className="flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <IconPlusSmall className="h-6 w-6" title="Create List" />
              </button> */}
            </div>

            {user && (
              <Disclosure.Panel as="ul" className="ml-8 space-y-1">
                <li role="button">
                  <Link href="/notes/">
                    <a
                      className={`${
                        router.asPath.includes('/notes')
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600'
                      } flex items-center space-x-2 py-1.5 px-2 font-medium text-sm rounded-md flex-1 transition-all hover:bg-gray-100`}
                      title="notes"
                    >
                      <span className="line-clamp-1 break-all flex-1">
                        Notes
                      </span>
                      {/* <div className="bg-slate-200 inline-block rounded-full font-medium py-0.5 px-2 text-xs">
											{notes.total_no_of_resources} 
										</div>*/}
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
