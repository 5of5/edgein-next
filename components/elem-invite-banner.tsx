import { Fragment, PropsWithChildren, useState, useEffect } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { IconX, IconArrowRight } from './icons';
import { ElemButton } from './elem-button';
import { ElemPhoto } from './elem-photo';
import { useUser } from '@/context/user-context';

type Props = {
  //isOpen: boolean;
  //onClose: () => void;
  //title?: string;
};

export const ElemInviteBanner: React.FC<PropsWithChildren<Props>> = ({
  //isOpen,
  //onClose,
  //title,
  children,
}) => {
  const { user } = useUser();

  const [showBanner, setShowBanner] = useState(true);

  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState<boolean>(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenInviteDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenInviteDialog(false);
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('invite_banner_state')
    ) {
      const data = window.localStorage.getItem('invite_banner_state');
      if (data !== null) setShowBanner(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('invite_banner_state')
    ) {
      window.localStorage.setItem(
        'invite_banner_state',
        JSON.stringify(showBanner),
      );
    }
  }, [showBanner]);

  return (
    <>
      {showBanner && (
        <div className="mb-6 flex items-center gap-x-6 px-6 py-2.5 bg-gradient-to-tr from-[#553BE5] to-[#8E7AFE] shadow rounded-lg sm:px-3.5 sm:before:flex-1">
          <p className="leading-6 text-white">
            <button onClick={onOpenUpgradeDialog}>
              <strong className="font-bold">Share and earn</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Tell a friend and get $14.99 in credit for every person you
              invite.&nbsp;
              <IconArrowRight className="inline-block h-5 w-5" title="Invite" />
            </button>
          </p>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">Dismiss</span>
              <IconX className="h-5 w-5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <Transition appear show={isOpenInviteDialog} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={onCloseUpgradeDialog}
        >
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
                <Dialog.Panel className="w-full max-w-xl transform rounded-lg bg-slate-100 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="flex items-center justify-between px-6 pt-6 pb-2 rounded-t-2xl bg-white">
                    <div className="flex items-center justify-between gap-x-1">
                      <div className="text-xl font-bold capitalize">
                        Invite your team
                      </div>
                    </div>
                    <button type="button" onClick={onCloseUpgradeDialog}>
                      <IconX className="h-6 w-6" />
                    </button>
                  </Dialog.Title>

                  <div className="p-6">
                    <div className="bg-white rounded-lg border border-black/10 divide-y divide-black/10">
                      {Array.from({ length: 9 }, (_, i) => (
                        <div
                          className="flex items-center justify-between px-4 py-3 group"
                          key={i}
                        >
                          <div className="flex items-center gap-x-2">
                            <ElemPhoto
                              wrapClass="w-10 h-10 aspect-square shrink-0 bg-white overflow-hidden bg-slate-100 rounded-lg"
                              imgClass="object-contain w-full h-full border border-slate-100 "
                              photo={user?.person?.picture}
                              placeholder="user2"
                              placeholderClass="text-slate-300"
                              imgAlt={user?.display_name}
                            />
                            <p className="font-bold capitalize">Person Name</p>
                          </div>

                          <ElemButton
                            onClick={() => {}}
                            btn="slate"
                            className=""
                          >
                            Invite
                          </ElemButton>
                        </div>
                      ))}
                    </div>

                    {children && (
                      <div className="mt-4 text-slate-600">{children}</div>
                    )}

                    <div className="mt-4">
                      <div className="relative p-5 bg-white rounded-lg border border-black/10">
                        <div className="flex flex-col gap-1">
                          <label className="font-bold text-slate-600">
                            Add emails to invite
                          </label>
                          <div className="flex flex-wrap p-2 rounded-md ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-primary-500 focus-within:outline-none">
                            combobox input field to invite people via email will
                            go here
                          </div>
                        </div>
                        <ElemButton
                          btn="purple"
                          onClick={() => {}}
                          className="mt-2"
                        >
                          Send invites
                        </ElemButton>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
