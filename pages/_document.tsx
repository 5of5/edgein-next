import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      className="scroll-smooth [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem] js-focus-visible font-sans antialiased">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Inter:400,500,600&lang=en&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-dark-100 text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
