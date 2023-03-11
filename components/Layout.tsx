import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
    >
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
