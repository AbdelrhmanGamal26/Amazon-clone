import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import styles from "./Cart.module.css";

export default function Cart() {
  const [cartIsHighlighted, setCartIsHighlighted] = useState(false);
  const cartItemsQuantity = useSelector(
    (state) => state.cartData.totalQuantity
  );

  const cartClasses = `${styles.cart} ${cartIsHighlighted ? styles.bump : ""}`;

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
    <Link to="/cart" className={cartClasses}>
      <div className={styles.cartIcon}>
        <span className={styles.cartItems}>{cartItemsQuantity}</span>
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      <span className={styles.cartText}>Cart</span>
    </Link>
  );
}
