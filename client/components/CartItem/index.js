import React from "react";
import styles from "./cart-item.module.scss";
import constants from "utils/constants";

export default function CartItem({ id, name, count, price, img, onAdd,onSub }) {

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
        <button onClick={() => onSub(id)}>-</button>
        <span >{count || "0"}</span>
        <button onClick={() => onAdd(id)}>+</button>
      </div>
    </div>
    </>
  );
}
