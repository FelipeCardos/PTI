import React, { useEffect } from "react";
import Home from "../components/Home/Home";
import MainLayout from "../layouts/MainLayout";

export default function HomePage(props) {
  return (
    <MainLayout uid={props.uid}>
      <Home />
    </MainLayout>
  );
}
