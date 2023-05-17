import Head from "next/head";
import styles from "./cart.module.scss";

import Layout from "components/Layout";
import CartItem from "@/components/CartItem";
import React from "react";
import { addToCart } from "@/firebase/product";
import { useRouter } from "next/router";

export default function CartPage() {
  const user = true;
  const data = [  { "id": 1,    "name": "Product 1",    "size": 19.99, "count" : "2" },  {  "id": 1,    "name": "Product 1",    "size": 19.99, "count" : "2"  }]

  const cartLength = Object.keys(data).reduce((a, b) => a + data, 0);
console.log(cartLength)
  const cartItems =
    cartLength > 0
      ? Object.keys(data)
          .map((item) => {
            return data.map((size) => {
              return {
                name: item,
                size,
              };
            });
          })
          .flat(1)
      : [];

  const sizeCount = cartItems.reduce(
    (acc, value) => ({
      ...acc,
      [value.name + "__size__" + value.size]:
        (acc[value.name + "__size__" + value.size] || 0) + 1,
    }),
    {}
  );

  const cartItemsArray = [
    ...new Set(
      cartItems.filter(
        (v, i, a) =>
          a.findIndex((t) => t.name === v.name && t.size === v.size) === i
      )
    ),
  ].map((item) => {
    return { ...item, count: sizeCount[item.name + "__size__" + item.size] };
  });

  const addCartEvent = (id, size) => {
    const newCart = size
      ? {
          ...data,
          [id]: data.hasOwnProperty(id) ? [...data[id], size] : [size],
        }
      : {
          ...data,
          [id]: data.hasOwnProperty(id) ? [...data[id], "-"] : ["-"],
        };
    addToCart(newCart);
  };

  const router = useRouter();

  // if (!loading && !user && typeof window !== "undefined") router.push("/login");

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Cart</h1>
            <h4>You have 3 items in your cart</h4>
          </div>
          {cartItemsArray.map((item, index) => {
            return (
              <CartItem
                key={index}
                id="dsfs"
                size="9898"
                count="2"
                onAdd={addCartEvent}
              />
            );
          })}
        </main>
      </div>
    </Layout>
  );
}
