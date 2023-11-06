import { Link } from "react-router-dom";

import amazonIcon from "../../media/amazon-logo.png";
import Location from "./Location/Location";
import SearchBar from "./SearchBar/SearchBar";
import Language from "./Language/Language";
import Orders from "./Orders/Orders";
import Cart from "./Cart/Cart";
import SignIn from "./SignIn/SignIn";

import classes from "./Header.module.css";

export default function Header() {
  return (
    <header className={classes.header} id="header">
      <Link to={"/"} className={classes.image}>
        <img src={amazonIcon} alt="Amazon" />
      </Link>
      <Location />
      <SearchBar />
      <div className={classes.toolbar}>
        <Language />
        <SignIn />
        <Orders />
        <Cart />
      </div>
    </header>
  );
}
