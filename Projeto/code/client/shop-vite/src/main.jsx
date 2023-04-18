import { lazy, React, Suspense, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./assets/UserContext";
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
        <HomePage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/signin",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SigninPage />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SignupPage />
      </Suspense>
    ),
  },
  {
    path: "/management-area",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerManagementAreaPage />
      </Suspense>
    ),
  },
  {
    path: "/producer/:producer_id",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProducerPage />
      </Suspense>
    ),
  },
  {
    path: "/production-unit/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductionUnitsPage />
      </Suspense>
    ),
  },
]);

function Root() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
