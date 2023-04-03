import { lazy, React, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
const ErrorPage = lazy(() => import("./pages/error-page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ProducerPage = lazy(() => import("./pages/ProducerPage"));
const AddVehicleProductionUnitPage = lazy(() =>
  import("./pages/AddVehicleProductionUnitPage")
);
const ProductionUnitsPage = lazy(() => import("./pages/ProductionUnitsPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/producer/:producer_id",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProducerPage />
      </Suspense>
    ),
  },
  {
    path: "/production-unit/:production_unit_id/vehicle/new", // Esta página é exclusiva para fornecedores
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AddVehicleProductionUnitPage />
      </Suspense>
    ),
  },
  {
    path: "/production-unit/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <ProductionUnitsPage />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
