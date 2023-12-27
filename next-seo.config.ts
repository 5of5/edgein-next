import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'Discover AI and Web3-focused data intelligence for success',
  titleTemplate: '%s – EdgeIn.io',
  defaultTitle: 'EdgeIn.io',
  description:
    'EdgeIn is the AI & Web3 focused data intelligence platform for reliable analysis, powerful insights, and tailored strategies for success. Get company funding data, find new prospects, and explore competitor insights.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edgein.io',
    siteName: 'EdgeIn',
    images: [
      {
        url: 'https://edgein.io/social.jpg',
        width: 800,
        height: 600,
        alt: 'EdgeIn.io',
      },
    ],
  },
  twitter: {
    handle: '@edgeinio',
    site: '@edgeinio',
    cardType: 'summary_large_image',
  },
  robotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1,
  },
  additionalLinkTags: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '76x76',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
};

export default config;
