import styles from "./index.module.scss";
import constants from "utils/constants";
import ProductCard from "@/components/ProductCard/product-card";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/actions/productAction";

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  },[])
  const data = [{ "id": 1, "title": "Product 1", "price": 19.99, "image": "https://via.placeholder.com/150" }, { "id": 2, "title": "Product 2", "price": 29.99, "image": "https://via.placeholder.com/150" }, { "id": 3, "title": "Product 3", "price": 39.99, "image": "https://via.placeholder.com/150" }]
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {constants.PRODUCT}
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
  );
}
