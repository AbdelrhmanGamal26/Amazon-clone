import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import emptyCartImage from "../../media/emptyCartImage.jpg";
import classes from "./EmptyCart.module.css";

export default function EmptyCart() {
  const userId = useSelector((state) => state.userData.userId);
  const { totalQuantity } = useSelector((state) => state.cartData);

  return (
    <div className={classes.cartCard}>
      <div className={classes.cartImageContainer}>
        <img src={emptyCartImage} alt="CartImage" />
      </div>
      <div className={classes.cartDetails}>
        <h2 className={classes.cartHeader}>Your Amazon Cart is empty</h2>
        {!userId && (
          <div className={classes.cartSignInActions}>
            <Link to={{ pathname: "/auth", search: "?mode=sign-in" }}>
              Sign in to your account
            </Link>
            <Link to={{ pathname: "/auth", search: "?mode=sign-up" }}>
              Sign up now
            </Link>
          </div>
        )}
        {userId && totalQuantity === 0 && (
          <div className={classes.cartShoppingOption}>
            <Link to={"/"}>Continue shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
