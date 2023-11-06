import { getAuth } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase/firebase";
import { userDataActions } from "../../../store/store";

import classes from "./SignInPageOverlay.module.css";
import useInput from "../../../hooks/use-input";
import withLoggedIn from "../../../util/withLoggedIn";

function SignInPageOverlay() {
  const [validCredentials, setValidCredentials] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(false);

  const showOtherOptionsHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const {
    enteredValue: enteredEmail,
    enteredValueIsValid: enteredEmailIsValid,
    fieldInputIsInValid: emailInputIsInvalid,
    setIsTouched: setEmailIsTouched,
    fieldInputChangeHandler: emailInputChangeHandler,
    fieldInputBlurHandler: emailInputBlurHandler,
    reset: resetEmail,
  } = useInput((value) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  );

  const {
    enteredValue: enteredPassword,
    enteredValueIsValid: enteredPasswordIsValid,
    fieldInputIsInValid: passwordInputIsInvalid,
    setIsTouched: setPasswordIsTouched,
    fieldInputChangeHandler: passwordInputChangeHandler,
    fieldInputBlurHandler: passwordInputBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length >= 6);

  const submitHandler = (event) => {
    event.preventDefault();

    setEmailIsTouched(true);
    setPasswordIsTouched(true);

    if (!enteredEmailIsValid || !enteredPasswordIsValid) return;

    const userInput = {
      email: enteredEmail,
      password: enteredPassword,
    };

    setValidCredentials(true);

    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        dispatch(
          userDataActions.updateUserData({
            userId: user.uid,
            userName: user.displayName,
          })
        );
        if (location.pathname === "/auth=module=sign-up") {
          navigate("/", { replace: true });
        } else {
          navigate(-1);
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          setValidCredentials(false);
        }
      });

    resetEmail();
    resetPassword();
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;
  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;

  return (
    <div className={classes.signInPageOverlay}>
      <h2>Sign in</h2>
      {!validCredentials && (
        <p style={{ color: "red", marginBottom: "2px" }}>Invalid Credentials</p>
      )}
      <form className={classes.signInForm} onSubmit={submitHandler}>
        <div className={emailInputClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={enteredEmail}
            onChange={emailInputChangeHandler}
            onBlur={emailInputBlurHandler}
          />
          {emailInputIsInvalid && (
            <p style={{ color: "red", marginBottom: "2px" }}>
              Enter a valid email
            </p>
          )}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            placeholder="enter at least 6 characters"
            value={enteredPassword}
            onChange={passwordInputChangeHandler}
            onBlur={passwordInputBlurHandler}
          />
          {passwordInputIsInvalid && (
            <p style={{ color: "red", marginBottom: "2px" }}>
              Enter a valid password
            </p>
          )}
        </div>
        <button type="submit">Continue</button>
      </form>
      <p className={classes.termsOfUse}>
        By continuing, you agree to Amazon's{" "}
        <span>
          Conditions of <br />
          Use
        </span>{" "}
        and <span>Privacy Notice</span>.
      </p>
      <p className={classes.help} onClick={showOtherOptionsHandler}>
        <FontAwesomeIcon
          icon={faCaretRight}
          style={{ marginRight: "5px", color: "gray" }}
        />
        Need help?
      </p>
      {isVisible && (
        <div className={classes.otherOptions}>
          <p>Forgot your password?</p>
          <p>Other issues with sign in</p>
        </div>
      )}
    </div>
  );
}

export default withLoggedIn(SignInPageOverlay);
