import React from "react";
import Product from "../components/Product/Product";
import MainLayout from "../layouts/MainLayout";

export default function ProductPage(props) {
  return (
    <MainLayout>
      <Product />
    </MainLayout>
  );
}
