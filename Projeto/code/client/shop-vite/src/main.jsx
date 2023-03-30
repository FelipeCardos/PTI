import { lazy, React, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const ErrorPage = lazy(() => import("./pages/error-page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ProducerPage = lazy(() => import("./pages/ProducerPage"));
const ProductionUnitPage = lazy(()=> import("./pages/ProductionUnit"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/producer/:id",
    element: <ProducerPage />,
  },
  {
    path:"/productionUnit",
    element:<ProductionUnitPage/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
