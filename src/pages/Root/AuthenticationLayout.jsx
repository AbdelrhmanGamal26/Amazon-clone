import { Fragment } from "react";
import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
}
