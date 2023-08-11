import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { Dialog } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import { ElemLogo } from '@/components/elem-logo';
import { ElemLogin } from '@/components/sign-in/elem-login';
import { ElemSignUpForm } from '@/components/sign-in/elem-sign-up-form';
import { ElemSignUpProfile } from '@/components/sign-in/elem-sign-up-profile';
import { ElemSignUpConfirm } from '@/components/sign-in/elem-sign-up-confirm';
import { FindPeopleByEmailAndLinkedinQuery } from '@/graphql/types';

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
    useState<FindPeopleByEmailAndLinkedinQuery['people'][0]>();

  const { mutate: signUp, isLoading: isSubmittingSignUp } = useMutation(
    ({ email, password, name, personId }: SignUpPayload) =>
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
          reference_id: router.query.invite,
        }),
      }).then(res => res.json()),
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
    <Dialog as="div" open onClose={() => null} className="relative z-[60]">
      <div className="fixed inset-0 z-[50] min-h-0 flex flex-col items-center justify-center">
        <Dialog.Panel className="w-full h-full flex flex-col justify-center mx-auto bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide">
          <nav
            className="fixed top-0 left-0 right-0 px-5 py-4 flex items-center justify-center border-b border-slate-200"
            aria-label="Global"
          >
            <Link href="/" passHref>
              <a className="w-auto">
                <ElemLogo mode="logo" className="h-6 w-auto" />
              </a>
            </Link>

            {(signUpStep === 0 || signUpStep === 1) && (
              <Link href="/" passHref>
                <a className="absolute right-5">
                  <ElemButton btn="white">Back</ElemButton>
                </a>
              </Link>
            )}
          </nav>

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
              onSignUp={handleSignUp}
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      metaTitle: 'Sign in - EdgeIn.io',
    },
  };
};
