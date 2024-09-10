import { ConfirmAdditionalMailParams } from '@/types/api';
import { Heading, Section, Text } from '@react-email/components';
import EmailButton from '../components/button';
import EmailLayout from '../components/layout';

type AdditionalEmailConfirmEmailProps = Pick<
  ConfirmAdditionalMailParams,
  'username' | 'verifyUrl'
>;

export const AdditionalEmailConfirmEmail = ({
  username,
  verifyUrl,
}: AdditionalEmailConfirmEmailProps) => {
  return (
    <EmailLayout>
      <Section className="px-[40px] py-[12px]">
        <Heading className="text-[#111827] text-[18px] leading-[24px] text-left m-0">
          Verify your email on EdgeIn
        </Heading>

        <Section>
          <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
            <strong>{username}</strong> has added you to additional emails on{' '}
            <strong>EdgeIn</strong>.
          </Text>
          <Section className="text-left mt-[32px] mb-[32px]">
            <EmailButton text="Verify your email" url={verifyUrl} />
          </Section>
        </Section>
      </Section>
    </EmailLayout>
  );
};

export default AdditionalEmailConfirmEmail;
