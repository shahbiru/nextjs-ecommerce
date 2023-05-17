import React from "react";

import AccountSidebar from "@/components/AccountSidebar";
import Layout from "@/components/Layout";

import styles from "./orders.module.scss";
import OrderItem from "@/components/OrderItem";
import { useRouter } from "next/router";

export default function Orders() {
  const user = true;
  const data = [  { "id": 1,    "title": "Product 1",    "price": 19.99,    "image": "https://via.placeholder.com/150"  },  {    "id": 2,    "title": "Product 2",    "price": 29.99,    "image": "https://via.placeholder.com/150"  },  {    "id": 3,    "title": "Product 3",    "price": 39.99,    "image": "https://via.placeholder.com/150"  }]


  if (!user ) useRouter().push("/login");

  return (
    <Layout noCategories>
      <AccountSidebar />
      <main className={styles.container}>
        <h1 className={styles.title}>My Orders</h1>
        <div className={styles.content}>
          {data?.length === 0 ? (
            <span>You have not any order</span>
          ) : (
            <div className={styles.orders}>
              {data?.map((item) => {
                return <OrderItem data={item} />;
              })}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
