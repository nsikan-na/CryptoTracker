import "../styles/globals.css";

import type { AppProps } from "next/app";
import { createContext, useState, useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import toggleTheme from "../util/toggleTheme";
import Alert from "../components/Alert";
import Head from "next/head";

export const Context = createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState(false);
  const [alertText, setAlertText] = useState("");
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);
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
      </Head>
      <Context.Provider
        value={{
          currency,
          setCurrency,
          theme,
          setTheme,
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
