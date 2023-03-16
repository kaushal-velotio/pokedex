import Head from "next/head";
import React, { ReactNode } from "react";
import Header from "./Header";
const Layout = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A list of all pokemons" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
      >
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
      </div>
    </>
  );
};

export default Layout;
