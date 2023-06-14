import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html
      lang="en"
      className="scroll-smooth [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem] js-focus-visible font-sans antialiased"
    >
      <Head />
      <body className="bg-gray-50 custom-text-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
