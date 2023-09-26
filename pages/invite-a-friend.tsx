import { useAuth } from '@/hooks/use-auth';
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

export default function Account() {
  const { user } = useAuth();

  const { data: userProfile } = useGetUserProfileQuery(
    {
      id: user?.id || 0,
    },
    {
      enabled: !!user,
    },
  );

  const personSlug = userProfile?.users_by_pk?.person?.slug;
  const numberOfCredits = userProfile?.users_by_pk?.credits || 0;
  const numberOfMonthsFromCredits = Math.ceil(numberOfCredits / 1500);

  const { data: investorData } = useGetInvestorByPersonIdQuery(
    {
      personId: user?.person?.id || 0,
    },
    {
      enabled: !!user,
    },
  );

  const isInvestor = !isEmpty(investorData?.investors);

  return (
    <DashboardLayout>
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium text-xl">Referrals and Credits</h2>
        </div>

        <EditSection heading="Invite a friend">
          <div className="grid gap-y-6">
            <div>
              <h3 className="font-medium">
                Get 1 month free for every person you invite
              </h3>
              <p className="mt-2 text-gray-600 text-sm">
                Invite your friends to EdgeIn and for each friend who signs up
                through your referral, you&apos;ll receive $14.99 in credit.
                That&apos;s 1 month of EdgeIn Contributor for free! The more
                people who sign up, the more credit you&apos;ll get.
              </p>
            </div>

            {numberOfCredits > 0 && !user?.entitlements.viewEmails && (
              <p className="mt-2 text-primary-500">
                You have EdgeIn Contributor for {numberOfMonthsFromCredits}{' '}
                {numberOfMonthsFromCredits > 1 ? 'months' : 'month'} free. Log
                out and log back in to activate.
              </p>
            )}

            {numberOfCredits > 0 && user?.entitlements.viewEmails && (
              <p className="mt-2 text-primary-500">
                You have EdgeIn Contributor active for{' '}
                {numberOfMonthsFromCredits}{' '}
                {numberOfMonthsFromCredits > 1 ? 'months' : 'month'} free.
              </p>
            )}

            {numberOfCredits > 0 && (
              <span className="text-primary-500">
                {numberOfCredits} credits available.
              </span>
            )}
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
