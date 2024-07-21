import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import styles from "./Location.module.css";

export default function Location() {
  return (
    <div className={styles.location}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faLocationDot} style={{ color: "white" }} />
      </div>
      <div className={styles.text}>
        <p>Deliver to</p>
        <span>Palestine</span>
      </div>
    </div>
  );
}
