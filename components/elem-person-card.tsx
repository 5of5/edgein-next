import { ElemPhoto } from './elem-photo';
import { IconEmail, IconLinkedIn } from './icons';
import moment from 'moment-timezone';
import { useAuth } from '@/hooks/use-auth';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ElemLink } from './elem-link';

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
  const [showEmails, setShowEmails] = useState(false);

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
          className={`bg-gray-300 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
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
        }`}>
        <ElemLink href={href} className="hover:opacity-75">
          <ElemPhoto
            photo={photo}
            wrapClass="flex items-center justify-center shrink-0 w-12 h-12 rounded-full overflow-hidden"
            imgClass="object-cover w-full h-full"
            imgAlt={heading}
            placeholder="user"
            placeholderClass="text-gray-300"
          />
        </ElemLink>
        <div className="min-w-0 grow">
          <ElemLink href={href} className="block">
            {heading && (
              <h3 className="font-medium truncate" title={heading}>
                {heading}
              </h3>
            )}

            {(founder || text || organizationName) && (
              <p className="text-sm text-gray-500 line-clamp-2">
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
          </ElemLink>

          <div className="flex pt-1 space-x-2">
            {user?.entitlements?.viewEmails && linkedin ? (
              <ElemTooltip size="md" content="View LinkedIn Profile">
                <div>
                  <ElemLink
                    href={linkedin}
                    className="block"
                    target="_blank"
                    rel="noreferrer">
                    <IconLinkedIn
                      title="LinkedIn"
                      className="h-6 w-6 shrink-0 text-[#0077B5]"
                    />
                  </ElemLink>
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
              <ElemTooltip
                size="md"
                content={`${
                  personEmails.length === 1 ? 'View Email' : 'View Emails'
                }`}>
                <div>
                  <button
                    onClick={() => setShowEmails(!showEmails)}
                    className="flex items-center space-x-1 text-sm">
                    <IconEmail title="Email" className="w-6 h-6" />
                    <div>
                      {personEmails.length === 1
                        ? '1 email'
                        : `${personEmails.length} emails`}
                    </div>
                  </button>
                </div>
              </ElemTooltip>
            ) : personEmails.length > 0 ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button
                    onClick={onOpenUpgradeDialog}
                    className="inline-flex items-center space-x-1 text-gray-500">
                    <IconEmail title="Email" className="w-6 h-6" />
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
          {showEmails && (
            <ul>
              {personEmails?.map((email, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        onCopyEmail(email);
                      }}
                      className="text-sm text-gray-500 underline hover:no-underline">
                      {email}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
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
