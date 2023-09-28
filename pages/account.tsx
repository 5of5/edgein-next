import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconLinkedInAlt, IconContributor } from '@/components/icons';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { EditSection } from '@/components/dashboard/edit-section';
import { useGetUserProfileQuery } from '@/graphql/types';
import { ElemSubscribedDialog } from '@/components/elem-subscribed-dialog';
import InputSwitch from '@/components/input-switch';
import { loadStripe } from '@/utils/stripe';
import { redirect_url } from '@/utils/auth';
import validator from 'validator';
import { ProfileEditDailyEmails } from '@/components/profile/profile-edit-daily-emails';

export default function Account() {
  const { user, refreshUser } = useAuth();

  const { data: userProfile } = useGetUserProfileQuery(
    {
      id: user?.id || 0,
    },
    {
      enabled: !!user,
    },
  );

  const [isEditPassword, setEditPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reEnterErrorMessage, setReEnterErrorMessage] = useState('');

  const [isOpenSubscribedDialog, setIsOpenSubscribedDialog] = useState(false);

  const onCloseSubscribedDialog = () => {
    setIsOpenSubscribedDialog(false);
  };

  const validate = (value: string) => {
    setNewPassword(value);
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage('');
    } else {
      setErrorMessage(
        'Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, a special character',
      );
    }
  };

  const validateReEnterPassword = (value: string) => {
    setReEnterPassword(value);
    if (newPassword !== value) {
      setReEnterErrorMessage('Password do not match!');
    } else {
      setReEnterErrorMessage('');
    }
  };

  const onLinkedInClick = () => {
    if (user && user.auth0_linkedin_id) {
      return;
    }
    const url = `${
      process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
    }/authorize?response_type=code&client_id=${
      process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    }&connection=linkedin&redirect_uri=${redirect_url()}&scope=openid%20profile%20email%20offline_access`;
    window.location.href = url;
  };

  const onBillingClick = async () => {
    loadStripe();
  };

  const callChangePassword = async () => {
    try {
      const response = await fetch('/api/set-password/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      setEditPassword(false);
      setNewPassword('');
      setReEnterPassword('');
    } catch (e) {
      console.log(e);
    }
  };

  const onChangePassword = () => {
    if (
      newPassword.length > 0 &&
      !errorMessage &&
      !reEnterErrorMessage &&
      newPassword === reEnterPassword
    ) {
      //call api
      callChangePassword();
    }
  };

  const handleSwitchShowDraftData = async (value: boolean) => {
    await fetch('/api/toggle-show-draft-data/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        showDraftData: value,
      }),
    });
    refreshUser();
  };

  const haveSubscriptionFromCredits =
    userProfile?.users_by_pk?.use_credits_system &&
    new Date(userProfile?.users_by_pk?.last_transaction_expiration) > new Date();
  return (
    <DashboardLayout>
      <div className="px-4 py-3 border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-medium text-xl">Account Settings</h2>
        </div>

        <dl className="w-full">
          <EditSection
            heading="Social authentication"
            right={
              user && user.auth0_linkedin_id ? (
                <ElemButton
                  onClick={() => {}}
                  btn="default"
                  className="space-x-1 cursor-default text-[#0077B5] hover:!text-[#0077B5] hover:bg-white">
                  <IconLinkedInAlt className="h-5 w-5" />
                  <span>Connected</span>
                </ElemButton>
              ) : (
                <>
                  <ElemButton
                    onClick={onLinkedInClick}
                    btn="default"
                    className="space-x-1  hover:!text-[#0077B5]">
                    <IconLinkedInAlt className="h-5 w-5 text-[#0077B5]" />{' '}
                    <span>LinkedIn</span>
                  </ElemButton>
                </>
              )
            }>
            <div>
              <p className="text-sm text-gray-600">
                Connect your LinkedIn account to validate your profile and
                contribute to EdgeIn. Our team will then review your account and
                enable it for contribution (this may take up to one business
                day).
              </p>
            </div>
          </EditSection>

          {user && user.auth0_user_pass_id && (
            <EditSection
              heading="Password"
              right={
                !isEditPassword ? (
                  <ElemButton
                    onClick={() => setEditPassword(true)}
                    btn="default">
                    Edit
                  </ElemButton>
                ) : (
                  <></>
                )
              }>
              {!isEditPassword ? (
                <p className="text-gray-600 text-sm">
                  Use a strong password that you are not using elsewhere.
                </p>
              ) : (
                <div className="max-w-sm text-sm">
                  <div>
                    <InputText
                      type="password"
                      label="New password"
                      onChange={event => {
                        validate(event.target.value);
                      }}
                      value={newPassword}
                      name=""
                    />
                    {errorMessage === '' ? null : (
                      <div className="mt-2 text-sm">{errorMessage}</div>
                    )}
                  </div>

                  <div className="mt-4">
                    <InputText
                      type="password"
                      label="Re-type new password"
                      onChange={event => {
                        validateReEnterPassword(event.target.value);
                      }}
                      value={reEnterPassword}
                      name=""
                    />
                    {reEnterErrorMessage === '' ? null : (
                      <div className="mt-2 text-sm">{reEnterErrorMessage}</div>
                    )}
                  </div>

                  <div className="flex mt-4 mb-2 text-base">
                    <ElemButton
                      btn="purple"
                      className="mr-2"
                      onClick={onChangePassword}>
                      Save Changes
                    </ElemButton>
                    <ElemButton
                      onClick={() => setEditPassword(false)}
                      btn="default">
                      Cancel
                    </ElemButton>
                  </div>
                </div>
              )}
            </EditSection>
          )}

          {userProfile && (
            <ProfileEditDailyEmails user={userProfile.users_by_pk} />
          )}

          <EditSection
            heading="Subscription"
            right={
              userProfile &&
              (userProfile.users_by_pk?.billing_org_id ||
                userProfile.users_by_pk?.last_transaction_expiration >
                  new Date()) ? (
                <ElemButton onClick={onBillingClick} btn="default" className="">
                  Manage subscription
                </ElemButton>
              ) : (
                <></>
              )
            }>
            {userProfile &&
            (userProfile.users_by_pk?.billing_org_id ||
              haveSubscriptionFromCredits) ? (
              <div>
                <div className="flex items-center space-x-1">
                  <IconContributor className="h-6 w-6 text-primary-500" />
                  <p className="text-sm text-gray-600">EdgeIn Contributor</p>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-primary-500 shadow rounded-lg">
                <h2 className="text-xl font-medium text-white">
                  Try EdgeIn Contributor FREE for 7 days
                </h2>
                <p className="text-white opacity-80 text-sm">
                  Get real-time updates on the companies, people, deals and
                  events you’re most interested in, giving you an unprecedented
                  edge in Web3.
                </p>
                <ElemButton
                  onClick={onBillingClick}
                  btn="primary-light"
                  arrow
                  className="mt-4 text-primary-500">
                  Start your free trial
                </ElemButton>
              </div>
            )}
          </EditSection>
        </dl>
        <ElemSubscribedDialog
          isOpen={isOpenSubscribedDialog}
          onClose={onCloseSubscribedDialog}
        />
      </div>

      {user?.role === 'admin' && (
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium text-xl">Admin Settings</h2>
          </div>

          <dl className="w-full">
            <EditSection heading="Show draft data">
              <InputSwitch
                label=""
                // Set default showDraftData is true
                checked={
                  user?.showDraftData === undefined ? true : user?.showDraftData
                }
                onChange={handleSwitchShowDraftData}
              />
            </EditSection>
          </dl>
        </div>
      )}
    </DashboardLayout>
  );
}
