import { Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import logo from "../../media/amazon_logo_black.png";
import SignInPageOverlay from "./signInPageOverlay/SignInPageOverlay";
import SignUpPageOverlay from "./signUpPageOverlay/SignUpPageOverlay";
import classes from "./AuthenticationPage.module.css";

export default function AuthenticationPage() {
  const [searchParams] = useSearchParams();
  const isSignIn = searchParams.get("mode") === "sign-in";

  return (
    <motion.div
      className={classes.signInPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 5 } }}
    >
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      {isSignIn && (
        <Fragment>
          <SignInPageOverlay />
          <p className={classes.separatingText}>New to Amazon?</p>
          <div className={classes.signUpButton}>
            <Link to={{ search: `?mode=${isSignIn ? "sign-up" : "sign-in"}` }}>
              Create your Amazon account
            </Link>
          </div>
        </Fragment>
      )}
      {!isSignIn && <SignUpPageOverlay />}
      <div className={classes.signInFooter}>
        <div className={classes.signInPageFooterOptions}>
          <p>Conditions of use</p>
          <p>Privacy notes</p>
          <p>Help</p>
        </div>
        <p>© 1996-2023, Amazon.com, Inc. or its affiliates</p>
      </div>
    </motion.div>
  );
}
