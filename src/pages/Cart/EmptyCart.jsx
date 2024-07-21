import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import emptyCartImage from "../../media/emptyCartImage.jpg";
import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  const userId = useSelector((state) => state.userData.userId);
  const { totalQuantity } = useSelector((state) => state.cartData);

  return (
    <div className={styles.cartCard}>
      <div className={styles.cartImageContainer}>
        <img src={emptyCartImage} alt="CartImage" />
      </div>
      <div className={styles.cartDetails}>
        <h2 className={styles.cartHeader}>Your Amazon Cart is empty</h2>
        {!userId && (
          <div className={styles.cartSignInActions}>
            <Link to={{ pathname: "/auth", search: "?mode=sign-in" }}>
              Sign in to your account
            </Link>
            <Link to={{ pathname: "/auth", search: "?mode=sign-up" }}>
              Sign up now
            </Link>
          </div>
        )}
        {userId && totalQuantity === 0 && (
          <div className={styles.cartShoppingOption}>
            <Link to="/">Continue shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
