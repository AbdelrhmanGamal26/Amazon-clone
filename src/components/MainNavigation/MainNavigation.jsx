import { Fragment } from "react";
import Header from "../Header/Header";
import NavigationBar from "./NavigationBar/NavigationBar";

export function MainNavigation() {
  return (
    <Fragment>
      <Header />
      <NavigationBar />
    </Fragment>
  );
}
