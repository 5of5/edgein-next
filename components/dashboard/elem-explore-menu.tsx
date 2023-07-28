import { FC } from 'react';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import {
  IconPolygonDown,
  IconCash,
  IconCompanies,
  IconCalendarDays,
  IconNewspaper,
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
    <ul className="mt-1 space-y-2 text-slate-600">
      <li role="button">
        <Link href={`/companies`}>
          <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200 ">
            <IconCompanies className="w-6 h-6" />
            <span>Companies</span>
          </a>
        </Link>
      </li>
      <li role="button">
        <Link href={`/investors`}>
          <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200">
            <IconCash className="w-6 h-6" />
            <span>Investors</span>
          </a>
        </Link>
      </li>
      <li role="button">
        <Link href={`/events`}>
          <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200">
            <IconCalendarDays className="w-6 h-6" />
            <span>Events</span>
          </a>
        </Link>
      </li>
      <li role="button">
        <Link href={`/news`}>
          <a className="flex items-center space-x-2 py-1 px-2 rounded-md flex-1 transition-all hover:bg-slate-200">
            <IconNewspaper className="w-6 h-6" />
            <span>News</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default ElemExploreMenu;
