import React from "react";
import styles from "./product.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button";
import constants from "utils/constants";

export default function ProductCard({
  bgColor,
  id,
  brand,
  name,
  price,
  sale_price,
  image,
  favorite,
  ...props
}) {

  const router = useRouter();

  const goToProduct = (target) => {
    target?.localName !== "button" &&
      typeof window !== "undefined" &&
      router.push(`/${id}`);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: bgColor || "",
      }}
      onClick={(e) => goToProduct(e.target)}
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
            <span className={styles.salePriceText}>{sale_price}$</span>
          </div>
          <div className={styles.buttons}>
            <Button style={{ margin: 0 }} >
              {constants.ADD_CART}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
