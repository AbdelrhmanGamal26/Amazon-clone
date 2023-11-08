import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const withGuardConfirm = (Component) => {
  return (props) => {
    const location = useLocation();
    const prevPath = location.state?.prevPath;

    const totalQuantity = useSelector((state) => state.cartData.totalQuantity);

    if (!totalQuantity && prevPath !== "/checkout") {
      return <Navigate to="/" />;
    } else if (totalQuantity && prevPath !== "/checkout") {
      return <Navigate to="/" />;
    }
    return <Component {...props} />;
  };
};

export default withGuardConfirm;
