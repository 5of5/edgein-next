import { ResourceVerificationMailParams } from '@/types/api';
import { Heading, Section, Text } from '@react-email/components';
import EmailButton from '../components/button';
import EmailLayout from '../components/layout';

type ResourceVerificationEmailProps = Pick<
  ResourceVerificationMailParams,
  'companyName' | 'username' | 'verifyUrl'
>;

export const ResourceVerificationEmail = ({
  companyName,
  username,
  verifyUrl,
}: ResourceVerificationEmailProps) => {
  return (
    <EmailLayout>
      <Section className="px-[40px] py-[12px]">
        <Heading className="text-[#111827] text-[18px] leading-[24px] text-left m-0">
          Hi {username},
        </Heading>
        <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
          Please verify you work for <strong>{companyName}</strong>.
        </Text>
        <Section className="text-left mt-[32px] mb-[32px]">
          <EmailButton text="Verify now" url={verifyUrl} />
        </Section>
      </Section>
    </EmailLayout>
  );
};

export default ResourceVerificationEmail;
