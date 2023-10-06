import { FC, useState } from 'react';
import { useUser } from '@/context/user-context';
import { ElemUpgradeDialog } from '@/components/elem-upgrade-dialog';
import { IconProps } from '@/components/icons';
import { ElemLink } from './elem-link';

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
      {resources.map((resourceItem, index) => {
        if (!resourceItem.value) {
          return null;
        }

        if (resourceItem.isPremium && !userCanViewPremiumInfo) {
          return (
            <button key={index} onClick={onOpenUpgradeDialog}>
              <resourceItem.icon
                title={resourceItem.title}
                className="h-5 w-5 text-gray-400"
              />
            </button>
          );
        }

        return (
          <ElemLink
            key={resourceItem.value}
            href={resourceItem.value}
            target="_blank"
          >
            <resourceItem.icon
              title={resourceItem.title}
              className="h-5 w-5 text-gray-600"
            />
          </ElemLink>
        );
      })}

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </div>
  );
};
