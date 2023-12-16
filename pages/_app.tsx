import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState, useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Alert from "../components/Alert";
import Head from "next/head";
import toggleTheme from "../util/toggleTheme";

export const Context = createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [alertText, setAlertText] = useState("");
  useEffect(() => {
    toggleTheme();
  }, []);
  return (
    <UserProvider>
      <Head>
        <title>CryptoTracker</title>
        <meta
          name="description"
          content="CryptoTracker Nsikan Akpan"
          key="desc"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="CryptoTracker Nsikan Akpan" />
        <meta property="og:description" content="CryptoTracker Nsikan Akpan" />
        <meta name="robots" content="all" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
        <meta name="author" content="Nsikan Akpan" />
        <meta property="og:image" content="/images/logo.png" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Context.Provider
        value={{
          alertText,
          setAlertText,
        }}
      >
        <Component {...pageProps} />
        <Alert />
      </Context.Provider>
    </UserProvider>
  );
}

export default MyApp;
