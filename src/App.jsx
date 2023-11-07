import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import RootLayout from "./pages/Root/Root";
import AuthenticationLayout from "./pages/Root/AuthenticationLayout";
import ErrorPage from "./pages/Error/ErrorPage";
import Product from "./pages/Products/Product/Product";

const HomePage = lazy(() => import("./pages/Home/Home"));
const AuthenticationPage = lazy(() =>
  import("./pages/Authentication/AuthenticationPage")
);
const ProductsPage = lazy(() => import("./pages/Products/ProductsPage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
// const Product = lazy(() => import("./pages/Products/Product/Product"));
const CheckoutPage = lazy(() => import("./pages/Checkout/CheckoutPage"));
const ConfirmedOrderPage = lazy(() =>
  import("./pages/ConfirmedOrder/ConfirmedOrder")
);
const OrdersPage = lazy(() => import("./pages/Orders/Orders"));

export default function App() {
  const router = createBrowserRouter([
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
              <ProductsPage />
            </Suspense>
          ),
        },
        {
          path: "products/:id",
          element: (
            // <Suspense>
            <Product />
            // </Suspense>
          ),
        },
        {
          path: "cart",
          element: (
            <Suspense>
              <CartPage />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense>
              <CheckoutPage />
            </Suspense>
          ),
        },
        {
          path: "confirmedOrder",
          element: (
            <Suspense>
              <ConfirmedOrderPage />
            </Suspense>
          ),
        },
        {
          path: "orders",
          element: (
            <Suspense>
              <OrdersPage />
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
              <AuthenticationPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <RouterProvider router={router}></RouterProvider>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
