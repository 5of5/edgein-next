import { useState, FC } from 'react';
import { ElemButton } from '@/components/elem-button';
import { InputText } from '../input-text';
import { ElemModal } from '../elem-modal';

export enum ErrorCode {
  USER_NOT_EXISTS = 404,
  LINKED_IN_ACCOUNT = 406,
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ForgotPasswordModal: FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
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

  const onCloseModal = () => {
    onClose();
    setEmail('');
    if (isMailSent) {
      setIsMailSent(false);
    }
  };

  return (
    <>
      <ElemModal
        isOpen={isOpen}
        onClose={onCloseModal}
        showCloseIcon={true}
        placement="center"
        className="!z-[60]"
        panelClass="relative w-full max-w-lg bg-dark-100 rounded-lg px-6 pt-6 pb-3 z-50 my-10">
        {isMailSent ? (
          <>
            <div>
              <h2 className="text-xl font-medium">
                {error === ''
                  ? 'Password reset email sent'
                  : 'Looks like you signed up through LinkedIn'}
              </h2>
            </div>

            {error === '' ? (
              <p className="pt-1 text-gray-600">
                Look for an email from{' '}
                <span className="font-medium">support@edgein.io</span>. Check
                your Spam or Bulk Mail folders.
              </p>
            ) : (
              <p className="pt-1 text-gray-600">{error}</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-medium">Forgot Password?</h2>
            <p className="pt-1 text-gray-600">
              No worries, we&rsquo;ll send you reset instructions.
            </p>

            <div className="flex flex-col mt-4 space-y-1">
              <label className="text-sm font-medium cursor-text">Email</label>
              <InputText
                name="email"
                type="email"
                value={email}
                disabled={isLoading}
                onChange={event => setEmail(event?.target.value)}
                placeholder="example@email.com"
              />
            </div>
          </>
        )}

        <div className="flex items-center justify-end pt-3 mt-3 border-t border-gray-200 gap-x-2">
          {isMailSent ? (
            <ElemButton className="px-4" onClick={onCloseModal} btn="primary">
              Return to login
            </ElemButton>
          ) : (
            <>
              <ElemButton onClick={onCloseModal} btn="default">
                Cancel
              </ElemButton>
              <ElemButton
                onClick={handleSubmit}
                btn="primary"
                disabled={!email}
                loading={isLoading}>
                Reset Password
              </ElemButton>
            </>
          )}
        </div>
      </ElemModal>
    </>
  );
};
