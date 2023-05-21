import React from "react";
import styles from "./product.module.scss";
import Link from "next/link";
import Button from "../Button";
import constants from "utils/constants";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/actions/cartAction";

export default function ProductCard({
  bgColor,
  id,
  brand,
  name,
  price,
  image,
  ...props
}) {
const userId = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch(); 
  const addCart = (id) => {
    const data ={
      userId: userId._id,
      productId: id,
      price: price,
    }
    dispatch(addToCart(data))
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: bgColor || "",
      }}
      {...props}
    >
      <div className={styles.imageContainer}>
        {image && <img className={styles.image} src={image} loading="lazy" />}
      </div>
      <div className={styles.textContainer}>
        <Link href={`/brand/${brand}`}>
          <h4 className={styles.brandText}>{brand}</h4>
        </Link>
        <h4>{name}</h4>
        <div className={styles.priceContainer}>
          <div className={styles.prices}>
            <span className={styles.salePriceText}>{price}$</span>
          </div>
          <div className={styles.buttons}>
            <Button style={{ margin: 0 }} onClick={() => addCart(id)}>
              {constants.ADD_CART}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
