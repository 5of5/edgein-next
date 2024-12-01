import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/routes';

const VerifyAdditionalEmail = () => {
  const { user, refreshUser } = useUser();

  const [error, setError] = useState('');

  const router = useRouter();

  const verifyEmail = useCallback(async () => {
    const email = router.query.email as string;
    const userId = router.query.uid as string;
    if (userId && user) {
      if (+userId !== user?.id) {
        setError('You are not allowed to access this link.');
      } else {
        if (user?.additional_emails?.includes(email)) {
          setError('This link is expired.');
        } else {
          const response = await fetch('/api/update-additional-emails/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              additionalEmails: [...(user?.additional_emails ?? []), email],
            }),
          });

          if (response.ok) {
            refreshUser();
            router.push(ROUTES.PROFILE);
            return;
          }

          if (response.status === 400)
            setError((await response.json()).message);

          if (response.status === 500)
            setError('Some server error, please contact edgein.io support!');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <DashboardLayout>
      <div className="p-5 bg-dark-100 shadow-md rounded-lg text-center">
        {!error ? (
          <p className="text-dark-500 text-lg font-semibold">
            Please wait while we verify your additional email!
          </p>
        ) : (
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VerifyAdditionalEmail;
