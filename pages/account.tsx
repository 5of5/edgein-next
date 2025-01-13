import { useState, ChangeEvent, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconLinkedInAlt, IconContributor } from '@/components/icons';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { EditSection } from '@/components/dashboard/edit-section';
import { GetUserProfileDocument, GetUserProfileQuery } from '@/graphql/types';
import { ElemSubscribedDialog } from '@/components/elem-subscribed-dialog';
import { InputSwitch } from '@/components/input-switch';
import { loadStripe } from '@/utils/stripe';
import { redirect_url } from '@/utils/auth';
import validator from 'validator';
import { ProfileEditDailyEmails } from '@/components/profile/profile-edit-daily-emails';
import { USER_ROLES } from '@/utils/users';
import { Toaster } from 'react-hot-toast';
import useToast from '@/hooks/use-toast';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import CookieService from '@/utils/cookie';
import { runGraphQl } from '@/utils';

export type NewPasswordForm = {
  newPassword?: string;
  confirmPassword?: string;
  oldPassword?: string;
};

type Props = {
  userProfile?: GetUserProfileQuery;
};

export default function Account({ userProfile }: Props) {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const { success } = router.query;

  const { toast } = useToast();

  useEffect(() => {
    // refetch user data after success payment (premium feature)
    if (success === 'true') {
      refreshUser();
    }
  }, [refreshUser, success]);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [values, setValues] = useState<NewPasswordForm>({
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
  });
  const [errors, setErrors] = useState<NewPasswordForm>({
    newPassword: '',
    confirmPassword: '',
    oldPassword: '',
  });

  const [isOpenSubscribedDialog, setIsOpenSubscribedDialog] = useState(false);

  const onCloseSubscribedDialog = () => {
    setIsOpenSubscribedDialog(false);
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
          oldPassword: values.oldPassword,
          password: values.newPassword,
        }),
      });

      if (response.status === 400) {
        const resp = await response.json();
        setErrors({ oldPassword: resp.error.message });
        toast('Something went wrong.', 'error');
      } else {
        setShowPasswordForm(false);
        setValues({});
        toast('Password updated', 'info');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isValidPassword = (password: string) => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  const handleValidate = (name: string, value: string) => {
    if (name === 'newPassword' && !isValidPassword(value)) {
      setErrors(prev => ({
        ...prev,
        newPassword:
          'Password should have at least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character',
      }));
    } else if (name === 'confirmPassword' && value !== values.newPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword:
          'Passwords do not match! Confirm password has to match with new password',
      }));
    } else {
      setErrors({});
    }
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleValidate(name, value);

    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      values.newPassword === '' ||
      values.confirmPassword === '' ||
      values.oldPassword === ''
    ) {
      toast('Password fields cannot be empty', 'error');
      return;
    }

    if (values.newPassword && !isValidPassword(values.newPassword)) {
      setErrors(prev => ({
        ...prev,
        newPassword:
          'Password should have at least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character',
      }));
      return;
    }

    if (
      values.confirmPassword &&
      values.confirmPassword != values.newPassword
    ) {
      setErrors(prev => ({
        ...prev,
        confirmPassword:
          'Passwords do not match! Confirm password has to match with new password',
      }));
      return;
    }

    if (isEmpty(errors)) {
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

  const currentDate = new Date();
  const haveSubscriptionFromCredits =
    userProfile?.users_by_pk?.use_credits_system &&
    new Date(userProfile?.users_by_pk?.last_transaction_expiration) >
      currentDate;

  return (
    <DashboardLayout>
      <div className="px-4 py-3  border-neutral-700">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-medium">Account Settings</h2>
        </div>

        <dl className="w-full">
          <EditSection
            heading="Social authentication"
            right={
              user && user.auth0_linkedin_id ? (
                <ElemButton
                  onClick={() => {}}
                  btn="default"
                  className="space-x-1 cursor-default text-[#0077B5] hover:!text-[#0077B5] hover:bg-black">
                  <IconLinkedInAlt className="w-5 h-5" />
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
                {user && user.auth0_linkedin_id
                  ? 'Your LinkedIn account is connected.'
                  : 'Connect your LinkedIn account to validate your profile and contribute to Mentibus. Our team will then review your account and enable it for contribution (this may take up to one business day).'}
              </p>
            </div>
          </EditSection>

          {user && user.auth0_user_pass_id && (
            <EditSection
              heading="Password"
              right={
                !showPasswordForm ? (
                  <ElemButton
                    onClick={() => setShowPasswordForm(true)}
                    btn="default">
                    Change Password
                  </ElemButton>
                ) : (
                  <></>
                )
              }>
              {!showPasswordForm ? (
                <p className="text-sm text-gray-600">
                  Use a strong password that you are not using elsewhere.
                </p>
              ) : (
                <div className="flex flex-col max-w-sm space-y-4 text-sm">
                  <label>
                    <span className="text-sm font-medium">Old password</span>
                    <InputText
                      name="oldPassword"
                      type="password"
                      onChange={handleChangeValue}
                      value={values.oldPassword}
                      className={`${
                        errors.oldPassword
                          ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                          : 'ring-1 ring-slate-200'
                      } !rounded-2xl`}
                    />

                    {errors.oldPassword && (
                      <div className="mt-1 text-xs text-rose-600">
                        {errors.oldPassword}
                      </div>
                    )}
                  </label>

                  <label>
                    <span className="text-sm font-medium">New password</span>
                    <InputText
                      name="newPassword"
                      type="password"
                      onChange={handleChangeValue}
                      value={values.newPassword}
                      className={`${
                        errors.newPassword
                          ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                          : 'ring-1 ring-slate-200'
                      } !rounded-2xl`}
                    />

                    {errors.newPassword && (
                      <div className="mt-1 text-xs text-rose-600">
                        {errors.newPassword}
                      </div>
                    )}
                  </label>

                  <label>
                    <span className="text-sm font-medium">
                      Confirm password
                    </span>
                    <InputText
                      name="confirmPassword"
                      type="password"
                      onChange={handleChangeValue}
                      value={values.confirmPassword}
                      className={`${
                        errors.confirmPassword
                          ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                          : 'ring-1 ring-slate-200'
                      } !rounded-2xl`}
                    />
                    {errors.confirmPassword && (
                      <div className="mt-1 text-xs text-rose-600">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </label>

                  <div className="flex mt-4 mb-2 text-base">
                    <ElemButton
                      btn="primary"
                      className="mr-2"
                      onClick={handleSubmit}>
                      Change Password
                    </ElemButton>
                    <ElemButton
                      onClick={() => {
                        setShowPasswordForm(false);
                        setValues({});
                        setErrors({});
                      }}
                      btn="default">
                      Cancel
                    </ElemButton>
                  </div>
                </div>
              )}
              <Toaster />
            </EditSection>
          )}

          {userProfile && (
            <ProfileEditDailyEmails user={userProfile.users_by_pk} />
          )}

          <EditSection
            heading="Subscription"
            right={
              userProfile &&
              (userProfile.users_by_pk?.billing_org?.status === 'active' ||
                haveSubscriptionFromCredits) ? (
                <ElemButton onClick={onBillingClick} btn="default" className="">
                  Manage subscription
                </ElemButton>
              ) : (
                <></>
              )
            }>
            {userProfile &&
            (userProfile.users_by_pk?.billing_org?.status === 'active' ||
              haveSubscriptionFromCredits) ? (
              <div>
                <div className="flex items-center space-x-1">
                  <IconContributor className="w-6 h-6 text-primary-500" />
                  <p className="text-sm text-gray-600">Mentibus Contributor</p>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-lg shadow bg-primary-500">
                <h2 className="text-xl font-medium text-white">
                  Try Mentibus Contributor FREE for 7 days
                </h2>
                <p className="text-sm text-white opacity-80">
                  Get real-time updates on the companies, people, deals and
                  events you’re most interested in, giving you an unprecedented
                  edge in Web3.
                </p>
                <ElemButton
                  onClick={onBillingClick}
                  btn="default"
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

      {/* {user?.role === USER_ROLES.ADMIN && (
        <div className="px-4 py-3 border-t  border-neutral-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-medium">Admin Settings</h2>
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
      )} */}
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const token = CookieService.getAuthToken(context.req.cookies);
  const user = await CookieService.getUser(token);

  const { data: userProfile } = await runGraphQl<GetUserProfileQuery>(
    GetUserProfileDocument,
    {
      id: user?.id || 0,
    },
    context.req.cookies,
  );

  return {
    props: {
      userProfile,
    },
  };
};
