import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import amazonIcon from "../../media/amazon-logo.png";

import classes from "./FooterOptions.module.css";
import { Link } from "react-router-dom";

export default function FooterOptions() {
  return (
    <div className={classes.optionsButtons}>
      <Link to={"/"} className={classes.footerLogo}>
        <img src={amazonIcon} alt="Footer logo" />
      </Link>
      <div className={classes.optionSelector}>
        <div className={classes.language}>
          <FontAwesomeIcon
            icon={faGlobe}
            style={{
              fontSize: "10px",
              marginRight: "8px",
            }}
          />
          <p>English</p>
        </div>
        <div className={classes.currency}>
          <p>$ USD-U.S. Dollar</p>
        </div>
        <div className={classes.country}>
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
