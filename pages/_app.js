import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";


export default function MyApp(props) {
  const { Component, pageProps, router, loading } = props;
  const title = "Youni";

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content={title} />
          <link rel="favicon icon" href="/static/favicon.png" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6596882406101886"
            crossorigin="anonymous"
          ></script>
        </Head> 
        <p>Hello  WOrld</p>    
      </Provider>
    </>
  );
}