import { Fragment, useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import { MainNavigation } from "../../components/MainNavigation/MainNavigation";
import Footer from "../../components/Footer/Footer";
import FooterSignIn from "../../components/Footer/SignInFooter/FooterSignIn";
import { useSelector } from "react-redux";

export default function RootLayout() {
  const { userId } = useSelector((state) => state.userData);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      {!userId ? <FooterSignIn /> : null}
      <Footer />
    </Fragment>
  );
}
