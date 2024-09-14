import { Section, Text, Link } from '@react-email/components';
import { InviteToEdgeInMailParams } from '@/types/api';
import EmailButton from '../components/button';
import EmailLayout from '../components/layout';

type InviteUserEmailProps = Pick<
  InviteToEdgeInMailParams,
  | 'isExistedUser'
  | 'senderName'
  | 'senderEmail'
  | 'signUpUrl'
  | 'organizationName'
>;

const InviteUserEmail = ({
  isExistedUser,
  senderName,
  senderEmail,
  signUpUrl,
  organizationName,
}: InviteUserEmailProps) => {
  return (
    <EmailLayout>
      <Section className="px-[40px] py-[12px]">
        <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mb-4">
          Hi,
        </Text>

        {isExistedUser ? (
          <Section>
            <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
              <strong>{senderName}</strong> ({senderEmail}) from
              {organizationName} is inviting you to claim profile on{' '}
              <Link
                href="https://edgein.io/"
                target="_blank"
                className="text-[#111827] no-underline">
                <strong>EdgeIn</strong>
              </Link>{' '}
              - the leading platform for Web3 intelligence.
            </Text>
            <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-4">
              Add your company and founder data for free and join the rest of
              the {organizationName} portfolio today.
            </Text>
          </Section>
        ) : (
          <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
            <strong>{senderName}</strong> ({senderEmail}) has invited you to
            claim your professional profile on{' '}
            <Link
              href="https://edgein.io/"
              target="_blank"
              className="text-[#111827] no-underline">
              <strong>EdgeIn</strong>
            </Link>{' '}
            - the leading platform for Web3 intelligence, including over 50
            million data points on companies, projects, investors, events and
            news, giving you the edge you need.
          </Text>
        )}
        <Section className="text-left mt-[32px] mb-[32px]">
          <EmailButton text="Accept the invitation" url={signUpUrl} />
        </Section>
      </Section>
    </EmailLayout>
  );
};

export default InviteUserEmail;
