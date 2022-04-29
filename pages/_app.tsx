import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
export const Context = createContext({});
function MyApp({ Component, pageProps }: AppProps) {
  const [currency, setCurrency] = useState("USD");
  return (
    <Context.Provider value={{ currency, setCurrency }}>
      <Component {...pageProps} />
    </Context.Provider>
  );
}

export default MyApp;
