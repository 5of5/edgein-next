import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ElemButton } from '@/components/elem-button';
import { IconBadgeCheck, IconContributor } from '@/components/icons';
import { ROUTES } from '@/routes';
import { ElemModal } from './elem-modal';

type Props = {
  show: boolean;
  onClose: () => void;
};

export const UsageModal: React.FC<Props> = (props: Props) => {
  const router = useRouter();

  useEffect(() => {}, [props.show]);

  const onSignUp = () => {
    props.onClose();
    router.push(ROUTES.SIGN_IN);
  };

  const onClose = () => {
    props.onClose();
  };

  const features = [
    'Unlimited companies',
    'Unlimited investors',
    'Unlimited people',
    'Unlimited events',
    'Unlimited news',
    'Unlimited search',
    'Create custom lists',
    'Create custom groups',
    'Save notes on organizations',
    'Express your sentiments towards organizations',
    'Explore reactions of the web3 community',
  ];

  return (
    <>
      <ElemModal
        isOpen={props.show}
        onClose={onClose}
        showCloseIcon={true}
        panelClass="w-full max-w-2xl bg-black rounded-lg p-8">
        <h2 className="text-xl font-medium lg:text-2xl">
          You ran out of EdgeIn page views. Sign up to keep going and access
          more than 65,000 Web3 profiles.
        </h2>

        <div className="hidden md:block">
          <h3 className="mt-8 font-medium">Get access to:</h3>
          <ul className="grid gap-2 mt-2 sm:grid-cols-2">
            {features.map((feature, index) => (
              <li className="flex items-start" key={index}>
                <IconBadgeCheck className="w-8 h-8 mr-1 shrink-0 text-primary-500" />
                <div className="pt-1">{feature}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 mt-8">
          <ElemButton className="" onClick={onSignUp} btn="primary" size="lg">
            <IconContributor className="w-5 h-5 mr-1" title="Free Access" />
            Sign up free
          </ElemButton>
          <div>
            Already have an account?{' '}
            <ElemButton
              onClick={onSignUp}
              className="!py-0 !px-0 text-primary-500">
              Log in
            </ElemButton>
          </div>
        </div>
      </ElemModal>
    </>
  );
};
