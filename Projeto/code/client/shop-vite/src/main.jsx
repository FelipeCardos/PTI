import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registo from "./components/Registo/registo";
import "./index.css";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

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
    element: <Registo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId='605017327713-opokg48ftsd42qfmg8pqonroui009qrn.apps.googleusercontent.com'>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
