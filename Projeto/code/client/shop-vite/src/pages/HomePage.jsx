import React, { useContext, useEffect } from "react";
import { UserContext } from "../assets/UserContext";
import Home from "../components/Home/Home";
import MainLayout from "../layouts/MainLayout";

export default function HomePage(props) {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}
