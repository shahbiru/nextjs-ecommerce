import React, { useState } from "react";
import Link from "next/link";
import styles from "./header.module.scss";
import CartIcon from "@/icons/cart";
import ArrowIcon from "@/icons/arrow";
import MenuIcon from "@/icons/menu";
import constants from "utils/constants";

export default function Header() {
  const [showHeader, setShowHeader] = useState({
    transform: "translate3d(100vw, 0, 0)",
  });

  const user = true;
  const cart = false;
  const cartLength = Object.keys(cart).reduce((a, b) => a + cart[b].length, 0);

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
          {user ? (
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

        <Link href="/account">
          <div className={styles.profileContainer}>
            <img
              src={user?.photoUrl || "https://picsum.photos/200/200"}
              className={styles.profilePhoto}
              loading="lazy"
            />
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
                {user ? (
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
            </div>
          </div>
        </Link>
      </div>
    </nav>
  );
}
