import { ElemLogo } from './elem-logo';
import {
  IconLinkedIn,
  IconTwitter,
  IconTelegram,
  IconDiscord,
  IconMedium,
} from './icons';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';

export const navigation = {
  // solutions: [
  //   { name: 'For founders', href: '#' },
  //   { name: 'For investors', href: '#' },
  // ],
  company: [],
  resources: [
    { name: 'Pricing', href: ROUTES.PRICING },
    { name: 'FAQs', href: ROUTES.FAQ },
    { name: 'Support', href: ROUTES.SUPPORT },
    { name: 'Blog', href: 'https://medium.com/@edgeinio' },
    { name: 'Contact', href: ROUTES.CONTACT },
    { name: 'Press', href: 'mailto:press@edgein.io' },
    { name: 'Team', href: ROUTES.TEAM },
    { name: 'Brand Assets', href: ROUTES.BRAND_ASSETS },
  ],
  legal: [
    { name: 'Privacy Policy', href: ROUTES.PRIVACY },
    { name: 'Terms of Service', href: ROUTES.TERMS },
  ],
  social: [
    {
      name: 'Medium',
      href: 'https://medium.com/@edgeinio',
      icon: IconMedium,
    },
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
    <footer className="bg-white mb-14 lg:mb-0" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <ElemLink href="/">
              <ElemLogo
                mode="logo"
                className="w-auto h-8 transition duration-200 ease-in-out scale-90 hover:scale-95 scheme-standard"
              />
            </ElemLink>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-12 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div></div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium tracking-wider uppercase">
                  Resources
                </h3>
                <ul role="list" className="grid grid-cols-2 gap-2 mt-4">
                  {navigation.resources.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm hover:underline">
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
                <ul role="list" className="grid gap-2 mt-4">
                  {navigation.legal.map(item => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm hover:underline">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-6 mt-12 border-t border-dark-100 sm:flex-row">
          <div className="mb-6 sm:mb-0">
            <p className="text-sm text-gray-500">
              Copyright &copy; {new Date().getFullYear()}
              <a
                href="https://www.edgein.io/"
                className="px-1 hover:text-primary-500">
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
                  className="hover:text-gray-500">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
