import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import amazonIcon from "../../media/amazon-logo.png";
import styles from "./FooterOptions.module.css";

export default function FooterOptions() {
  return (
    <div className={styles.optionsButtons}>
      <Link to="/" className={styles.footerLogo}>
        <img src={amazonIcon} alt="Footer logo" />
      </Link>
      <div className={styles.optionSelector}>
        <div className={styles.language}>
          <FontAwesomeIcon
            icon={faGlobe}
            style={{
              fontSize: "10px",
              marginRight: "8px",
            }}
          />
          <p>English</p>
        </div>
        <div className={styles.currency}>
          <p>$ USD-U.S. Dollar</p>
        </div>
        <div className={styles.country}>
          <img
            src="https://flagcdn.com/ps.svg"
            alt="Palestine"
            style={{ marginRight: "5px" }}
          />
          <p>Palestine</p>
        </div>
      </div>
    </div>
  );
}
