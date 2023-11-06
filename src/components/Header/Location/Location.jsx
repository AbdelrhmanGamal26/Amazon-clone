import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import classes from "./Location.module.css";

export default function Location() {
  return (
    <div className={classes.location}>
      <div className={classes.icon}>
        <FontAwesomeIcon icon={faLocationDot} style={{ color: "white" }} />
      </div>
      <div className={classes.text}>
        <p>Deliver to</p>
        <span>Palestine</span>
      </div>
    </div>
  );
}
