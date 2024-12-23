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
        {/* HypeLab SDK Script */}
        <script
          suppressHydrationWarning={true}
          dangerouslySetInnerHTML={{
            __html: `!(function (h, y, p, e, l, a, b) {
    ((l = document.createElement(h)).async = !0),
      (l.src = y),
      (l.onload = function () {
        (a = { environment: p, propertySlug: e, ...a }), HypeLab.initialize(a);
      }),
      (b = document.getElementsByTagName(h)[0]).parentNode.insertBefore(l, b);
  })('script', 'https://api.hypelab.com/v1/scripts/hp-sdk.js?v=0', 'development', '752f3a51b9', { privacy: { disable_wallet_detection: true } });`,
          }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          crossOrigin="anonymous"></script>
      </Head>
      <body className="bg-black text-gray-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
