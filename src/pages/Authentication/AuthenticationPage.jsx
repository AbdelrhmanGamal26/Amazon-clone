import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../media/amazon_logo_black.png";
import SignInPageOverlay from "./signInPageOverlay/SignInPageOverlay";
import SignUpPageOverlay from "./signUpPageOverlay/SignUpPageOverlay";
import styles from "./AuthenticationPage.module.css";

export default function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const isSignIn = searchParams.get("mode") === "sign-in";

  return (
    <motion.div
      className={styles.signInPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 5 } }}
    >
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Link>
      {isSignIn && (
        <Fragment>
          <SignInPageOverlay />
          <p className={styles.separatingText}>New to Amazon?</p>
          <div className={styles.signUpButton}>
            <Link to={{ search: `?mode=${isSignIn ? "sign-up" : "sign-in"}` }}>
              Create your Amazon account
            </Link>
          </div>
        </Fragment>
      )}
      {!isSignIn && <SignUpPageOverlay />}
      <div className={styles.signInFooter}>
        <div className={styles.signInPageFooterOptions}>
          <p>Conditions of use</p>
          <p>Privacy notes</p>
          <p>Help</p>
        </div>
        <p>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
      </div>
    </motion.div>
  );
}
