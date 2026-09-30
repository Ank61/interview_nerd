import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as gtag from '../lib/gtag';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Inter_Tight, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import "@/styles/globals.css";

const fontSans = Inter_Tight({ subsets: ["latin"], display: "swap" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], display: "swap" });
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#D4FF4F", contrastText: "#0a0a0a" },
    background: { default: "#0a0a0a", paper: "#111113" },
    divider: "rgba(255, 255, 255, 0.08)",
    text: { primary: "#ededef", secondary: "#a1a1aa" },
  },
  typography: { fontFamily: fontSans.style.fontFamily },
  shape: { borderRadius: 12 },
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Interview Nerd" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <style jsx global>{`
        :root {
          --font-sans: ${fontSans.style.fontFamily};
          --font-mono: ${fontMono.style.fontFamily};
          --font-serif: ${fontSerif.style.fontFamily};
        }
      `}</style>
      <SessionProvider session={session}>
        {/* The Tailwind palette is remapped to the dark theme (see
            tailwind.config.js), so the legacy `dark:` variants stay off. */}
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          enableColorScheme={false}
          disableTransitionOnChange
        >
          <MuiThemeProvider theme={muiTheme}>
            <Component {...pageProps} />
          </MuiThemeProvider>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
