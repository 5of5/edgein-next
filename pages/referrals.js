import { SendReferralEmail } from '@/components/SendReferralEmail';

const ReferralsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Referrals and Points</h1>
      <SendReferralEmail />
    </div>
  );
};

export default ReferralsPage;
