import React, { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import kebabCase from "lodash/kebabCase";
import { CalendarEvent, CalendarType } from "@/models/calendar";
import { generateLink } from "@/utils/calendar";
import {
  IconApple,
  IconCalendarDays,
  IconGoogle,
  IconIcalFile,
  IconOutlook,
} from "./icons";
import { ElemButton } from "./elem-button";

type Props = {
  event: CalendarEvent;
};

const options: CalendarType[] = ["Apple", "Google", "Outlook", "iCal File"];

const ElemAddToCalendarButton: FC<Props> = ({ event }) => {
  const handleClick = (item: CalendarType) => {
    const url = generateLink(event, item);

    if (url.startsWith("BEGIN")) {
      const filename = `schedule_event_${kebabCase(event.name)}`;

      let blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(url, "_blank");
    }
  };

  const renderIcon = (type: CalendarType) => {
    switch (type) {
      case "Apple":
        return <IconApple className="w-5 h-5 -translate-y-[2px]" />;

      case "Google":
        return <IconGoogle className="w-4 h-4" />;

      case "Outlook":
        return <IconOutlook className="w-5 h-5" />;

      case "iCal File":
        return <IconIcalFile className="w-4 h-4" />;

      default:
        return null;
    }
  };

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button as="div">
            <ElemButton btn="slate" className="flex items-center gap-2">
              <IconCalendarDays className="w-5 h-5" />
              Add to Calendar
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
            className="z-10 absolute overflow-hidden left-0 lg:left-auto lg:right-0 mt-1 w-full origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            {options.map((item) => (
              <Menu.Item key={item}>
                {({ active }) => (
                  <button
                    onClick={() => handleClick(item)}
                    className={`${
                      active ? "bg-gray-50 text-primary-500" : ""
                    } flex w-full items-center gap-x-2 px-4 py-2 text-sm font-medium hover:bg-gray-50 hover:text-primary-500`}
                  >
                    {renderIcon(item)}
                    {item}
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
