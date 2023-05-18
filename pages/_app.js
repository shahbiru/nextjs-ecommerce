import "@/styles/globals.css";
import Head from "next/head";
import constants from "utils/constants";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{constants.TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
