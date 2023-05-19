import styles from "./cart.module.scss";
import CartItem from "@/components/CartItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "redux/actions/cartAction";

export default function CartPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const id = "64674329e0288275b408acd2"
    dispatch(getCart(id))
  }, [])

  const cartItem = useSelector((state) => state?.cart?.cartItems);
  console.log(cartItem)
  const cartLength = Object.keys(cartItem).reduce((a, b) => a + cartItem, 0);

  const cartItems =
    cartLength > 0
      ? Object.keys(cartItem)
        .map((item) => {
          return cartItem.map((size) => {
            return {
              name: item,
              size,
            };
          });
        })
        .flat(1)
      : [];

  const sizeCount = cartItems.reduce(
    (acc, value) => ({
      ...acc,
      [value.name + "__size__" + value.size]:
        (acc[value.name + "__size__" + value.size] || 0) + 1,
    }),
    {}
  );

  const cartItemsArray = [
    ...new Set(
      cartItems.filter(
        (v, i, a) =>
          a.findIndex((t) => t.name === v.name && t.size === v.size) === i
      )
    ),
  ].map((item) => {
    return { ...item, count: sizeCount[item.name + "__size__" + item.size] };
  });

  const addCartEvent = () => {

  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Cart</h1>
          <h4>You have 3 items in your cart</h4>
        </div>
        {cartItem.map((item, index) => {
          console.log(item)
          return (
            <CartItem
              key="1"
              id={item.productId._id}
              name={item.productId.name}
              brand={item.productId.brand}
              img={item.productId.image}
              count={item.quantity}
              price={item.productId.price}
              onAdd={addCartEvent}
            />
          );
        })}
      </main>
      <div className={styles.cartTotal}>
        <h4 className={styles.cartTotalLabel}>Total:</h4>
        <div className={styles.cartTotalPrice}>$ <span className={styles.cartPrice}>500</span></div>
      </div>
    </div>
  );
}
