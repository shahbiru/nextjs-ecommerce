import "@/styles/globals.css";
import Head from "next/head";
import constants from "utils/constants";
import Layout from "@/components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";


function MyApp({ Component, pageProps ,router}) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>{constants.TITLE}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ToastContainer autoClose={2000} />
        <ProtectedRoute router={router}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoute>
      </Provider>
    </>
  );
}

export default MyApp;
