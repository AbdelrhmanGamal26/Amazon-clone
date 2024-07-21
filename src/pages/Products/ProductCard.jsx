import { Link } from "react-router-dom";

import StarRating from "../../components/UI/StarRating/StarRating";
import { priceAfterDiscount } from "../../util/util";
import styles from "./ProductsPage.module.css";

export default function ProductCard({ product }) {
  return (
    <Link
      to={{ pathname: `/products/${product.id}` }}
      className={styles.productCard}
    >
      <div className={styles.productImageContainer}>
        <img src={product.images[0]} alt="product" />
      </div>
      <div className={styles.productDetailsContainer}>
        <h4 className={styles.productTitle}>{product.title}</h4>
        <p className={styles.productDescription}>
          {product.description.slice(0, 35) + "..."}
        </p>
        <div className={styles.productRating}>
          <StarRating rating={product.rating} />
        </div>
        <div className={styles.productPrice}>
          <span>$</span>
          <span className={styles.priceAfterDiscount}>
            {priceAfterDiscount(product.price, product.discountPercentage)}
          </span>
          <div className={styles.productPriceBeforeDiscount}>
            <span className={styles.productDiscountText}>List price: </span>
            <span
              className={styles.priceBeforeDiscount}
            >{`$${product.price}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
