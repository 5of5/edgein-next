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
        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0 mt-0">
          Join <strong>{groupName}</strong> on <strong>EdgeIn</strong>
        </Heading>
        {isExistedUser ? (
          <Section>
            <Text className="text-[#525f7f] text-[18px] leading-[24px] text-center m-0">
              Hi {recipientName},
            </Text>
            <Text className="text-[#525f7f] text-[18px] leading-[24px] text-center m-0 mt-1">
              <strong>{senderName}</strong> has invited you to join group{' '}
              <strong>{groupName}</strong> on <strong>EdgeIn</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <EmailButton text="View the group" url={groupUrl} />
            </Section>
          </Section>
        ) : (
          <Section>
            <Text className="text-[#525f7f] text-[18px] leading-[24px] text-center m-0 mt-1">
              <strong>{senderName}</strong> has invited you to join group{' '}
              <strong>{groupName}</strong> on <strong>EdgeIn</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <EmailButton text="Join now" url={signUpUrl} />
            </Section>
          </Section>
        )}
      </Section>
    </EmailLayout>
  );
};

export default InviteGroupMemberEmail;
