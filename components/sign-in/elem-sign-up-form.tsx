import { ChangeEvent, FC, useState } from 'react';
import { useQuery } from 'react-query';
import validator from 'validator';
import capitalize from 'lodash/capitalize';
import lowerCase from 'lodash/lowerCase';
import isEmpty from 'lodash/isEmpty';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '@/components/input-text';
import { urlPattern } from '@/utils/constants';
import { FindPeopleByEmailAndLinkedinQuery } from '@/graphql/types';
import { SignUpFormState, SignUpPayload } from '@/pages/sign-in';

type Props = {
  isSubmittingSignUp: boolean;
  signUpEmail: string;
  onNext: (
    values: SignUpFormState,
    person: FindPeopleByEmailAndLinkedinQuery['people'][0],
  ) => void;
  onSignUp: (payload: SignUpPayload) => void;
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
    !isEmpty(errors) ||
    Object.keys(values).some(key => !values[key as keyof SignUpFormState]);

  const {
    isFetching: isCheckingExistedLinkedinUrl,
    refetch: checkExistedLinkedinUrl,
  } = useQuery(
    ['check-existed-linkedin-url'],
    async () =>
      await fetch(
        `/api/check-existed-linkedin-url/?linkedinUrl=${values.linkedinUrl}`,
      ).then(res => res.json()),
    {
      enabled: false,
      onSuccess(data) {
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

  const { isLoading: isLoadingPeople, refetch: getSignUpProfile } = useQuery<{
    person: FindPeopleByEmailAndLinkedinQuery['people'][0];
  }>(
    ['get-sign-up-profile'],
    async () =>
      await fetch(
        `/api/get-sign-up-profile/?email=${signUpEmail}&linkedinUrl=${values.linkedinUrl}`,
      ).then(res => res.json()),
    {
      enabled: false,
      onSuccess(data) {
        if (data.person) {
          onNext(values, data.person);
        } else {
          onSignUp({
            email: signUpEmail,
            password: values.password || '',
            name: `${values.firstName} ${values.lastName}`,
            linkedinUrl: values.linkedinUrl || '',
          });
        }
      },
    },
  );

  const handleValidate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: `${capitalize(lowerCase(name))} is required`,
      }));
    } else if (name === 'linkedinUrl' && value && !urlPattern.test(value)) {
      setErrors(prev => ({
        ...prev,
        linkedinUrl: 'Invalid URL',
      }));
    } else if (
      name === 'password' &&
      !validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrors(prev => ({
        ...prev,
        password:
          'Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character',
      }));
    } else if (name === 'confirmPassword' && value !== values.password) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Confirm password have to match with password',
      }));
    } else {
      setErrors({});
    }
  };

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    handleValidate(event);
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    checkExistedLinkedinUrl();
  };

  return (
    <div className="max-w-sm mx-auto w-full">
      <h1 className="mt-4 text-2xl text-center font-medium lg:text-3xl">
        First things first...
      </h1>
      <p className="mt-4 text-xs text-center text-slate-500 font-normal">
        You&apos;re signing up with the email{' '}
        <span className="font-semibold">{signUpEmail}</span>.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mt-6">
          <label>
            <span className="text-xs font-medium">First name</span>
            <InputText
              name="firstName"
              value={values.firstName}
              onChange={handleChangeValue}
              className={`${
                errors.firstName
                  ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  : 'ring-1 ring-slate-200'
              } !rounded-2xl`}
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
              className={`${
                errors.lastName
                  ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  : 'ring-1 ring-slate-200'
              } !rounded-2xl`}
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
              className={`${
                errors.linkedinUrl
                  ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  : 'ring-1 ring-slate-200'
              } !rounded-2xl`}
            />
            {errors.linkedinUrl && (
              <div className="mt-1 text-xs text-rose-600">
                {errors.linkedinUrl}
              </div>
            )}
          </label>

          <div className="flex pt-8 pb-6 items-center">
            <div className="flex-grow border-t border-black/10"></div>
          </div>

          <label>
            <span className="text-xs font-medium">Password</span>
            <InputText
              name="password"
              type="password"
              value={values.password}
              onChange={handleChangeValue}
              className={`${
                errors.password
                  ? 'ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400'
                  : 'ring-1 ring-slate-200'
              } !rounded-2xl`}
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
          <ElemButton
            className="w-full !mt-8"
            size="md"
            btn="primary"
            loading={
              isCheckingExistedLinkedinUrl ||
              isLoadingPeople ||
              isSubmittingSignUp
            }
            disabled={isDisabledButton}
          >
            Continue
          </ElemButton>
        </div>
      </form>
    </div>
  );
};
