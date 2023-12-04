import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { IconX } from '@/components/icons';
import { GetEventQuery } from '@/graphql/types';
import { ElemLink } from '../elem-link';
import { ROUTES } from '@/routes';
import { ElemPhoto } from '../elem-photo';

type Props = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  attendees: GetEventQuery['events'][0]['event_person'];
};

export const ElemGoingDialog: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  attendees,
}) => {
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg px-4 py-3 bg-white shadow-xl transition-all overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
                <div className="relative pb-3 mb-3 border-b border-gray-200">
                  <Dialog.Title className="text-xl font-medium flex items-center justify-between">
                    <span>{title}</span>
                    <button
                      type="button"
                      onClick={onClose}
                      className="absolute top-1 right-0 focus-visible:outline-none"
                    >
                      <IconX className="w-5 h-5" />
                    </button>
                  </Dialog.Title>
                </div>
                <div className="">
                  {attendees.map(attendee => {
                    if (attendee.person === null) {
                      return;
                    } else {
                      return (
                        <ElemLink
                          key={attendee.id}
                          href={`${ROUTES.PEOPLE}/${attendee.person?.slug}`}
                          className="block cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-100"
                        >
                          <div
                            className="flex items-center justify-start gap-x-2"
                            key={attendee.id}
                          >
                            {attendee.person?.picture ? (
                              <ElemPhoto
                                wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-white rounded-lg"
                                imgClass="object-fit max-w-full max-h-full"
                                photo={attendee.person?.picture}
                                placeholder="user2"
                                placeholderClass="text-slate-300"
                                imgAlt={attendee.person?.name}
                              />
                            ) : (
                              <div className="flex items-center justify-center aspect-square w-10 rounded-lg bg-slate-200 text-dark-500 text-xl capitalize">
                                {attendee.person?.name?.charAt(0)}
                              </div>
                            )}

                            <div className="leading-none">
                              <div className="font-medium capitalize">
                                {attendee.person?.name}
                              </div>

                              <div className="inline text-sm text-gray-500">
                                {attendee.person?.team_members.length > 0 && (
                                  <>
                                    {attendee.person.team_members[0].title} at{' '}
                                    {
                                      attendee.person.team_members[0].company
                                        ?.name
                                    }
                                  </>
                                )}

                                {attendee.person?.team_members.length > 0 &&
                                  attendee.person?.investors.length > 0 && (
                                    <>, </>
                                  )}

                                {attendee.person?.investors.length > 0 && (
                                  <>
                                    {attendee.person.investors[0].title} at{' '}
                                    {attendee.person.investors[0].vc_firm?.name}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </ElemLink>
                      );
                    }
                  })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
