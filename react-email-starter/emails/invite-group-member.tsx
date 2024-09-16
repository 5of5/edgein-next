import { InviteGroupMemberMailParams } from '@/types/api';
import { Heading, Section, Text } from '@react-email/components';
import EmailButton from '../components/button';
import EmailLayout from '../components/layout';

type InviteGroupMemberEmailProps = Pick<
  InviteGroupMemberMailParams,
  | 'isExistedUser'
  | 'senderName'
  | 'recipientName'
  | 'groupName'
  | 'groupUrl'
  | 'signUpUrl'
>;

export const InviteGroupMemberEmail = ({
  isExistedUser = false,
  senderName,
  recipientName = '',
  groupName,
  groupUrl = '',
  signUpUrl = '',
}: InviteGroupMemberEmailProps) => {
  return (
    <EmailLayout>
      <Section className="px-[40px] py-[12px]">
        <Heading className="text-[18px] leading-[24px] font-normal text-left p-0 mx-0 mt-0">
          Join <strong>{groupName}</strong> on <strong>EdgeIn</strong>.
        </Heading>

        {isExistedUser ? (
          <Section>
            <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0">
              Hi {recipientName},
            </Text>
            <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
              <span className="inline font-bold">{senderName}</span> has invited
              you to join group{' '}
              <span className="inline font-bold">{groupName}</span>.
            </Text>
            <Section className="text-left mt-[32px] mb-[32px]">
              <EmailButton text="Join group" url={groupUrl} />
            </Section>
          </Section>
        ) : (
          <Section>
            <Text className="text-[#111827] text-[18px] leading-[24px] text-left m-0 mt-1">
              <span className="inline font-bold">{senderName}</span> has invited
              you to join group{' '}
              <span className="inline font-bold">{groupName}</span>.
            </Text>
            <Section className="text-left mt-[32px] mb-[32px]">
              <EmailButton text="Join group" url={signUpUrl} />
            </Section>
          </Section>
        )}
      </Section>
    </EmailLayout>
  );
};

export default InviteGroupMemberEmail;
