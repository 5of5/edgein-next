import { useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemInviteLinks } from '@/components/invites/elem-invite-links';
import { EditSection } from '@/components/dashboard/edit-section';
import {
  useGetInvestorByPersonIdQuery,
  useGetUserProfileQuery,
} from '@/graphql/types';
import {
  CREATE_LIST_CREDITS,
  CREATE_GROUP_CREDITS,
  LOCAL_STORAGE_SHOW_CREATE_LISTS_CREDITS_KEY,
  LOCAL_STORAGE_SHOW_CREATE_GROUPS_CREDITS_KEY,
} from '@/utils/constants';
import { ElemInviteUser } from '@/components/invites/elem-invite-user';
import { ElemInviteInvestmentMembers } from '@/components/invites/elem-invite-investment-members';
import { isEmpty } from 'lodash';
import { ElemButton } from '@/components/elem-button';
import { IconCheckBadgeSolid, IconChevronRight } from '@/components/icons';
import { CREDITS_PER_MONTH } from '@/utils/userTransactions';
import { useMutation } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import { useUser } from '@/context/user-context';
import { CreateListDialog } from '@/components/my-list/create-list-dialog';
import { CreateGroupDialog } from '@/components/group/create-group-dialog';
import useLocalStorageState from '@/hooks/use-local-storage-state';
import { useIntercom } from 'react-use-intercom';
import { numberWithCommas } from '@/utils/numbers';

const TOGGLE_CREDITS_SYSTEM_API_URL = '/api/toggle-credits-system/';

const ReferralsAndPoints: NextPage = () => {
  const { showNewMessages } = useIntercom();

  const { user, refreshUser, listsQualifyForCredits, groupsQualifyForCredits } =
    useUser();

  const [openCreateList, setOpenCreateList] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const {
    value: showClaimListCredits,
    onChange: onChangeShowClaimListCredits,
  } = useLocalStorageState(LOCAL_STORAGE_SHOW_CREATE_LISTS_CREDITS_KEY);

  const {
    value: showClaimGroupCredits,
    onChange: onChangeShowClaimGroupCredits,
  } = useLocalStorageState(LOCAL_STORAGE_SHOW_CREATE_GROUPS_CREDITS_KEY);

  const onRequestCredits = (creditsType: 'list' | 'group') => {
    if (creditsType === 'list') {
      showNewMessages(
        `Hi EdgeIn, I qualify to claim 1,000 points for creating a list with at least five organizations. (Email: ${user?.email}, id: ${user?.id})`,
      );
      setTimeout(() => {
        onChangeShowClaimListCredits('false');
      }, 8000);
    }

    if (creditsType === 'group') {
      showNewMessages(
        `Hi EdgeIn, I qualify to claim 1,000 points for having a group with at least three other EdgeIn members. (Email: ${user?.email}, id: ${user?.id})`,
      );
      setTimeout(() => {
        onChangeShowClaimGroupCredits('false');
      }, 8000);
    }
  };

  const onOpenCreateListDialog = () => {
    setOpenCreateList(true);
  };
  const onCloseCreateListDialog = () => {
    setOpenCreateList(false);
  };

  const onOpenCreateGroupDialog = () => {
    setOpenCreateGroup(true);
  };
  const onCloseCreateGroupDialog = () => {
    setOpenCreateGroup(false);
  };

  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery(
      {
        id: user?.id || 0,
      },
      {
        enabled: !!user,
      },
    );

  const { mutate: toggleCreditsSystem } = useMutation(
    async () =>
      await axios.put(TOGGLE_CREDITS_SYSTEM_API_URL, {
        enableCreditsSystem: !userProfile?.users_by_pk?.use_credits_system,
      }),
    {
      onSuccess: () => {
        refreshUser();
        refetchUserProfile();
      },
    },
  );

  const personSlug = userProfile?.users_by_pk?.person?.slug;
  const numberOfCredits = userProfile?.users_by_pk?.credits || 0;
  const numberOfMonthsFromCredits = Math.ceil(
    numberOfCredits / CREDITS_PER_MONTH,
  );

  const { data: investorData } = useGetInvestorByPersonIdQuery(
    {
      personId: user?.person?.id || 0,
    },
    {
      enabled: !!user,
    },
  );

  const isInvestor = !isEmpty(investorData?.investors);

  const edgeInContributorButtonEnabled =
    userProfile?.users_by_pk?.use_credits_system ||
    (!userProfile?.users_by_pk?.use_credits_system &&
      userProfile?.users_by_pk?.credits >= CREDITS_PER_MONTH);

  const edgeInContributorButtonTitle = userProfile?.users_by_pk
    ?.use_credits_system
    ? 'Cancel EdgeIn Contributor'
    : 'Get EdgeIn Contributor';

  let creditsLabelMessage = '';
  if (userProfile?.users_by_pk?.use_credits_system) {
    if (userProfile?.users_by_pk?.last_transaction_expiration) {
      creditsLabelMessage = `Your subscription is active until ${moment(
        userProfile?.users_by_pk?.last_transaction_expiration,
      ).format('MMMM D, YYYY')}`;
    }
  } else {
    if (userProfile?.users_by_pk?.credits > 0) {
      creditsLabelMessage = `Your points give you ${numberOfMonthsFromCredits}${' '}
      ${numberOfMonthsFromCredits > 1 ? 'months' : 'month'} for
      free.`;
    } else {
      creditsLabelMessage = `Start by inviting your friends and colleagues.`;
    }
  }

  const getPointsCards = [
    ...(showClaimListCredits != 'false' && !listsQualifyForCredits
      ? [
          {
            id: 1,
            credits: CREATE_LIST_CREDITS,
            onClick: onOpenCreateListDialog,
            title: 'Create list',
            content: `Create a list with at least five organizations and immediately claim +${numberWithCommas(
              CREATE_LIST_CREDITS,
            )} points.`,
          },
        ]
      : showClaimListCredits != 'false' && listsQualifyForCredits
      ? [
          {
            id: 1,
            credits: numberWithCommas(CREATE_LIST_CREDITS),
            onClick: () => onRequestCredits('list'),
            icon: IconCheckBadgeSolid,
            title: `Claim +${numberWithCommas(CREATE_LIST_CREDITS)} Points`,
            content: `You created a list with at least five organizations, claim +${numberWithCommas(
              CREATE_LIST_CREDITS,
            )} points.`,
          },
        ]
      : //{numberWithCommas(CREATE_LIST_CREDITS)}
        []),
    ...(showClaimGroupCredits != 'false' && !groupsQualifyForCredits
      ? [
          {
            id: 2,
            credits: numberWithCommas(CREATE_GROUP_CREDITS),
            onClick: onOpenCreateGroupDialog,
            title: `Create Group`,
            content: `Create a group with at least three other EdgeIn members and you immediately get another +${numberWithCommas(
              CREATE_GROUP_CREDITS,
            )} points.`,
          },
        ]
      : showClaimGroupCredits != 'false' && groupsQualifyForCredits
      ? [
          {
            id: 2,
            credits: numberWithCommas(CREATE_GROUP_CREDITS),
            onClick: () => onRequestCredits('group'),
            icon: IconCheckBadgeSolid,
            title: `Claim +${numberWithCommas(CREATE_GROUP_CREDITS)} Points`,
            content: `You created a group with at least three other EdgeIn members, claim +${numberWithCommas(
              CREATE_GROUP_CREDITS,
            )} points.`,
          },
        ]
      : []),
  ];

  return (
    <DashboardLayout>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">Referrals and Points</h2>
        </div>

        <EditSection heading="">
          <div className="grid gap-y-6">
            <div>
              <h3 className="font-medium">Welcome To Your Data Community</h3>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Why do we reward you with points on EdgeIn?</strong>{' '}
                Because we are the first data marketplace powered by our
                community. Which means the more you are involved, the better our
                data becomes for everyone, and the more you can earn from being
                engaged. Below are some easy ways you can earn more points you
                can use for your subscription.
              </p>
            </div>
            <div>
              <div>
                <h3 className="font-medium pl-0.5">Current points</h3>
                <div className="flex flex-col mt-3 lg:flex-row lg:items-start">
                  <div className="px-6 py-3 text-3xl font-semibold text-white border rounded-lg bg-primary-500">
                    {numberOfCredits.toLocaleString()}
                  </div>
                  <div className="block mt-2 ml-0 lg:mt-0 lg:ml-6">
                    <ElemButton
                      btn="default"
                      disabled={!edgeInContributorButtonEnabled}
                      onClick={() => toggleCreditsSystem()}>
                      {edgeInContributorButtonTitle}
                    </ElemButton>

                    <p className="mt-2 text-xs text-gray-500">
                      {creditsLabelMessage}
                    </p>
                  </div>
                </div>
              </div>

              {getPointsCards?.map(card => {
                return (
                  <div
                    key={card.id}
                    onClick={card.onClick}
                    className="relative p-5 my-6 transition-all border rounded-lg cursor-pointer group hover:border-primary-500">
                    <div className="flex flex-col lg:flex-row lg:items-start">
                      <div className="px-6 py-3 border-4 rounded-lg border-primary-500">
                        <div className="text-3xl font-semibold text-primary-500">
                          {card.credits}
                        </div>
                      </div>
                      <div className="block mt-2 ml-0 lg:mt-0 lg:ml-6">
                        <h3 className="flex items-center font-medium group-hover:text-primary-500">
                          {card.icon && (
                            <card.icon className="w-6 h-6 mr-1 transition-all text-primary-500 shrink-0" />
                          )}
                          {card.title}
                          <IconChevronRight className="w-4 h-4 -ml-1 transition-all opacity-0 shrink-0 group-hover:opacity-100 group-hover:ml-0" />
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <ElemInviteUser />

            {isInvestor && (
              <ElemInviteInvestmentMembers
                vcFirmName={investorData?.investors[0]?.vc_firm?.name || ''}
              />
            )}
            {user && user.reference_id && (
              <ElemInviteLinks user={user} personSlug={personSlug} />
            )}
          </div>
        </EditSection>
      </div>

      <CreateListDialog
        isOpen={openCreateList}
        onClose={onCloseCreateListDialog}
      />

      <CreateGroupDialog
        isOpen={openCreateGroup}
        onClose={onCloseCreateGroupDialog}
      />
    </DashboardLayout>
  );
};

export default ReferralsAndPoints;
