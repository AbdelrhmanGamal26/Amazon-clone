import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { userDataActions } from "../../../../../store/store";

import classes from "./SignOutOverlay.module.css";

export default function SignOutOverlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userDataActions.updateUserData({ userId: "", userName: "" }));
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={classes.signOutOverlay}>
      <div className={classes.overlayUpperSection}>
        <button className={classes.signOut} onClick={handleLogout}>
          <Link to={"/"}>Sign out</Link>
        </button>
      </div>
      <div className={classes.overlayLowerSection}>
        <div className={classes.leftSection}>
          <h3>Your Lists</h3>
          <ul>
            <li>Create a list</li>
            <li>Find a list or registry</li>
          </ul>
        </div>
        <div className={classes.rightSection}>
          <h3>Your Lists</h3>
          <ul>
            <li>Account</li>
            <li>
              <Link
                to="/orders"
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Orders
              </Link>
            </li>
            <li>Browsing history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
