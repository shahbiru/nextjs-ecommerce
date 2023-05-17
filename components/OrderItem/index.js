import React from "react";
import { format } from "date-fns";

import styles from "./order.module.scss";

export default function OrderItem() {
  const data = {brand: "aaa",information:"adwasda",price:"13",product_name:"SAdas",sale_price:"12",photos:"https://via.placeholder.com/450"}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h4>Order date</h4>
          {/* <span>{format(data.date, "MM.dd.yyyy - HH:mm")}</span> */}
        </div>
        <div>
          <h4>Order Summary</h4>
          <span>8 product</span>
        </div>
        <div>
          <h4>Status</h4>
          <span>{data.status}</span>
        </div>
        <div>
          <h4>Price</h4>
          <span>{data.total_price} $</span>
        </div>
      </div>
      <hr />
      <div className={styles.productPhotos}>
        <img
          className={styles.photo}
          src="https://productimages.hepsiburada.net/s/34/120/10426321043506.jpg"
          loading="lazy"
        />
        <img
          className={styles.photo}
          src="https://i.ibb.co/ZK2L8cg/kisspng-fashion-model-hugo-boss-pinpoint-resource-of-oklah-mens-fashion-5a78e637c1bde9-3434957015178.png"
          loading="lazy"
        />
      </div>
    </div>
  );
}
