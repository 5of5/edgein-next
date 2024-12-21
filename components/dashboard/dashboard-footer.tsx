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
    <footer className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="justify-between py-6 my-12 border-t  border-neutral-700 sm:flex">
        <div className="flex flex-wrap mb-6 mr-0 text-sm text-gray-500 gap-x-6 gap-y-2 sm:mb-0 sm:mr-3 sm:items-start">
          <p>
            Copyright &copy; {new Date().getFullYear()} EdgeIn Inc. All Rights
            Reserved. 1319 Leavenworth San Francisco CA United States.
          </p>

          {navigation.legal.map(item => (
            <ElemLink
              key={item.name}
              href={item.href}
              className="block hover:underline">
              {item.name}
            </ElemLink>
          ))}
        </div>

        <div>
          <ul className="flex space-x-4 md:order-2">
            {navigation.social.map(item => (
              <ElemLink
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="w-6 h-6" aria-hidden="true" />
              </ElemLink>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
