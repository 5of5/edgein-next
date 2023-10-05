import { ElemLogo } from './elem-logo';
import { IconLinkedIn, IconTwitter, IconTelegram, IconDiscord } from './icons';
import { ROUTES } from '@/routes';
import { ElemLink } from './elem-link';

export const TheFooter = () => {
  const currentYear = new Date().getFullYear();

  const navigation = {
    solutions: [
      { name: 'For founders', href: '#' },
      { name: 'For investors', href: '#' },
    ],
    company: [
      // { name: "About", href: "https://www.5of5.vc/about" },
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
        // icon: (props: any) => (
        //   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        //     <path
        //       fillRule="evenodd"
        //       d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        //       clipRule="evenodd"
        //     />
        //   </svg>
        // ),
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
        <div className="flex justify-between mt-12 border-t border-dark-100 pt-6">
          <div>
            <p className="text-sm text-gray-500">
              &copy; {currentYear}
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
            <ul>
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
              {/* {navigation.social.map(item => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-base hover:text-primary-500">
                    {item.name}
                  </a>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
