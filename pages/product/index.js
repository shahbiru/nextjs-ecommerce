import Link from "next/link";
import styles from "./product.module.scss";
import Button from "@/components/Button";

export default function Product({ query }) {

  const data = { brand: "aaa", information: "adwasda", price: "13", product_name: "SAdas", sale_price: "12", photos: "https://via.placeholder.com/450" }

  const addCartEvent = () => {
  };

  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.photosContainer}>
            <div className={styles.carouselContainer}>
              <img src={data.photos} loading="lazy" />
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
  );
}

