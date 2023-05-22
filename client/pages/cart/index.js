import styles from "./cart.module.scss";
import CartItem from "@/components/CartItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart, updateCart } from "redux/actions/cartAction";
import { useRouter } from "next/router";
import constants from "utils/constants";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    dispatch(getCart(userId?._id))
  }, [])

  const cartItem = useSelector((state) => state?.cart?.cartItems);

  const addCartEvent = (id, qty) => {
    const data = {
      productId: id,
      userId: userId?._id,
      quantity: qty + 1
    }
    dispatch(updateCart(data))
  }

  const SubCartEvent = (id, qty) => {
    const data = {
      productId: id,
      userId: userId?._id,
      quantity: qty - 1
    }
    dispatch(updateCart(data))
  }

  const delCartEvent = (id) => {
    const data = {
      userId: userId?._id,
    }
    dispatch(deleteCart(id,data))
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{constants.MY_CART}</h1>
          <h4>{constants.YOU} {cartItem[0]?.items?.length} {constants.ITEMS}</h4>
        </div>
        {cartItem[0]?.items?.map((item, index) => {
          return (
            <CartItem
              key={index}
              id={item.productId._id}
              name={item.productId.name}
              brand={item.productId.brand}
              img={item.productId.image}
              count={item.quantity}
              price={item.productId.price}
              onAdd={addCartEvent}
              onSub={SubCartEvent}
              onDel={delCartEvent}
            />
          );
        })}
      </main>
      <div className={styles.cartTotal}>
        <div className={styles.cartTotalWrapper}>
          <h4 className={styles.cartTotalLabel}>{constants.TOTAL}</h4>
          <div className={styles.cartTotalPrice}>{constants.$} <span className={styles.cartPrice}>{cartItem[0]?.totalPrice}</span></div>
        </div>

        <button className={styles.continueShopping} onClick={() => router.push("/")}>{constants.CONTINUE}</button>
      </div>
    </div>
  );
}
