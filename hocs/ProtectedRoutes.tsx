import { protectedRoutes, unprotectedRoutes } from "@/constants/const";
import { useAuth } from "@/context/AuthContext";
import { Router } from "next/router";
import React, { ReactNode } from "react";
const isBrowser = () => typeof window !== "undefined";
const ProtectedRoutes = ({
  router,
  children,
}: {
  router: Router;
  children: ReactNode;
}) => {
  const { user, userLoaded } = useAuth();
  const isAuthenticated = user.email;
  let isProtectedRoute = protectedRoutes.indexOf(router.pathname) !== -1;
  let isUnProtectedRoute = unprotectedRoutes.indexOf(router.pathname) !== -1;
  //if logged in and accessing not protected routes -> goto /dashboard
  if (isBrowser() && userLoaded && isAuthenticated && isUnProtectedRoute) {
    router.push("/pokemons");
  }
  //if not logged in and accessing protected routes -> goto /login
  else if (isBrowser() && userLoaded && !isAuthenticated && isProtectedRoute) {
    router.push("/login");
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
