import React, { useState } from "react";
import styles from "./login.module.scss";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import constants from "utils/constants";

export default function LoginPage() {
  const [page, setPage] = useState("login");

  return (
    <div className={styles.container}>
      <a className={styles.logo}>{constants.SHOPPING}</a>
      <div className={styles.content}>
        <div className={styles.switchContainer}>
          <button
            className={styles.switchButton}
            onClick={() => setPage("login")}
            style={{ backgroundColor: page === "login" ? "white" : "#f6f6f6" }}
          >
            <span>{constants.LOGIN}</span>
          </button>
          <button
            className={styles.switchButton}
            onClick={() => setPage("register")}
            style={{
              backgroundColor: page === "register" ? "white" : "#f6f6f6",
            }}
          >
            <span>{constants.REGISTER}</span>
          </button>
        </div>
        {page === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
