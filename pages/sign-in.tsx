import { useState } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { ElemButton } from '@/components/elem-button';
import { ElemLogin } from '@/components/sign-in/elem-login';
import { ElemSignUpForm } from '@/components/sign-in/elem-sign-up-form';
import { ElemSignUpProfile } from '@/components/sign-in/elem-sign-up-profile';
import { ElemSignUpConfirm } from '@/components/sign-in/elem-sign-up-confirm';
import { GetSignUpProfileQuery } from '@/graphql/types';
import { ElemSignInHeader } from '@/components/sign-in/elem-sign-in-header';
import { ElemLink } from '@/components/elem-link';
import { ROUTES } from '@/routes';
import { NextSeo } from 'next-seo';
import { ElemModal } from '@/components/elem-modal';

export type SignUpFormState = {
  firstName?: string;
  lastName?: string;
  linkedinUrl?: string;
  password?: string;
  confirmPassword?: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  name: string;
  linkedinUrl: string;
  personId?: number;
};

export default function SignIn() {
  const router = useRouter();

  const [signUpEmail, setSignUpEmail] = useState('');

  const [signUpStep, setSignUpStep] = useState(0);

  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormState>({});

  const [profile, setProfile] =
    useState<GetSignUpProfileQuery['people'][number]>();

  const { mutate: signUp, isLoading: isSubmittingSignUp } = useMutation(
    ({ email, password, name, personId, linkedinUrl }: SignUpPayload) =>
      fetch('/api/register/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
          personId,
          linkedinUrl,
          reference_id:
            typeof window !== 'undefined'
              ? localStorage.getItem('inviteCode')
              : router.query.invite,
        }),
      }),
    {
      onSuccess: () => {
        setSignUpStep(3);
      },
    },
  );

  const handleSignUp = (payload: SignUpPayload) => {
    signUp(payload);
  };

  return (
    <>
      <NextSeo title="Sign in" />
      <ElemModal
        isOpen={true}
        onClose={() => null}
        showCloseIcon={false}
        overlay={false}
        placement="top"
        transition="slideFromTop"
        className="relative z-[60]"
        panelClass="fixed inset-0 z-[50] w-full h-full bg-black">
        <ElemSignInHeader
          rightComponent={
            signUpStep === 0 ? (
              <ElemLink href={ROUTES.ROOT}>
                <ElemButton btn="default">Back</ElemButton>
              </ElemLink>
            ) : signUpStep === 1 ? (
              <ElemButton btn="default" onClick={() => setSignUpStep(0)}>
                Back
              </ElemButton>
            ) : null
          }
        />
        <div className="flex items-center justify-center h-[calc(100%-53px)] w-full">
          <div className="w-full max-h-full overflow-auto overscroll-none scrollbar-hide">
            <div className="flex flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-8">
              {signUpStep === 0 && (
                <ElemLogin
                  onNext={email => {
                    setSignUpStep(1);
                    setSignUpEmail(email);
                  }}
                />
              )}
              {signUpStep === 1 && (
                <ElemSignUpForm
                  isSubmittingSignUp={isSubmittingSignUp}
                  signUpEmail={signUpEmail}
                  onNext={(formValues, person) => {
                    setSignUpStep(2);
                    setSignUpFormValues(formValues);
                    setProfile(person);
                  }}
                  onSignUp={(formValues, payload) => {
                    setSignUpFormValues(formValues);
                    handleSignUp(payload);
                  }}
                />
              )}
              {signUpStep === 2 && (
                <ElemSignUpProfile
                  isSubmittingSignUp={isSubmittingSignUp}
                  person={profile}
                  onNext={personId => {
                    handleSignUp({
                      email: signUpEmail,
                      password: signUpFormValues.password || '',
                      name: `${signUpFormValues.firstName} ${signUpFormValues.lastName}`,
                      linkedinUrl: signUpFormValues.linkedinUrl || '',
                      personId,
                    });
                  }}
                />
              )}
              {signUpStep === 3 && (
                <ElemSignUpConfirm
                  firstName={signUpFormValues.firstName || ''}
                  signUpEmail={signUpEmail}
                />
              )}
            </div>
          </div>
        </div>
      </ElemModal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
