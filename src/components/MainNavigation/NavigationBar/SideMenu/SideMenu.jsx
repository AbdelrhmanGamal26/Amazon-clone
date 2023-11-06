import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleUser,
  faChevronRight,
  faGlobe,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { stringTransform } from "../../../../util/util";
import { fetchProductCategories } from "../../../../services/http";
import classes from "./SideMenu.module.css";

export default function SideMenu({ onClick }) {
  const { userName, userId } = useSelector((state) => state.userData);
  const [sideMenuItems, setSideMenuItems] = useState({
    value: 10,
    text: "Show more",
  });

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchProductCategories,
  });

  const hideSideMenuHandler = (e) => {
    e.stopPropagation();

    onClick?.();
  };

  const showAllCategoriesHandler = () => {
    if (sideMenuItems.value === 10) {
      setSideMenuItems({ value: 20, text: "Show less" });
    }

    if (sideMenuItems.value === 20) {
      setSideMenuItems({ value: 10, text: "Show more" });
    }
  };

  let content;

  if (data) {
    content = data.slice(0, sideMenuItems.value).map((item) => {
      let capitalHeader = stringTransform(item);

      return (
        <li key={capitalHeader}>
          <Link
            to={`/products?category=${capitalHeader}`}
            style={{
              textDecoration: "none",
              color: "black",
              width: "100%",
              height: "100%",
            }}
            onClick={hideSideMenuHandler}
          >
            {capitalHeader}
          </Link>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ marginRight: "5px" }}
          />
        </li>
      );
    });
  }

  return (
    <motion.div
      initial={{ left: "-370px" }}
      exit={{ left: "-370px" }}
      animate={{ left: "0" }}
      className={classes.sideMenuContainer}
    >
      <div className={classes.icon} onClick={hideSideMenuHandler}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      <div className={classes.sideMenu}>
        <div className={classes.signInSection}>
          <FontAwesomeIcon icon={faCircleUser} />
          <p>Hello, {userName ? userName : "Sign in"}</p>
        </div>
        <div className={classes.content}>
          <div className={classes.firstSection}>
            <h3>Shop by department</h3>
            <ul>
              {content}
              <li
                style={{ display: "block" }}
                onClick={showAllCategoriesHandler}
              >
                <p style={{ display: "inline-block" }}>{sideMenuItems.text}</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ marginLeft: "5px" }}
                />
              </li>
            </ul>
          </div>
          <div className={classes.secondSection}>
            <h3>Help & Settings</h3>
            <ul>
              <li>Your Account</li>
              <li>
                <FontAwesomeIcon
                  icon={faGlobe}
                  style={{
                    fontSize: "14px",
                    marginRight: "8px",
                  }}
                />
                <p>English</p>
              </li>
              <li>
                <img
                  src="https://flagcdn.com/ps.svg"
                  width="25"
                  height="15"
                  alt="Palestine"
                  style={{ marginRight: "5px" }}
                />
                <p>Palestine</p>
              </li>
              <li>Customer Service</li>
              {!userId && (
                <li>
                  <Link
                    to="/auth?mode=sign-in"
                    style={{
                      textDecoration: "none",
                      color: "black",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
