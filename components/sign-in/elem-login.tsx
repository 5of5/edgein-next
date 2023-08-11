import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
import validator from 'validator';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { IconLinkedInAlt, IconExclamationTriangle } from '@/components/icons';
import { redirect_url } from '@/utils/auth';
import { usePopup } from '@/context/popup-context';

type Props = {
  onNext: (email: string) => void;
};

export const ElemLogin: FC<Props> = ({ onNext }) => {
  const router = useRouter();

  const { setShowPopup } = usePopup();

  const [isExistedEmail, setIsExistedEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [unsuccessMessage, setUnsuccessMessage] = useState('');

  const { isFetching: isCheckingExistedEmail, refetch: checkExistedEmail } =
    useQuery(
      ['check-existed-email', email],
      async () =>
        await fetch(`/api/check-existed-email/?email=${email}`).then(res =>
          res.json(),
        ),
      {
        enabled: false,
        onSuccess(data) {
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
          email,
          password,
        }),
      }).then(res => res.json()),
    {
      onSuccess: response => {
        if (response?.error) {
          setUnsuccessMessage('Incorrect email or password.');
        } else {
          if (router.query.redirect) {
            window.location.href = router.query.redirect as string;
          } else {
            window.location.href = '/';
          }
        }
      },
    },
  );

  const handleCheckExistedEmail = () => {
    validateEmail(email);

    if (emailError || !email) {
      return;
    }

    checkExistedEmail();
  };

  const validateEmail = (value: string) => {
    if (validator.isEmail(value)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid email');
    }
  };

  const validatePassword = (value: string) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordError('');
    } else {
      setPasswordError('Invalid password');
    }
  };

  const handleLogin = async () => {
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError || !email || !password) {
      return;
    }

    login();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (isExistedEmail) {
      handleLogin();
    } else {
      handleCheckExistedEmail();
    }
  };

  const handleForgotPassword = () => {
    setShowPopup('forgotPassword');
  };

  const handleContinueWithLinkedin = () => {
    const url = `${
      process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL
    }/authorize?response_type=code&client_id=${
      process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID
    }&connection=linkedin&redirect_uri=${redirect_url()}&scope=openid%20profile%20email%20offline_access`;
    window.location.href = url;
  };

  return (
    <>
      <div className="max-w-xs mx-auto w-full">
        <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
          Log in or sign up
        </h1>
        <p className="mt-4 text-xs text-center font-normal">
          Use your work email, so we can connect you with your teammates. If you
          have an account already, you&apos;ll log in.
        </p>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 mt-6">
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
                      ? 'ring-1 ring-slate-200'
                      : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  } !rounded-2xl`}
                />
                {emailError && (
                  <div className="mt-1 text-xs text-rose-600">{emailError}</div>
                )}
              </label>

              {isExistedEmail && (
                <label>
                  <span className="text-xs font-medium">
                    <div className="flex justify-between">
                      <span>Password</span>
                      <span
                        onClick={handleForgotPassword}
                        className="text-slate-500 cursor-pointer underline"
                      >
                        Forgot your password?
                      </span>
                    </div>
                  </span>
                  <InputText
                    name="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={event => setPassword(event?.target.value)}
                    className={`${
                      passwordError === ''
                        ? 'ring-1 ring-slate-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    } !rounded-2xl`}
                  />
                  {passwordError && (
                    <div className="mt-1 text-xs text-rose-600">
                      {passwordError}
                    </div>
                  )}
                </label>
              )}

              {unsuccessMessage && (
                <p className="mt-1 flex items-center font-bold text-sm text-red-500">
                  <IconExclamationTriangle className="h-5 w-5 mr-1" />
                  {unsuccessMessage}
                </p>
              )}

              <ElemButton
                className="w-full !mt-8"
                btn="primary"
                size="md"
                disabled={!email}
                loading={isCheckingExistedEmail || isLoginLoading}
              >
                {isExistedEmail ? 'Log in' : 'Continue with email'}
              </ElemButton>
            </div>
          </form>

          <div className="flex py-8 items-center">
            <div className="flex-grow border-t border-black/10"></div>
          </div>

          <p className="text-xs text-center font-normal">
            Or sign in using LinkedIn.
          </p>

          <ElemButton
            onClick={handleContinueWithLinkedin}
            className="w-full mt-6 gap-x-2 text-center bg-white ring-1 ring-slate-300 focus:ring-1 hover:bg-slate-200"
          >
            <IconLinkedInAlt
              title="LinkedIn"
              className="h-6 w- text-[#0A66C2]"
            />
            Continue with LinkedIn
          </ElemButton>
        </div>
      </div>
      <p className="text-gray-500 text-xs text-center mt-16">
        By signing in, you agree to EdgeIn&apos;s{' '}
        <a href="https://edgein.io/terms/" className=" underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="https://edgein.io/privacy/" className=" underline">
          Privacy Policy
        </a>
        .
      </p>
    </>
  );
};
