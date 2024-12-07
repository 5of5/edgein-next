import { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { User_Groups } from '@/graphql/types';
import ElemSettingTab from './elem-setting-tab';
import ElemMemberTab from './elem-member-tab';
import ElemPendingInvitesTab from './elem-pending-invites-tab';
import { ElemModal } from '../elem-modal';
import ElemInviteDialog from '@/components/group/elem-invite-dialog';

export type SettingTabProps = 'settings' | 'members' | 'pending_invites';

type Props = {
  isOpen: boolean;
  selectedTab?: SettingTabProps;
  group: User_Groups;
  onClose: () => void;
  onUpdateGroupData: (data: any) => void;
};

const ElemSettingDialog: React.FC<Props> = ({
  isOpen,
  selectedTab,
  group,
  onClose,
  onUpdateGroupData,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    setSelectedIndex(selectedTab === 'members' ? 1 : 0);
  }, [selectedTab]);

  const [isOpenInviteDialog, setIsOpenInviteDialog] = useState(false);

  const onOpenInviteDialog = () => {
    //setIsOpenSettingDialog(false);
    setIsOpenInviteDialog(true);
  };

  const onCloseInviteDialog = () => {
    setIsOpenInviteDialog(false);
  };

  return (
    <>
      <ElemModal
        isOpen={isOpen}
        onClose={onClose}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-lg bg-black rounded-lg px-4 py-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">
            Group settings {/*: &ldquo;{group.name}&rdquo; */}
          </h2>
        </div>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex pt-4 font-medium transition-all bg-black border-b border-gray-200 whitespace-nowrap gap-x-4">
            <Tab
              className={({ selected }) =>
                `py-1 ${
                  selected
                    ? 'text-primary-500 border-b-2 border-primary-500 outline-none'
                    : ''
                }`
              }>
              Settings
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-1 ${
                  selected
                    ? 'text-primary-500 border-b-2 border-primary-500 outline-none'
                    : ''
                }`
              }>
              Members
            </Tab>
            <Tab
              className={({ selected }) =>
                `py-1 ${
                  selected
                    ? 'text-primary-500 border-b-2 border-primary-500 outline-none'
                    : ''
                }`
              }>
              Pending Invites
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <div className="mt-3">
              <Tab.Panel>
                <ElemSettingTab
                  group={group}
                  onUpdateGroupData={onUpdateGroupData}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ElemMemberTab
                  group={group}
                  onUpdateGroupData={onUpdateGroupData}
                  onInvite={onOpenInviteDialog}
                />
              </Tab.Panel>
              <Tab.Panel>
                <ElemPendingInvitesTab
                  group={group}
                  onUpdateGroupData={onUpdateGroupData}
                />
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>

        <ElemInviteDialog
          isOpen={isOpenInviteDialog}
          group={group}
          onUpdateGroupData={onUpdateGroupData}
          onClose={onCloseInviteDialog}
        />
      </ElemModal>
    </>
  );
};

export default ElemSettingDialog;
