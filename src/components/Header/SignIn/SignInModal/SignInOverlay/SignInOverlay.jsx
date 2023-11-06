import { Link } from "react-router-dom";
import classes from "./SignInOverlay.module.css";

export default function SignInOverlay() {
  return (
    <div className={classes.signInOverlay}>
      <div className={classes.overlayUpperSection}>
        <div className={classes.signIn}>
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
