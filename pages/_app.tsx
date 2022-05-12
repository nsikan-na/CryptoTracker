import "../styles/globals.css";

import type { AppProps } from "next/app";
import { createContext, useState, useEffect } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import toggleTheme from "../util/toggleTheme";
export const Context = createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [currency, setCurrency] = useState("USD");
  const [theme, setTheme] = useState(true);
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);
  return (
    <UserProvider>
      <Context.Provider value={{ currency, setCurrency, theme, setTheme }}>
        <Component {...pageProps} />
      </Context.Provider>
    </UserProvider>
  );
}

export default MyApp;
