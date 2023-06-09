import Link from 'next/link';
import { ElemPhoto } from './elem-photo';
import { IconEmail, IconLinkedIn } from './icons';
import moment from 'moment-timezone';
import { useAuth } from '@/hooks/use-auth';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemUpgradeDialog } from './elem-upgrade-dialog';
import { useState } from 'react';

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

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };
  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  return (
    <div>
      <div
        className={`flex gap-2 items-start p-1 border border-black/10 rounded-lg transition-all hover:shadow hover:-translate-y-0.5 ${
          end_date && 'opacity-70 hover:opacity-100'
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
        <div className="overflow-hidden grow">
          <Link href={href}>
            <a className="block">
              {heading && (
                <h3 className="font-bold text-lg truncate" title={heading}>
                  {heading}
                </h3>
              )}

              {(founder || text || organizationName) && (
                <p className="text-sm line-clamp-2">
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
                <div className="text-xs">
                  Ended {moment(end_date).format('MMM Do, YYYY')}
                </div>
              )}
            </a>
          </Link>

          <div className="inline-flex space-x-2 py-1">
            {user?.entitlements?.viewEmails && linkedin ? (
              <>
                <Link href={linkedin} passHref>
                  <a className="block" target="_blank" rel="noreferrer">
                    <IconLinkedIn
                      title="LinkedIn"
                      className="h-6 w-6 shrink-0 text-[#0077B5]"
                    />
                  </a>
                </Link>
              </>
            ) : linkedin ? (
              <ElemTooltip
                size="md"
                content="Premium feature, start free trial"
              >
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

            {(work_email || personal_email) && (
              <Link href={href}>
                <a className="inline-flex items-center space-x-1 text-slate-600">
                  <IconEmail title="Email" className="h-6 w-6" />
                  <span className="text-sm">{`${
                    work_email && personal_email ? `2 emails` : `1 email`
                  }`}</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
