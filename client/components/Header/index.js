import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import CartIcon from "@/icons/cart";
import ArrowIcon from "@/icons/arrow";
import MenuIcon from "@/icons/menu";
import constants from "utils/constants";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Header() {
  const [showHeader, setShowHeader] = useState({
    transform: "translate3d(100vw, 0, 0)",
  });
  const router = useRouter();
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  const cart = false;
  const cartLength = Object.keys(cart).reduce((a, b) => a + cart[b].length, 0);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push("/login");
  }

  return (
    <nav className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo}>{constants.SHOPPING}</a>
        </Link>
        <div className={styles.rightContentMobile}>
          <Link href="/cart">
            <div className={styles.cartContainer}>
              <CartIcon width={28} height={28} className={styles.cartIcon} />
              <div>
                <span>{cartLength || 0}</span>
              </div>
            </div>
          </Link>
          <div className={styles.profileContainer}>
            <MenuIcon
              width={30}
              height={30}
              className={styles.menuIcon}
              onClick={() =>
                setShowHeader({ transform: "translate3d(0vw, 0, 0)" })
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.rightMenu}>
        <div className={styles.menuContent} style={showHeader}>
          {token ? (
            <>
              <Link href="/">{constants.LOGOUT}</Link>
            </>
          ) : (
            <>
              <Link href="/login">{constants.LOGIN}</Link>
              <Link href="/login">{constants.REGISTER}</Link>
            </>
          )}
        </div>
        <div
          className={styles.background}
          style={showHeader}
          onClick={() =>
            setShowHeader({ transform: "translate3d(100vw, 0, 0)" })
          }
        />
      </div>
      <div className={styles.rightContent}>
        <Link href="/cart">
          <div className={styles.cartContainer}>
            <CartIcon width={20} height={20} className={styles.cartIcon} />
            <span>{constants.CART}: {cartLength || 0}</span>
          </div>
        </Link>
        <div className={styles.profileContainer}>
          <span>
            {constants.HELLO}{" "}
            <span style={{ fontWeight: "normal" }}>
              {user?.name || "Guest"}
            </span>
          </span>
          <ArrowIcon width={10} height={10} className={styles.arrowIcon} />
          <div className={styles.dropdown}>
            <div className={styles.arrowUp} />
            <div className={styles.dropdownMenu}>
              {token ? (
                <>
                  <button type="button" className={styles.logout} onClick={() => logout()}>{constants.LOGOUT}</button>
                </>
              ) : (
                <>
                  <Link href="/login">{constants.LOGIN}</Link>
                  <Link href="/login">{constants.REGISTER}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
