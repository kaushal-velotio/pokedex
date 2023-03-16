import Layout from "@/components/Layout";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoutes from "@/hocs/ProtectedRoutes";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ProtectedRoutes router={router}>
            <Layout title="PokeDex">
              <Component {...pageProps} />
            </Layout>
          </ProtectedRoutes>
        </Hydrate>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
