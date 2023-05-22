import styles from "../index.module.scss";
import constants from "utils/constants";
import ProductCard from "@/components/ProductCard/product-card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productAction";
import { getCart } from "redux/actions/cartAction";

export default function Product() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(getCart(user._id))
  },[])

  const product = useSelector((state) => state?.product?.products)

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
            product.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  brand={product.brand}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
}
