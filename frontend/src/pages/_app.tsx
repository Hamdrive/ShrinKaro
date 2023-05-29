import Logo from "@/components/Logo";
import "../styles/global.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* <link rel="canonical" href={`${query}`} /> */}
        <link rel="icon" href="../assets/arrowSolid.svg" />
        <title>ShrinKaro</title>
        <meta property="og:title" content="ShrinKaro" />
        <meta property="og:description" content="Shrink your links in one go" />
        <meta property="og:url" content="shrinkaro.vercel.app" />
        <meta name="og:site_name" content="ShrinKaro" />
        <meta property="og:image" content="../assets/arrowSolid.svg" />
        <meta name="twitter:title" content="ShrinKaro" />
        <meta
          name="twitter:description"
          content="Shrink your links in one go"
        />
        <meta name="twitter:image:src" content="../assets/arrowSolid.svg" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-center gap-24 px-4 sm:px-0 ${inter.className}`}
      >
        <Logo />
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
