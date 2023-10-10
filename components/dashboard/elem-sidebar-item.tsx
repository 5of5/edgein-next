import { FC } from 'react';
import { useRouter } from 'next/router';
import { IconProps } from '@/components/icons';
import { ElemLink } from '../elem-link';

type Props = {
  url: string;
  text: string;
  IconComponent: FC<IconProps>;
};

export const ElemSidebarItem: FC<Props> = ({ url, text, IconComponent }) => {
  const router = useRouter();

  const isActive = router.asPath.includes(url);

  return (
    <ElemLink
      href={url}
      className={`${
        isActive ? 'bg-gray-100' : ''
      } flex items-center space-x-3 p-2.5 font-medium text-sm text-gray-900 rounded-md flex-1 transition-all hover:bg-gray-100`}
    >
      <IconComponent
        className={`w-5 h-5 ${isActive ? 'text-primary-500' : 'text-gray-900'}`}
      />
      <span className="text-sm">{text}</span>
    </ElemLink>
  );
};
