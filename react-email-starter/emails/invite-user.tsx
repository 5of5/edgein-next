import { Section, Text } from '@react-email/components';
import { InviteToEdgeInMailParams } from '@/types/api';
import EmailButton from '../components/button';
import EmailLayout from '../components/layout';

type InviteUserEmailProps = Pick<
  InviteToEdgeInMailParams,
  'senderName' | 'senderEmail' | 'signUpUrl'
>;

const InviteUserEmail = ({
  senderName,
  senderEmail,
  signUpUrl,
}: InviteUserEmailProps) => {
  return (
    <EmailLayout>
      <Section className="px-[40px] py-[12px]">
        <Text className="text-[#525f7f] text-[18px] leading-[24px] text-center m-0 mt-1">
          <strong>{senderName}</strong> ({senderEmail}) has invited you to use{' '}
          <strong>EdgeIn</strong>.
        </Text>

        <Section className="text-center mt-[32px] mb-[32px]">
          <EmailButton text="Accept invitation" url={signUpUrl} />
        </Section>
      </Section>
    </EmailLayout>
  );
};

export default InviteUserEmail;
