import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import EmptyCart from "./EmptyCart";
import OccupiedCart from "./OccupiedCart";
import classes from "./CartPage.module.css";

export default function CartPage() {
  const cartItemsQuantity = useSelector(
    (state) => state.cartData.totalQuantity
  );

  return (
    <motion.div
      className={classes.cartPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {cartItemsQuantity === 0 ? <EmptyCart /> : <OccupiedCart />}
    </motion.div>
  );
}
