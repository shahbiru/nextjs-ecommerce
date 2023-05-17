import React from "react";
import styles from "./layout.module.scss";
import Header from "../Header";

export default function Layout({ children, noCategories }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}
