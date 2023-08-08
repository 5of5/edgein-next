import Link from 'next/link';
import { ElemPhoto } from './elem-photo';
import { IconEmail, IconLinkedIn, IconCopy } from './icons';
import moment from 'moment-timezone';
import { useAuth } from '@/hooks/use-auth';
import { ElemTooltip } from '@/components/elem-tooltip';
import { Popover, Transition } from '@headlessui/react';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { useState, Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  href?: string;
  photo: Record<string, any>;
  heading?: string | null;
  text?: string | null;
  founder?: boolean | null;
  linkedin?: string | null;
  personal_email?: string | null;
  work_email?: string | null;
  end_date?: string | null;
  organizationName?: string | null;
};

export const ElemPersonCard: React.FC<Props> = ({
  href = '',
  photo,
  heading,
  text,
  founder,
  linkedin,
  personal_email,
  work_email,
  end_date,
  organizationName,
}) => {
  const { user } = useAuth();

  const personEmails: string[] = [];
  if (personal_email) {
    personEmails.push(personal_email);
  }
  if (work_email) {
    personEmails.push(work_email);
  }

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  const onCopyEmail = async (email: string) => {
    navigator.clipboard.writeText(email);
    toast.custom(
      t => (
        <div
          className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          Copied Email
        </div>
      ),
      {
        duration: 3000,
        position: 'top-center',
      },
    );
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-start ${
          end_date ? 'opacity-60 hover:opacity-100' : ''
        }`}
      >
        <Link href={href}>
          <a className="hover:opacity-75">
            <ElemPhoto
              photo={photo}
              wrapClass="flex items-center justify-center shrink-0 w-20 h-20 rounded-lg overflow-hidden"
              imgClass="object-cover w-full h-full"
              imgAlt={heading}
              placeholder="user"
              placeholderClass="text-slate-300"
            />
          </a>
        </Link>
        <div className="grow min-w-0 truncate">
          <Link href={href}>
            <a className="block">
              {heading && (
                <h3 className="font-medium truncate" title={heading}>
                  {heading}
                </h3>
              )}

              {(founder || text || organizationName) && (
                <p className="text-sm text-gray-500 truncate">
                  {founder && <span>Founder</span>}
                  {founder && text && `, `}
                  {text && <span>{text}</span>}
                  {(founder || text) && organizationName && (
                    <span aria-hidden="true"> · </span>
                  )}

                  {organizationName && <span>{organizationName}</span>}
                </p>
              )}

              {end_date && (
                <div className="text-xs text-gray-500">
                  Ended {moment(end_date).format('MMM Do, YYYY')}
                </div>
              )}
            </a>
          </Link>

          <div className="inline-flex space-x-2 py-1">
            {user?.entitlements?.viewEmails && linkedin ? (
              <ElemTooltip size="md" content="View LinkedIn Profile">
                <div>
                  <Link href={linkedin} passHref>
                    <a className="block" target="_blank" rel="noreferrer">
                      <IconLinkedIn
                        title="LinkedIn"
                        className="h-6 w-6 shrink-0 text-[#0077B5]"
                      />
                    </a>
                  </Link>
                </div>
              </ElemTooltip>
            ) : linkedin ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button className="block" onClick={onOpenUpgradeDialog}>
                    <IconLinkedIn
                      title="LinkedIn"
                      className="h-6 w-6 shrink-0 text-[#0077B5]"
                    />
                  </button>
                </div>
              </ElemTooltip>
            ) : (
              <></>
            )}

            {user?.entitlements?.viewEmails && personEmails.length > 0 ? (
              <Popover className="relative">
                <ElemTooltip
                  size="md"
                  content={`${
                    personEmails.length === 1 ? 'View Email' : 'View Emails'
                  }`}
                >
                  <Popover.Button
                    className="relative inline-flex space-x-1 items-center group hover:text-primary-500 focus:outline-none focus-visible:ring-0 transition-all"
                    title={
                      personEmails.length === 1
                        ? '1 email'
                        : `${personEmails.length} emails`
                    }
                  >
                    <IconEmail title="Email" className="h-6 w-6" />
                    <span className="text-sm">
                      {personEmails.length === 1
                        ? '1 email'
                        : `${personEmails.length} emails`}
                    </span>
                  </Popover.Button>
                </ElemTooltip>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 left-1/2 -translate-x-1/2 block bg-white rounded-lg shadow-md p-1 lg:left-0 lg:translate-x-0">
                    {({ close }) => (
                      <ul>
                        {personEmails?.map((email, index) => {
                          return (
                            <li
                              key={index}
                              onClick={() => {
                                close();
                                onCopyEmail(email);
                              }}
                              className="flex space-x-2 py-1 px-2 rounded-md flex-1 items-center justify-between transition-all cursor-pointer hover:bg-slate-200"
                            >
                              <div className="flex items-center">{email}</div>
                              <div className="flex items-center text-primary-500">
                                <IconCopy
                                  title="copy"
                                  className="h-5 w-5 mr-1 shrink-0"
                                />
                                copy
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </Popover.Panel>
                </Transition>
              </Popover>
            ) : personEmails.length > 0 ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button
                    onClick={onOpenUpgradeDialog}
                    className="inline-flex items-center space-x-1 text-slate-600"
                  >
                    <IconEmail title="Email" className="h-6 w-6" />
                    <span className="text-sm">
                      {personEmails.length === 1
                        ? '1 email'
                        : `${personEmails.length} emails`}
                    </span>
                  </button>
                </div>
              </ElemTooltip>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Toaster />
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
