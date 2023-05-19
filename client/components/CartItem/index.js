import React from "react";
import styles from "./cart-item.module.scss";
import constants from "utils/constants";

export default function CartItem({ id, size, count, onAdd }) {

  const data = {brand: "aaa",information:"adwasda",price:"13",product_name:"SAdas",sale_price:"12",photos:"https://via.placeholder.com/450"}


  return (
    <>
    <div className={styles.container}>
      <img src={data?.photos} className={styles.image} loading="lazy" />
      <div className={styles.textContainer}>
        <h4>{data?.product_name || ""}</h4>
        <span>{constants.SIZE}: {size || "-"}</span>
      </div>
      <span className={styles.price}>{data?.sale_price * count || "0"}$</span>
      <div className={styles.buttons}>
        <button>-</button>
        <span>{count || "0"}</span>
        <button onClick={() => onAdd(id, size)}>+</button>
      </div>
    </div>
    <div className={styles.cartTotal}>
      <h4 className={styles.cartTotalLabel}>Total:</h4>
      <div className={styles.cartTotalPrice}>$ <span className={styles.cartPrice}>500</span></div>
    </div>
    </>
  );
}
