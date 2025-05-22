import React, { FC, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { ElemButton } from '@/components/elem-button';
import { Twitter, MessagesSquare, Linkedin, Share2, Phone } from 'lucide-react';
import { LucideIconWrapper } from '@/components/icons-wrapper';
import { IconProps } from '@/components/icons';
import toast from 'react-hot-toast';
import { getTwitterHandle } from '@/utils';
import { ElemModal } from './elem-modal';
import { InputText } from './input-text';

// Wrap Lucide icons to match our IconProps interface
const WrappedTwitter = LucideIconWrapper(Twitter);
const WrappedMessagesSquare = LucideIconWrapper(MessagesSquare);
const WrappedLinkedin = LucideIconWrapper(Linkedin);
const WrappedShare2 = LucideIconWrapper(Share2);
const WrappedPhone = LucideIconWrapper(Phone);

type Props = {
  resourceName: string | null;
  resourceTwitterUrl: string | null;
  buttonStyle?:
    | 'primary'
    | 'ol-tertiary'
    | 'ol-primary'
    | 'ol-white'
    | 'danger'
    | 'dark'
    | 'transparent'
    | 'gray'
    | 'default'
    | 'white'
    | 'black-to-white'
    | '';
  icon?: ReactNode;
};

export const ElemSocialShare: FC<Props> = ({
  resourceName,
  resourceTwitterUrl,
  buttonStyle = 'default',
  icon,
}) => {
  const router = useRouter();
  const pageUrl = `https://edgein.io${router.asPath}`;

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const onShareButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(true);
  };

  const onCopy = async (pageUrl: string) => {
    navigator.clipboard.writeText(pageUrl);
    setIsCopied(true);
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

  const onClose = () => {
    setIsOpen(false);
    setIsCopied(false);
  };

  const twitterContent = `Check out ${
    resourceTwitterUrl ? getTwitterHandle(resourceTwitterUrl) : resourceName
  } on @EdgeInio: ${pageUrl}`;

  const content = `Check out ${resourceName} on EdgeIn.io`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    twitterContent.trim(),
  )}`;

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    pageUrl,
  )}&text=${encodeURIComponent(content.trim())}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    pageUrl,
  )}`;

  const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    content.trim(),
  )}%0a${encodeURIComponent(pageUrl)}`;

  const shareLinks = [
    {
      icon: WrappedTwitter,
      iconClass: 'bg-black',
      text: 'X',
      href: twitterShareUrl,
    },
    {
      icon: WrappedMessagesSquare,
      iconClass: 'bg-[#24A0DD]',
      text: 'Telegram',
      href: telegramShareUrl,
    },
    {
      icon: WrappedLinkedin,
      iconClass: 'bg-linkedin',
      text: 'LinkedIn',
      href: linkedInShareUrl,
    },
    {
      icon: WrappedPhone,
      iconClass: 'bg-[#25d366]',
      text: 'WhatsApp',
      href: whatsAppShareUrl,
    },
  ];

  return (
    <>
      <ElemButton
        onClick={onShareButton}
        btn={buttonStyle}
        roundedFull={true}
        className="px-2.5 flex items-center">
        {icon || <WrappedShare2 className="w-4 h-4 mr-1" />}
        <span>Share</span>
      </ElemButton>

      <ElemModal
        isOpen={isOpen}
        onClose={onClose}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-md bg-black rounded-lg px-6 py-3 z-10 my-10">
        <div>
          <h2 className="text-xl font-medium">Share</h2>
        </div>

        <div className="flex justify-center py-3 mb-3 space-x-4 gap-y-3">
          {shareLinks?.map((item, index) => {
            return (
              <a
                key={index}
                className="flex flex-col items-center justify-center"
                href={item.href}
                target="_blank"
                rel="noreferrer">
                <div
                  className={`w-16 h-16 p-4 flex items-center justify-center rounded-full text-white hover:opacity-75 ${item.iconClass}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="mt-2 text-xs">{item.text}</div>
              </a>
            );
          })}
        </div>

        <div className="relative p-3 -mx-6 -mb-3 border-t  border-neutral-700 bg-gray-50">
          <div className="absolute z-10 pr-1 right-2.5 top-3.5">
            <ElemButton
              onClick={() => onCopy(pageUrl)}
              btn="primary"
              size="sm"
              roundedFull={true}
              className="px-2.5">
              {isCopied ? 'Copied' : 'Copy'}
            </ElemButton>
          </div>

          <InputText
            type="text"
            onChange={() => {}}
            value={pageUrl}
            required={true}
            name="share"
            readOnly={true}
            className="!mt-0 focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </ElemModal>
    </>
  );
};
