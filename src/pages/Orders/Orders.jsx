import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { fetchOrders } from "../../services/http";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import styles from "./Orders.module.css";
import withLoggedOut from "../../util/withLoggedOut";

function OrdersPage() {
  const { userId } = useSelector((state) => state.userData);
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

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

  const orders = data && data[userId];

  const jsx =
    !data || !orders || Object.keys(orders).length === 0 ? (
      <h3>No Orders Found!</h3>
    ) : (
      Object.values(orders)
        .flat(Infinity)
        .map((item) => (
          <div key={item.id} className={styles.orderContainer}>
            <div className={styles.itemImage}>
              <img src={item.image} alt="itemImage" />
            </div>
            <div className={styles.itemDetails}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <span
                className={styles.itemPrice}
                style={{ display: "block", fontWeight: "bold" }}
              >
                Price: <span style={{ fontWeight: "400" }}>${item.price}</span>
              </span>
            </div>
          </div>
        ))
    );

  return (
    <motion.div
      className={styles.ordersPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Your Orders</h2>
      {jsx}
    </motion.div>
  );
}

export default withLoggedOut(OrdersPage);
