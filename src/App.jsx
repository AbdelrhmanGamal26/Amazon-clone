import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import routes from "./pages/Routes";

export default function App() {
  const router = createBrowserRouter([...routes()]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <RouterProvider router={router}></RouterProvider>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
