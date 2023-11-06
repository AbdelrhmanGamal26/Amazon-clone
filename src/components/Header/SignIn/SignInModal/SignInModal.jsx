import { Fragment } from "react";

import SignInOverlay from "./SignInOverlay/SignInOverlay";
import SignOutOverlay from "./SignInOverlay/SignOutOverlay";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import { useSelector } from "react-redux";

export default function SignInModal({ onMouseOver }) {
  const { userId } = useSelector((state) => state.userData);
  return (
    <Fragment>
      <Backdrop onMouseOver={onMouseOver} />
      {!userId ? <SignInOverlay /> : <SignOutOverlay />}
    </Fragment>
  );
}
