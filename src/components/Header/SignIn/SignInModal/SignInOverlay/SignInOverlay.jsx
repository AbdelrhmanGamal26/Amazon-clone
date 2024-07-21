import { Link } from "react-router-dom";
import styles from "./SignInOverlay.module.css";

export default function SignInOverlay() {
  return (
    <div className={styles.signInOverlay}>
      <div className={styles.overlayUpperSection}>
        <div className={styles.signIn}>
          <Link to={{ pathname: "/auth", search: "?mode=sign-in" }}>
            Sign in
          </Link>
        </div>
        <p>
          New customer?
          <Link to={{ pathname: "/auth", search: "?mode=sign-up" }}>
            Start here
          </Link>
        </p>
      </div>
    </div>
  );
}
