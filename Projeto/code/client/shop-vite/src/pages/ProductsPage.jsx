import React from "react";
import Products from "../components/Product/Products";
import MainLayout from "../layouts/MainLayout";

export default function ProductsPage(props) {
  return (
    <MainLayout>
      <Products />
    </MainLayout>
  );
}