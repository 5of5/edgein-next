import { useState, Fragment } from 'react';
import { ElemButton } from '@/components/elem-button';
import { Dialog, Transition } from '@headlessui/react';
import { InputText } from './input-text';

export enum ErrorCode {
  USER_NOT_EXISTS = 404,
  LINKED_IN_ACCOUNT = 406,
}

type Props = {
  show: boolean;
  onClose: () => void;
};

export default function ForgotPasswordModal(props: Props) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      alert('Enter email!');
      return;
    }
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('/api/change-password/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }).then(res => res.json());
      setIsLoading(false);
      if (!response.status && response.success === true) {
        setIsMailSent(true);
      }
      if (response.status === ErrorCode.USER_NOT_EXISTS) {
        setIsMailSent(true);
      }
      if (response.status === ErrorCode.LINKED_IN_ACCOUNT) {
        setError(response.message);
        setIsMailSent(true);
      }
    } catch (e) {
      // setIsMailSent(true)

      setIsLoading(false);
    }
  };

  const onClose = () => {
    props.onClose();
    setEmail('');
    if (isMailSent) {
      setIsMailSent(false);
    }
  };

  return (
    <>
      <Transition.Root show={props.show} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-[60]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="max-w-xl w-full px-6 py-2 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none lg:p-12">
                <div className="max-w-md mx-auto w-full">
                  {isMailSent ? (
                    <>
                      <h1 className="text-xl font-bold">
                        {error === ''
                          ? 'Password reset email sent'
                          : 'Looks like you signed up through LinkedIn'}
                      </h1>
                      {error === '' ? (
                        <p className="mt-2 text-gray-600 text-sm">
                          Look for an email from{' '}
                          <span className="font-bold">support@edgein.io</span>.
                          Check your Spam or Bulk Mail folders.
                        </p>
                      ) : (
                        <p className="mt-2">{error}</p>
                      )}
                      <div className="sm:col-span-3 mt-4">
                        <ElemButton
                          className="px-4"
                          onClick={onClose}
                          btn="primary">
                          Return to login
                        </ElemButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="mb-2 text-xl font-bold">
                        Forgot Password?
                      </h1>
                      <p className="text-gray-600 text-sm">
                        No worries, we&rsquo;ll send you reset instructions.
                      </p>

                      <div className="mt-4 flex flex-col space-y-1">
                        <label className="font-medium text-sm cursor-text">
                          Email
                        </label>
                        <InputText
                          name="email"
                          type="email"
                          value={email}
                          disabled={isLoading}
                          onChange={event => setEmail(event?.target.value)}
                          placeholder="example@email.com"
                        />

                        <div>
                          <ElemButton
                            className="mt-4 px-4"
                            onClick={handleSubmit}
                            btn="primary"
                            disabled={!email}
                            loading={isLoading}>
                            Reset Password
                          </ElemButton>
                          <ElemButton
                            onClick={onClose}
                            btn="transparent"
                            className="px-0 ml-2 sm:ml-4">
                            Cancel
                          </ElemButton>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
