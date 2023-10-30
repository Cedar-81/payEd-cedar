import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import "../styles/globals.css";
// import { AppProvider } from "../context/context";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: any) {
  const activeChain = "mumbai";
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
          activeChain={activeChain}
        >
          <MantineProvider theme={theme}>
            <Head>
              <title>Mantine Template</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <Component {...pageProps} />
          </MantineProvider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
