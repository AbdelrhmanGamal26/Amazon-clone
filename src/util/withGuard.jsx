import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const withGuard = (Component) => {
  return (props) => {
    const totalQuantity = useSelector((state) => state.cartData.totalQuantity);

    if (!totalQuantity) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };
};

export default withGuard;
