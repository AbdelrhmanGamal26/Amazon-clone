import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import visa from "../../media/visa-payment-card.jpg";
import masterCard from "../../media/masterCard.jpg";
import useInput from "../../hooks/use-input";
import { cartDataActions, userOrderDataActions } from "../../store/store";
import useOrders from "../../hooks/use-orders";
import withLoggedOut from "../../util/withLoggedOut";
import withGuardCheckout from "../../util/withGuardCheckout";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUserData } = useOrders();

  const dispatch = useDispatch();
  const { cart, totalQuantity } = useSelector((state) => state.cartData);
  const cartItems = useSelector((state) => state.cartData.cart);
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

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
    enteredValue: enteredAddress,
    enteredValueIsValid: enteredAddressIsValid,
    fieldInputIsInValid: addressInputIsInvalid,
    setIsTouched: setAddressIsTouched,
    fieldInputChangeHandler: addressInputChangeHandler,
    fieldInputBlurHandler: addressInputBlurHandler,
    reset: resetAddress,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredCity,
    enteredValueIsValid: enteredCityIsValid,
    fieldInputIsInValid: cityInputIsInvalid,
    setIsTouched: setCityIsTouched,
    fieldInputChangeHandler: cityInputChangeHandler,
    fieldInputBlurHandler: cityInputBlurHandler,
    reset: resetCity,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredState,
    enteredValueIsValid: enteredStateIsValid,
    fieldInputIsInValid: stateInputIsInvalid,
    setIsTouched: setStateIsTouched,
    fieldInputChangeHandler: stateInputChangeHandler,
    fieldInputBlurHandler: stateInputBlurHandler,
    reset: resetState,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredZipCode,
    enteredValueIsValid: enteredZipCodeIsValid,
    fieldInputIsInValid: zipCodeInputIsInvalid,
    setIsTouched: setZipCodeIsTouched,
    fieldInputChangeHandler: zipCodeInputChangeHandler,
    fieldInputBlurHandler: zipCodeInputBlurHandler,
    reset: resetZipCode,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length === 5 &&
      value.trim().length < 6
  );

  const {
    enteredValue: enteredNameOnCard,
    enteredValueIsValid: enteredNameOnCardIsValid,
    fieldInputIsInValid: nameOnCardInputIsInvalid,
    setIsTouched: setNameOnCardIsTouched,
    fieldInputChangeHandler: nameOnCardInputChangeHandler,
    fieldInputBlurHandler: nameOnCardInputBlurHandler,
    reset: resetNameOnCard,
  } = useInput((value) => value.trim() !== "");

  const {
    enteredValue: enteredCreditCardNumber,
    enteredValueIsValid: enteredCreditCardNumberIsValid,
    fieldInputIsInValid: creditCardNumberInputIsInvalid,
    setIsTouched: setCreditCardNumberIsTouched,
    fieldInputChangeHandler: creditCardNumberInputChangeHandler,
    fieldInputBlurHandler: creditCardNumberInputBlurHandler,
    reset: resetCreditCardNumber,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length === 16 &&
      value.trim().length < 17
  );

  const {
    enteredValue: enteredExpirationMonth,
    enteredValueIsValid: enteredExpirationMonthIsValid,
    fieldInputIsInValid: expirationMonthInputIsInvalid,
    setIsTouched: setExpirationMonthIsTouched,
    fieldInputChangeHandler: expirationMonthInputChangeHandler,
    fieldInputBlurHandler: expirationMonthInputBlurHandler,
    reset: resetExpirationMonth,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length === 2 &&
      value.trim().length < 3
  );

  const {
    enteredValue: enteredExpirationYear,
    enteredValueIsValid: enteredExpirationYearIsValid,
    fieldInputIsInValid: expirationYearInputIsInvalid,
    setIsTouched: setExpirationYearIsTouched,
    fieldInputChangeHandler: expirationYearInputChangeHandler,
    fieldInputBlurHandler: expirationYearInputBlurHandler,
    reset: resetExpirationYear,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value.trim().length === 2 &&
      value.trim().length < 3
  );

  const {
    enteredValue: enteredCVV,
    enteredValueIsValid: enteredCVVIsValid,
    fieldInputIsInValid: CVVInputIsInvalid,
    setIsTouched: setCVVIsTouched,
    fieldInputChangeHandler: CVVInputChangeHandler,
    fieldInputBlurHandler: CVVInputBlurHandler,
    reset: resetCVV,
  } = useInput((value) => value.trim() !== "" && value.trim().length === 3);

  const submitHandler = (event) => {
    event.preventDefault();

    setNameIsTouched(true);
    setEmailIsTouched(true);
    setAddressIsTouched(true);
    setCityIsTouched(true);
    setStateIsTouched(true);
    setZipCodeIsTouched(true);
    setNameOnCardIsTouched(true);
    setCreditCardNumberIsTouched(true);
    setExpirationMonthIsTouched(true);
    setExpirationYearIsTouched(true);
    setCVVIsTouched(true);

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredAddressIsValid ||
      !enteredCityIsValid ||
      !enteredStateIsValid ||
      !enteredZipCodeIsValid ||
      !enteredNameOnCardIsValid ||
      !enteredCreditCardNumberIsValid ||
      !enteredExpirationMonthIsValid ||
      !enteredExpirationYearIsValid ||
      !enteredCVVIsValid
    )
      return;

    const userOrderData = {
      userName: enteredName,
      userEmail: enteredEmail,
      userAddress: enteredAddress,
      userCity: enteredCity,
      userState: enteredState,
      zipCode: enteredZipCode,
      nameOnCard: enteredNameOnCard,
      creditCardNumber: enteredCreditCardNumber,
      expirationMonth: enteredExpirationMonth,
      expirationYear: enteredExpirationYear,
      CVV: enteredCVV,
    };

    dispatch(userOrderDataActions.updateUserOrderData(userOrderData));

    updateUserData(cart);

    dispatch(cartDataActions.emptyCartAfterCheckout());

    resetName();
    resetEmail();
    resetAddress();
    resetCity();
    resetState();
    resetZipCode();
    resetNameOnCard();
    resetCreditCardNumber();
    resetExpirationMonth();
    resetExpirationYear();
    resetCVV();

    navigate("/confirmedOrder", { state: { prevPath: location.pathname } });
  };

  const nameInputClasses = nameInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const emailInputClasses = emailInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const addressInputClasses = addressInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const cityInputClasses = cityInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const stateInputClasses = stateInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const zipCodeInputClasses = zipCodeInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const nameOnCardInputClasses = nameOnCardInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const creditCardNumberInputClasses = creditCardNumberInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const expirationMonthInputClasses = expirationMonthInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const expirationYearInputClasses = expirationYearInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;
  const CVVInputClasses = CVVInputIsInvalid
    ? `${styles.formControl} ${styles.invalidForm}`
    : styles.formControl;

  return (
    <motion.div
      className={styles.checkoutPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className={styles.pageTitle}>Checkout Form</h2>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutForm}>
          <form onSubmit={submitHandler}>
            <div className={styles.billingInfo}>
              <h2 style={{ marginBottom: "10px" }}>Billing Address</h2>
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
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid name
                  </p>
                )}
              </div>
              <div className={emailInputClasses}>
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="enter your email"
                  value={enteredEmail}
                  onChange={emailInputChangeHandler}
                  onBlur={emailInputBlurHandler}
                />
                {emailInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid email
                  </p>
                )}
              </div>
              <div className={addressInputClasses}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="enter your address"
                  value={enteredAddress}
                  onChange={addressInputChangeHandler}
                  onBlur={addressInputBlurHandler}
                />
                {addressInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid address
                  </p>
                )}
              </div>
              <div className={cityInputClasses}>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="enter your city"
                  value={enteredCity}
                  onChange={cityInputChangeHandler}
                  onBlur={cityInputBlurHandler}
                />
                {cityInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid city
                  </p>
                )}
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div className={styles.lowerInputFields}>
                  <div className={stateInputClasses}>
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      placeholder="enter your state"
                      value={enteredState}
                      onChange={stateInputChangeHandler}
                      onBlur={stateInputBlurHandler}
                    />
                    {stateInputIsInvalid && (
                      <p style={{ color: "red", marginBottom: "5px" }}>
                        Enter a valid state
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20px",
                    width: "50%",
                  }}
                >
                  <div className={zipCodeInputClasses}>
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      placeholder="zip code"
                      value={enteredZipCode}
                      onChange={zipCodeInputChangeHandler}
                      onBlur={zipCodeInputBlurHandler}
                    />
                    {zipCodeInputIsInvalid && (
                      <p style={{ color: "red", marginBottom: "5px" }}>
                        Enter a valid zip code
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paymentSection}>
              <h2 style={{ marginBottom: "10px" }}>Payment</h2>
              <label>Accepted cards</label>
              <div className={styles.paymentMethods}>
                <img src={visa} alt="visa" height="30px" width="45px" />
                <img
                  src={masterCard}
                  alt="mastercard"
                  height="30px"
                  width="45px"
                />
              </div>
              <div className={nameOnCardInputClasses}>
                <label htmlFor="nameOnCard">Name on Card</label>
                <input
                  type="text"
                  id="nameOnCard"
                  placeholder="name on card"
                  value={enteredNameOnCard}
                  onChange={nameOnCardInputChangeHandler}
                  onBlur={nameOnCardInputBlurHandler}
                />
                {nameOnCardInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid card name
                  </p>
                )}
              </div>
              <div className={creditCardNumberInputClasses}>
                <label htmlFor="ccn">Credit Card Number</label>
                <input
                  type="text"
                  id="ccn"
                  placeholder="credit card number"
                  value={enteredCreditCardNumber}
                  onChange={creditCardNumberInputChangeHandler}
                  onBlur={creditCardNumberInputBlurHandler}
                />
                {creditCardNumberInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid credit card number
                  </p>
                )}
              </div>
              <div className={expirationMonthInputClasses}>
                <label htmlFor="expMon">Expiration Month</label>
                <input
                  type="text"
                  id="expMon"
                  placeholder="expiration month"
                  value={enteredExpirationMonth}
                  onChange={expirationMonthInputChangeHandler}
                  onBlur={expirationMonthInputBlurHandler}
                />
                {expirationMonthInputIsInvalid && (
                  <p style={{ color: "red", marginBottom: "5px" }}>
                    Enter a valid expiration month
                  </p>
                )}
              </div>
              <div style={{ display: "flex", width: "100%" }}>
                <div className={styles.lowerInputFields}>
                  <div className={expirationYearInputClasses}>
                    <label htmlFor="expYr">Expiration Year</label>
                    <input
                      type="text"
                      id="expYr"
                      placeholder="Expiration Year"
                      value={enteredExpirationYear}
                      onChange={expirationYearInputChangeHandler}
                      onBlur={expirationYearInputBlurHandler}
                    />
                    {expirationYearInputIsInvalid && (
                      <p style={{ color: "red", marginBottom: "5px" }}>
                        Enter a valid expiration year
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "20px",
                    width: "50%",
                  }}
                >
                  <div className={CVVInputClasses}>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      placeholder="CVV"
                      value={enteredCVV}
                      onChange={CVVInputChangeHandler}
                      onBlur={CVVInputBlurHandler}
                    />
                    {CVVInputIsInvalid && (
                      <p style={{ color: "red", marginBottom: "5px" }}>
                        Enter a valid CVV
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                height: "fit-content",
                paddingRight: "20px",
              }}
            >
              <button type="submit">Confirm Order</button>
            </div>
          </form>
        </div>
        <div className={styles.cartContent}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "2px",
              marginBottom: "5px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <h4>Cart Items Number</h4>
            <span>{totalQuantity} items</span>
          </div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div
                className={styles.item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <p>
                  {item.name}: Quant <span> ({item.quantity})</span>
                </p>
                <span>${item.price * item.quantity}</span>
              </div>
            </div>
          ))}
          <div
            className={styles.total}
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "2px",
              marginTop: "5px",
              borderTop: "1px solid #ccc",
            }}
          >
            <p style={{ fontWeight: "bold" }}>Subtotal</p>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default withLoggedOut(withGuardCheckout(CheckoutPage));
