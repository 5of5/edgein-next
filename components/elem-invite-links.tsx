import { Menu, Transition } from '@headlessui/react';
import { ElemButton } from '@/components/elem-button';
import {
  IconShare,
  IconLink,
  IconTelegramAlt,
  IconEmail,
  IconChatBubble,
} from '@/components/icons';
import { Fragment } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { redirect_url } from '@/utils/auth';

type Props = {
  user: any;
  personSlug?: string | null | undefined;
};

export const ElemInviteLinks = ({ user }: Props) => {
  const getInviteLink = () => {
    const inviteCode = user.reference_id;
    const inviteLink = `${redirect_url()}/?invite=${inviteCode}`;
    return inviteLink;
  };

  const onTelegram = () => {
    window.open(
      `https://telegram.me/share/url?url=${getInviteLink()}&text=${
        user.display_name
      } has invited you to join EdgeIn. Help democratize web3 data! Use this link for access`,
      '_blank',
    );
  };

  const onSMS = () => {
    window.open(
      `sms:?&body=${
        user.display_name
      } has invited you to join EdgeIn. Help democratize web3 data! Use this link for access: ${getInviteLink()}`,
      '',
    );
  };

  const onEmail = () => {
    window.open(
      `mailto:?subject=${
        user.display_name
      } has invited you to join Edge In!&body=Hey there! %0D%0A %0D%0A
	      	${
            user.display_name
          } has invited you to join EdgeIn. Help democratize web3 data! EdgeIn combines highly refined automated processes, the personalization of human intelligence, and the meaningful utility of blockchain technologies, to give you an unparalleled edge in Web3. Use this link for access: ${getInviteLink()}`,
      '',
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
    { icon: IconLink, text: 'Copy Invite Link', onClick: onCopy },
    { icon: IconTelegramAlt, text: 'Invite via Telegram', onClick: onTelegram },
    { icon: IconEmail, text: 'Invite via Email', onClick: onEmail },
    { icon: IconChatBubble, text: 'Invite via SMS', onClick: onSMS },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button as="div">
          <ElemButton btn="primary">
            <IconShare className="h-5 w-5 mr-1.5" aria-hidden="true" />
            Share
          </ElemButton>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          as="nav"
          className="absolute left-0 z-10 w-56 mt-2 overflow-hidden origin-top-right bg-black rounded-lg shadow-lg lg:left-auto lg:right-0 ring-1 ring-black/5 focus:outline-none">
          {list.map(link => (
            <Menu.Item key={link.text}>
              {({ active }) => (
                <button
                  onClick={link.onClick}
                  className={`${
                    active ? 'bg-gray-50 text-primary-500' : ''
                  } flex w-full items-center px-2 py-2  hover:text-primary-500`}>
                  <link.icon className="w-5 h-5 mr-2" aria-hidden="true" />
                  {link.text}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
      <Toaster />
    </Menu>
  );
};
