import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import { db } from "@/config/firebase";
import { useAuth } from "@/firebase/context";
import { removeFavorite, addFavorite, addToCart } from "@/firebase/product";

import styles from "./product.module.scss";

import Layout from "components/Layout";
import Button from "@/components/Button";
import HeartIcon from "@/icons/heart";
import HeartFilled from "@/icons/heart-filled";
import ErrorPage from "pages/404";
import { useRouter } from "next/router";

export default function Product({ query }) {

  const [selectedSize, setSelectedSize] = useState();
  // const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isFavorite, setFavorite] = useState(false);

  const { user, loading } = useAuth();

  const router = useRouter();

const data = {brand: "aaa",information:"adwasda",price:"13",product_name:"SAdas",sale_price:"12",photos:"https://via.placeholder.com/450"}
  const id = query?.product;

  useEffect(() => {
    user && setFavorite(user.favorites.includes(id));
  }, [user]);

  const cart = data;

  const addCartEvent = () => {
    if (!user && !loading && typeof window !== "undefined")
      router.push("/login");
    else {
      if (selectedSize) {
        const newCart = {
          ...cart,
          [id]: cart.hasOwnProperty(id)
            ? [...cart[id], selectedSize]
            : [selectedSize],
        };
        addToCart(newCart);
      }
      if (sizes?.length === 0) {
        const newCart = {
          ...cart,
          [id]: cart.hasOwnProperty(id) ? [...cart[id], "-"] : ["-"],
        };
        addToCart(newCart);
      }
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img src={data.photos} loading="lazy" />
            </div>
            <div className={styles.smallPhotos}>
              {/* {data.photos.slice(0, 5).map((image, index) => {
                return (
                  <img
                    key={index}
                    src={image}
                    className={styles.smallPhoto}
                    style={{ borderColor: selectedPhoto === index && "black" }}
                    // onClick={() => setSelectedPhoto(index)}
                    loading="lazy"
                  />
                );
              })} */}
            </div>
            <hr />
          </div>
          <div className={styles.productInfos}>
            <div className={styles.header}>
              <h1 className={styles.productTitle}>{data.product_name || ""}</h1>
              <Link href={'/'}>{data.brand || ""}</Link>
            </div>
            <span className={styles.priceText}>{data.price || 0}$</span>
            <div className={styles.saleContainer}>
              <span className={styles.saleText}>{data.sale_price || 0}$</span>
              <span className={styles.savedText}>
                {"(You will be saved " + (data.price - data.sale_price) + "$!)"}
              </span>
            </div>
            <hr />
            <div className={styles.buttons}>
              <Button style={{ margin: 0 }} onClick={addCartEvent}>
                Add to Cart
              </Button>
            </div>
            <hr />
            <div className={styles.infoContainer}>
              <h4 className={styles.sizesText}>Product Information</h4>
              <p className={styles.infoText}>{data.information}</p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

