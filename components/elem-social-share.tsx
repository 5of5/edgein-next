import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { ElemButton } from '@/components/elem-button';
import {
  IconTwitterX,
  IconTelegram,
  IconLinkedInAlt,
  IconWhatsApp,
} from '@/components/icons';
import toast from 'react-hot-toast';
import { getTwitterHandle } from '@/utils';
import { ElemModal } from './elem-modal';
import { InputText } from './input-text';

type Props = {
  resourceName: string | null;
  resourceTwitterUrl: string | null;
};

export const ElemSocialShare: FC<Props> = ({
  resourceName,
  resourceTwitterUrl,
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
      icon: IconTwitterX,
      iconClass: 'bg-black',
      text: 'X',
      href: twitterShareUrl,
    },
    {
      icon: IconTelegram,
      iconClass: 'bg-[#24A0DD]',
      text: 'Telegram',
      href: telegramShareUrl,
    },
    {
      icon: IconLinkedInAlt,
      iconClass: 'bg-linkedin',
      text: 'LinkedIn',
      href: linkedInShareUrl,
    },
    {
      icon: IconWhatsApp,
      iconClass: 'bg-[#25d366]',
      text: 'WhatsApp',
      href: whatsAppShareUrl,
    },
  ];

  return (
    <>
      <ElemButton onClick={onShareButton} btn="default" roundedFull={true}>
        Share
      </ElemButton>

      <ElemModal
        isOpen={isOpen}
        onClose={onClose}
        showCloseIcon={true}
        placement="center"
        panelClass="relative w-full max-w-md bg-dark-100 rounded-lg px-6 py-3 z-10 my-10">
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
                  <item.icon
                    className={`w-full ${
                      item.icon === IconTelegram && '-ml-1'
                    }`}
                  />
                </div>
                <div className="mt-2 text-xs">{item.text}</div>
              </a>
            );
          })}
        </div>

        <div className="relative p-3 -mx-6 -mb-3 border-t border-gray-200 bg-gray-50">
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
