import React from "react";
import styles from "./cart-item.module.scss";
import constants from "utils/constants";

export default function CartItem({ id, name, brand, count, price, img, onAdd }) {

  const data = {brand: "aaa",information:"adwasda",price:"13",product_name:"SAdas",sale_price:"12",photos:"https://via.placeholder.com/450"}


  return (
    <>
    <div className={styles.container}>
      <img src={img} className={styles.image} loading="lazy" />
      <div className={styles.textContainer}>
        <h4>{name || ""}</h4>
        <span>{constants.PRICE}: ${price || "-"}</span>
      </div>
      <span className={styles.price}></span>
      <div className={styles.buttons}>
        <button>-</button>
        <span>{count || "0"}</span>
        <button onClick={() => onAdd(id)}>+</button>
      </div>
    </div>
    </>
  );
}
