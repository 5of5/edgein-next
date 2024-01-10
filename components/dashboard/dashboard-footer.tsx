import { PropsWithChildren, FC } from 'react';
import { navigation } from '../the-footer';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
};

export const DashboardFooter: FC<PropsWithChildren<Props>> = ({
  className = '',
}) => {
  return (
    <footer className={`px-4 sm:px-6 md:px-8 ${className}`}>
      <div className="justify-between mt-12 border-t border-dark-100 pt-6 sm:flex">
        <div className="text-sm text-gray-500 mb-6 sm:mb-0 sm:flex sm:items-start">
          <div className="mb-2 sm:mb-0">
            <p>
              Copyright &copy; {new Date().getFullYear()} EdgeIn Inc. All Rights
              Reserved.
            </p>
            <p>1319 Leavenworth San Francisco CA United States.</p>
          </div>

          <p className="flex flex-col gap-2 sm:ml-4 sm:pl-4 sm:border-l sm:border-dark-100 sm:flex-row sm:gap-4">
            {navigation.legal.map(item => (
              <ElemLink
                key={item.name}
                href={item.href}
                className="block hover:underline"
              >
                {item.name}
              </ElemLink>
            ))}
          </p>
        </div>

        <div>
          <ul className="flex space-x-4 md:order-2">
            {navigation.social.map(item => (
              <ElemLink
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </ElemLink>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
