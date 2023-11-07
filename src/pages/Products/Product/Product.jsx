import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { fetchProduct } from "../../../services/http";
import StarRating from "../../../components/UI/StarRating/StarRating";
import LoadingSpinner from "../../../components/UI/LoadingSpinner/LoadingSpinner";
import { cartDataActions } from "../../../store/store";
import { priceAfterDiscount } from "../../../util/util";
import ProductImageCustomCarousel from "./ProductImageCustomCarousel";
import classes from "./Product.module.css";

export default function Product() {
  const params = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: ({ signal }) => fetchProduct({ signal, id: params.id }),
    staleTime: 10000,
  });

  const AddItemToCartHandler = () => {
    dispatch(
      cartDataActions.addItemToCart({
        id: product.id,
        image: product.images[0],
        name: product.title,
        price: priceAfterDiscount(product.price, product.discountPercentage),
        quantity: 1,
      })
    );
  };

  let content;

  if (isLoading) {
    return (
      <div
        style={{
          margin: "200px auto",
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (product) {
    content = (
      <div className={classes.product}>
        <div className={classes.productImageCarousel}>
          <ProductImageCustomCarousel images={product.images}>
            {product.images.map((image) => (
              <div
                className={classes.productCarouselImageContainer}
                key={image}
              >
                <img src={image} alt="product" />
              </div>
            ))}
          </ProductImageCustomCarousel>
        </div>
        <div className={classes.productDetailsContainer}>
          <h2 className={classes.productTitle}>{product.title}</h2>
          <div className={classes.rating}>
            <span style={{ fontWeight: "500" }}>Rating: </span>
            <span style={{ fontSize: "14px" }}>{product.rating}</span>
            <StarRating rating={product.rating} />
          </div>
          <div className={classes.productPrice}>
            <div className={classes.productPriceAfterDiscount}>
              <span
                className={classes.discountPercentage}
                style={{ color: "red", marginRight: "10px" }}
              >
                {`-${product.discountPercentage}%`}
              </span>
              <span
                className={classes.dollarSign}
                style={{ fontSize: "12px", marginTop: "2px" }}
              >
                $
              </span>
              <span className={classes.priceAfterDiscount}>
                {priceAfterDiscount(product.price, product.discountPercentage)}
              </span>
            </div>
            <div
              className={classes.productPriceBeforeDiscount}
              style={{ color: "gray", marginTop: "5px" }}
            >
              <span>List price: </span>
              <span
                style={{ textDecoration: "line-through" }}
              >{`$${product.price}`}</span>
            </div>
          </div>
          <div className={classes.brand} style={{ marginBottom: "15px" }}>
            <span style={{ fontWeight: "500" }}>Brand: </span>
            <p style={{ display: "inline-block", fontSize: "14px" }}>
              {product.brand}
            </p>
          </div>
          <div
            className={classes.productDescription}
            style={{ marginBottom: "15px" }}
          >
            <span
              style={{
                display: "inline-block",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Description:{" "}
            </span>
            <p style={{ fontSize: "14px" }}>{product.description}</p>
          </div>
          <div className={classes.actions}>
            <button
              className={classes.addToCart}
              onClick={AddItemToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={classes.productPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {content}
    </motion.div>
  );
}
