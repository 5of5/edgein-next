import React, { FC, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import kebabCase from 'lodash/kebabCase';
import { CalendarEvent, CalendarType } from '@/models/calendar';
import { generateLink } from '@/utils/calendar';
import {
  IconCalendarAdd,
  IconAppleCalendar,
  IconGoogleCalendar,
  IconMicrosoftOutlook,
  IconCalendar,
} from './icons';
import { ElemButton } from './elem-button';

type Props = {
  className?: string;
  event: CalendarEvent;
};

const options: CalendarType[] = [
  { type: 'Apple', icon: IconAppleCalendar },
  { type: 'Google', icon: IconGoogleCalendar },
  { type: 'Outlook', icon: IconMicrosoftOutlook },
  { type: 'iCal File', icon: IconCalendar },
];

const ElemAddToCalendarButton: FC<Props> = ({ className, event }) => {
  const handleClick = (item: CalendarType) => {
    const url = generateLink(event, item);

    if (url.startsWith('BEGIN')) {
      const filename = `schedule_event_${kebabCase(event.name)}`;

      const blob = new Blob([url], { type: 'text/calendar;charset=utf-8' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <div>
      <Menu
        as="div"
        className={`relative inline-block text-left ${
          className ? className : ''
        }`}
      >
        <div>
          <Menu.Button as="div">
            <ElemButton btn="default" className="flex items-center w-full">
              <div className="whitespace-nowrap">Add to Calendar</div>
            </ElemButton>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            as="nav"
            className="z-10 absolute overflow-hidden left-0 mt-1 w-full origin-top-left divide-y divide-slate-100 rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            {options.map(item => (
              <Menu.Item key={item.type}>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(item)}
                    className="flex w-full items-center px-4 py-2 hover:bg-gray-50 group"
                  >
                    {item.icon && (
                      <item.icon
                        className="mr-2 h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`${
                        active ? 'bg-gray-50 text-primary-500' : ''
                      } group-hover:text-primary-500`}
                    >
                      {item.type}
                    </span>
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ElemAddToCalendarButton;
