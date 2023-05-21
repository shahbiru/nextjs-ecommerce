import styles from "./cart.module.scss";
import CartItem from "@/components/CartItem";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "redux/actions/cartAction";

export default function CartPage() {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    dispatch(getCart(userId?._id))
  }, [])

  const cartItem = useSelector((state) => state?.cart?.cartItems);
  // const [quantity, setQuantity] = useState(cartItem[0]?.item.quantity);

  const addCartEvent = (id) => {
    console.log("click", id)
  }

  const SubCartEvent = (id) => {
    console.log("Minus", id)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Cart</h1>
          <h4>You have {cartItem[0]?.items?.length} items in your cart</h4>
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
            />
          );
        })}
      </main>
      <div className={styles.cartTotal}>
        <h4 className={styles.cartTotalLabel}>Total:</h4>
        <div className={styles.cartTotalPrice}>$ <span className={styles.cartPrice}>{cartItem[0]?.totalPrice}</span></div>
      </div>
    </div>
  );
}
