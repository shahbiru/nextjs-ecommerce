import { useRouter } from "next/router";
// import Conditionalheader from "../components/layout/Conditionalheader";
import React from "react";

const customError = () => {
  const router = useRouter();
  
  return (
    <>
      {/* <Conditionalheader /> */}
      <div className="main-page-content inner-page-main-content page-not-found">
        <section className="page-not-found-wrapper">
          <div className="not-found">
            <div className="notfound-404">
              <h1 className="page-not-found-title">404</h1>
              <h5 className="not-found-subtitle">Page not found</h5>
              <p>
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable.
              </p>
            </div>
            <button className="redirect-btn" onClick={() => router.push("/dashboard")}>
              Go to Homepage
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default customError;
