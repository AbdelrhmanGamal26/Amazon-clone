import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import classes from "./NavigationBar.module.css";
import { useState } from "react";
import SideMenuModal from "./SideMenu/SideMenuModal/SideMenuModal";
import { AnimatePresence } from "framer-motion";

const navItems = [
  "Today's Deals",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
];

export default function NavigationBar() {
  const [isVisible, setIsVisible] = useState(false);

  const showSideMenuHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const hideSideMenuHandler = () => {
    setIsVisible(false);
  };

  return (
    <div className={classes.navigationBar}>
      <nav className={classes.navbar}>
        <ul className={classes.navItems}>
          <li onClick={showSideMenuHandler}>
            <FontAwesomeIcon
              icon={faBars}
              style={{
                color: "#fff",
                marginRight: "5px",
                fontSize: "14px",
              }}
            />
            All
          </li>
          {navItems.map((item) => (
            <li key={item} className={classes.listItems}>
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <AnimatePresence>
        {isVisible && <SideMenuModal onClick={hideSideMenuHandler} />}
      </AnimatePresence>
    </div>
  );
}
