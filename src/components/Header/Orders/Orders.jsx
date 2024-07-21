import { Link } from "react-router-dom";
import styles from "./Orders.module.css";
import { useSelector } from "react-redux";

export default function Orders() {
  const { userId } = useSelector((state) => state.userData);
  return (
    <div className={styles.orders}>
      <Link
        to={
          userId
            ? { pathname: "/orders" }
            : { pathname: "/auth", search: "?mode=sign-in" }
        }
      >
        <span>Returns</span>
        <p>& Orders</p>
      </Link>
    </div>
  );
}
