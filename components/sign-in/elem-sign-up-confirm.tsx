import { FC } from 'react';
import { useMutation } from 'react-query';
import useToast from '@/hooks/use-toast';
import { GENERAL_ERROR_MESSAGE } from '@/utils/constants';

type Props = {
  firstName: string;
  signUpEmail: string;
};

export const ElemSignUpConfirm: FC<Props> = ({ firstName, signUpEmail }) => {
  const { toast } = useToast();

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

  return (
    <div className="max-w-sm mx-auto w-full -translate-y-20">
      <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
        {`Thanks, ${firstName}!`}
      </h1>
      <h1 className="text-2xl text-center font-medium lg:text-3xl">
        Please check your email
      </h1>
      <p className="mt-5 text-xs text-center text-slate-500 font-normal">
        Once you verify your email address, you can start using EdgeIn.
      </p>
      <p className="mt-16 text-xs text-center text-slate-500 font-normal">
        We&apos;ve sent you an email to{' '}
        <span className="font-semibold">{signUpEmail}</span>.
      </p>

      <div className="flex justify-center gap-1 mt-16">
        <p className="text-gray-500 text-xs">Didn&apos;t receive the email?</p>
        <button
          className="text-gray-500 text-xs underline hover:text-gray-800"
          onClick={handleResendEmail}
        >
          Resend email
        </button>
      </div>
    </div>
  );
};
