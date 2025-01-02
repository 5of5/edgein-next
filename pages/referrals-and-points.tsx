import { useEffect, useState } from 'react';
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
import { isEmpty, set } from 'lodash';
import { ElemButton } from '@/components/elem-button';
import {
  IconCheckBadgeSolid,
  IconChevronRight,
  IconEmail,
  IconLinkedIn,
  IconLinkedInAlt,
} from '@/components/icons';
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
import { fetchGraphQL } from '@/components/dashboard/elem-my-lists-menu';
import { useRouter } from 'next/router';

const TOGGLE_CREDITS_SYSTEM_API_URL = '/api/toggle-credits-system/';

const MIN_COMPANIES_FOR_POINTS = 5;
const MIN_MEMBERS_FOR_POINTS = 3;

const UPDATE_USER_CREDITS_AND_CLAIMED_FOR = `
  mutation UpdateUserCreditsAndClaimedFor($id: Int!, $credits: String!, $claimedFor: jsonb!) {
    update_users(
      where: { id: { _eq: $id } }
      _set: { credits: $credits }
      _append: { claimed_for: $claimedFor }
    ) {
      affected_rows
      returning {
        id
        credits
        claimed_for
      }
    }
  }
`;

const ReferralsAndPoints: NextPage = () => {
  const { showNewMessages } = useIntercom();
  const router = useRouter();
  const { user, refreshUser, listsQualifyForCredits, groupsQualifyForCredits } =
    useUser();
  const { listAndFollows: lists, myGroups: myGroups } = useUser();

  const { data: userByPK } = useGetUserProfileQuery({
    id: user?.id ?? 0,
  });

  // console.log(userByPK);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [hasListWithMinCompanies, setHasListWithMinCompanies] = useState(false);
  const [hasGroupWithMinMembers, setHasGroupWithMinMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Verify Email');

  useEffect(() => {
    const flag = lists.some(
      item =>
        item.follows_companies &&
        item.follows_companies.length >= MIN_COMPANIES_FOR_POINTS,
    );

    setMessage(
      userByPK?.users_by_pk?.is_verified ? 'Verified Email' : 'Verify Email',
    );

    const groupFlag = myGroups.some(
      item => item.user_group_members.length >= MIN_MEMBERS_FOR_POINTS,
    );

    setHasListWithMinCompanies(flag);
    setHasGroupWithMinMembers(groupFlag);
  }, [lists, myGroups, userByPK]);

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

  const onClaim = async (typeOfClaim: string, creditAssigned: string) => {
    const credits =
      parseInt(
        userByPK?.users_by_pk?.credits === '' ||
          userByPK?.users_by_pk?.credits === null
          ? 0
          : userByPK?.users_by_pk?.credits,
      ) + parseInt(creditAssigned);
    console.log(credits, parseInt(creditAssigned));
    const claimedFor = [typeOfClaim];

    if (!user?.id) {
      console.error('User ID is not available.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await fetchGraphQL(UPDATE_USER_CREDITS_AND_CLAIMED_FOR, {
        id: user.id,
        credits: credits.toString(),
        claimedFor: claimedFor,
      });

      const data = result.update_users;
      if (data?.affected_rows > 0) {
        refetchUserProfile();
      } else {
        console.error('No rows were updated');
      }
    } catch (err) {
      console.error('Error during mutation:', err);
    } finally {
      setIsLoading(false);
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
  console.log(user);
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!userByPK?.users_by_pk?.is_verified) {
      try {
        const response = await fetch('/api/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userProfile?.users_by_pk?.person?.email,
            successRedirectUrl: 'https://www.edgein.io/verify-success/',
            failRedirectUrl: 'https://www.edgein.io/verify-fail/',
          }),
        });

        const data = await response.json();
        console.log(response);
        if (response.ok) {
          setMessage(`OTP sent! Check your email.`);
          if (data?.link) {
            window.open(data.link, 'noopener,noreferrer');
          }
        } else {
          setMessage(data.message || 'Failed to request OTP');
        }
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setMessage('Email already verified');
    }
  };

  // const handleLinkedIn = () => {
  //   // router.push('/api/linkedin-redirect');
  //   console.log('clicked');
  // };

  const personSlug = userProfile?.users_by_pk?.person?.slug;
  const numberOfCredits = userProfile?.users_by_pk?.credits || 0;
  //console.log('contributor', userProfile?.users_by_pk?.person?.email);
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

  const verificationCards = [
    {
      id: 1,
      isVerified: userByPK?.users_by_pk?.is_verified,
      type: 'verify',
      icon: userByPK?.users_by_pk?.is_verified
        ? IconCheckBadgeSolid:IconEmail,
      onClick: handleRequestOtp,
      title: message,
      content: userByPK?.users_by_pk?.is_verified
        ? 'Your Email is verified, start claiming points'
        : 'Verify your Email and start claiming points.',
    },
    // {
    //   id: 2,
    //   isVerified: false,
    //   type: 'verify',
    //   icon: IconLinkedInAlt,
    //   onClick: handleLinkedIn,
    //   title: 'Verify via LinkedIn',
    //   content: userByPK?.users_by_pk?.is_verified
    //     ? 'Your LinkedIn is verified, start claiming points'
    //     : 'Verify your profile through LinkedIn and start claiming points.',
    // },
  ];

  const getPointsCards = [
    ...(showClaimListCredits != 'false' && !listsQualifyForCredits
      ? [
          {
            id: 1,
            type: 'list',
            isClaimed: userByPK?.users_by_pk?.claimed_for?.includes('list'),
            credits: CREATE_LIST_CREDITS,
            onClick: onOpenCreateListDialog,
            title: userByPK?.users_by_pk?.claimed_for?.includes('list')
              ? 'Claimed list'
              : 'Create list',
            content: !hasListWithMinCompanies
              ? `Create a list with at least five organizations and immediately claim +${numberWithCommas(
                  CREATE_LIST_CREDITS,
                )} points.`
              : `You created a list with at least five organizations, claim +${numberWithCommas(
                  CREATE_LIST_CREDITS,
                )} points.`,
          },
        ]
      : showClaimListCredits != 'false' && listsQualifyForCredits
      ? [
          {
            id: 1,
            type: 'list',

            isClaimed: userByPK?.users_by_pk?.claimed_for?.includes('list'),
            credits: numberWithCommas(CREATE_LIST_CREDITS),
            onClick: () => onRequestCredits('list'),
            icon: IconCheckBadgeSolid,
            title: userByPK?.users_by_pk?.claimed_for?.includes('list')
              ? 'Claimed list'
              : 'Create list',
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
            type: 'group',
            isClaimed: userByPK?.users_by_pk?.claimed_for?.includes('group'),
            credits: numberWithCommas(CREATE_GROUP_CREDITS),
            onClick: onOpenCreateGroupDialog,
            title: userByPK?.users_by_pk?.claimed_for?.includes('group')
              ? `Claimed +${numberWithCommas(CREATE_GROUP_CREDITS)} Points`
              : `Create Group`,
            content: !hasGroupWithMinMembers
              ? `Create a group with at least three other EdgeIn members and you immediately get another +${numberWithCommas(
                  CREATE_GROUP_CREDITS,
                )} points.`
              : `You created a group with at least three other EdgeIn members, claimed +${numberWithCommas(
                  CREATE_GROUP_CREDITS,
                )} points.`,
          },
        ]
      : showClaimGroupCredits != 'false' && groupsQualifyForCredits
      ? [
          {
            id: 2,
            type: 'group',
            isClaimed: userByPK?.users_by_pk?.claimed_for?.includes('group'),
            credits: numberWithCommas(CREATE_GROUP_CREDITS),
            onClick: () => onRequestCredits('group'),
            icon: IconCheckBadgeSolid,
            title: userByPK?.users_by_pk?.claimed_for?.includes('group')
              ? `Claimed +${numberWithCommas(CREATE_GROUP_CREDITS)} Points`
              : `Claim +${numberWithCommas(CREATE_GROUP_CREDITS)} Points`,
            content: `You created a group with at least three other EdgeIn members, claimed +${numberWithCommas(
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

              {verificationCards?.map(card => {
                return (
                  <div
                    key={card.id}
                    onClick={card.isVerified ? undefined : card.onClick}
                    className={`relative p-5 my-6 transition-all border rounded-lg ${
                      card.isVerified
                        ? 'cursor-default border-gray-300'
                        : 'cursor-pointer group hover:border-primary-500'
                    }`}>
                    <div className="flex flex-col lg:flex-row lg:items-start">
                      <div className="block mt-2 ml-0 lg:mt-0 lg:ml-1">
                        <h3 className="flex items-center mb-2 font-medium group-hover:text-primary-500">
                          {card.icon && (
                            <card.icon
                              className={`w-6 h-6 mr-2 transition-all ${
                                card.isVerified
                                  ? 'text-primary-100'
                                  : `text-primary-500`
                              }  shrink-0`}
                            />
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

              {getPointsCards?.map(card => {
                return (
                  <div
                    key={card.id}
                    onClick={hasListWithMinCompanies ? undefined : card.onClick}
                    className={`relative p-5 my-6 transition-all border rounded-lg  group ${
                      hasListWithMinCompanies
                        ? ''
                        : 'hover:border-primary-500 cursor-pointer'
                    }`}>
                    <div className="flex flex-col lg:flex-row lg:items-start">
                      <div className="px-6 py-3 border-4 rounded-lg border-primary-500">
                        <div className="text-3xl font-semibold text-primary-500">
                          {card.credits}
                        </div>
                      </div>
                      {hasListWithMinCompanies &&
                      card.type === 'list' &&
                      !card.isClaimed ? (
                        <div
                          className={`absolute right-10 top-10 lg:right-2 lg:top-3 lg:bottom-1.5`}>
                          <ElemButton
                            btn="primary"
                            size="sm"
                            onClick={e =>
                              userByPK?.users_by_pk?.is_verified
                                ? onClaim(card?.type, '1000')
                                : handleRequestOtp(e)
                            }>
                            {userByPK?.users_by_pk?.is_verified
                              ? 'Claim'
                              : 'Verify'}
                          </ElemButton>
                        </div>
                      ) : hasGroupWithMinMembers &&
                        card.type === 'group' &&
                        !card.isClaimed ? (
                        <div
                          className={`absolute right-10 top-10 lg:right-2 lg:top-3 lg:bottom-1.5`}>
                          <ElemButton
                            btn="primary"
                            size="sm"
                            onClick={e =>
                              userByPK?.users_by_pk?.is_verified
                                ? onClaim(card?.type, '1000')
                                : handleRequestOtp(e)
                            }>
                            {userByPK?.users_by_pk?.is_verified
                              ? 'Claim'
                              : 'Verify'}
                          </ElemButton>
                        </div>
                      ) : null}
                      <div className="block mt-2 ml-0 lg:mt-0 lg:ml-6">
                        <h3
                          className={`flex items-center font-medium ${
                            hasListWithMinCompanies
                              ? ''
                              : 'group-hover:text-primary-500'
                          }`}>
                          {card.icon && (
                            <card.icon className="w-6 h-6 mr-1 transition-all text-primary-500 shrink-0" />
                          )}
                          {card.title}
                          <IconChevronRight
                            className={`w-4 h-4 -ml-1 transition-all opacity-0 shrink-0 ${
                              hasListWithMinCompanies
                                ? ''
                                : 'group-hover:opacity-100 group-hover:ml-0'
                            }`}
                          />
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
