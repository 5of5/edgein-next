import { FC, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { IconProps } from '@/components/icons';

type Resource = {
  isPremium?: boolean;
  value: string | null;
  title?: string;
  icon: FC<IconProps>;
};

type Props = {
  resources: Resource[];
};

export const ElemSocialIconGroup: FC<Props> = ({ resources }) => {
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const { user } = useUser();

  const userCanViewPremiumInfo = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const onOpenUpgradeDialog = () => setIsOpenUpgradeDialog(true);
  const onCloseUpgradeDialog = () => setIsOpenUpgradeDialog(false);

  return (
    <div className="flex items-center space-x-1.5">
      {resources.map(resourceItem => {
        if (!resourceItem.value) {
          return null;
        }

        if (resourceItem.isPremium && !userCanViewPremiumInfo) {
          return (
            <button onClick={onOpenUpgradeDialog}>
              <resourceItem.icon
                title={resourceItem.title}
                className="h-5 w-5 text-gray-400"
              />
            </button>
          );
        }

        return (
          <Link key={resourceItem.value} href={resourceItem.value}>
            <a target="_blank">
              <resourceItem.icon
                title={resourceItem.title}
                className="h-5 w-5 text-gray-600"
              />
            </a>
          </Link>
        );
      })}

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
