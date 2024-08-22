import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ElemInviteLinks } from '@/components/invites/elem-invite-links';
import { EditSection } from '@/components/dashboard/edit-section';
import {
  useGetInvestorByPersonIdQuery,
  useGetUserProfileQuery,
} from '@/graphql/types';
import { ElemInviteUser } from '@/components/invites/elem-invite-user';
import { ElemInviteInvestmentMembers } from '@/components/invites/elem-invite-investment-members';
import { isEmpty } from 'lodash';
import { ElemButton } from '@/components/elem-button';
import { CREDITS_PER_MONTH } from '@/utils/userTransactions';
import { useMutation } from 'react-query';
import axios from 'axios';
import moment from 'moment-timezone';
import { useUser } from '@/context/user-context';

const TOGGLE_CREDITS_SYSTEM_API_URL = '/api/toggle-credits-system/';

export default function Account() {
  const { user, refreshUser } = useUser();
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

  return (
    <DashboardLayout>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">Referrals and Points</h2>
        </div>

        <EditSection heading="Invite a friend">
          <div className="grid gap-y-6">
            <div>
              <h3 className="font-medium">Share EdgeIn and get 1,500 points</h3>
              <p className="mt-2 text-sm text-gray-600">
                Invite your friends to EdgeIn, and we&apos;ll give you 1,500
                points for every friend who signs in through your referral.
                That&apos;s 1 month of EdgeIn Contributor, completely free! The
                more people who sign in, the more points you&apos;ll get.
              </p>
            </div>

            <div className="my-6">
              <h3 className="font-medium pl-0.5 font-sans">Current points</h3>
              <div className="flex flex-col mt-3 lg:flex-row">
                <span className="px-6 py-3 text-3xl font-semibold text-white border rounded-lg bg-primary-500">
                  {numberOfCredits.toLocaleString()}
                </span>
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
    </DashboardLayout>
  );
}
