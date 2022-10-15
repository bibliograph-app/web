import "~/styles/globals.css";

import clsx from "clsx";
import type { AppProps } from "next/app";
import React from "react";

import { GlobalNav } from "~/components/GlobalNav";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className={clsx(["min-h-screen"])}>
      <GlobalNav className={clsx(["h-[64px]"])} />
      <div className={clsx(["h-[calc(100vh-64px)]"])}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
