import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
    >
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
};

export default Layout;
