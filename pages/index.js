import Head from "next/head";
import styles from "./index.module.scss";
import Layout from "components/Layout";
import ProductCard from "@/components/ProductCard/product-card";

export default function Home() {
const data = [  { "id": 1,    "title": "Product 1",    "price": 19.99,    "image": "https://via.placeholder.com/150"  },  {    "id": 2,    "title": "Product 2",    "price": 29.99,    "image": "https://via.placeholder.com/150"  },  {    "id": 3,    "title": "Product 3",    "price": 39.99,    "image": "https://via.placeholder.com/150"  }]
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Product
            </h1>
          </div>
          <div className={styles.products}>
            {
              data.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    brand={product.title}
                    name={product.title}
                    image={product.image}
                    price={product.price}
                    sale_price={product.price}
                  />
                );
              })}
          </div>
        </main>
      </div>
    </Layout>
  );
}
