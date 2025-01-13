import { FC } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ElemButton } from '@/components/elem-button';
import {
  IconTelegramAlt,
  IconEmail,
  IconChatBubble,
  IconTwitterX,
  IconCopy,
} from '@/components/icons';
import { User } from '@/models/user';

type Props = {
  user: User;
  personSlug?: string | null;
};

export const ElemInviteLinks: FC<Props> = ({ user }) => {
  const getInviteLink = () => {
    const inviteCode = user.reference_id;
    const inviteLink = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${inviteCode}`;
    return inviteLink;
  };

  const onTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=${getInviteLink()}&text=${
        user.display_name
      } has invited you to join Mentibus. Help democratize Web3 data! Use this link for access`,
      '_blank',
    );
  };

  const onSMS = () => {
    window.open(
      `sms:?&body=${
        user.display_name
      } has invited you to join Mentibus. Help democratize Web3 data! Use this link for access: ${getInviteLink()}`,
      '',
    );
  };

  const onEmail = () => {
    window.open(
      `mailto:?subject=${
        user.display_name
      } has invited you to join Mentibus.&body=Hey there! %0D%0A %0D%0A
	      	${
            user.display_name
          } has invited you to join Mentibus. Help democratize Web3 data! Mentibus combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3. Use this link for access: ${getInviteLink()}`,
      '',
    );
  };

  const onTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${getInviteLink()}&text=Help democratize Web3 data on @edgeinio. Sign up for free!`,
      '_blank',
    );
  };

  const onCopy = async () => {
    navigator.clipboard.writeText(getInviteLink());
    toast.custom(
      t => (
        <div
          className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
          Link copied to clipboard
        </div>
      ),
      {
        duration: 3000,
        position: 'top-center',
      },
    );
  };

  const list = [
    { icon: IconTwitterX, text: 'Twitter', onClick: onTwitter },
    { icon: IconTelegramAlt, text: 'Telegram', onClick: onTelegram },
    { icon: IconEmail, text: 'Email', onClick: onEmail },
    { icon: IconChatBubble, text: 'SMS', onClick: onSMS },
  ];

  return (
    <div className="relative p-5 bg-black border  border-neutral-700 rounded-lg">
      <h3 className="font-medium">Share your referral link</h3>
      <p className="text-sm text-gray-500">
        Copy and paste it or send it directly to your friends
      </p>
      <div className="relative mt-2">
        <div className="absolute z-10 right-1 top-2">
          <ElemButton
            onClick={() => onCopy()}
            btn="default"
            size="sm"
            className="!px-1.5 rounded-lg">
            <IconCopy className="w-5 h-5" />
          </ElemButton>
        </div>
        <input
          className={`w-full mt-1 px-3 py-2 text-dark-500 relative bg-black rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400`}
          type="text"
          name="share"
          value={getInviteLink()}
          readOnly
        />
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4 lg:space-x-2 lg:gap-0">
        <div className="text-sm">Share on:</div>
        {list.map(link => (
          <div key={link.text}>
            <ElemButton
              onClick={link.onClick}
              btn="default"
              size="sm"
              roundedFull={true}
              className="px-2.5">
              <link.icon className="w-5 h-5 mr-2" aria-hidden="true" />
              {link.text}
            </ElemButton>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};
