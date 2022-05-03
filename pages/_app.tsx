import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
export const Context = createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [currency, setCurrency] = useState("USD");
  return (
    <UserProvider>
      <Context.Provider value={{ currency, setCurrency }}>
        <Component {...pageProps} />
      </Context.Provider>
    </UserProvider>
  );
}

export default MyApp;
