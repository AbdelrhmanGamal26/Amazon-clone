import { useState } from "react";

export default function useInput(valueValidation) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = valueValidation(enteredValue);
  const fieldInputIsInValid = !enteredValueIsValid && isTouched;

  const fieldInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const fieldInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    enteredValue,
    enteredValueIsValid,
    fieldInputIsInValid,
    isTouched,
    setIsTouched,
    fieldInputChangeHandler,
    fieldInputBlurHandler,
    reset,
  };
}
