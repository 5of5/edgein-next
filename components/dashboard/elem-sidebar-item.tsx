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
    <button
      onClick={onClick}
      type="submit"
      className={`flex w-full items-center space-x-3 p-2.5 font-medium text-sm text-gray-300 rounded-md flex-1 transition-all hover:bg-neutral-900 ${
        isActive ? 'bg-neutral-900' : ''
      }`}>
      {IconComponent && (
        <IconComponent
          className={`w-5 h-5 ${
            isActive ? 'text-primary-500' : 'text-gray-300'
          }`}
        />
      )}
      <span className="text-sm break-all line-clamp-1">{text}</span>
    </button>
  );

  if (url.length) {
    return <ElemLink href={url}>{component}</ElemLink>;
  }

  return component;
};
