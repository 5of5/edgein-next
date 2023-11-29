import React, {
  MutableRefObject,
  useState,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { IconEllipsisVertical } from '@/components/icons';
import { Popover, Transition } from '@headlessui/react';
import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '@/components/elem-button';

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

export const ElemTabBar: React.FC<PropsWithChildren<Props>> = ({
  className,
  tabsClassName,
  tabs,
  showDropdown = true,
  resourceName = '',
  children,
}) => {
  const tabsWrapRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [tabsWrapClass, setTabsWrapClass] = useState<string>('');

  const [isActive, setActive] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (tabsWrapRef.current !== null) {
      setTimeout(() => {
        const tabsDivPosition = tabsWrapRef.current.getBoundingClientRect().top;
        // "top-14" class = 56
        if (tabsDivPosition <= 56) {
          setTabsWrapClass('top-14 bg-white/80 shadow-sm backdrop-blur z-40');
        } else {
          setTabsWrapClass('');
        }
      }, 300);
    }

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
            setActive(tabIndex);
          }
        });
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [tabs, scrollPosition, tabsWrapRef]);

  const onClick = (index: number, ref: any) => {
    setActive(index);
    window.scrollTo(0, ref.current.offsetTop - 50);
  };

  const { showNewMessages } = useIntercom();

  return (
    <div
      className={`sticky flex gap-3 justify-between lg:items-center ${className} ${tabsWrapClass}`}
      role="tablist"
      ref={tabsWrapRef}
    >
      <nav
        className={`flex flex-wrap gap-2 overflow-x-scroll scrollbar-hide ${tabsClassName}`}
      >
        {tabs &&
          tabs.map((tab: any, index: number) => (
            <ElemButton
              key={index}
              onClick={() => onClick(index, tab.ref)}
              btn="gray"
              roundedFull={false}
              className={`rounded-lg ${
                isActive === index
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
        <Popover className="relative z-10 transition-all">
          <Popover.Button className="flex items-center focus:outline-none">
            <IconEllipsisVertical
              className="h-6 w-6 text-gray-600"
              title="Options"
            />
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-10 mt-2 right-0 w-56 block bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
              {({ close }) => (
                <>
                  <button
                    onClick={() => {
                      showNewMessages(
                        `Hi EdgeIn, I'd like to request some more data on ${resourceName}`,
                      );
                      close();
                    }}
                    className="flex items-center gap-x-2 cursor-pointer w-full text-sm px-4 py-2 transition-all hover:bg-gray-100"
                  >
                    <span>Request more data</span>
                  </button>
                  <button
                    onClick={() => {
                      showNewMessages(
                        `Hi EdgeIn, I'd like to report an error on ${resourceName}`,
                      );
                      close();
                    }}
                    className="flex items-center gap-x-2 cursor-pointer w-full text-sm px-4 py-2 transition-all hover:bg-gray-100"
                  >
                    <span>Report an error</span>
                  </button>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      )}
    </div>
  );
};
