import { lazy, React, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import uid from "./assets/uid";
import LoadingHomePage from "./components/Loadings/LoadingHomePage";
import LoadingSpinner from "./components/Loadings/LoadingSpinner";
import "./index.css";
const ErrorPage = lazy(() => import("./pages/error-page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const ProducerPage = lazy(() => import("./pages/ProducerPage"));
const ProducerManagementAreaPage = lazy(() =>
  import("./pages/ProducerManagementAreaPage")
);
const AddVehicleProductionUnitPage = lazy(() =>
  import("./pages/AddVehicleProductionUnitPage")
);
const ProductionUnitsPage = lazy(() => import("./pages/ProductionUnitsPage"));
const AddProductionUnitsPage = lazy(() =>
  import("./pages/AddProductionUnitPage")
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingHomePage />}>
        <HomePage uid={uid} />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SigninPage uid={uid} />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignupPage uid={uid} />
      </Suspense>
    ),
  },
  {
    path: "/management-area",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerManagementAreaPage uid={uid} />
      </Suspense>
    ),
  },
  {
    path: "/producer/:producer_id",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerPage uid={uid} />
      </Suspense>
    ),
  },
  {
    path: "/production-unit/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductionUnitsPage uid={uid} />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
