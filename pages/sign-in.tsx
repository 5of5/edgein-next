import { useState } from 'react';
import type { GetStaticProps } from 'next';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import { ElemLogo } from '@/components/elem-logo';
import { ElemLogin } from '@/components/sign-in/elem-login';
import {
  ElemSignUpForm,
  SignUpFormState,
} from '@/components/sign-in/elem-sign-up-form';
import { ElemSignUpProfile } from '@/components/sign-in/elem-sign-up-profile';

export default function SignIn() {
  const [signUpEmail, setSignUpEmail] = useState('');

  const [signUpStep, setSignUpStep] = useState(0);

  const [signUpFormValues, setSignUpFormValues] = useState<SignUpFormState>({});

  const [selectedPersonId, setSelectedPersonId] = useState<number>();

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

            <Link href="/" passHref>
              <a className="absolute right-5">
                <ElemButton btn="white">Back</ElemButton>
              </a>
            </Link>
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
              signUpEmail={signUpEmail}
              onNext={formValues => {
                setSignUpStep(2);
                setSignUpFormValues(formValues);
              }}
            />
          )}

          {signUpStep === 2 && (
            <ElemSignUpProfile
              signUpEmail={signUpEmail}
              linkedinUrl={signUpFormValues.linkedinUrl || ''}
              onNext={personId => {
                setSelectedPersonId(personId);
                setSignUpStep(3);
              }}
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
