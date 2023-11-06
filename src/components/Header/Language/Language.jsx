import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import classes from "./Language.module.css";

export default function Language() {
  return (
    <div className={classes.lang}>
      <img src="https://flagcdn.com/ps.svg" alt="Palestine" />
      <span>EN</span>
      <FontAwesomeIcon
        className={classes.arrow}
        icon={faCaretDown}
        style={{ color: "#c5c5c5", fontSize: "12px" }}
      />
    </div>
  );
}
