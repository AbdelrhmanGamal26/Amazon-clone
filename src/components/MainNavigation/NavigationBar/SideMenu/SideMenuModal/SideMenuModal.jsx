import { Fragment } from "react";

import SideMenu from "../SideMenu";
import Backdrop from "../../../../UI/Backdrop/Backdrop";

export default function SideMenuModal({ onClick }) {
  return (
    <Fragment>
      <Backdrop onClick={onClick} />
      <SideMenu onClick={onClick} />
    </Fragment>
  );
}
