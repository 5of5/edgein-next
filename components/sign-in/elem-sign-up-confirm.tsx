import { FC, useEffect } from 'react';
import { useMutation } from 'react-query';
import useToast from '@/hooks/use-toast';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';
import { useRouter } from 'next/router';
import { ROUTES } from '@/routes';

type Props = {
  firstName: string;
  signUpEmail: string;
};

export const ElemSignUpConfirm: FC<Props> = ({ firstName, signUpEmail }) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: resend } = useMutation(
    () =>
      fetch('/api/resend-verification-email/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: async response => {
        if (response.ok) {
          toast('Your verification email is on the way.');
        } else {
          const error = await response.json();
          toast(error.error || GENERAL_ERROR_MESSAGE);
        }
      },
    },
  );

  const handleResendEmail = () => {
    resend();
  };
  useEffect(() => {
    redirectToOnboard();
  }, []);

  const redirectToOnboard = () => {
    router.push('/onboarding');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-medium text-center lg:text-3xl">
        {`Thanks, ${firstName}!`}
      </h1>
      <h1 className="text-2xl font-medium text-center lg:text-3xl">
        Please check your email
      </h1>
      <p className="mt-5 text-xs font-normal text-center text-slate-500">
        Once you verify your email address, you can start using Mentibus.
      </p>
      <p className="mt-16 text-xs font-normal text-center text-slate-500">
        We&apos;ve sent you an email to{' '}
        <span className="font-semibold">{signUpEmail}</span>.
      </p>

      <div className="flex justify-center gap-1 mt-16">
        <p className="text-xs text-gray-500">Didn&apos;t receive the email?</p>
        <button
          className="text-xs text-gray-500 underline hover:text-gray-800"
          onClick={handleResendEmail}>
          Resend email
        </button>
      </div>
      <div className="flex justify-center gap-1 mt-5">
        <p className="text-xs text-gray-500">On board</p>
        <button
          className="text-xs text-gray-500 underline hover:text-gray-800"
          onClick={redirectToOnboard}>
          here
        </button>
      </div>
    </div>
  );
};
