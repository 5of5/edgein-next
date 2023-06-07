import { ElemButton } from '@/components/elem-button';
import {
  IconShare,
  IconLink,
  IconTelegramAlt,
  IconTelegram,
  IconEmail,
  IconChatBubble,
  IconTwitter,
} from '@/components/icons';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  user: any;
  personSlug?: string | null | undefined;
};

export const ElemInviteLinks = ({ user, personSlug }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const getInviteLink = () => {
    const inviteCode = personSlug || user.reference_id;
    const inviteLink = `${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}/?invite=${inviteCode}`;
    return inviteLink;
  };

  const onTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=${getInviteLink()}&text=${
        user.display_name
      } has invited you to join EdgeIn. Help democratize Web3 data! Use this link for access`,
      '_blank',
    );
  };

  const onSMS = () => {
    window.open(
      `sms:?&body=${
        user.display_name
      } has invited you to join EdgeIn. Help democratize Web3 data! Use this link for access: ${getInviteLink()}`,
      '',
    );
  };

  const onEmail = () => {
    window.open(
      `mailto:?subject=${
        user.display_name
      } has invited you to join EdgeIn.&body=Hey there! %0D%0A %0D%0A
	      	${
            user.display_name
          } has invited you to join EdgeIn. Help democratize Web3 data! EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3. Use this link for access: ${getInviteLink()}`,
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
    setIsCopied(true);
    toast.custom(
      t => (
        <div
          className={`bg-slate-800 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
          Copied Invite Link
        </div>
      ),
      {
        duration: 3000,
        position: 'top-center',
      },
    );
  };

  const list = [
    { icon: IconTwitter, text: 'Twitter', onClick: onTwitter },
    { icon: IconTelegramAlt, text: 'Telegram', onClick: onTelegram },
    { icon: IconEmail, text: 'Email', onClick: onEmail },
    { icon: IconChatBubble, text: 'SMS', onClick: onSMS },
  ];

  return (
    <div>
      <h3 className="font-bold mt-3">Your referral link</h3>
      <div className="relative">
        <div className="absolute right-1 top-1 z-10 pt-1 pr-1">
          <ElemButton
            onClick={() => onCopy()}
            btn="slate"
            size="sm"
            roundedFull={true}
            className="px-2.5">
            {isCopied ? 'Link Copied' : 'Copy Link'}
          </ElemButton>
        </div>
        <input
          className={`w-full mt-1 px-3 py-2 text-dark-500 relative bg-white rounded-md border-none outline-none ring-1 ring-slate-300 hover:ring-slate-400 focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400`}
          type="text"
          name="share"
          value={getInviteLink()}
          readOnly
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 lg:space-x-2 lg:gap-0">
        <div>Share:</div>
        {list.map(link => (
          <div key={link.text}>
            <ElemButton
              onClick={link.onClick}
              btn="slate"
              size="sm"
              roundedFull={true}
              className="px-2.5">
              <link.icon className="mr-2 h-5 w-5" aria-hidden="true" />
              {link.text}
            </ElemButton>
          </div>
        ))}
      </div>
    </div>
  );
};
