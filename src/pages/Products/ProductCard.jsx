import { Link } from "react-router-dom";

import StarRating from "../../components/UI/StarRating/StarRating";
import { priceAfterDiscount } from "../../util/util";
import classes from "./ProductsPage.module.css";

export default function ProductCard({ product }) {
  return (
    <Link
      to={{ pathname: `/products/${product.id}` }}
      className={classes.productCard}
    >
      <div className={classes.productImageContainer}>
        <img src={product.images[0]} alt="product" />
      </div>
      <div className={classes.productDetailsContainer}>
        <h4 className={classes.productTitle}>{product.title}</h4>
        <p className={classes.productDescription}>
          {product.description.slice(0, 35) + "..."}
        </p>
        <div className={classes.productRating}>
          <StarRating rating={product.rating} />
        </div>
        <div className={classes.productPrice}>
          <span>$</span>
          <span className={classes.priceAfterDiscount}>
            {priceAfterDiscount(product.price, product.discountPercentage)}
          </span>
          <div className={classes.productPriceBeforeDiscount}>
            <span className={classes.productDiscountText}>List price: </span>
            <span
              className={classes.priceBeforeDiscount}
            >{`$${product.price}`}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
