import { FC } from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import {
  IconPolygonDown,
  IconCash,
  IconCompanies,
  IconCalendarDays,
} from '@/components/icons';
import useDisclosureState from '@/hooks/use-disclosure-state';
import { EXPLORE_MENU_OPEN_KEY } from '@/utils/constants';

type Props = {
  className?: string;
};

const ElemExploreMenu: FC<Props> = ({ className = '' }) => {
  const { btnRef, isDefaultOpen, onDisclosureButtonClick } = useDisclosureState(
    EXPLORE_MENU_OPEN_KEY,
  );

  return (
    <Disclosure defaultOpen={isDefaultOpen} as="div" className={className}>
      {({ open }) => (
        <>
          <div className="w-full flex items-center justify-between">
            <Disclosure.Button
              className="flex focus:outline-none hover:opacity-75"
              data-expanded={open}
              ref={btnRef}
              onClick={onDisclosureButtonClick}
            >
              <IconPolygonDown
                className={`${
                  open ? 'rotate-0' : '-rotate-90 '
                } h-6 w-6 transform transition-all`}
              />
              <span className="text-lg font-bold">Explore</span>
            </Disclosure.Button>
          </div>

          <Disclosure.Panel as="ul" className="mt-1 space-y-1 text-slate-600">
            <li role="button">
              <Link href={`/companies`}>
                <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
                  <IconCompanies className="w-6 h-6" />
                  <span>Companies</span>
                </a>
              </Link>
            </li>
            <li role="button">
              <Link href={`/investors`}>
                <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
                  <IconCash className="w-6 h-6" />
                  <span>Investors</span>
                </a>
              </Link>
            </li>
            <li role="button">
              <Link href={`/events`}>
                <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 hover:text-primary-500">
                  <IconCalendarDays className="w-6 h-6" />
                  <span>Events</span>
                </a>
              </Link>
            </li>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default ElemExploreMenu;
