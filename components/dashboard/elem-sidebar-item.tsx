import { FC } from 'react';
import { useRouter } from 'next/router';
import { IconProps } from '@/components/icons';
import { ElemLink } from '../elem-link';

type Props = {
  IconComponent?: FC<IconProps>;
  text: string;
  url?: string | undefined;
  onClick?: () => void;
};

export const ElemSidebarItem: FC<Props> = ({
  IconComponent,
  text,
  url = '',
  onClick,
}) => {
  const router = useRouter();

  const isActive = url.length ? router.asPath.includes(url) : false;

  const component = (
    <div
      className={`relative flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-300 rounded-full flex-1 transition-all ${
        isActive
          ? 'bg-gradient-to-r from-red-500 via-blue-500 to-red-400 p-[1px] my-3' // Gradient as border
          :'p-[1px] px-[px] my-5'
      }`}>
      <button
        onClick={onClick}
        type="submit"
        className={`flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-300 rounded-full ${
          isActive ? `bg-gradient-to-r from-[#222222] to-[#3a3a3a]` : ''
        } flex-1 transition-all hover:bg-neutral-900`}>
        {IconComponent && (
          <IconComponent
            className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#838383]'}`}
          />
        )}
        <span className="text-sm break-all line-clamp-1 text-[#a1a1a1]">
          {text}
        </span>
      </button>
    </div>
  );

  if (url.length) {
    return <ElemLink href={url}>{component}</ElemLink>;
  }

  return component;
};
