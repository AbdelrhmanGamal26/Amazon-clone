import { Link } from "react-router-dom";

import styles from "./FooterSignIn.module.css";

export default function FooterSignIn() {
  return (
    <div className={styles.footerSignIn}>
      <div className={styles.innerSection}>
        <p>See personalized recommendations</p>
        <div className={styles.signIn}>
          <Link to={{ pathname: "/auth", search: "?mode=sign-in" }}>
            Sign in
          </Link>
        </div>
        <p>
          New customer?
          <Link
            to={{ pathname: "/auth", search: "?mode=sign-up" }}
            className={styles.signUp}
          >
            Start here
          </Link>
        </p>
      </div>
    </div>
  );
}
