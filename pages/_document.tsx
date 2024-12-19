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
        <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
     crossOrigin="anonymous"></script>
      </Head>
      <body className="bg-black text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
