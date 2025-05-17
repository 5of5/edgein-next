import { FC, FormEvent, useState, useEffect } from 'react';
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
  const [passwordError, setPasswordError] = useState('');
  const [unsuccessMessage, setUnsuccessMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form when inputs change
  useEffect(() => {
    if (!isExistedEmail) {
      // Email-only validation (first step)
      setIsFormValid(email.trim() !== '' && validateEmail(email) === '');
    } else {
      // Email and password validation (login step)
      setIsFormValid(
        email.trim() !== '' &&
          validateEmail(email) === '' &&
          password.trim() !== '',
      );
    }
  }, [email, password, isExistedEmail]);

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
            // Focus on password field after email is validated
            setTimeout(() => {
              const passwordField = document.querySelector(
                'input[name="password"]',
              ) as HTMLInputElement;
              if (passwordField) passwordField.focus();
            }, 100);
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

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event?.target.value;
    setEmail(newEmail);

    // Only validate as user types if there was a previous error
    if (emailError) {
      setEmailError(validateEmail(newEmail));
    }

    // Clear any unsuccessful message when user starts typing again
    if (unsuccessMessage) {
      setUnsuccessMessage('');
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event?.target.value;
    setPassword(newPassword);

    // Clear any unsuccessful message when user starts typing again
    if (unsuccessMessage) {
      setUnsuccessMessage('');
    }
  };

  const handleCheckExistedEmail = () => {
    const emailValidationError = validateEmail(email);

    if (emailValidationError || !email) {
      setEmailError(emailValidationError || 'Email is required');
      return;
    }

    checkExistedEmail();
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return 'Email is required';
    }
    if (!validator.isEmail(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleLogin = () => {
    const emailValidationError = validateEmail(email);

    if (emailValidationError || !email) {
      setEmailError(emailValidationError || 'Email is required');
      return;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

    setEmailError('');
    setPasswordError('');
    setUnsuccessMessage('');

    login();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // Validate form before submission
    if (!isFormValid) {
      if (!email.trim() || validateEmail(email) !== '') {
        setEmailError(validateEmail(email) || 'Email is required');
      }

      if (isExistedEmail && !password.trim()) {
        setPasswordError('Password is required');
      }
      return;
    }

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
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col mt-6 space-y-4">
              <label>
                <span className="text-xs font-medium">Email</span>
                <InputText
                  name="email"
                  type="email"
                  value={email}
                  placeholder="name@company.com"
                  onChange={handleEmailChange}
                  onBlur={() => {
                    if (email.trim()) {
                      setEmailError(validateEmail(email));
                    }
                  }}
                  className={`${
                    emailError === ''
                      ? 'ring-1 ring-gray-200'
                      : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  } !rounded-2xl`}
                />
                {emailError && (
                  <div className="mt-1 text-xs text-rose-600 flex items-center">
                    <IconExclamationTriangle className="w-3 h-3 mr-1" />
                    {emailError}
                  </div>
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
                    onChange={handlePasswordChange}
                    onBlur={() => {
                      if (isExistedEmail && !password.trim()) {
                        setPasswordError('Password is required');
                      } else {
                        setPasswordError('');
                      }
                    }}
                    className={`${
                      passwordError === ''
                        ? 'ring-1 ring-gray-200'
                        : 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                    } !rounded-2xl`}
                  />
                  {passwordError && (
                    <div className="mt-1 text-xs text-rose-600 flex items-center">
                      <IconExclamationTriangle className="w-3 h-3 mr-1" />
                      {passwordError}
                    </div>
                  )}
                </label>
              )}

              {unsuccessMessage && (
                <div className="flex items-center p-3 mt-1 text-sm font-medium text-rose-600 bg-rose-500/10 rounded-xl">
                  <IconExclamationTriangle className="w-5 h-5 mr-2 text-rose-500" />
                  {unsuccessMessage}
                </div>
              )}

              <ElemButton
                className="w-full !mt-8"
                btn="primary"
                size="md"
                disabled={!isFormValid}
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
