import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      className="scroll-smooth [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem] js-focus-visible font-sans antialiased"
    >
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:400,500,600&lang=en&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-white text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
