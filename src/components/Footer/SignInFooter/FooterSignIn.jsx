import { Link } from "react-router-dom";

import classes from "./FooterSignIn.module.css";

export default function FooterSignIn() {
  return (
    <div className={classes.footerSignIn}>
      <div className={classes.innerSection}>
        <p>See personalized recommendations</p>
        <div className={classes.signIn}>
          <Link to={{ pathname: "/auth", search: "?mode=sign-in" }}>
            Sign in
          </Link>
        </div>
        <p>
          New customer?
          <Link
            to={{ pathname: "/auth", search: "?mode=sign-up" }}
            className={classes.signUp}
          >
            Start here
          </Link>
        </p>
      </div>
    </div>
  );
}
