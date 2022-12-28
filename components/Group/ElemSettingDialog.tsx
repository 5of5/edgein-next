import { Fragment } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { IconGroup, IconX } from "@/components/Icons";
import { User_Groups } from "@/graphql/types";
import ElemSettingTab from "./ElemSettingTab";
import ElemMemberTab from "./ElemMemberTab";

type Props = {
  isOpen: boolean;
  group: User_Groups;
  onClose: () => void;
};

const ElemSettingDialog: React.FC<Props> = ({ isOpen, group, onClose }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-xl font-bold flex items-center justify-between p-6">
                  <div className="flex items-center justify-between gap-x-1">
                    <IconGroup className="w-6 h-6" />
                    <span>{group.name}</span>
                  </div>
                  <button type="button" onClick={onClose}>
                    <IconX className="w-5 h-5" />
                  </button>
                </Dialog.Title>

                <Tab.Group>
                  <Tab.List className="whitespace-nowrap flex gap-x-4 px-6 font-semibold transition-all">
                    <Tab
                      className={({ selected }) =>
                        selected
                          ? "text-primary-500 border-b-2 border-primary-500"
                          : ""
                      }
                    >
                      Settings
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        selected
                          ? "text-primary-500 border-b-2 border-primary-500"
                          : ""
                      }
                    >
                      Members
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <div className="bg-gray-50 p-6">
                      <Tab.Panel>
                        <ElemSettingTab group={group} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <ElemMemberTab members={group.user_group_members} />
                      </Tab.Panel>
                    </div>
                  </Tab.Panels>
                </Tab.Group>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ElemSettingDialog;
