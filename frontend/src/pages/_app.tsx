import Logo from "@/components/Logo";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>ShrinKaro</title>
        <meta property="og:title" content="ShrinKaro" />
        <meta property="og:description" content="Shrink your links in one go" />
        <meta property="og:url" content="shrinkaro.vercel.app" />
        <meta name="og:site_name" content="ShrinKaro" />
        <meta property="og:image" content="/OG.png" />
        <meta name="twitter:title" content="ShrinKaro" />
        <meta
          name="twitter:description"
          content="Shrink your links in one go"
        />
        <meta name="twitter:image:src" content="/OG.png" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center gap-24 px-4 sm:px-0 ${inter.className}`}
      >
        <Logo />
        <Component {...pageProps} />
      </main>
      <Footer />
      <Analytics />
    </>
  );
}
