import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import classes from "./ConfirmedOrder.module.css";
import withLoggedOut from "../../util/withLoggedOut";

function ConfirmedOrderPage() {
  const navigate = useNavigate();

  const confirmOrderHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <motion.div
      className={classes.confirmedOrderPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={classes.confirmedOrderCard}>
        <h2 style={{ textAlign: "center", fontSize: "28px" }}>
          Order Confirmed
        </h2>
        <p className={classes.message} style={{ textAlign: "center" }}>
          Thank you for your purchase and we wish you a great day!
        </p>
        <button onClick={confirmOrderHandler}>Continue Shopping</button>
      </div>
    </motion.div>
  );
}

export default withLoggedOut(ConfirmedOrderPage);
