import "@/styles/globals.css";
import Head from "next/head";
import constants from "utils/constants";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
      <Head>
        <title>{constants.TITLE}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
