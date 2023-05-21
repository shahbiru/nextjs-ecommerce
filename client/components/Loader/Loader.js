import React from "react";
import { PulseLoader } from "react-spinners";
import  styles  from"./loader.module.scss"

export const CustomLoader = () => {
  return (
    <div className={styles.loader}>
      <PulseLoader color="#000000" />
    </div>
  );
};