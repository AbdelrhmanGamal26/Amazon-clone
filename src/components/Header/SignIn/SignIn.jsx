import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import SignInModal from "./SignInModal/SignInModal";
import classes from "./SignIn.module.css";

let timer;

export default function SignIn() {
  const { userName } = useSelector((state) => state.userData);
  const [isShown, setIsShown] = useState(false);

  const showModalOverlayHandler = () => {
    clearTimeout(timer);
    setTimeout(() => setIsShown(true), 250);
  };

  const hideModalOverlayHandler = () => {
    timer = setTimeout(() => setIsShown(false), 250);
  };

  return (
    <div
      onMouseOver={showModalOverlayHandler}
      onMouseLeave={hideModalOverlayHandler}
      className={classes.signInOptions}
    >
      <div className={classes.signIn}>
        <span>Hello, {!userName ? "sign in" : `${userName}`}</span>
        <div className={classes.options}>
          <p>Account & Lists</p>
          <FontAwesomeIcon
            className={classes.arrow}
            icon={faCaretDown}
            style={{ color: "#c5c5c5", fontSize: "12px", marginLeft: "3px" }}
          />
        </div>
      </div>
      {isShown && <SignInModal onMouseOver={hideModalOverlayHandler} />}
    </div>
  );
}
