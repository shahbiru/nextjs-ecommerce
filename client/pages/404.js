import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import constants from "utils/constants";

export default function ErrorPage() {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: 64 }}>404</h1>
        <h2>{constants.ERROR_TITLE}</h2>
        <Link href="/">
          <h3 style={{ cursor: "pointer", textDecoration: "underline" }}>
            {constants.CONTINUE}
          </h3>
        </Link>
      </div>
    </Layout>
  );
}
