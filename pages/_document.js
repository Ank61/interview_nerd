import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Google Tag Manager Script */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-VVX254SWME"
      ></Script>
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VVX254SWME');
        `}
      </Script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
