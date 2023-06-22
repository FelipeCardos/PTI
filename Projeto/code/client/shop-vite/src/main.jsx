import { lazy, React, Suspense, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./assets/UserContext";
import LoadingHomePage from "./components/Loadings/LoadingHomePage";
import LoadingSpinner from "./components/Loadings/LoadingSpinner";
import "./index.css";

const Admin = lazy(() => import("./pages/AdminPage"));
const ErrorPage = lazy(() => import("./pages/error-page"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const AccountOverviewPage = lazy(() => import("./pages/AccountOverviewPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProducerPage = lazy(() => import("./pages/ProducerPage"));
const ProducerManagementAreaPage = lazy(() =>
  import("./pages/ProducerManagementAreaPage")
);
const ProductsPMApage = lazy(() => import("./pages/ProductsPMApage"));
const ProductionUnitsPMApage = lazy(() =>
  import("./pages/ProductionUnitsPMApage")
);
const VehiclesPMApage = lazy(() => import("./pages/VehiclesPMApage"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));

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
    path: "/account-overview",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <AccountOverviewPage />
      </Suspense>
    ),
  },
  {
    path: "/shopping-cart",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ShoppingCartPage />
      </Suspense>
    ),
  },
  {
    path: "/products",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsPage />
      </Suspense>
    ),
  },
  {
    path: "/product/:product_id",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductPage />
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
    path: "/management-area/products",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductsPMApage />
      </Suspense>
    ),
  },
  {
    path: "/management-area/production-units",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProductionUnitsPMApage />
      </Suspense>
    ),
  },
  {
    path: "/management-area/vehicles",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <VehiclesPMApage />
      </Suspense>
    ),
  },
  {
    path: "/producer/:id",
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
  {
    path:"/admin/",
    element: (
      <Suspense fallback={<LoadingSpinner/>}>
        <Admin/>
      </Suspense>
    )
  }
]);

function Root() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
