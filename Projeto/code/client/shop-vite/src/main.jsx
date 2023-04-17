import { lazy, React, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import udata from "./assets/udata";
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
        <HomePage udata={udata} />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SigninPage udata={udata} />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignupPage udata={udata} />
      </Suspense>
    ),
  },
  {
    path: "/management-area",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerManagementAreaPage udata={udata} />
      </Suspense>
    ),
  },
  {
    path: "/producer/:producer_id",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerPage udata={udata} />
      </Suspense>
    ),
  },
  {
    path: "/production-unit/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductionUnitsPage udata={udata} />
      </Suspense>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
