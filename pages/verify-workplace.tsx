import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {};

const VerifyWorkplace: FC<Props> = ({}) => {
  const [error, setError] = useState('');

  const router = useRouter();

  const verifyToken = useCallback(async () => {
    const token = router.query.vtoken as string;

    if (token) {
      const resp = await fetch(`/api/verify-workplace/?vtoken=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (resp.ok) {
        router.push('/organizations');
        return;
      }

      if (resp.status === 400) setError((await resp.json()).message);

      if (resp.status === 500)
        setError('Some server error, please contact edgein.io support!');
    }
  }, [router]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  return (
    <DashboardLayout>
      <div className="p-5 bg-dark-100 shadow-md rounded-lg text-center">
        {!error ? (
          <p className="text-dark-500 text-lg font-semibold">
            Please wait while we verify your workplace!
          </p>
        ) : (
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VerifyWorkplace;
