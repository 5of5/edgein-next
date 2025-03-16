import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import validator from 'validator';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconLinkedInAlt, IconExclamationTriangle } from '@/components/icons';
import { redirect_url } from '@/utils/auth';
import { ForgotPasswordModal } from './forgot-password-modal';
import { ROUTES } from '@/routes';

type Props = {
  onNext: (email: string) => void;
};

export const ElemLogin: FC<Props> = ({ onNext }) => {
  const router = useRouter();

  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [isExistedEmail, setIsExistedEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [unsuccessMessage, setUnsuccessMessage] = useState('');
  console.log('email did exist:', isExistedEmail);

  const { isFetching: isCheckingExistedEmail, refetch: checkExistedEmail } =
    useQuery(
      ['check-existed-email', email.toLowerCase()],
      async () =>
        await fetch(
          `/api/check-existed-email/?email=${encodeURIComponent(
            email.toLowerCase(),
          )}`,
        ),
      {
        enabled: false,
        onSuccess: async response => {
          const data = await response.json();
          if (data.existed) {
            setIsExistedEmail(true);
          } else {
            onNext(email);
          }
        },
      },
    );

  const { mutate: login, isLoading: isLoginLoading } = useMutation(
    () =>
      fetch('/api/signin/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
        }),
      }),
    {
      onSuccess: response => {
        if (!response.ok) {
          setUnsuccessMessage('Incorrect email or password.');
        } else {
          if (router.query.redirect) {
            window.location.href = router.query.redirect as string;
          } else {
            window.location.href = ROUTES.ROOT;
          }
        }
      },
    },
  );

  const handleCheckExistedEmail = () => {
    const emailValidationError = validateEmail(email);

    if (emailValidationError || !email) {
      setEmailError(emailValidationError);
      return;
    }

    checkExistedEmail();
  };

  const validateEmail = (value: string) => {
    let emailError = '';
    if (!validator.isEmail(value)) {
      emailError = 'Enter valid email';
    }
    return emailError;
  };

  const handleLogin = () => {
    const emailValidationError = validateEmail(email);

    if (emailValidationError || !email || !password) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError('');
    setUnsuccessMessage('');

    login();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isExistedEmail) {
      handleLogin();
    } else {
      handleCheckExistedEmail();
    }
  };

  return (
    <>
      <div className="w-full max-w-xs mx-auto">
        <h1 className="text-2xl font-medium text-center lg:text-3xl">
          Log in or sign up
        </h1>
        <p className="mt-4 text-xs font-normal text-center">
          Use your work email, so we can connect you with your teammates. If you
          have an account already, you&apos;ll log in.
        </p>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-6 space-y-4">
              <label>
                <span className="text-xs font-medium">Email</span>
                <InputText
                  name="email"
                  type="email"
                  value={email}
                  placeholder="name@company.com"
                  onChange={event => setEmail(event?.target.value)}
                  className={`${
                    emailError === ''
                      ? 'ring-1 ring-gray-200'
                      : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  } !rounded-2xl`}
                />
                {emailError && (
                  <div className="mt-1 text-xs text-rose-600">{emailError}</div>
                )}
              </label>

              {isExistedEmail && (
                <label>
                  <div className="text-xs font-medium">
                    <div className="flex justify-between">
                      <div>Password</div>
                      <div
                        onClick={() => setOpenForgotPassword(true)}
                        className="text-gray-500 underline cursor-pointer hover:no-underline">
                        Forgot your password?
                      </div>
                    </div>
                  </div>
                  <InputText
                    name="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={event => setPassword(event?.target.value)}
                    className={`ring-1 ring-gray-200 !rounded-2xl`}
                  />
                </label>
              )}

              {unsuccessMessage && (
                <p className="flex items-center mt-1 text-sm font-bold text-red-500">
                  <IconExclamationTriangle className="w-5 h-5 mr-1" />
                  {unsuccessMessage}
                </p>
              )}

              <ElemButton
                className="w-full !mt-8"
                btn="primary"
                size="md"
                disabled={!email || (isExistedEmail && !password)}
                loading={isCheckingExistedEmail || isLoginLoading}>
                {isExistedEmail ? 'Log in' : 'Continue with email'}
              </ElemButton>
            </div>
          </form>

          <div className="flex items-center py-8">
            <div className="flex-grow border-t border-black/10"></div>
          </div>
        </div>
      </div>
      <p className="mt-16 text-xs text-center text-gray-500">
        By signing in, you agree to Mentibus&apos;s{' '}
        <a href="https://edgein.io/terms/" className="underline ">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="https://edgein.io/privacy/" className="underline ">
          Privacy Policy
        </a>
        .
      </p>

      <ForgotPasswordModal
        isOpen={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      />
    </>
  );
};
