import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Interview Nerd is a comprehensive platform to master technical interviews with 500+ curated questions and interactive practice for JavaScript, SQL, MongoDB, Python and more."
        />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#2563eb" />
        <meta property="og:site_name" content="Interview Nerd" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Interview Nerd | Master Tech Interviews" />
        <meta property="og:description" content="Practice 500+ curated interview questions and hands-on coding practice across top tech stacks." />
        <meta property="og:image" content="/vercel.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interview Nerd | Master Tech Interviews" />
        <meta name="twitter:description" content="Interactive playgrounds and curated interview questions for JS, SQL, MongoDB, Python and more." />
        <meta name="twitter:image" content="/vercel.svg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <script src="https://fpyf8.com/88/tag.min.js" data-zone="175368" async data-cfasync="false"></script>
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
