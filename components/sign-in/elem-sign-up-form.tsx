import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import validator from 'validator';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { GetSignUpProfileQuery } from '@/graphql/types';
import { SignUpFormState, SignUpPayload } from '@/pages/sign-in';
import { every, isUndefined, capitalize, lowerCase } from 'lodash';
import { PASSWORD_VALIDATION, urlPattern } from '@/utils/constants';

type Props = {
  isSubmittingSignUp: boolean;
  signUpEmail: string;
  onNext: (
    values: SignUpFormState,
    person: GetSignUpProfileQuery['people'][number],
  ) => void;
  onSignUp: (formValues: SignUpFormState, payload: SignUpPayload) => void;
};

export const ElemSignUpForm: FC<Props> = ({
  isSubmittingSignUp,
  signUpEmail,
  onNext,
  onSignUp,
}) => {
  const [values, setValues] = useState<SignUpFormState>({
    firstName: '',
    lastName: '',
    linkedinUrl: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<SignUpFormState>({});

  const isDisabledButton =
    !every(errors, isUndefined) ||
    Object.keys(values).some(
      key => key !== 'linkedinUrl' && !values[key as keyof SignUpFormState],
    );

  const {
    isFetching: isCheckingExistedLinkedinUrl,
    refetch: checkExistedLinkedinUrl,
  } = useQuery(
    ['check-existed-linkedin-url'],
    async () =>
      await fetch(
        `/api/check-existed-linkedin-url/?linkedinUrl=${values.linkedinUrl}`,
      ),
    {
      enabled: false,
      onSuccess: async response => {
        const data = await response.json();
        if (data.error) {
          setErrors(prev => ({
            ...prev,
            linkedinUrl: data.error,
          }));
        } else {
          getSignUpProfile();
        }
      },
    },
  );

  const { isLoading: isLoadingPeople, refetch: getSignUpProfile } = useQuery(
    ['get-sign-up-profile'],
    async () =>
      await fetch(
        `/api/get-sign-up-profile/?email=${signUpEmail}&name=${encodeURIComponent(
          `${values.firstName} ${values.lastName}`,
        )}`,
      ),
    {
      enabled: false,
      onSuccess: async response => {
        const data = await response.json();
        if (data.person) {
          onNext(values, data.person);
        } else {
          onSignUp(values, {
            email: signUpEmail,
            password: values.password || '',
            name: `${values.firstName} ${values.lastName}`,
            linkedinUrl: values.linkedinUrl || '',
          });
        }
      },
    },
  );

  const validatePasswords = useCallback(() => {
    const { password, confirmPassword } = values;
    let passwordError: string;
    let confirmPasswordError: string;

    if (
      password &&
      !validator.isStrongPassword(password, PASSWORD_VALIDATION)
    ) {
      passwordError =
        'Password should have at least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character';
    }

    if (confirmPassword && confirmPassword !== password) {
      confirmPasswordError = 'Confirm password must match password';
    }

    setErrors(prev => ({
      ...prev,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.password, values.confirmPassword]);

  useEffect(() => {
    validatePasswords();
  }, [validatePasswords]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'password':
      case 'confirmPassword':
        validatePasswords();
        break;
      case 'linkedinUrl':
        if (value && !urlPattern.test(value)) {
          return 'Invalid URL';
        }
        break;
      default:
        if (!value.trim()) {
          return `${capitalize(lowerCase(name))} is required`;
        }
        break;
    }
  };

  const handleValidate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    handleValidate(event);
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (values.linkedinUrl?.trim()) {
      checkExistedLinkedinUrl();
    } else {
      getSignUpProfile();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-medium text-center lg:text-3xl">
        First things first...
      </h1>
      <p className="mt-4 text-xs font-normal text-center text-slate-500">
        You&apos;re signing up with the email{' '}
        <span className="font-semibold">{signUpEmail}</span>.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 space-y-4">
          <label>
            <span className="text-xs font-medium">First name</span>
            <InputText
              name="firstName"
              value={values.firstName}
              onChange={handleChangeValue}
              className={`ring-1 ring-gray-300 text-black bg-white rounded-2xl focus:ring-blue-500 focus:border-blue-500`}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
            {errors.firstName && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.firstName}
              </div>
            )}
          </label>
          <label>
            <span className="text-xs font-medium">Last name</span>
            <InputText
              name="lastName"
              value={values.lastName}
              onChange={handleChangeValue}
              className={`ring-1 ring-gray-300 text-black bg-white rounded-2xl focus:ring-blue-500 focus:border-blue-500`}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
            {errors.lastName && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.lastName}
              </div>
            )}
          </label>
          <label>
            <span className="text-xs font-medium">Linkedin URL</span>
            <InputText
              name="linkedinUrl"
              placeholder="https://www.linkedin.com/in/..."
              value={values.linkedinUrl}
              onChange={handleChangeValue}
              className={`ring-1 ring-gray-300 text-black bg-white rounded-2xl focus:ring-blue-500 focus:border-blue-500`}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
            {errors.linkedinUrl && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.linkedinUrl}
              </div>
            )}
          </label>

          <div className="flex items-center pt-8 pb-6">
            <div className="flex-grow border-t border-black/10"></div>
          </div>

          <label>
            <span className="text-xs font-medium">Password</span>
            <InputText
              name="password"
              type="password"
              value={values.password}
              onChange={handleChangeValue}
              className={`ring-1 ring-gray-300 text-black bg-white rounded-2xl focus:ring-blue-500 focus:border-blue-500`}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
            {errors.password && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.password}
              </div>
            )}
          </label>
          <label>
            <span className="text-xs font-medium">Confirm password</span>
            <InputText
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChangeValue}
              className={`ring-1 ring-gray-300 text-black bg-white rounded-2xl focus:ring-blue-500 focus:border-blue-500`}
              style={{
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                padding: '10px 12px',
                outline: 'none',
              }}
            />
            {errors.confirmPassword && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.confirmPassword}
              </div>
            )}
          </label>
          <ElemButton
            className="w-full !mt-8"
            size="md"
            btn="primary"
            loading={
              isCheckingExistedLinkedinUrl ||
              isLoadingPeople ||
              isSubmittingSignUp
            }
            disabled={isDisabledButton}>
            Continue
          </ElemButton>
        </div>
      </form>
    </div>
  );
};