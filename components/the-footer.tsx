import { ElemLogo } from './elem-logo';
import { IconLinkedIn, IconTwitter, IconTelegram, IconDiscord } from './icons';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';

export const navigation = {
  solutions: [
    { name: 'For founders', href: '#' },
    { name: 'For investors', href: '#' },
  ],
  company: [
    { name: 'Team', href: ROUTES.TEAM },
    { name: 'Pricing', href: ROUTES.PRICING },
    { name: 'Brand Assets', href: ROUTES.BRAND_ASSETS },
  ],
  resources: [
    { name: 'Contact', href: ROUTES.CONTACT },
    { name: 'Support', href: ROUTES.SUPPORT },
    { name: 'Press', href: 'mailto:press@edgein.io' },
  ],
  legal: [
    { name: 'Privacy', href: ROUTES.PRIVACY },
    { name: 'Terms', href: ROUTES.TERMS },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/EdgeInio',
      icon: IconTwitter,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/edgein/',
      icon: IconLinkedIn,
    },
    {
      name: 'Telegram',
      href: 'https://t.me/+ECJseGCnu_xhZTky',
      icon: IconTelegram,
    },
  ],
};

export const TheFooter = () => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <ElemLink href="/">
              <ElemLogo
                mode="logo"
                className="h-8 w-auto transition duration-200 ease-in-out scale-90 hover:scale-95 scheme-standard"
              />
            </ElemLink>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div></div>
              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base hover:underline">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-medium tracking-wider uppercase">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.resources.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base hover:underline">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-medium tracking-wider uppercase">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base hover:underline">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between mt-12 border-t border-dark-100 pt-6 sm:flex-row">
          <div className="mb-6 sm:mb-0">
            <p className="text-sm text-gray-500">
              Copyright &copy; {new Date().getFullYear()}
              <a
                href="https://www.edgein.io/"
                className="px-1 hover:text-primary-500"
              >
                EdgeIn Inc.
              </a>
              All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500">
              1319 Leavenworth San Francisco CA United States.
            </p>
          </div>
          <div>
            <div className="flex space-x-4 md:order-2">
              {navigation.social.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
