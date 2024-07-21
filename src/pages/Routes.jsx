import { lazy, Suspense } from "react";
import RootLayout from "../pages/Root/Root";
import AuthenticationLayout from "../pages/Root/AuthenticationLayout";
import ErrorPage from "../pages/Error/ErrorPage";
const HomePage = lazy(() => import("../pages/Home/Home"));
const LazyAuthenticationPage = lazy(() =>
  import("../pages/Authentication/AuthenticationPage")
);
const LazyProductsPage = lazy(() => import("../pages/Products/ProductsPage"));
const LazyCartPage = lazy(() => import("../pages/Cart/CartPage"));
const LazyProduct = lazy(() => import("../pages/Products/Product/Product"));
const LazyCheckoutPage = lazy(() => import("../pages/Checkout/CheckoutPage"));
const LazyConfirmedOrderPage = lazy(() =>
  import("../pages/ConfirmedOrder/ConfirmedOrder")
);
const LazyOrdersPage = lazy(() => import("../pages/Orders/Orders"));

const routes = () => [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense>
            <LazyProductsPage />
          </Suspense>
        ),
      },
      {
        path: "products/:id",
        element: (
          <Suspense>
            <LazyProduct />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense>
            <LazyCartPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense>
            <LazyCheckoutPage />
          </Suspense>
        ),
      },
      {
        path: "confirmedOrder",
        element: (
          <Suspense>
            <LazyConfirmedOrderPage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense>
            <LazyOrdersPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <LazyAuthenticationPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
