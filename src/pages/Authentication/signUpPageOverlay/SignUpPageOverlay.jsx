import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";

import useInput from "../../../hooks/use-input";
import { auth } from "../../../firebase/firebase";
import { userDataActions } from "../../../store/store";
import classes from "./SignUpPageOverlay.module.css";
import withLoggedIn from "../../../util/withLoggedIn";

function SignUpPageOverlay() {
  const location = useLocation();
  const [emailInUse, setEmailInUse] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "sign-up";

  const {
    enteredValue: enteredName,
    enteredValueIsValid: enteredNameIsValid,
    fieldInputIsInValid: nameInputIsInvalid,
    setIsTouched: setNameIsTouched,
    fieldInputChangeHandler: nameInputChangeHandler,
    fieldInputBlurHandler: nameInputBlurHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

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

  const {
    enteredValue: reEnteredPassword,
    enteredValueIsValid: reEnteredPasswordIsValid,
    fieldInputIsInValid: reEnteredPasswordInputIsInvalid,
    isTouched: reEnteredPasswordFieldIsTouched,
    setIsTouched: setReEnteredPasswordIsTouched,
    fieldInputChangeHandler: reEnteredPasswordInputChangeHandler,
    fieldInputBlurHandler: reEnteredPasswordInputBlurHandler,
    reset: resetReEnteredPassword,
  } = useInput((value) => value.trim() !== "" && value.trim().length >= 6);

  const passwordMatch = enteredPassword === reEnteredPassword;

  const submitHandler = (e) => {
    e.preventDefault();

    setNameIsTouched(true);
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    setReEnteredPasswordIsTouched(true);

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !reEnteredPasswordIsValid ||
      !passwordMatch
    )
      return;

    const userData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredentials) => {
        const userId = userCredentials.user.uid;
        dispatch(
          userDataActions.updateUserData({ userId, userName: userData.name })
        );
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: userData.name,
        })
          .then(() => {
            console.log("Profile updated!");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
        if (location.pathname === "/auth?mode=sign-up") {
          navigate("/", { replace: true });
        } else {
          navigate(-1);
        }
      })
      .catch((error) => {
        setEmailInUse(true);
      });

    resetName();
    resetEmail();
    resetPassword();
    resetReEnteredPassword();
  };

  const nameInputClasses = nameInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;
  const emailInputClasses = emailInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;
  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;
  const reEnteredPasswordInputClasses = reEnteredPasswordInputIsInvalid
    ? `${classes.formControl} ${classes.invalidForm}`
    : classes.formControl;

  return (
    <div className={classes.signUpPageOverlay}>
      <h2>Create account</h2>
      {emailInUse && (
        <p style={{ color: "red", marginBottom: "2px" }}>
          Email already in use
        </p>
      )}
      <form onSubmit={submitHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            placeholder="First and last name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameInputIsInvalid && (
            <p style={{ color: "red", marginBottom: "2px" }}>
              Enter a valid name
            </p>
          )}
        </div>
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
        <div className={reEnteredPasswordInputClasses}>
          <label htmlFor="reEnteredPassword">Re-enter your Password</label>
          <input
            type="password"
            id="reEnteredPassword"
            placeholder="enter at least 6 characters"
            value={reEnteredPassword}
            onChange={reEnteredPasswordInputChangeHandler}
            onBlur={reEnteredPasswordInputBlurHandler}
          />
          {reEnteredPasswordInputIsInvalid && (
            <p style={{ color: "red", marginBottom: "2px" }}>
              Enter a valid password
            </p>
          )}
          {!passwordMatch && reEnteredPasswordFieldIsTouched && (
            <p style={{ color: "red" }}>Re-entered password does not match</p>
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
      <p className={classes.signIn}>
        Already have an account?{" "}
        <Link to={{ search: `?mode=${isSignUp ? "sign-in" : "sign-up"}` }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default withLoggedIn(SignUpPageOverlay);
