import React, {
  FC,
  MutableRefObject,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { IconEllipsisVertical } from '@/components/icons';
import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '@/components/elem-button';
import { ElemSticky } from '@/components/elem-sticky';
import { ElemDropdown } from './elem-dropdown';

type Tabs = {
  name?: string;
  ref: MutableRefObject<HTMLDivElement>;
};

type Props = {
  className?: string;
  tabsClassName?: string;
  tabs?: Array<Tabs>;
  showDropdown?: boolean;
  resourceName?: string | null;
};

const SECTION_OFFSET_TOP_SPACING = 60;

export const ElemTabBar: FC<PropsWithChildren<Props>> = ({
  className = '',
  tabsClassName,
  tabs,
  showDropdown = true,
  resourceName = '',
  children,
}) => {
  const [isActiveTab, setActiveTab] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const onClickTab = (index: number, ref: MutableRefObject<HTMLDivElement>) => {
    setActiveTab(index);
    window.scrollTo(0, ref.current.offsetTop - SECTION_OFFSET_TOP_SPACING);
  };

  useEffect(() => {
    if (tabs) {
      const handleScroll = () => {
        setScrollPosition(window ? window.scrollY : 0);

        tabs.forEach((tab, tabIndex) => {
          if (
            tab.ref &&
            tab.ref.current &&
            scrollPosition >=
              tab.ref.current.offsetTop - SECTION_OFFSET_TOP_SPACING
          ) {
            setActiveTab(tabIndex);
          }
        });
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [tabs, scrollPosition]);

  const { showNewMessages } = useIntercom();

  const dropdownItems = [
    {
      id: 0,
      label: 'Request more data',
      value: 'requestMoreData',
      onClick: () =>
        showNewMessages(
          `Hi EdgeIn, I'd like to request some more data on ${resourceName}`,
        ),
    },
    {
      id: 1,
      label: 'Report an error',
      value: 'reportAnError',
      onClick: () =>
        showNewMessages(
          `Hi EdgeIn, I'd like to report an error on ${resourceName}`,
        ),
    },
  ];

  return (
    <ElemSticky
      className={`flex justify-between items-center ${className}`}
      activeClass="top-14 bg-white shadow-sm"
    >
      <nav
        className={`flex flex-nowrap overflow-x-scroll scrollbar-hide gap-2 lg:flex-wrap ${tabsClassName}`}
      >
        {tabs &&
          tabs.map((tab: Tabs, index: number) => (
            <ElemButton
              key={index}
              onClick={() => onClickTab(index, tab.ref)}
              btn="gray"
              roundedFull={false}
              className={`rounded-lg shrink-0 ${
                isActiveTab === index
                  ? 'border-primary-500 hover:border-primary-500'
                  : ''
              }`}
            >
              {tab.name}
            </ElemButton>
          ))}
      </nav>
      {children}
      {showDropdown && (
        <ElemDropdown
          customButton={
            <ElemButton className="w-8 h-8 !p-0 hover:bg-gray-100">
              <IconEllipsisVertical
                className="w-6 h-6 text-gray-600"
                title="Options"
              />
            </ElemButton>
          }
          items={dropdownItems}
          itemsShowIcons={false}
        />
      )}
    </ElemSticky>
  );
};
