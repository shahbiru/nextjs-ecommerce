import Router from "next/router";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ router, children }) => {
  const isAuthenticated = "";
  let unprotectedRoutes = "";

  const isBrowser = "";

  useEffect(() => {
    if (window) {
      const path = window.location.pathname;
      isAuthenticated = localStorage.getItem("loginToken");
      unprotectedRoutes = [
        "/resetpassword",
        "/linkedin",
        "/termsservices",
        "/privacypolicy",
      ];
      isBrowser = () => typeof window !== "undefined";
      let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
      if (!isAuthenticated && pathIsProtected) {
        Router.push("/");
      } else if (isAuthenticated && path === "/") {
        Router.push("/dashboard");
      }
    }
  }, [isAuthenticated, unprotectedRoutes, isBrowser]);

  return children;
};

export default ProtectedRoute;
