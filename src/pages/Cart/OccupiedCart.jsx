import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./OccupiedCart.module.css";
import { cartDataActions } from "../../store/store";

export default function OccupiedCart() {
  const { userId } = useSelector((state) => state.userData);
  const cartItems = useSelector((state) => state.cartData.cart);
  const dispatch = useDispatch();

  const subTotalPrice = cartItems.reduce(
    (accumulator, current) => accumulator + current.price * current.quantity,
    0
  );

  const addItemToCartHandler = (id) => {
    dispatch(cartDataActions.addItemToCart({ id }));
  };

  const decreaseCartItemQuantityHandler = (id) => {
    dispatch(cartDataActions.decreaseCartItemQuantity({ id }));
  };

  const removeItemFromCartHandler = (id) => {
    dispatch(cartDataActions.removeItemFromCart({ id }));
  };

  return (
    <div className={classes.cartCard}>
      <h2 className={classes.cartTitle}>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div className={classes.cartDetails} key={item.id}>
          <div className={classes.cartItem}>
            <div className={classes.itemImage}>
              <img
                src={item.image}
                alt="itemImage"
                height="150px"
                width="150px"
              />
            </div>
            <div className={classes.itemDetails}>
              <h3 className={classes.itemName}>{item.name}</h3>
              <span
                className={classes.itemPrice}
                style={{ display: "block", fontWeight: "bold" }}
              >
                Price: <span style={{ fontWeight: "400" }}>${item.price}</span>
              </span>
              <div className={classes.itemActions}>
                <div className={classes.modifyQuantity}>
                  <button
                    onClick={() => decreaseCartItemQuantityHandler(item.id)}
                  >
                    -
                  </button>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "5px 10px",
                      marginRight: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button onClick={() => addItemToCartHandler(item.id)}>
                    +
                  </button>
                </div>
                <button onClick={() => removeItemFromCartHandler(item.id)}>
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={classes.subtotal}>
        <p>
          Subtotal (1 item): <span>${subTotalPrice}</span>
        </p>
        <button className={classes.checkout}>
          <Link
            to={{
              pathname: userId ? "/checkout" : "/auth?mode=sign-in",
            }}
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              height: "100%",
            }}
          >
            Proceed to checkout
          </Link>
        </button>
      </div>
    </div>
  );
}
