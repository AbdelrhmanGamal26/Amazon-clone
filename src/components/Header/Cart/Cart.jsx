import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import classes from "./Cart.module.css";

export default function Cart() {
  const [cartIsHighlighted, setCartIsHighlighted] = useState(false);
  const cartItemsQuantity = useSelector(
    (state) => state.cartData.totalQuantity
  );

  const cartClasses = `${classes.cart} ${
    cartIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartItemsQuantity === 0) {
      return;
    }
    setCartIsHighlighted(true);

    const timer = setTimeout(() => {
      setCartIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItemsQuantity]);

  return (
    <Link to={"/cart"} className={cartClasses}>
      <div className={classes.cartIcon}>
        <span className={classes.cartItems}>{cartItemsQuantity}</span>
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      <span className={classes.cartText}>Cart</span>
    </Link>
  );
}
