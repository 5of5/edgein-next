import {
  FC,
  MutableRefObject,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import { IconEllipsisVertical } from '@/components/icons';
// import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '@/components/elem-button';
import { ElemSticky } from '@/components/elem-sticky';
import { ElemDropdown } from './elem-dropdown';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

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
  resourceUrl?: string | null;
};

const SECTION_OFFSET_TOP_SPACING = 60;

export const ElemTabBar: FC<PropsWithChildren<Props>> = ({
  className = '',
  tabsClassName,
  tabs,
  showDropdown = true,
  resourceName = '',
  resourceUrl = '',
  children,
}) => {
  const router = useRouter();
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

  // const { showNewMessages } = useIntercom();
  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = (message: String) => {
    console.log(message);
    setShow(true);
  };

  const resource = resourceUrl
    ? `${resourceName}: ${resourceUrl}`
    : `${resourceName}`;

  const dropdownItems = [
    {
      id: 0,
      label: 'Request more data',
      value: 'requestMoreData',
      onClick: () =>
        showNewMessages(
          `Hi Mentibus, I'd like to request some more data on ${resource}`,
        ),
    },
    {
      id: 1,
      label: 'Report an error',
      value: 'reportAnError',
      onClick: () =>
        showNewMessages(
          `Hi Mentibus, I'd like to report an error on ${resource}`,
        ),
    },
  ];

  return (
    <div
      className={`sticky top-[78px] bg-black z-[39] shadow-md border-b border-neutral-700 w-full ${className}`}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
      {show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}
      <div className="max-w-screen-2xl w-full mx-auto px-2 py-2">
        <div className="flex gap-y-2 items-center">
          <nav
            className={`flex flex-nowrap overflow-x-scroll scrollbar-hide gap-2 mr-auto lg:flex-wrap ${tabsClassName}`}>
            {tabs &&
              tabs.map((tab: Tabs, index: number) => (
                <ElemButton
                  key={index}
                  onClick={() => onClickTab(index, tab.ref)}
                  btn="gray"
                  roundedFull={false}
                  className={`rounded-lg shrink-0 ${
                    isActiveTab === index
                      ? 'border-primary-500 hover:border-primary-400'
                      : ''
                  }`}>
                  {tab.name}
                </ElemButton>
              ))}
          </nav>
          {children}
          <ElemButton
            btn="gray"
            className="rounded-lg shrink-0 border-primary-500 hover:border-primary-400"
            onClick={() => {
              const companyId = router.query.companyId;
              const isCompaniesRoute =
                router.pathname.startsWith('/companies/');
              if (companyId && isCompaniesRoute) {
                router.push(`${ROUTES.ORGANIZATIONS}/companies/${companyId}`);
              }
            }}>
            {router.pathname.startsWith('/companies/')
              ? 'Edit Data'
              : 'Request Data'}
          </ElemButton>
          {/* {showDropdown && (
            <ElemDropdown
              customButton={
                <ElemButton btn="gray" className="w-8 h-8 !p-0">
                  <IconEllipsisVertical
                    className="w-6 h-6 text-gray-600"
                    title="Options"
                  />
                </ElemButton>
              }
              items={dropdownItems}
              itemsShowIcons={false}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};
